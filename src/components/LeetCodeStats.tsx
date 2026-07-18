// Pure display component — data is pre-fetched server-side in page.tsx

interface LeetCodeData {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
}

interface LeetCodeStatsProps {
  stats: LeetCodeData | null
  username: string
}

export default function LeetCodeStats({ stats, username }: LeetCodeStatsProps) {
  return (
    <div className="glass-panel relative overflow-hidden flex flex-col justify-between font-mono rounded-md min-h-[220px]">
      {/* Terminal Header Bar */}
      <div className="bg-black/50 border-b border-[#00f0ff]/20 px-4 py-2 flex items-center justify-between z-10">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-600" />
          <span className="w-2 h-2 rounded-full bg-slate-600" />
        </div>
        <div className="text-[10px] text-[#00f0ff]/70 font-bold tracking-widest uppercase flex items-center gap-2">
          LC_METRIC_CORE.sys
          <a
            href={`https://leetcode.com/u/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#00f0ff] hover:underline transition-colors normal-case tracking-normal"
          >
            @{username}
          </a>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-center relative z-10">
        {stats ? (
          <div className="grid grid-cols-5 gap-4 items-center">
            {/* Total Block */}
            <div className="col-span-2 border-r border-[#00f0ff]/20 pr-2">
              <span className="text-[9px] text-slate-500 block tracking-widest uppercase">&gt; TOTAL_SOLVED</span>
              <div className="text-3xl font-black text-white tracking-tighter mt-1 glow-text">
                {stats.totalSolved}
              </div>
              <span className="text-[8px] text-[#00f0ff]/60 block uppercase mt-1 tracking-widest font-bold">
                RANK: #{stats.ranking.toLocaleString()}
              </span>
            </div>

            {/* Split Arrays */}
            <div className="col-span-3 space-y-2.5 pl-2 text-[11px]">
              <div>
                <div className="flex justify-between text-emerald-400 font-bold uppercase text-[9px] mb-0.5 tracking-wider">
                  <span>EASY</span>
                  <span>{stats.easySolved}</span>
                </div>
                <div className="h-1 bg-black rounded-full border border-emerald-500/20 overflow-hidden">
                  <div className="h-full bg-emerald-400 shadow-[0_0_8px_#34d399]" style={{ width: `${Math.min((stats.easySolved / stats.totalSolved) * 100 || 0, 100)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-amber-400 font-bold uppercase text-[9px] mb-0.5 tracking-wider">
                  <span>MEDIUM</span>
                  <span>{stats.mediumSolved}</span>
                </div>
                <div className="h-1 bg-black rounded-full border border-amber-500/20 overflow-hidden">
                  <div className="h-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" style={{ width: `${Math.min((stats.mediumSolved / stats.totalSolved) * 100 || 0, 100)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-rose-500 font-bold uppercase text-[9px] mb-0.5 tracking-wider">
                  <span>HARD</span>
                  <span>{stats.hardSolved}</span>
                </div>
                <div className="h-1 bg-black rounded-full border border-rose-500/20 overflow-hidden">
                  <div className="h-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" style={{ width: `${Math.min((stats.hardSolved / stats.totalSolved) * 100 || 0, 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-red-400 tracking-widest uppercase">
            &gt; ERROR: MATRIX_RESOLVE_FAILED
          </div>
        )}
      </div>

      {/* Footer Meta Stream with Link */}
      <div className="bg-black/30 border-t border-[#00f0ff]/10 px-4 py-2 text-[8px] text-slate-500 uppercase tracking-widest flex items-center justify-between">
        <span>ALGO_COMPILED</span>
        <div className="flex items-center gap-3">
          <span className="text-[#00f0ff]/60 font-bold hidden sm:inline-block">[ INT_STABLE ]</span>
          <a
            href={`https://leetcode.com/u/${username}`}
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