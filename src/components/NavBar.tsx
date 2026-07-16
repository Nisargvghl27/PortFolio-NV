'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NavBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Determine active state based on the current route
  const isWorkActive = pathname === '/'

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scrolling when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <nav className="fixed top-0 z-50 w-full glass-panel border-b-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="font-mono font-bold text-lg text-white"
          >
            nisarg<span className="text-cyan-400">_vaghela</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 text-sm font-mono text-gray-400">
            <Link 
              href="/" 
              className={`transition-all relative group py-1 ${isWorkActive ? 'text-cyan-400' : 'hover:text-cyan-400'}`}
            >
              ./work
              {isWorkActive && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
              )}
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors focus:outline-none"
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#030303]/95 backdrop-blur-xl border-l border-white/10 md:hidden flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button 
              className="absolute top-5 right-6 text-gray-400 hover:text-cyan-400 transition-colors focus:outline-none"
              onClick={() => setIsOpen(false)}
              aria-label="Close Navigation Menu"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Menu Links */}
            <div className="flex flex-col gap-12 text-3xl font-mono text-center">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className={`transition-all tracking-widest ${isWorkActive ? 'text-cyan-400 glow-text' : 'text-gray-400 hover:text-cyan-400'}`}
              >
                ./work
              </Link>
            </div>
            
            {/* Terminal decorative footer on mobile menu */}
            <div className="absolute bottom-10 text-xs text-gray-600 font-mono">
              [ TERMINAL_AWAITING_INPUT ]
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}