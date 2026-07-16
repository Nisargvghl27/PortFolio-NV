'use client'

import { sendContactMessage } from '@/app/actions/contact'
import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    
    const formData = new FormData(event.currentTarget)
    try {
      await sendContactMessage(formData)
      setStatus('success')
      ;(event.target as HTMLFormElement).reset()
    } catch (error) {
      console.error(error)
      setStatus('idle')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md font-mono" suppressHydrationWarning>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> input_name</label>
        <input name="name" type="text" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
      </div>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> input_email</label>
        <input name="email" type="email" required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
      </div>
      <div>
        <label className="block text-xs text-cyan-500 mb-2"> input_message</label>
        <textarea name="message" rows={4} required suppressHydrationWarning className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"></textarea>
      </div>
      <button 
        type="submit" 
        disabled={status === 'sending'} 
        suppressHydrationWarning
        className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 px-4 py-3 hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50 mt-2"
      >
        {status === 'sending' ? '[ TRANSMITTING... ]' : status === 'success' ? '[ TRANSMISSION_SUCCESS ]' : '[ EXECUTE_TRANSMISSION ]'}
      </button>
    </form>
  )
}