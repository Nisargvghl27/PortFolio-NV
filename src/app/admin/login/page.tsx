'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminLogin() {
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check against the environment variable
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      // 1. Set the cookie without restrictive SameSite attributes for local dev
      // Using path=/ ensures it is available across all /admin routes
      document.cookie = `admin_auth=${password}; path=/; max-age=86400`
      
      // 2. Force a hard navigation to the Admin Hub
      window.location.href = '/admin'
    } else {
      alert('> ACCESS_DENIED: Invalid_Credentials')
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#030303] font-mono">
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-neon/60 hover:text-neon font-mono text-xs uppercase tracking-widest transition-colors border border-neon/20 hover:border-neon/50 px-3 py-1.5 rounded-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      <form onSubmit={handleLogin} className="glass-panel p-8 w-full max-w-sm space-y-6 border border-white/10" suppressHydrationWarning>
        <h1 className="text-xl text-cyan-400 text-center tracking-widest">[ SYSTEM_ACCESS ]</h1>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="> ENTER_ROOT_PASSWORD"
          className="w-full bg-black/50 border border-white/10 p-3 text-center text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-700"
          suppressHydrationWarning
        />
        <button type="submit" className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 py-3 hover:bg-cyan-500/20 transition-all" suppressHydrationWarning>
          [ AUTHENTICATE ]
        </button>
      </form>
    </main>
  )
}