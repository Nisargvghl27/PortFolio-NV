import Link from 'next/link'
import { logout } from '@/app/actions/auth'

export default function AdminHub() {
  return (
    <main className="max-w-2xl mx-auto px-6 pt-24 font-mono">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/projects" className="glass-panel p-8 hover:border-cyan-500 transition-all group relative overflow-hidden">
          {/* Subtle top-right accent */}
          <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>
          
          <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">./manage_projects</h2>
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">Deploy new system architecture and update portfolio showcases.</p>
        </Link>
        
        <Link href="/admin/garden" className="glass-panel p-8 hover:border-cyan-500 transition-all group relative overflow-hidden">
          {/* Subtle top-right accent */}
          <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>

          <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">./manage_garden</h2>
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">Update knowledge base, write technical logs, and share learnings.</p>
        </Link>
      </div>
    </main>
  )
}