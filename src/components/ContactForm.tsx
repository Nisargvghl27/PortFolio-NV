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
    <form onSubmit={handleSubmit} className="space-y-5 max-md:space-y-4 max-w-md font-mono" suppressHydrationWarning>
      <div>
        <label className="block text-xs max-md:text-[10px] text-[#00f0ff] mb-2 max-md:mb-1.5 uppercase tracking-widest">&gt; input_name</label>
        <input 
          name="name" 
          type="text" 
          required 
          suppressHydrationWarning
          // Keeps exact original padding/size for desktop, shrinks only on mobile
          className="w-full bg-[#00f0ff]/5 border border-[#00f0ff]/30 p-3 max-md:p-2.5 max-md:text-sm text-white focus:outline-none focus:border-[#00f0ff] focus:bg-[#00f0ff]/10 transition-all shadow-[inset_0_0_10px_rgba(0,240,255,0.05)]" 
        />
      </div>
      
      <div>
        <label className="block text-xs max-md:text-[10px] text-[#00f0ff] mb-2 max-md:mb-1.5 uppercase tracking-widest">&gt; input_email</label>
        <input 
          name="email" 
          type="email" 
          required 
          suppressHydrationWarning
          className="w-full bg-[#00f0ff]/5 border border-[#00f0ff]/30 p-3 max-md:p-2.5 max-md:text-sm text-white focus:outline-none focus:border-[#00f0ff] focus:bg-[#00f0ff]/10 transition-all shadow-[inset_0_0_10px_rgba(0,240,255,0.05)]" 
        />
      </div>
      
      <div>
        <label className="block text-xs max-md:text-[10px] text-[#00f0ff] mb-2 max-md:mb-1.5 uppercase tracking-widest">&gt; input_message</label>
        <textarea 
          name="message" 
          rows={4} 
          required 
          suppressHydrationWarning
          className="w-full bg-[#00f0ff]/5 border border-[#00f0ff]/30 p-3 max-md:p-2.5 max-md:text-sm text-white focus:outline-none focus:border-[#00f0ff] focus:bg-[#00f0ff]/10 transition-all custom-scrollbar shadow-[inset_0_0_10px_rgba(0,240,255,0.05)]"
        ></textarea>
      </div>
      
      <div className="pt-2">
        <button 
          type="submit" 
          disabled={status === 'sending'} 
          suppressHydrationWarning
          // Original px-8 py-4 remains the default, mobile shrinks to max-md:px-4 max-md:py-3
          className="relative group w-full px-8 py-4 max-md:px-4 max-md:py-3 bg-transparent text-[#00f0ff] transition-all hover:bg-[#00f0ff]/10 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}
        >
          <div className="absolute inset-0 border border-[#00f0ff]/50 group-hover:border-[#00f0ff] transition-all" style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }} />
          
          {/* Leaves desktop text completely untouched, adds max-md:text-xs just for narrow screens */}
          <span className="relative z-10 font-bold tracking-widest max-md:text-xs">
            {status === 'sending' ? '[ TRANSMITTING... ]' : status === 'success' ? '[ TRANSMISSION_SUCCESS ]' : '[ EXECUTE_TRANSMISSION ]'}
          </span>
        </button>
      </div>
    </form>
  )
}