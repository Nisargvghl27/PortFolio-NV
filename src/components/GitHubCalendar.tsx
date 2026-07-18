'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Dynamically import the calendar module and strictly disable SSR
const ReactGitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[150px] w-full border border-[#00f0ff]/10 bg-black/20 rounded-sm">
        <span className="text-xs text-[#00f0ff]/60 animate-pulse tracking-widest uppercase font-bold">
          &gt; AWAITING_COMMIT_TELEMETRY...
        </span>
      </div>
    ),
  }
)

export default function GitHubCalendar() {
  const username = "nisargvghl27"

  return (
    <div className="glass-panel relative overflow-hidden font-mono rounded-md w-full flex flex-col">
      {/* Structural Crosshairs Accents */}
      <span className="absolute top-2 left-2 text-[#00f0ff]/30 text-xs pointer-events-none select-none z-10">+</span>
      <span className="absolute bottom-2 right-2 text-[#00f0ff]/30 text-xs pointer-events-none select-none z-10">+</span>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col space-y-4 z-10">
        <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-3">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              &gt; Repo_Commit_Telemetry
              <a 
                href={`https://github.com/${username}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00f0ff]/70 hover:text-[#00f0ff] hover:underline transition-colors normal-case tracking-normal"
              >
                @{username}
              </a>
            </h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">
              Secure stream mapping core contributions across remote distributions.
            </p>
          </div>
          <span className="text-[9px] text-[#00f0ff] font-bold tracking-widest border border-[#00f0ff]/30 bg-[#00f0ff]/5 px-2 py-0.5 hidden sm:inline-block">
            LIVE_ROUTING
          </span>
        </div>

        {/* Calendar Wrapper rendering modern architecture themes with Scan Reveal Animation */}
        <motion.div 
          initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full overflow-x-auto custom-scrollbar pt-2 flex justify-center bg-black/30 p-4 border border-[#00f0ff]/10 rounded-sm"
        >
          <ReactGitHubCalendar 
            username={username}
            blockSize={11}
            blockMargin={4}
            fontSize={11}
            theme={{
              light: ['#0a0f12', '#00f0ff33', '#00f0ff66', '#00f0ffaa', '#00f0ff'],
              dark: ['#0a0f12', '#00f0ff22', '#00f0ff55', '#00f0ff99', '#00f0ff']
            }}
          />
        </motion.div>
      </div>

      {/* Footer Meta Stream with Link */}
      <div className="bg-black/30 border-t border-[#00f0ff]/10 px-4 py-2 text-[8px] text-slate-500 uppercase tracking-widest flex items-center justify-between z-10">
        <span>SRC: GITHUB_GRAPH_API</span>
        <div className="flex items-center gap-3">
          <span className="text-[#00f0ff]/60 font-bold hidden sm:inline-block">[ SYNCED ]</span>
          <a 
            href={`https://github.com/${username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#00f0ff] hover:text-white hover:bg-[#00f0ff]/20 px-2 py-1 border border-transparent hover:border-[#00f0ff]/50 transition-all cursor-pointer"
          >
            [ VISIT_PROFILE ]
          </a>
        </div>
      </div>
    </div>
  )
}