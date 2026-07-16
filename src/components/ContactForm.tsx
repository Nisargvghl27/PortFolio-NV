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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md" suppressHydrationWarning>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input name="name" type="text" required className="w-full border border-gray-300 p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input name="email" type="email" required className="w-full border border-gray-300 p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea name="message" rows={4} required className="w-full border border-gray-300 p-2 rounded"></textarea>
      </div>
      <button 
        type="submit" 
        disabled={status === 'sending'} 
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
      </button>
    </form>
  )
}