'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none)').matches) {
      setTimeout(() => setIsTouch(true), 0)
      return
    }
    setTimeout(() => setIsMounted(true), 0)

    // Hide the default Windows/Mac arrow cursor completely
    const style = document.createElement('style')
    style.id = 'hide-default-cursor'
    style.innerHTML = `* { cursor: none !important; }`
    document.head.appendChild(style)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, input, select, textarea, [role="button"]')
      setIsHovering(!!isClickable)
    }
    
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      
      // Cleanup style when component unmounts
      const injectedStyle = document.getElementById('hide-default-cursor')
      if (injectedStyle) injectedStyle.remove()
    }
  }, [])

  if (isTouch || !isMounted) return null

  return (
    <>
      {/* Background Ambient Glow (Glass Effect) REMOVED */}

      {/* Crosshair Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] w-10 h-10 border border-neon/50 rounded-full -ml-5 -mt-5 mix-blend-difference flex items-center justify-center"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          rotate: isClicking ? 90 : isHovering ? 45 : 0,
          backgroundColor: isHovering ? 'rgba(var(--theme-neon-rgb), 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Crosshair Ticks */}
        <div className="absolute top-0 w-0.5 h-1.5 bg-neon" />
        <div className="absolute bottom-0 w-0.5 h-1.5 bg-neon" />
        <div className="absolute left-0 w-1.5 h-0.5 bg-neon" />
        <div className="absolute right-0 w-1.5 h-0.5 bg-neon" />
      </motion.div>

      {/* Center Solid Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] w-1.5 h-1.5 bg-neon rounded-full -ml-[3px] -mt-[3px] shadow-[0_0_8px_rgba(var(--theme-neon-rgb),1)] mix-blend-difference"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isClicking ? 0.5 : isHovering ? 0 : 1
        }}
        transition={{ type: 'tween', duration: 0 }}
      />
    </>
  )
}