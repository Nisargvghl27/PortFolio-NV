'use client'

import { addProject } from '@/app/actions/project'
import { useState } from 'react'

export default function AddProjectForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    const formData = new FormData(event.currentTarget)
    try {
      await addProject(formData)
      setStatus('success')
      ;(event.target as HTMLFormElement).reset()
      
      // Reset the button text after 3 seconds
      setTimeout(() => setStatus('idle'), 3000)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> string title;</label>
        <input name="title" type="text" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
      </div>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> text description;</label>
        <textarea name="description" rows={4} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500"></textarea>
      </div>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> array tech_stack;</label>
        <input name="techStack" type="text" placeholder="Next.js, TypeScript, Tailwind" suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-cyan-500 mb-2"> url github_repo;</label>
          <input name="githubLink" type="url" placeholder="https://github.com/" suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
        </div>
        <div>
          <label className="block text-xs text-cyan-500 mb-2"> url live_demo;</label>
          <input name="liveLink" type="url" placeholder="https://" suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> url image_url;</label>
        <input name="imageUrl" type="url" placeholder="https://... (Optional)" suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
      </div>
      <button type="submit" disabled={status === 'submitting'} suppressHydrationWarning className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 py-3 hover:bg-cyan-500/20 font-bold transition-all">
        {status === 'submitting' ? '[ COMPILING... ]' : status === 'success' ? '[ DEPLOYMENT SUCCESSFUL ]' : '[ EXECUTE_DEPLOYMENT ]'}
      </button>
    </form>
  )
}