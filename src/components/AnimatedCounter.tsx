'use client'

import { useEffect, useRef } from 'react'
import { useInView, animate } from 'framer-motion'

export default function AnimatedCounter({ 
  value 
}: { 
  value: number | string 
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (inView && ref.current) {
      // Try to parse the value as a number (stripping commas if any)
      const numValue = typeof value === 'string' ? parseInt(value.replace(/,/g, ''), 10) : value

      // If it's not a valid number (e.g., "UNRATED" or "N/A"), just display the string
      if (isNaN(numValue)) {
        ref.current.textContent = value.toString()
        return
      }

      // Animate from 0 to the target number
      const controls = animate(0, numValue, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(current) {
          if (ref.current) {
            // Use toLocaleString to add commas back for large numbers (e.g. 10,000)
            ref.current.textContent = Math.round(current).toLocaleString()
          }
        }
      })
      
      return () => controls.stop()
    }
  }, [inView, value])

  // Initial render state: 0 for numbers, or the original string for non-numbers
  const isNumber = typeof value === 'number' || !isNaN(Number(typeof value === 'string' ? value.replace(/,/g, '') : value))

  return <span ref={ref}>{isNumber ? "0" : value}</span>
}