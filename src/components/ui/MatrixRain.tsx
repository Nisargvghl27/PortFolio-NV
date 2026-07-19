'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isActive, setIsActive] = useState(false)

  // Listen for the Shift + Ctrl + M combo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.ctrlKey && e.key.toLowerCase() === 'm') {
        e.preventDefault()
        if (!isActive) {
          setIsActive(true)
          // Auto-hide after 5 seconds
          setTimeout(() => {
            setIsActive(false)
          }, 5000)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isActive])

  // Canvas drawing logic
  useEffect(() => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas to full screen
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Mix of Katakana, Latin, and Numerals for that classic look
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン'
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)

    // Array for the drops, one per column
    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    let animationFrameId: number

    const draw = () => {
      // Translucent dark background to create the fade effect
      ctx.fillStyle = 'rgba(3, 3, 3, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Cyan text color
      ctx.fillStyle = '#00f0ff'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Reset drop to the top randomly to create variation
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        
        // Move drop down
        drops[i]++
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    // Handle window resize gracefully
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [isActive])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          <canvas 
            ref={canvasRef} 
            className="block w-full h-full"
          />
          {/* Subtle overlay text to let the user know they found the secret */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 font-mono text-xl font-bold bg-black/60 px-6 py-2 border border-cyan-500/30 backdrop-blur-sm glow-text">
            [ SYSTEM_OVERRIDE_ACTIVATED ]
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}