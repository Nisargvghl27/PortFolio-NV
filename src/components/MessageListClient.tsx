'use client'

import { useState } from 'react'
import type { Message } from '@prisma/client'
import { toggleMessageRead, deleteMessage, replyToMessage } from '@/app/actions/messages'

export default function MessageListClient({ initialMessages }: { initialMessages: Message[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [replyBody, setReplyBody] = useState('')
  const [replyStatus, setReplyStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleToggleRead = async (id: string, isRead: boolean) => {
    await toggleMessageRead(id, isRead)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('> WARNING: Are you sure you want to delete this transmission?')) {
      await deleteMessage(id)
    }
  }

  const handleReplySubmit = async (e: React.FormEvent, id: string, email: string) => {
    e.preventDefault()
    setReplyStatus('sending')
    try {
      await replyToMessage(id, email, replyBody)
      setReplyStatus('success')
      setTimeout(() => {
        setReplyStatus('idle')
        setExpandedId(null)
        setReplyBody('')
      }, 2000)
    } catch (error) {
      console.error(error)
      setReplyStatus('error')
    }
  }

  if (initialMessages.length === 0) {
    return (
      <div className="glass-panel p-8 text-center text-slate-500 italic uppercase tracking-widest">
        [ NO_INBOUND_TRANSMISSIONS_FOUND ]
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {initialMessages.map((msg) => (
        <div 
          key={msg.id} 
          className={`glass-panel overflow-hidden transition-all duration-300 ${!msg.isRead ? 'border-l-4 border-l-cyan-400' : 'border-l-4 border-l-transparent'}`}
        >
          {/* Header Row */}
          <div 
            className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors ${!msg.isRead ? 'bg-cyan-500/5' : ''}`}
            onClick={() => {
              setExpandedId(expandedId === msg.id ? null : msg.id)
              if (!msg.isRead && expandedId !== msg.id) {
                handleToggleRead(msg.id, msg.isRead) // Auto-read when opened
              }
            }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className={`font-bold truncate ${!msg.isRead ? 'text-cyan-400' : 'text-slate-300'}`}>
                  {msg.name}
                </span>
                {msg.isReplied && (
                  <span className="text-[9px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
                    Replied
                  </span>
                )}
                {!msg.isRead && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                )}
              </div>
              <div className="text-xs text-slate-500 truncate">
                <span className="text-cyan-500/50 mr-2">{msg.email}</span>
                {msg.message.substring(0, 60)}...
              </div>
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center justify-between sm:justify-end gap-4 shrink-0">
              {new Date(msg.createdAt).toLocaleString()}
              <span className="text-cyan-500">
                {expandedId === msg.id ? '[-]' : '[+]'}
              </span>
            </div>
          </div>

          {/* Expanded Content */}
          {expandedId === msg.id && (
            <div className="p-5 border-t border-white/10 bg-black/40">
              <div className="mb-6">
                <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase mb-2 block">&gt; DECRYPTED_PAYLOAD</span>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap bg-[#050505]/80 p-4 border border-[#00f0ff]/20 rounded-sm custom-scrollbar">
                  {msg.message}
                </p>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  onClick={() => handleToggleRead(msg.id, msg.isRead)}
                  className="text-[10px] font-bold text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1.5 transition-all uppercase tracking-widest"
                >
                  {msg.isRead ? '[ MARK_UNREAD ]' : '[ MARK_READ ]'}
                </button>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-[10px] font-bold text-red-400 hover:text-white border border-red-500/30 hover:border-red-500 px-3 py-1.5 hover:bg-red-500/10 transition-all uppercase tracking-widest"
                >
                  [ DELETE_TRANSMISSION ]
                </button>
              </div>

              {/* Inline Reply Form */}
              <div className="border-t border-cyan-500/20 pt-5">
                <span className="text-[9px] text-cyan-500 font-bold tracking-widest uppercase mb-3 block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                  INITIATE_REPLY_SEQUENCE
                </span>
                <form onSubmit={(e) => handleReplySubmit(e, msg.id, msg.email)} className="space-y-3">
                  <textarea
                    rows={4}
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    placeholder="> TYPE_RESPONSE_HERE..."
                    required
                    className="w-full bg-[#00f0ff]/5 border border-[#00f0ff]/30 p-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] focus:bg-[#00f0ff]/10 transition-colors custom-scrollbar"
                  />
                  <button 
                    type="submit" 
                    disabled={replyStatus === 'sending'}
                    className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 px-6 py-2 hover:bg-cyan-500/20 text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50"
                  >
                    {replyStatus === 'sending' ? '[ TRANSMITTING... ]' : replyStatus === 'success' ? '[ REPLY_SENT ]' : '[ DISPATCH_REPLY ]'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}