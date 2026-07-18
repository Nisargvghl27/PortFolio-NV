'use client'

import { addCertificate } from '@/app/actions/certificates'
import { useState } from 'react'

export default function AddCertificateForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    
    const formData = new FormData(event.currentTarget)
    try {
      await addCertificate(formData)
      setStatus('success')
      ;(event.target as HTMLFormElement).reset()
      
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-cyan-500 mb-2"> string issuer;</label>
          <input name="issuer" type="text" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
        </div>
        <div>
          <label className="block text-xs text-cyan-500 mb-2"> string date;</label>
          <input name="date" type="text" placeholder="e.g. MAY 2026" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> url view_source_link;</label>
        <input name="url" type="url" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
      </div>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> text description;</label>
        <textarea name="desc" rows={4} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500"></textarea>
      </div>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> int order; (Lower = First)</label>
        <input name="order" type="number" defaultValue="0" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" />
      </div>
      
      <button type="submit" disabled={status === 'submitting'} suppressHydrationWarning className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 py-3 hover:bg-cyan-500/20 font-bold transition-all">
        {status === 'submitting' ? '[ COMPILING... ]' : status === 'success' ? '[ UPLOAD SUCCESSFUL ]' : '[ EXECUTE_UPLOAD ]'}
      </button>
    </form>
  )
}