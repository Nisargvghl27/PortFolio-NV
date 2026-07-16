'use client'

import FadeIn from './FadeIn'

interface EducationItem {
  id: number
  period: string
  title: string
  institution: string
  score: string
  coursework?: string[]
}

const educationData: EducationItem[] = [
  {
    id: 1,
    period: '2024 - PRESENT',
    title: 'B.Tech. in Artificial Intelligence',
    institution: 'Sardar Vallabhbhai National Institute of Technology, Surat',
    score: 'CGPA: 7.00 (Current)',
    coursework: [
      'Data Structures',
      'Design & Analysis of Algorithms',
      'DBMS',
      'Computer Organization',
      'Discrete Mathematics',
      'Linear Algebra'
    ]
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
      <div className="relative border-l border-cyan-500/20 ml-3 pl-8 py-2 space-y-8">
        {educationData.map((item, index) => (
          <FadeIn key={item.id} delay={0.1 + index * 0.15} direction="right">
            <div className="relative group bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-cyan-500/30 p-5 rounded-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              
              {/* Glowing Timeline Dot */}
              <div className="absolute w-3 h-3 bg-cyan-400 -left-[38.5px] top-6 shadow-[0_0_10px_rgba(0,240,255,0.8)] group-hover:scale-125 transition-transform duration-300">
                <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
              </div>
              
              {/* Corner accent details */}
              <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20 group-hover:border-cyan-400 transition-colors" />
              <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20 group-hover:border-cyan-400 transition-colors" />

              {/* Header metrics */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 select-none">
                <span className="text-[10px] font-bold text-cyan-500 tracking-widest uppercase bg-cyan-500/5 px-2 py-0.5 border border-cyan-500/20 rounded-sm">
                  {item.period}
                </span>
                <span className="text-[10px] font-bold text-green-400 tracking-wider bg-green-400/5 px-2 py-0.5 border border-green-500/20 rounded-sm">
                  [ {item.score.toUpperCase()} ]
                </span>
              </div>

              {/* Title & Organization */}
              <h3 className="text-lg font-bold text-white mb-0.5 group-hover:text-cyan-400 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-400 font-medium text-xs tracking-wide">
                @ {item.institution}
              </p>

              {/* Coursework Details */}
              {item.coursework && (
                <div className="mt-4 pt-3 border-t border-white/5">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block mb-2">// RELEVANT_COURSEWORK</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.coursework.map((course) => (
                      <span key={course} className="text-[10px] bg-white/5 border border-white/10 text-cyan-300 px-2 py-0.5 rounded-sm font-semibold hover:border-cyan-500/30 transition-colors">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}