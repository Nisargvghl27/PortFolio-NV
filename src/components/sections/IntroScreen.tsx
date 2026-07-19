'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Boot log lines that appear sequentially
const BOOT_LINES = [
  { text: 'BIOS_INIT............OK', color: 'text-slate-500' },
  { text: 'LOADING_KERNEL_MODULES...OK', color: 'text-slate-500' },
  { text: 'ESTABLISHING_SECURE_UPLINK', color: 'text-cyan-400' },
  { text: 'ACCESS_GRANTED', color: 'text-emerald-400' },
]

// Animated glitch characters for the logo scramble
const GLITCH_CHARS = '!<>-_\\/[]{}=+*^?#@$%&'

function useGlitchText(finalText: string, startDelay: number, duration: number) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    // On mobile/touch devices, skip the RAF loop to prevent stuttering
    if (typeof window !== 'undefined' && navigator.maxTouchPoints > 0) {
      const timeout = setTimeout(() => setDisplay(finalText), startDelay)
      return () => clearTimeout(timeout)
    }

    let frame = 0
    let rafId: number
    let lastTime = 0

    const startTimeout = setTimeout(() => {
      const totalFrames = Math.floor(duration / 30)

      const animate = (now: number) => {
        if (now - lastTime < 30) {
          rafId = requestAnimationFrame(animate)
          return
        }
        lastTime = now
        frame++

        const scrambled = finalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            const revealFrame = Math.floor((i / finalText.length) * totalFrames)
            if (frame >= revealFrame) return char
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join('')

        setDisplay(scrambled)

        if (frame < totalFrames) {
          rafId = requestAnimationFrame(animate)
        } else {
          setDisplay(finalText)
        }
      }

      rafId = requestAnimationFrame(animate)
    }, startDelay)

    return () => {
      clearTimeout(startTimeout)
      cancelAnimationFrame(rafId)
    }
  }, [finalText, startDelay, duration])

  return display
}

export default function IntroScreen() {
  const [showIntro, setShowIntro] = useState(false)
  const [progress, setProgress] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const titleLine1 = useGlitchText('NISARG', 200, 600)
  const titleLine2 = useGlitchText('VAGHELA', 500, 700)

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')
    if (hasSeenIntro) return

    setTimeout(() => setShowIntro(true), 0)
    sessionStorage.setItem('hasSeenIntro', 'true')
    
    // Check for mobile screen width to disable heavy scanline animation
    setTimeout(() => setIsMobile(window.innerWidth < 768), 0)

    // Stagger the boot log lines
    const lineTimers: NodeJS.Timeout[] = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), 400 + i * 320)
    )

    // Animate progress bar from 0 -> 100 over ~1.8s
    let prog = 0
    const progressInterval = setInterval(() => {
      prog += Math.random() * 8 + 3
      if (prog >= 100) {
        prog = 100
        clearInterval(progressInterval)
      }
      setProgress(Math.min(prog, 100))
    }, 60)

    // Trigger exit
    const exitTimer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => setShowIntro(false), 600)
    }, 3200)

    return () => {
      lineTimers.forEach(clearTimeout)
      clearInterval(progressInterval)
      clearTimeout(exitTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] bg-[#030303] flex flex-col items-center justify-center font-mono overflow-hidden"
        >
          {/*   Background grid   */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(var(--theme-neon-rgb), 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--theme-neon-rgb), 1) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/*   Radial ambient glow   */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon opacity-[0.04] blur-[120px] rounded-full" />
          </div>

          {/*   Top scanline sweep (Disabled on mobile for performance)  */}
          {!isMobile && (
            <motion.div
              initial={{ top: '-2px' }}
              animate={{ top: '102%' }}
              transition={{ duration: 1.6, ease: 'linear', delay: 0.1 }}
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 pointer-events-none z-10"
              style={{ position: 'absolute' }}
            />
          )}

          {/*   Corner brackets   */}
          {[
            'top-6 left-6 border-t-2 border-l-2',
            'top-6 right-6 border-t-2 border-r-2',
            'bottom-6 left-6 border-b-2 border-l-2',
            'bottom-6 right-6 border-b-2 border-r-2',
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              className={`absolute w-8 h-8 border-neon/60 ${cls}`}
            />
          ))}

          {/*   Main content   */}
          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-lg px-6">
            
            {/* Logo glitch title */}
            <div className="text-center select-none">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="text-[10px] text-neon/70 tracking-[0.4em] uppercase mb-3 flex items-center justify-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse" />
                SYSTEM_BOOT_v2.4.1
                <span className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse" />
              </motion.div>
              
              <h1 className="font-black uppercase leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500"
                style={{ fontSize: 'clamp(2.8rem, 10vw, 5rem)', textShadow: '0 0 40px rgba(var(--theme-neon-rgb), 0.2)' }}
              >
                <span className="block text-white drop-shadow-[0_0_12px_rgba(var(--theme-neon-rgb), 0.5)]">
                  {titleLine1 || '\u00A0'}
                </span>
                <span className="block text-neon drop-shadow-[0_0_18px_rgba(var(--theme-neon-rgb), 0.7)]">
                  {titleLine2 || '\u00A0'}
                </span>
              </h1>
            </div>

            {/* Progress bar */}
            <div className="w-full space-y-2">
              <div className="flex justify-between text-[10px] tracking-widest uppercase">
                <span className="text-slate-500">LOADING_PORTFOLIO</span>
                <span className="text-neon font-bold tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-[3px] bg-white/5 border border-neon/10 overflow-hidden relative">
                {/* Base fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-neon/60 to-neon"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
                {/* Bright tip glare */}
                <div
                  className="absolute top-0 h-full w-8 bg-white/40 blur-sm -translate-x-1/2"
                  style={{ left: `${progress}%`, display: progress > 2 ? 'block' : 'none' }}
                />
              </div>
            </div>

            {/* Boot log lines */}
            <div className="w-full space-y-1.5 min-h-[100px]">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`text-[11px] tracking-widest font-bold flex items-center gap-2 ${line.color}`}
                >
                  <span className="text-neon/40 shrink-0">&gt;</span>
                  {line.text}
                  {i === visibleLines - 1 && visibleLines < BOOT_LINES.length && (
                    <span className="animate-pulse ml-1">_</span>
                  )}
                  {i < visibleLines - 1 && (
                    <span className="ml-auto text-[9px] text-emerald-500/70 tracking-widest">[OK]</span>
                  )}
                </motion.div>
              ))}
            </div>

          </div>

          {/*   Bottom status bar   */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 border-t border-neon/10 bg-black/40 px-6 py-2 flex items-center justify-between text-[9px] text-slate-600 tracking-widest uppercase"
          >
            <span>NIT_SURAT // FULL_STACK_ENG</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              SECURE_CONN_ESTABLISHED
            </span>
          </motion.div>

          {/*   Exit scanline flash   */}
          {exiting && (
            <motion.div
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-neon/5 pointer-events-none z-20"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}