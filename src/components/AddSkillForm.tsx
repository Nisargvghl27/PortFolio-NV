'use client'

import { addSkill } from '@/app/actions/skills'
import { useState } from 'react'

export default function AddSkillForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitStatus('submitting')
    
    const formData = new FormData(event.currentTarget)
    try {
      await addSkill(formData)
      setSubmitStatus('success')
      ;(event.target as HTMLFormElement).reset()
      
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      console.error(error)
      setSubmitStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-cyan-500 mb-2"> string name;</label>
          <input name="name" type="text" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
        </div>
        <div>
          <label className="block text-xs text-cyan-500 mb-2"> select category;</label>
          <select name="category" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500 appearance-none">
            <option value="Languages">Languages</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="CS_Core">CS_Core</option>
            <option value="Tools_&_DevOps">Tools_&_DevOps</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> string color; (Tailwind classes)</label>
        <input name="color" type="text" placeholder="hover:text-[#...] hover:bg-[#...]/5" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-cyan-500 mb-2"> string level;</label>
          <input name="level" type="text" placeholder="e.g. 92%" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
        </div>
        <div>
          <label className="block text-xs text-cyan-500 mb-2"> string latency;</label>
          <input name="latency" type="text" placeholder="e.g. 8ms" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
        </div>
        <div>
          <label className="block text-xs text-cyan-500 mb-2"> select status;</label>
          <select name="status" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500 appearance-none">
            <option value="READY">READY</option>
            <option value="OPTIMIZED">OPTIMIZED</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> text desc;</label>
        <input name="desc" type="text" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
      </div>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> int order;</label>
        <input name="order" type="number" defaultValue="0" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
      </div>
      
      <button type="submit" disabled={submitStatus === 'submitting'} suppressHydrationWarning className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 py-3 hover:bg-cyan-500/20 font-bold transition-all">
        {submitStatus === 'submitting' ? '[ COMPILING... ]' : submitStatus === 'success' ? '[ UPLOAD SUCCESSFUL ]' : '[ EXECUTE_UPLOAD ]'}
      </button>
    </form>
  )
}