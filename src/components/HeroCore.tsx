'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import InteractiveConsole from './InteractiveConsole'
import DecodeText from './DecodeText'

const ROLES = [
  "Full-Stack Developer",
  "ML Enthusiast",
  "Problem Solver",
  "Open Source Contributor"
]

export default function HeroCore() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse tracking for parallax and 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const smx = useSpring(mouseX, springConfig)
  const smy = useSpring(mouseY, springConfig)
  
  // 3D tilt for the console
  const rotateX = useTransform(smy, [-500, 500], [8, -8])
  const rotateY = useTransform(smx, [-500, 500], [-8, 8])
  
  // Subtle parallax for background text
  const textX = useTransform(smx, [-500, 500], [-30, 30])
  const textY = useTransform(smy, [-500, 500], [-30, 30])
  
  // Typewriter State
  const [currentText, setCurrentText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = ROLES[roleIndex]
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        if (currentText === '') {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % ROLES.length)
        }
      }
    }, isDeleting ? 40 : 80)
    
    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, roleIndex])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Animation variants for staggering the left column
  const leftColVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  } as const

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  } as const

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[95vh] w-full flex items-center justify-center overflow-hidden pt-24 md:pt-0"
      style={{ perspective: '1200px' }}
    >
      {/* Massive Background Text Parallax (Opacity reduced to 20%) */}
      <motion.div 
        style={{ x: textX, y: textY }} 
        className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-0 w-full opacity-20"
      >
        <h1 className="text-[22vw] md:text-[16vw] leading-none font-black tracking-tighter text-center flex flex-col select-none">
          <DecodeText text="NISARG" className="block text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-transparent" delay={0.2} />
          <DecodeText text="VAGHELA" className="block -mt-8 md:-mt-16 text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-transparent" delay={0.6} />
        </h1>
      </motion.div>

      {/* Glowing Orb Blob Behind Left Column */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[rgba(0,240,255,0.08)] blur-[100px] rounded-full pointer-events-none animate-[pulse_4s_ease-in-out_infinite] z-0" />

      {/* Main Split Layout Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
        
        {/* LEFT COLUMN: Intro Content */}
        <motion.div 
          variants={leftColVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center"
        >
          {/* Status Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-cyan-400 font-mono text-[11px] tracking-wider uppercase backdrop-blur-md w-fit mb-8 shadow-[0_0_15px_rgba(0,240,255,0.05)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
            Available for Opportunities
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <span className="text-xl md:text-2xl text-gray-400 font-mono mb-2">Hi, I'm</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight">
              Nisarg Vaghela
            </h1>
          </motion.div>

          {/* Typewriter Role */}
          <motion.div variants={itemVariants} className="text-lg md:text-xl lg:text-2xl font-mono text-cyan-400 mt-4 h-8 md:h-10 flex items-center">
            <span className="text-gray-500 mr-2">&gt;</span>
            <span className="glow-text">{currentText}</span>
            <span className="w-2.5 h-6 ml-1 bg-cyan-400 animate-pulse" />
          </motion.div>

          {/* Bio Description */}
          <motion.p variants={itemVariants} className="mt-6 text-gray-400 max-w-md leading-relaxed text-sm md:text-base font-light">
            Building intelligent, scalable digital systems. <br />
            Currently studying CS at SVNIT Surat.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-10">
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-cyan-500 text-black px-8 py-3.5 font-mono text-xs font-bold hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all tracking-widest uppercase"
            >
              [ VIEW_RESUME ]
            </a>
            <a 
              href="#projects" 
              className="border border-cyan-500/50 text-cyan-400 bg-cyan-500/5 px-8 py-3.5 font-mono text-xs hover:bg-cyan-500/10 transition-all tracking-widest uppercase"
            >
              [ EXPLORE_WORK ]
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-5 mt-10">
            <a href="https://github.com/nisargvghl27" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors hover:scale-110 active:scale-95 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://linkedin.com/in/nisargvghl27" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors hover:scale-110 active:scale-95 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.instagram.com/nisarg_vaghela9" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors hover:scale-110 active:scale-95 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://leetcode.com/u/nisargvghl27/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors hover:scale-110 active:scale-95 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: 3D Console */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ rotateX, rotateY }} 
          className="relative w-full drop-shadow-[0_0_40px_rgba(0,240,255,0.12)] mt-8 md:mt-0"
        >
          <InteractiveConsole />
        </motion.div>
      </div>
    </section>
  )
}