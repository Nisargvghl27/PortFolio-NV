'use client'

import FadeIn from './FadeIn'

const leadershipData = [
  {
    id: 'gdg',
    role: 'Junior Developer',
    team: 'Technical Expertise',
    organization: 'Google Developer Group (GDG), NIT Surat',
    period: 'OCT 2025 – PRESENT'
  },
  {
    id: 'acm',
    role: 'Executive',
    team: 'Organizing Tech Events',
    organization: 'Association for Computing Machinery (ACM), NIT Surat',
    period: 'SEPT 2025 – PRESENT'
  },
  {
    id: 'cev',
    role: 'Executive',
    team: 'Organizing Tech Bootcamps',
    organization: 'Cutting Edge Visionaries (CEV), NIT Surat',
    period: 'AUG 2025 – PRESENT'
  }
]

export default function Leadership() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
      {leadershipData.map((item, index) => (
        <FadeIn key={item.id} delay={0.1 + index * 0.1} direction="up">
          <div className="relative group bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-cyan-500/30 p-6 h-full flex flex-col rounded-sm transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
            
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20 group-hover:border-cyan-400 transition-colors" />
            <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20 group-hover:border-cyan-400 transition-colors" />
            
            {/* Header Info */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 select-none">
              <span className="text-[9px] font-bold text-cyan-500 tracking-wider bg-cyan-500/5 px-2 py-0.5 border border-cyan-500/15 rounded-sm">
                {item.period}
              </span>
              <span className="text-[9px] font-bold text-green-400 tracking-wider bg-green-400/5 px-2 py-0.5 border border-green-500/15 rounded-sm uppercase">
                {item.role}
              </span>
            </div>

            {/* Title / Organization */}
            <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-cyan-400 transition-colors duration-300">
              {item.organization}
            </h3>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest">
              // Team: {item.team}
            </p>

          </div>
        </FadeIn>
      ))}
    </div>
  )
}
