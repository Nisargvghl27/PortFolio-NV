'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFoundTerminal() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  // Handle the automatic redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      router.push('/')
      return
    }
    
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [countdown, router])

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 font-mono z-10 relative">
      
      {/* Flickering 404 Heading */}
      <motion.h1 
        animate={{ opacity: [1, 0.4, 1, 0.8, 1, 1, 0.2, 1, 1, 0.9, 1] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="text-7xl md:text-9xl font-black text-red-500 mb-8 tracking-tighter"
        style={{ textShadow: '0 0 30px rgba(239, 68, 68, 0.6)' }}
      >
        ERR_404
      </motion.h1>

      {/* Terminal Error Panel */}
      <div className="glass-panel p-6 md:p-8 mb-10 w-full max-w-2xl border-red-500/30 relative overflow-hidden group">
        {/* Warning Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-bl-full group-hover:bg-red-500/10 transition-colors"></div>
        
        <p className="text-gray-300 text-sm md:text-base mb-6 font-light leading-relaxed">
          <span className="text-cyan-400 font-bold">nisarg@ai-core:~$</span> locate page...
          <br className="md:hidden" />
          <span className="text-red-400 md:ml-2 font-bold block md:inline mt-2 md:mt-0">
            ERROR: NOT_FOUND
            <span className="animate-pulse text-red-400 ml-1">_</span>
          </span>
        </p>
        
        <div className="border-t border-red-500/20 pt-4 mt-4">
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            &gt; SYSTEM_REBOOT_INITIATED... <br className="md:hidden" />
            REDIRECTING_IN_ <span className="text-red-400 font-bold text-sm ml-1">{countdown}s</span>
          </p>
        </div>
      </div>

      {/* Manual Override Button */}
      <Link 
        href="/"
        className="bg-red-500/10 text-red-400 border border-red-500/50 px-8 py-4 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-all font-bold tracking-widest text-sm"
      >
        [ RETURN_TO_BASE ]
      </Link>

    </main>
  )
}