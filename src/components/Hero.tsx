'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SCRAMBLE TEXT COMPONENT ---
function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    // Check for mobile devices or reduced motion preference to skip heavy RAF calculations
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || navigator.maxTouchPoints > 0);
    
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      return;
    }

    const CHARS = '!ABCDEFGHIJKLMNOPQRSTUVWXYZ<>-_\\/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]{} =+*^?#';
    let frame = 0;
    let animationFrameId: number;
    const totalFramesToWait = Math.floor(delay / 30);
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= 30) {
        lastTime = currentTime;
        let revealed = 0;

        const scrambled = text.split('').map((char, index) => {
          if (char === ' ') return ' ';

          if (frame > totalFramesToWait) {
            const decodeFrame = frame - totalFramesToWait;
            if (decodeFrame >= index * 2) {
              revealed++;
              return char;
            }
          }

          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');

        setDisplayText(scrambled);
        frame++;

        if (revealed === text.length) {
          return; // Stop animation loop
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [text, delay]);

  return <>{displayText}</>;
}

// --- CYBER BUTTON COMPONENT ---
function CyberButton({ 
  children, 
  primary = false, 
  onClick, 
  href 
}: { 
  children: React.ReactNode; 
  primary?: boolean; 
  onClick?: () => void;
  href?: string;
}) {
  const baseClasses = `relative group px-6 py-3 md:px-8 md:py-4 font-mono text-xs md:text-sm font-bold tracking-widest uppercase overflow-hidden transition-colors w-full sm:w-auto text-center ${
    primary 
      ? 'text-black bg-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)]' 
      : 'text-[#00f0ff] bg-black/40 border border-[#00f0ff]/50 hover:bg-[#00f0ff]/10 backdrop-blur-sm'
  }`;

  const innerContent = (
    <>
      {/* Corner targeting brackets that appear on hover */}
      <span className={`absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 transition-opacity duration-300 ${primary ? 'border-black' : 'border-[#00f0ff]'} opacity-0 group-hover:opacity-100`} />
      <span className={`absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 transition-opacity duration-300 ${primary ? 'border-black' : 'border-[#00f0ff]'} opacity-0 group-hover:opacity-100`} />
      <span className={`absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 transition-opacity duration-300 ${primary ? 'border-black' : 'border-[#00f0ff]'} opacity-0 group-hover:opacity-100`} />
      <span className={`absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 transition-opacity duration-300 ${primary ? 'border-black' : 'border-[#00f0ff]'} opacity-0 group-hover:opacity-100`} />
      
      {/* Sweeping scanline effect */}
      <motion.div
        variants={{
          hover: { x: ['-150%', '250%'] }
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`absolute inset-0 w-3/4 h-full -skew-x-12 z-0 ${primary ? 'bg-white/40' : 'bg-[#00f0ff]/20'}`}
        style={{ left: '-150%' }}
      />
      
      {/* Button Content & Terminal Cursor */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        <motion.span
          variants={{
            hover: { x: -4, opacity: 1, display: 'inline-block' },
            rest: { x: 0, opacity: 0, display: 'none' }
          }}
          initial="rest"
          className="hidden sm:inline-block"
        >
          &gt;
        </motion.span>
        {children}
        <motion.span
          variants={{
            hover: { opacity: [0, 1, 0] },
            rest: { opacity: 0 }
          }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          initial="rest"
          className="inline-block w-2 h-3.5 bg-current translate-y-[2px]"
        />
      </span>
    </>
  );

  // Render an Anchor tag if an href is provided
  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover="hover"
        whileTap="tap"
        className={baseClasses}
      >
        {innerContent}
      </motion.a>
    );
  }

  // Otherwise, render a standard Button
  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      suppressHydrationWarning
      className={baseClasses}
    >
      {innerContent}
    </motion.button>
  );
}

// --- MAIN HERO COMPONENT ---
export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  // Terminal State
  const [history, setHistory] = useState<{ id: string; type: 'input' | 'output' | 'system'; text: string }[]>([
    { id: 'init', type: 'system', text: `Last login: ${new Date().toDateString()} on ttys001` }
  ]);
  const [isTerminalRunning, setIsTerminalRunning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const roles = ['Full Stack Developer', 'Competitive Programmer'];

  // Initial delay so it doesn't type while the layout is scrambling
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStartedTyping(true);
    }, 1000);
    return () => clearTimeout(startTimer);
  }, []);

  // Typing effect for the roles
  useEffect(() => {
    if (!hasStartedTyping) return;

    let timeout: NodeJS.Timeout;
    const currentRole = roles[roleIndex];
    const speed = 1000 / (currentRole.length || 1);

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1);
        setDisplayText(nextText);
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, hasStartedTyping]);

  // Auto-scroll only the terminal container
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Terminal Execution Logic
  const runAboutMe = async () => {
    if (isTerminalRunning) return;
    setIsTerminalRunning(true);
    
    setHistory(prev => [...prev, { id: crypto.randomUUID(), type: 'input', text: './about_me.sh' }]);
    
    const scriptLines = [
      "loading identity_matrix.sh... [OK]",
      "> WHOAMI: Nisarg Vaghela",
      "> ORIGIN: Rajkot, Gujarat",
      "> ACADEMICS: NIT Surat",
      "> CURRENT_PROCESS: Pursuing B.Tech in AI (3rd Year)",
      "> FOCUS: Engineering robust full-stack web & mobile apps.",
      "> SIDE_QUESTS: Competitive programming and playing cricket.",
      "Process finished with exit code 0"
    ];

    for (let i = 0; i < scriptLines.length; i++) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
      setHistory(prev => [...prev, { id: crypto.randomUUID(), type: 'output', text: scriptLines[i] }]);
    }

    setIsTerminalRunning(false);
  };

  const runClear = () => {
    if (isTerminalRunning) return;
    setHistory([{ id: crypto.randomUUID(), type: 'system', text: 'Terminal cleared.' }]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
  };

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen bg-transparent text-white m-0 p-0 selection:bg-[#00f0ff] selection:text-black font-sans">
      
      {/* Background ambient glows (halved opacity and reduced blur on mobile) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[0%] right-[-10%] w-[350px] h-[350px] md:w-[60vw] md:h-[60vw] bg-[#00f0ff] opacity-5 md:opacity-10 blur-[60px] md:blur-[150px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[300px] h-[300px] md:w-[50vw] md:h-[50vw] bg-[#ff0055] opacity-[0.015] md:opacity-[0.03] blur-[60px] md:blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWCAAAAEUlEQVQImWNgYGD4z8DAwMgAAz8B/80B3P8AAAAASUVORK5CYII=')] opacity-30 mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-28 pb-12 md:pt-0 md:pb-0">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7 flex flex-col items-start text-left">
          
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00f0ff]/5 border border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <span className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00f0ff] animate-pulse" />
                <ScrambleText text="SYSTEM_ONLINE" delay={100} />
              </span>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-mono font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 uppercase tracking-tighter mb-2" style={{ textShadow: '0px 0px 20px rgba(255,255,255,0.1)' }}>
            <ScrambleText text="NISARG" delay={300} /><br />
            <ScrambleText text="VAGHELA" delay={500} />
          </motion.h1>

          <motion.div variants={itemVariants} className="font-mono text-sm md:text-md text-[#00f0ff] mb-6 h-8 flex items-center bg-[#00f0ff]/5 px-4 py-1 border-l-2 border-[#00f0ff] tracking-[0.05em] overflow-hidden whitespace-nowrap w-full max-w-[fit-content]">
            <span className="text-slate-500 mr-3 shrink-0">&gt;&gt;</span>
            <span className="font-bold tracking-widest truncate">{displayText}</span>
            <span className="ml-1 animate-pulse text-[#00f0ff] text-xl -mt-1 shadow-[0_0_8px_#00f0ff] shrink-0">&#9608;</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
            className="font-mono text-xs sm:text-sm text-slate-400 max-w-md mb-10 leading-relaxed tracking-wide opacity-90 min-h-[80px]"
          >
            {`// SYSTEM_OVERVIEW: Compiling elegant solutions from complex data. Engineering robust full-stack architectures and integrating advanced artificial intelligence models.`}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 w-full font-mono text-xs sm:text-sm font-bold uppercase tracking-widest">
            <CyberButton primary={true} href="/resume.pdf">
              <ScrambleText text="[ DOWNLOAD_RESUME ]" delay={1100} />
            </CyberButton>
            <CyberButton primary={false} onClick={() => scrollToSection('contact')}>
              <ScrambleText text="[ ESTABLISH_UPLINK ]" delay={1200} />
            </CyberButton>
          </motion.div>

        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5, type: 'spring' }} className="lg:col-span-5 w-full mt-12 lg:mt-0 relative">
          <div className="absolute inset-0 bg-[#00f0ff]/5 blur-xl rounded-lg" />
          
          <div className="relative border border-[#00f0ff]/30 rounded-md bg-[#0a0f12]/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,240,255,0.05),inset_0_0_20px_rgba(0,240,255,0.05)] overflow-hidden font-mono text-sm flex flex-col h-[380px]">
            
            <div className="bg-black/50 border-b border-[#00f0ff]/20 px-4 py-2.5 flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" /><div className="w-2.5 h-2.5 rounded-full bg-slate-600" /><div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              </div>
              <div className="text-[10px] text-[#00f0ff]/70 font-semibold tracking-widest uppercase">bash - root@nitsurat</div><div className="w-10" />
            </div>

            <div ref={scrollContainerRef} className="p-5 flex-1 overflow-y-auto text-slate-300 custom-scrollbar">
              <AnimatePresence initial={false}>
                {history.map((line) => (
                  <motion.div key={line.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-1.5">
                    {line.type === 'system' && <span className="text-slate-500 text-xs">{line.text}</span>}
                    {line.type === 'input' && <div className="flex items-center gap-2 text-[#00f0ff]"><span className="font-bold shrink-0">root@sys:~#</span><span className="break-all">{line.text}</span></div>}
                    {line.type === 'output' && <div className={`pl-2 break-words ${line.text.includes('[OK]') || line.text.includes('exit code') ? 'text-emerald-400' : line.text.startsWith('>') ? 'text-[#00f0ff] brightness-110' : 'text-slate-300'}`}>{line.text}</div>}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-[#00f0ff] font-bold">root@sys:~#</span>
                {!isTerminalRunning ? (
                  <div className="flex flex-wrap gap-2">
                    <button suppressHydrationWarning onClick={runAboutMe} className="px-2 py-0.5 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20 hover:border-[#00f0ff] transition-all text-xs focus:outline-none">./about_me.sh</button>
                    <button suppressHydrationWarning onClick={runClear} className="px-2 py-0.5 bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all text-xs focus:outline-none">clear</button>
                    <span className="animate-pulse text-[#00f0ff] ml-1">&#9608;</span>
                  </div>
                ) : <span className="animate-pulse text-[#00f0ff]">&#9608;</span>}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 240, 255, 0.2); border-radius: 3px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 240, 255, 0.5); }` }} />
    </section>
  );
}