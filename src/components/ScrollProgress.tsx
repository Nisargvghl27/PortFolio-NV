'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  
  // Spring animation for a smoother filling effect
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-400 z-[100] origin-left shadow-[0_0_10px_rgba(0,240,255,0.8)]"
      style={{ scaleX }}
    />
  )
}

export default function ScrollProgress() {
  const [isMobile, setIsMobile] = useState(true) // Start with true/safe default

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) return null

  return <ScrollProgressBar />
}