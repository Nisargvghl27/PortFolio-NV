'use client'

import { useState, useEffect } from 'react'

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 })
  const [isMounted, setIsMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Skip on touch/mobile devices — no mouse cursor exists
    if (navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none)').matches) {
      setIsTouch(true)
      return
    }

    setIsMounted(true)
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updatePosition)
    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  // Don't render on touch devices or before mount
  if (isTouch || !isMounted) return null

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 w-[200px] h-[200px] rounded-full blur-[40px] transition-opacity duration-300"
      style={{
        background: 'rgba(var(--theme-neon-rgb), 0.08)',
        transform: `translate(${position.x - 100}px, ${position.y - 100}px)`,
      }}
    />
  )
}