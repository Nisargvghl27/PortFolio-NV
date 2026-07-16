import FadeIn from './FadeIn'

export default function Education() {
  return (
    <div className="space-y-8">
      <div className="relative border-l-2 border-gray-200 dark:border-zinc-800 ml-3 pl-8 py-2">
        {/* Timeline Dot */}
        <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-3 ring-4 ring-white dark:ring-zinc-950"></div>
        
        <p className="text-sm font-bold text-blue-600 mb-1">2023 — 2027 (Expected)</p>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">B.Tech in Artificial Intelligence</h3>
        <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">National Institute of Technology (NIT), Surat</p>
        <p className="text-sm text-gray-500 dark:text-zinc-500 leading-relaxed max-w-xl">
          Focusing on core artificial intelligence, software engineering, and modern web architecture. 
          Active in competitive programming and algorithmic problem-solving.
        </p>
      </div>
      
      {/* You can add a second item here later if you want (e.g., High School or a specific certification) */}
    </div>
  )
}