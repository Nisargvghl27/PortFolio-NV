import FadeIn from './FadeIn'

export default function Education() {
  return (
    <div className="space-y-8 font-mono">
      <div className="relative border-l border-cyan-500/30 ml-3 pl-8 py-2">
        {/* Glowing Timeline Dot */}
        <div className="absolute w-3 h-3 bg-cyan-400 -left-[6.5px] top-3 shadow-[0_0_10px_rgba(0,240,255,0.8)]"></div>
        
        <p className="text-xs font-bold text-cyan-500 mb-2 tracking-widest"> 2023_2027 (EXPECTED)</p>
        <h3 className="text-xl font-bold text-white mb-1">B.Tech in Artificial Intelligence</h3>
        <p className="text-gray-400 font-medium mb-4 text-sm">@ National_Institute_of_Technology_Surat</p>
        
        <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
          Focusing on core artificial intelligence, software engineering, and modern web architecture. 
          Active in competitive programming and algorithmic problem-solving.
        </p>
      </div>
    </div>
  )
}