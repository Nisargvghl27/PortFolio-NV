import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { updateSiteConfig } from '@/app/actions/site-config'

export const dynamic = 'force-dynamic'

export default async function SiteConfigAdminPage() {
  let config = await prisma.siteConfig.findUnique({
    where: { id: 'singleton' }
  })

  if (!config) {
    config = { id: 'singleton', openToWork: true, openToWorkMsg: 'AVAILABLE_FOR_INTERNSHIP', resumeUrl: '', visitorCount: 0 }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 pt-12 pb-24 space-y-12 font-mono relative z-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold text-white">Admin // <span className="text-cyan-400">Site_Config</span></h1>
        <Link href="/admin" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">[ &lt;&lt; BACK_TO_HUB ]</Link>
      </div>

      <section className="glass-panel p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full pointer-events-none"></div>
        <h2 className="text-xl font-bold text-white mb-6">./global_parameters</h2>
        
        <form action={updateSiteConfig} className="space-y-6">
          <div className="flex items-center gap-4 bg-black/50 p-4 border border-white/10">
            <input 
              type="checkbox" 
              name="openToWork" 
              id="openToWork"
              defaultChecked={config.openToWork}
              className="w-5 h-5 accent-cyan-500"
            />
            <label htmlFor="openToWork" className="text-sm font-bold text-cyan-400 uppercase tracking-widest cursor-pointer">
              Toggle [ OPEN_TO_WORK ] Status
            </label>
          </div>

          <div>
            <label className="block text-xs text-cyan-500 mb-2 uppercase tracking-widest">Status Message;</label>
            <input 
              name="openToWorkMsg" 
              type="text" 
              defaultValue={config.openToWorkMsg} 
              placeholder="e.g. AVAILABLE_FOR_INTERNSHIP"
              className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" 
            />
          </div>

          <div>
            <label className="block text-xs text-cyan-500 mb-2 uppercase tracking-widest">Resume URL (Drive/PDF link);</label>
            <input 
              name="resumeUrl" 
              type="url" 
              defaultValue={config.resumeUrl} 
              placeholder="https://..."
              className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500" 
            />
          </div>

          <button type="submit" className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 py-3 hover:bg-cyan-500/20 font-bold transition-all uppercase tracking-widest">
            [ SAVE_CONFIGURATION ]
          </button>
        </form>
      </section>
    </main>
  )
}