'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'cyan' | 'violet'>('cyan')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme-preference') as 'cyan' | 'violet' | null
    
    if (savedTheme) {
      setTheme(savedTheme)
      document.body.setAttribute('data-theme', savedTheme)
    } else {
      document.body.setAttribute('data-theme', 'cyan')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'cyan' ? 'violet' : 'cyan'
    setTheme(newTheme)
    localStorage.setItem('theme-preference', newTheme)
    document.body.setAttribute('data-theme', newTheme)
  }

  // Prevent hydration mismatch by avoiding rendering until mounted
  if (!mounted) {
    return <div className="w-14 h-7" /> 
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-7 w-14 items-center rounded-full border border-neon/30 bg-[#0a0f12]/80 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-[#0a0f12] shadow-[inset_0_0_10px_var(--theme-neon-dim)]"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Background track elements for extra cyberpunk detail */}
      <span className="absolute left-2 text-[10px] font-mono font-bold opacity-50 text-neon pointer-events-none">C</span>
      <span className="absolute right-2 text-[10px] font-mono font-bold opacity-50 text-neon pointer-events-none">V</span>

      <span 
        className={`
          inline-block h-5 w-5 transform rounded-full bg-neon transition-transform duration-300 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)] shadow-[0_0_12px_var(--theme-neon-glow)]
          ${theme === 'violet' ? 'translate-x-8' : 'translate-x-1'}
        `}
      />
    </button>
  )
}