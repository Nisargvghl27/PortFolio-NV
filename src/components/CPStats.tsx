import { getCodeforcesStats } from '@/lib/codeforces';
import AnimatedCounter from './AnimatedCounter';

export default async function CPStats({ handle }: { handle: string }) {
  const stats = await getCodeforcesStats(handle);

  if (!stats) return null;

  return (
    <div className="glass-panel p-6 glow-border-hover relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>
      
      <h3 className="text-xs font-mono text-gray-500 mb-4 tracking-wider">[ CODEFORCES_API ]</h3>
      
      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-bold tracking-tight text-white group-hover:glow-text transition-all">
          <AnimatedCounter value={stats.rating || 'UNRATED'} />
        </span>
        <span className="text-cyan-500/50 font-mono text-sm mb-1">/rating</span>
      </div>
      
      <p className="text-sm font-mono text-gray-400">
         current_rank: <span className="text-cyan-400"><AnimatedCounter value={stats.rank || 'N/A'} /></span>
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