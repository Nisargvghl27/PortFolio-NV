'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Compare against env variable
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      // Set the security cookie
      document.cookie = `admin_auth=${password}; path=/; max-age=86400; SameSite=Strict`
      router.push('/admin')
    } else {
      alert('> ACCESS_DENIED: Invalid_Credentials')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#030303] font-mono">
      <form onSubmit={handleLogin} className="glass-panel p-8 w-full max-w-sm space-y-6 border border-white/10">
        <h1 className="text-xl text-cyan-400 text-center tracking-widest">[ SYSTEM_ACCESS ]</h1>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="> ENTER_ROOT_PASSWORD"
          className="w-full bg-black/50 border border-white/10 p-3 text-center text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-700"
        />
        <button type="submit" className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 py-3 hover:bg-cyan-500/20 transition-all">
          [ AUTHENTICATE ]
        </button>
      </form>
    </main>
  )
}