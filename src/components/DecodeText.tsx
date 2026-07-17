'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピ'

export default function DecodeText({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '))
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return

    let iteration = 0
    let interval: NodeJS.Timeout

    const startDecoding = () => {
      interval = setInterval(() => {
        setDisplayText((prev) => 
          prev.split('').map((char, index) => {
            if (index < iteration) return text[index]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )

        if (iteration >= text.length) clearInterval(interval)
        iteration += 1 / 3 // Controls decoding speed
      }, 30)
    }

    const timeout = setTimeout(startDecoding, delay * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [text, inView, delay])

  return (
    <motion.span ref={ref} className={className}>
      {displayText}
    </motion.span>
  )
}