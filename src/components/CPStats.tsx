import { getCodeforcesStats } from '@/lib/codeforces';

export default async function CPStats({ handle }: { handle: string }) {
  const stats = await getCodeforcesStats(handle);

  const rating = stats?.rating ?? '---'
  const rank = stats?.rank ?? '---'
  const statusLabel = stats ? '[ CODEFORCES_API ]' : '[ CODEFORCES_API: OFFLINE ]'

  return (
    <div className="glass-panel p-6 glow-border-hover relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>
      
      <h3 className="text-xs font-mono text-gray-500 mb-4 tracking-wider">{statusLabel}</h3>
      
      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-bold tracking-tight text-white group-hover:glow-text transition-all">{rating}</span>
        <span className="text-cyan-500/50 font-mono text-sm mb-1">/rating</span>
      </div>
      
      <p className="text-sm font-mono text-gray-400">
         current_rank: <span className="text-cyan-400">{rank}</span>
      </p>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <a 
          href={`https://codeforces.com/profile/${handle}`} 
          target="_blank"
          className="text-xs font-mono text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          [ ACCESS_PROFILE ]
        </a>
      </div>
    </div>
  );
}