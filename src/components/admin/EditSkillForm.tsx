'use client'

import { updateSkill } from '@/app/actions/skills'
import type { Skill } from '@prisma/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditSkillForm({ skill }: { skill: Skill }) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitStatus('submitting')
    
    const formData = new FormData(event.currentTarget)
    try {
      await updateSkill(formData)
      setSubmitStatus('success')
      
      setTimeout(() => {
        router.push('/admin/skills')
      }, 1000)
    } catch (error) {
      console.error(error)
      setSubmitStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
      <input type="hidden" name="id" value={skill.id} suppressHydrationWarning />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-yellow-500 mb-2"> string name;</label>
          <input name="name" type="text" defaultValue={skill.name} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
        </div>
        <div>
          <label className="block text-xs text-yellow-500 mb-2"> select category;</label>
          <select name="category" defaultValue={skill.category} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500 appearance-none">
            <option value="Languages">Languages</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="CS_Core">CS_Core</option>
            <option value="Tools_&_DevOps">Tools_&_DevOps</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs text-yellow-500 mb-2"> string color; (Tailwind classes)</label>
        <input name="color" type="text" defaultValue={skill.color} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-yellow-500 mb-2"> string level;</label>
          <input name="level" type="text" defaultValue={skill.level} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
        </div>
        <div>
          <label className="block text-xs text-yellow-500 mb-2"> string latency;</label>
          <input name="latency" type="text" defaultValue={skill.latency} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
        </div>
        <div>
          <label className="block text-xs text-yellow-500 mb-2"> select status;</label>
          <select name="status" defaultValue={skill.status} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500 appearance-none">
            <option value="READY">READY</option>
            <option value="OPTIMIZED">OPTIMIZED</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs text-yellow-500 mb-2"> text desc;</label>
        <input name="desc" type="text" defaultValue={skill.desc} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
      </div>
      <div>
        <label className="block text-xs text-yellow-500 mb-2"> int order;</label>
        <input name="order" type="number" defaultValue={skill.order} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
      </div>
      
      <div className="flex gap-4">
        <button type="button" onClick={() => router.push('/admin/skills')} suppressHydrationWarning className="flex-1 bg-white/5 text-gray-400 border border-white/10 py-3 hover:bg-white/10 font-bold transition-all">
          [ CANCEL ]
        </button>
        <button type="submit" disabled={submitStatus === 'submitting'} suppressHydrationWarning className="flex-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/50 py-3 hover:bg-yellow-500/20 font-bold transition-all">
          {submitStatus === 'submitting' ? '[ OVERWRITING... ]' : submitStatus === 'success' ? '[ UPDATE SUCCESSFUL ]' : '[ EXECUTE_UPDATE ]'}
        </button>
      </div>
    </form>
  )
}