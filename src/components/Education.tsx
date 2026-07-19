'use client'

import FadeIn from './FadeIn'

const educationData = [
  {
    id: 1,
    period: '2024 - PRESENT',
    title: 'B.Tech. in Artificial Intelligence',
    institution: 'Sardar Vallabhbhai National Institute of Technology, Surat',
    score: 'CGPA: 7.00 (Till 2nd Semester)'
  },
  {
    id: 2,
    period: '2024',
    title: 'XII (GSEB-HSC)',
    institution: 'Mahatma Gandhi Science School, Rajkot',
    score: 'Percentage: 86.00%'
  },
  {
    id: 3,
    period: '2022',
    title: 'X (GSEB-SSC)',
    institution: 'Mahatma Gandhi Education Campus, Rajkot',
    score: 'Percentage: 94.83%'
  }
]

export default function Education() {
  return (
    <div className="font-mono max-w-3xl">
      <div className="relative border-l border-neon/30 ml-3 pl-8 py-2 space-y-8">
        {educationData.map((item, index) => (
          <FadeIn key={item.id} delay={0.1 + index * 0.15} direction="right">
            <div className="relative group bg-[#0a0f12]/80 backdrop-blur-sm border border-neon/20 hover:border-neon/60 p-4 sm:p-6 rounded-md transition-all duration-300 shadow-[0_0_20px_rgba(var(--theme-neon-rgb), 0.02)] hover:shadow-[0_0_20px_rgba(var(--theme-neon-rgb), 0.1)]">
              
              {/* Glowing Timeline Dot */}
              <div className="absolute w-3 h-3 bg-neon rounded-full -left-[38.5px] top-6 shadow-[0_0_12px_#00f0ff] group-hover:scale-125 transition-transform duration-300 animate-timeline-ping">
              </div>
              
              {/* Corner accent details */}
              <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-neon/40 group-hover:border-neon transition-colors" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-neon/40 group-hover:border-neon transition-colors" />
              
              {/* Header metrics */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 select-none">
                <span className="text-[10px] font-bold text-neon tracking-widest uppercase bg-neon/10 px-3 py-1 border border-neon/30 rounded-sm">
                  {item.period}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 tracking-widest bg-emerald-400/10 px-3 py-1 border border-emerald-500/30 rounded-sm">
                  [ {item.score.toUpperCase()} ]
                </span>
              </div>
              
              {/* Title & Organization */}
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-neon transition-colors duration-300 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-slate-400 font-medium text-xs tracking-widest uppercase">
                &gt; {item.institution}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}