'use client'

import { addProject } from '@/app/actions/project'
import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    
    const formData = new FormData(event.currentTarget)
    try {
      await addProject(formData)
      setStatus('success')
      ;(event.target as HTMLFormElement).reset()
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 pt-12 pb-24 space-y-8 font-mono">
      <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
        <div>
          <p className="text-cyan-500 text-xs mb-1"> SUDO_MODE</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">System_Admin // <span className="text-cyan-400">Projects</span></h1>
        </div>
        <Link href="/" className="text-xs text-gray-500 hover:text-cyan-400 hover:glow-text transition-all">
          [ EXIT_TERMINAL ]
        </Link>
      </div>

      <section className="glass-panel p-8 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30"></div>
        
        <h2 className="text-lg font-bold mb-6 text-white"> Initialize_New_Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-cyan-500 mb-2"> string title;</label>
            <input name="title" type="text" required placeholder="e.g. Nova_Expense_Tracker" className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700" />
          </div>
          
          <div>
            <label className="block text-xs text-cyan-500 mb-2"> text description;</label>
            <textarea name="description" rows={4} required placeholder="Define system parameters..." className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700"></textarea>
          </div>
          
          <div>
            <label className="block text-xs text-cyan-500 mb-2"> array tech_stack;</label>
            <input name="techStack" type="text" placeholder="Flutter, Dart, Next.js, TypeScript" className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700" />
            <p className="text-xs text-gray-500 mt-2">// Separate dependencies with commas.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cyan-500 mb-2"> url github_repo;</label>
              <input name="githubLink" type="url" placeholder="https://github.com/..." className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700" />
            </div>
            <div>
              <label className="block text-xs text-cyan-500 mb-2"> url live_demo;</label>
              <input name="liveLink" type="url" placeholder="https://..." className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700" />
            </div>
          </div>
          
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={status === 'submitting'} 
              className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 px-4 py-3 hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50 font-bold"
            >
              {status === 'submitting' ? '[ COMPILING... ]' : '[ EXECUTE_DEPLOYMENT ]'}
            </button>
          </div>
          
          {status === 'success' && (
            <p className="text-sm text-cyan-400 font-bold text-center mt-2 glow-text">System deployed successfully.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-500 font-bold text-center mt-2"> ERR: Deployment failed.</p>
          )}
        </form>
      </section>
    </main>
  )
}