import Link from 'next/link'
import { logout } from '@/app/actions/auth'
import { prisma } from '@/lib/prisma'

// Ensure we don't statically cache the unread count
export const dynamic = 'force-dynamic'

export default async function AdminHub() {
  // Fetch unread count for the notification badge
  const unreadCount = await prisma.message.count({
    where: { isRead: false }
  })

  return (
    <main className="max-w-5xl mx-auto px-6 pt-24 font-mono">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-12">
        <h1 className="text-3xl font-bold text-white tracking-tight">SYSTEM_CONTROL_PANEL</h1>
        
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xs text-gray-500 hover:text-cyan-400 transition-all">
            [ EXIT_TERMINAL ]
          </Link>
          
          <form action={logout}>
            <button 
              type="submit" 
              className="text-xs font-bold px-3 py-1.5 border transition-all text-red-400 border-red-500/30 hover:bg-red-500/10 cursor-pointer"
            >
              [ TERMINATE_SESSION ]
            </button>
          </form>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Manage Projects */}
        <Link href="/admin/projects" className="glass-panel p-6 hover:border-cyan-500 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>
          <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">./projects</h2>
          <p className="text-xs text-gray-500 leading-relaxed mt-4">Deploy new system architecture and portfolio showcases.</p>
        </Link>
        
        {/* Manage Credentials */}
        <Link href="/admin/certificates" className="glass-panel p-6 hover:border-cyan-500 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>
          <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">./credentials</h2>
          <p className="text-xs text-gray-500 leading-relaxed mt-4">Update achievements, awards, and certification registry.</p>
        </Link>

        {/* Manage Skills */}
        <Link href="/admin/skills" className="glass-panel p-6 hover:border-cyan-500 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>
          <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">./skills</h2>
          <p className="text-xs text-gray-500 leading-relaxed mt-4">Configure technical modules and proficiency levels.</p>
        </Link>

        {/* Manage Messages */}
        <Link href="/admin/messages" className="glass-panel p-6 hover:border-cyan-500 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>
          <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center justify-between">
            ./messages
            {unreadCount > 0 && (
              <span className="bg-cyan-500 text-black text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse shadow-[0_0_10px_#00f0ff]">
                {unreadCount}
              </span>
            )}
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed mt-4">View and respond to inbound secure transmissions.</p>
        </Link>

      </div>
    </main>
  )
}