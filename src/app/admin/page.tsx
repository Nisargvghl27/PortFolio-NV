import Link from 'next/link'
import { logout } from '@/app/actions/auth'
import { prisma } from '@/lib/prisma'

// Ensure we don't statically cache the unread count
export const dynamic = 'force-dynamic'

export default async function AdminHub() {
  // Fetch all counts in parallel using Promise.all
  const [
    totalProjects,
    totalSkills,
    totalCertificates,
    totalMessages,
    unreadMessages,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.certificate.count(),
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
  ])

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
      
      {/* Dashboard Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
        <div className="glass-panel p-4 flex flex-col items-center justify-center text-center border border-neon/20">
          <span className="text-3xl font-black text-neon font-mono glow-text">{totalProjects}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">PROJECTS</span>
        </div>
        
        <div className="glass-panel p-4 flex flex-col items-center justify-center text-center border border-neon/20">
          <span className="text-3xl font-black text-neon font-mono glow-text">{totalSkills}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">SKILLS</span>
        </div>
        
        <div className="glass-panel p-4 flex flex-col items-center justify-center text-center border border-neon/20">
          <span className="text-3xl font-black text-neon font-mono glow-text">{totalCertificates}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">CERTIFICATES</span>
        </div>
        
        <div className="glass-panel p-4 flex flex-col items-center justify-center text-center border border-neon/20">
          <span className="text-3xl font-black text-neon font-mono glow-text">{totalMessages}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">MESSAGES</span>
        </div>
        
        <div className={`glass-panel p-4 flex flex-col items-center justify-center text-center border transition-colors ${
          unreadMessages > 0 
            ? 'border-amber-500/50 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
            : 'border-neon/20'
        }`}>
          <span className={`text-3xl font-black font-mono ${
            unreadMessages > 0 
              ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' 
              : 'text-neon glow-text'
          }`}>
            {unreadMessages}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">UNREAD</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
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
            {unreadMessages > 0 && (
              <span className="bg-amber-500 text-black text-[10px] px-2 py-0.5 rounded-sm font-bold shadow-[0_0_10px_#f59e0b]">
                {unreadMessages}
              </span>
            )}
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed mt-4">View and respond to inbound secure transmissions.</p>
        </Link>

        {/* Manage Site Config */}
        <Link href="/admin/site-config" className="glass-panel p-6 hover:border-cyan-500 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>
          <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">./site_config</h2>
          <p className="text-xs text-gray-500 leading-relaxed mt-4">Manage global variables, open-to-work status, and resume links.</p>
        </Link>

      </div>
    </main>
  )
}