'use client'

import { useState, useEffect } from 'react'

export default function MobileOverlay() {
  const [isMobile, setIsMobile] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile || dismissed) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-6">
      <div className="glass-panel p-8 text-center border-neon/50 max-w-sm">
        <h2 className="text-neon font-bold text-xl mb-4 uppercase tracking-widest">[ SYSTEM_OPTIMIZATION ]</h2>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          For a superior terminal interface experience, please view this portfolio on a desktop device.
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="w-full bg-neon/10 border border-neon/50 text-neon py-3 hover:bg-neon/20 font-bold uppercase tracking-widest text-xs transition-all"
        >
          [ CONTINUE_ANYWAY ]
        </button>
      </div>
    </div>
  )
}