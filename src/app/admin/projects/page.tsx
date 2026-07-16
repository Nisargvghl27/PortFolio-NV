'use client'

import { addProject } from '@/app/actions/project'
import { useState } from 'react'
import Link from 'next/link'

export default function ProjectsAdminPage() {
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
        <h1 className="text-3xl font-bold text-white">Admin // <span className="text-cyan-400">Projects</span></h1>
        <Link href="/admin" className="text-xs text-gray-500 hover:text-cyan-400">[ &lt;&lt; BACK_TO_HUB ]</Link>
      </div>

      <section className="glass-panel p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-cyan-500 mb-2"> string title;</label>
            <input name="title" type="text" required className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs text-cyan-500 mb-2"> text description;</label>
            <textarea name="description" rows={4} required className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500"></textarea>
          </div>
          <div>
            <label className="block text-xs text-cyan-500 mb-2"> array tech_stack;</label>
            <input name="techStack" type="text" className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cyan-500 mb-2"> url github_repo;</label>
              <input name="githubLink" type="url" placeholder="https://github.com/" className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-xs text-cyan-500 mb-2"> url live_demo;</label>
              <input name="liveLink" type="url" placeholder="https://" className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-cyan-500 mb-2"> url image_url;</label>
            <input name="imageUrl" type="url" placeholder="https://... (Optional)" className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
          </div>
          <button type="submit" className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 py-3 hover:bg-cyan-500/20 font-bold">
            {status === 'submitting' ? '[ COMPILING... ]' : '[ EXECUTE_DEPLOYMENT ]'}
          </button>
        </form>
      </section>
    </main>
  )
}