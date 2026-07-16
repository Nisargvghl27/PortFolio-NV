'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: Direction
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up'
}: FadeInProps) {
  // Determine the starting animation state based on the selected direction
  const getInitialState = (dir: Direction) => {
    switch (dir) {
      case 'up': return { opacity: 0, y: 40 }
      case 'down': return { opacity: 0, y: -40 }
      case 'left': return { opacity: 0, x: -40 }
      case 'right': return { opacity: 0, x: 40 }
      case 'scale': return { opacity: 0, scale: 0.9 }
      default: return { opacity: 0, y: 40 }
    }
  }

  return (
    <motion.div
      initial={getInitialState(direction)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }} // Triggers slightly before coming into view
      transition={{ 
        duration: 0.7, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // Custom cubic-bezier for a snappy yet smooth finish
      }}
    >
      {children}
    </motion.div>
  )
}