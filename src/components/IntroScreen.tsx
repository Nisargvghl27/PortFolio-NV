'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroScreen() {
  const [showIntro, setShowIntro] = useState(false)
  const [visibleLines, setVisibleLines] = useState<number>(0)

  useEffect(() => {
    // Check if we've already shown the intro in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')
    
    if (!hasSeenIntro) {
      setShowIntro(true)
      sessionStorage.setItem('hasSeenIntro', 'true')
      
      // Sequence the boot text
      const timer1 = setTimeout(() => setVisibleLines(1), 300)
      const timer2 = setTimeout(() => setVisibleLines(2), 1100)
      const timer3 = setTimeout(() => setVisibleLines(3), 1800)
      
      // Trigger the fade out
      const hideTimer = setTimeout(() => {
        setShowIntro(false)
      }, 2500)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(hideTimer)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center font-mono"
        >
          {/* Subtle grid background to match the main site */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative z-10 w-full max-w-md px-6 flex flex-col gap-4 text-sm md:text-base text-gray-400 font-bold tracking-widest">
            {visibleLines >= 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                &gt; INITIALIZING_SYSTEM_MODULES<span className="animate-pulse">...</span>
              </motion.div>
            )}
            
            {visibleLines >= 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                &gt; LOADING_NEURAL_NETWORKS<span className="animate-pulse">...</span>
              </motion.div>
            )}
            
            {visibleLines >= 3 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-cyan-400 glow-text mt-4 text-lg"
              >
                &gt; ACCESS_GRANTED.
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}