// Pure display component — data is pre-fetched server-side in page.tsx

interface CodeforcesStats {
  handle: string
  rating: number
  maxRating: number
  rank: string
  maxRank: string
}

interface CPStatsProps {
  stats: CodeforcesStats | null
}

export default function CPStats({ stats }: CPStatsProps) {
  return (
    <div className="glass-panel relative overflow-hidden flex flex-col justify-between font-mono rounded-md min-h-[220px]">
      {/* Terminal Header Bar */}
      <div className="bg-black/50 border-b border-neon/20 px-4 py-2 flex items-center justify-between z-10">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        <div className="text-[10px] text-neon/70 font-bold tracking-widest uppercase">
          CF_STREAM_CONNECTION.exe
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-center relative z-10">
        {stats ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neon/10 pb-2">
              <div>
                <span className="text-[9px] text-slate-500 block tracking-widest uppercase">&gt; CF_HANDLE</span>
                <a
                  href={`https://codeforces.com/profile/${stats.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm font-bold tracking-wide hover:text-neon hover:underline transition-colors cursor-pointer"
                >
                  {stats.handle}
                </a>
              </div>
              <span className="text-[9px] text-emerald-400 border border-emerald-500/30 bg-emerald-500/5 px-2 py-0.5 uppercase tracking-widest">
                UPLINK_OK
              </span>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] text-slate-500 block tracking-widest uppercase">&gt; CURR_RATING</span>
                <div className="text-2xl font-black text-neon tracking-tight glow-text mt-0.5">
                  {stats.rating}
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">{stats.rank}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block tracking-widest uppercase">&gt; MAX_PEAK</span>
                <div className="text-2xl font-black text-slate-300 tracking-tight mt-0.5">
                  {stats.maxRating}
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{stats.maxRank}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-red-400 tracking-widest uppercase">
            &gt; ERROR: TELEMETRY_OFFLINE
          </div>
        )}
      </div>

      {/* Footer Meta Stream with Link */}
      <div className="bg-black/30 border-t border-neon/10 px-4 py-2 text-[8px] text-slate-500 uppercase tracking-widest flex items-center justify-between">
        <span>PROT: HTTP_CF_API</span>
        <div className="flex items-center gap-3">
          <span className="text-neon/60 font-bold hidden sm:inline-block">[ FREQ: 1hr Cache ]</span>
          {stats && (
            <a
              href={`https://codeforces.com/profile/${stats.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon hover:text-white hover:bg-neon/20 px-2 py-1 border border-transparent hover:border-neon/50 transition-all cursor-pointer"
            >
              [ VISIT_PROFILE ]
            </a>
          )}
        </div>
      </div>
    </div>
  )
}