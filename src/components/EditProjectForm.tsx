'use client'

import { updateProject } from '@/app/actions/project'
import type { Project } from '@prisma/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditProjectForm({ project }: { project: Project }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    const formData = new FormData(event.currentTarget)
    try {
      await updateProject(formData)
      setStatus('success')
      
      // Remove the '?edit=' from the URL to go back to the default Add state
      setTimeout(() => {
        router.push('/admin/projects')
      }, 1000)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
      {/* Hidden ID field required for the update action */}
      <input type="hidden" name="id" value={project.id} suppressHydrationWarning />
      
      <div>
        <label className="block text-xs text-yellow-500 mb-2"> string title;</label>
        <input name="title" type="text" defaultValue={project.title} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
      </div>
      <div>
        <label className="block text-xs text-yellow-500 mb-2"> text description;</label>
        <textarea name="description" rows={4} defaultValue={project.description} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500"></textarea>
      </div>
      <div>
        <label className="block text-xs text-yellow-500 mb-2"> array tech_stack;</label>
        <input name="techStack" type="text" defaultValue={project.techStack.join(', ')} suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-yellow-500 mb-2"> url github_repo;</label>
          <input name="githubLink" type="url" defaultValue={project.githubLink || ''} suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
        </div>
        <div>
          <label className="block text-xs text-yellow-500 mb-2"> url live_demo;</label>
          <input name="liveLink" type="url" defaultValue={project.liveLink || ''} suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-yellow-500 mb-2"> url image_url;</label>
        <input name="imageUrl" type="url" defaultValue={project.imageUrl || ''} suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
      </div>
      
      <div className="flex gap-4">
        <button type="button" onClick={() => router.push('/admin/projects')} suppressHydrationWarning className="flex-1 bg-white/5 text-gray-400 border border-white/10 py-3 hover:bg-white/10 font-bold transition-all">
          [ CANCEL ]
        </button>
        <button type="submit" disabled={status === 'submitting'} suppressHydrationWarning className="flex-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/50 py-3 hover:bg-yellow-500/20 font-bold transition-all">
          {status === 'submitting' ? '[ OVERWRITING... ]' : status === 'success' ? '[ UPDATE SUCCESSFUL ]' : '[ EXECUTE_UPDATE ]'}
        </button>
      </div>
    </form>
  )
}