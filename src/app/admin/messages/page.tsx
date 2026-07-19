import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import MessageListClient from '@/components/admin/MessageListClient'

// Ensures data is fresh on every load
export const dynamic = 'force-dynamic'

export default async function MessagesAdminPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="max-w-3xl mx-auto px-6 pt-12 pb-24 space-y-8 font-mono relative z-10">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold text-white">Admin // <span className="text-cyan-400">Messages</span></h1>
        <Link href="/admin" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">[ &lt;&lt; BACK_TO_HUB ]</Link>
      </div>

      <section>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          ./inbound_transmissions
        </h2>
        
        {/* Render the Client Component */}
        <MessageListClient initialMessages={messages} />
      </section>
    </main>
  )
}