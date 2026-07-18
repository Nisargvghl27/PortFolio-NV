'use client'

import { updateCertificate } from '@/app/actions/certificates'
import type { Certificate } from '@prisma/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditCertificateForm({ certificate }: { certificate: Certificate }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    
    const formData = new FormData(event.currentTarget)
    try {
      await updateCertificate(formData)
      setStatus('success')
      
      setTimeout(() => {
        router.push('/admin/certificates')
      }, 1000)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
      <input type="hidden" name="id" value={certificate.id} suppressHydrationWarning />
      
      <div>
        <label className="block text-xs text-yellow-500 mb-2"> string title;</label>
        <input name="title" type="text" defaultValue={certificate.title} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-yellow-500 mb-2"> string issuer;</label>
          <input name="issuer" type="text" defaultValue={certificate.issuer} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
        </div>
        <div>
          <label className="block text-xs text-yellow-500 mb-2"> string date;</label>
          <input name="date" type="text" defaultValue={certificate.date} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-yellow-500 mb-2"> url view_source_link;</label>
        <input name="url" type="url" defaultValue={certificate.url} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
      </div>
      <div>
        <label className="block text-xs text-yellow-500 mb-2"> text description;</label>
        <textarea name="desc" rows={4} defaultValue={certificate.desc} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500"></textarea>
      </div>
      <div>
        <label className="block text-xs text-yellow-500 mb-2"> int order; (Lower = First)</label>
        <input name="order" type="number" defaultValue={certificate.order} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-yellow-500" />
      </div>
      
      <div className="flex gap-4">
        <button type="button" onClick={() => router.push('/admin/certificates')} suppressHydrationWarning className="flex-1 bg-white/5 text-gray-400 border border-white/10 py-3 hover:bg-white/10 font-bold transition-all">
          [ CANCEL ]
        </button>
        <button type="submit" disabled={status === 'submitting'} suppressHydrationWarning className="flex-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/50 py-3 hover:bg-yellow-500/20 font-bold transition-all">
          {status === 'submitting' ? '[ OVERWRITING... ]' : status === 'success' ? '[ UPDATE SUCCESSFUL ]' : '[ EXECUTE_UPDATE ]'}
        </button>
      </div>
    </form>
  )
}