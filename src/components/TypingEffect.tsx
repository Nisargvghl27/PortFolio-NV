'use client'

import { useState, useEffect } from 'react'

export default function TypingEffect({
  prefix = "nisarg@ai-core:~$",
  text = " ./initialize_portfolio.sh",
  speed = 50
}: {
  prefix?: string
  text?: string
  speed?: number
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
      }
    }, speed)

    return () => clearInterval(typingInterval)
  }, [text, speed])

  return (
    <p className="font-mono text-cyan-400 text-sm mb-4">
      <span className="text-gray-500">{prefix}</span>
      {displayedText}
      <span className={`ml-1 font-bold ${!isTyping ? 'animate-pulse text-cyan-400' : 'text-cyan-400'}`}>
        |
      </span>
    </p>
  )
}