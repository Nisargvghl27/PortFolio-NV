'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
}

export default function FadeIn({ children, delay = 0, direction = 'up' }: FadeInProps) {
  const directionOffset = {
    up: { y: 16, x: 0 },
    down: { y: -16, x: 0 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
    scale: { x: 0, y: 0, scale: 0.96 }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionOffset[direction]
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: "0px" }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: [0.215, 0.610, 0.355, 1.000] // Custom tech easeOutCubic curve
      }}
    >
      {children}
    </motion.div>
  )
}