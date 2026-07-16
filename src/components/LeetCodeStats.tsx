import { getLeetCodeStats } from '@/lib/leetcode';

export default async function LeetCodeStats({ username }: { username: string }) {
  const stats = await getLeetCodeStats(username);

  const solved = stats?.solvedProblem ?? '---'
  const ranking = stats?.ranking ?? '---'
  const statusLabel = stats ? '[ LEETCODE_API ]' : '[ LEETCODE_API: OFFLINE ]'

  return (
    <div className="glass-panel p-6 glow-border-hover relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>
      
      <h3 className="text-xs font-mono text-gray-500 mb-4 tracking-wider">{statusLabel}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-4xl font-bold text-white group-hover:glow-text transition-all">{solved}</p>
          <p className="text-xs font-mono text-cyan-500/50 mt-1">/solved</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-white group-hover:glow-text transition-all">
            {typeof ranking === 'number' ? ranking.toLocaleString() : ranking}
          </p>
          <p className="text-xs font-mono text-cyan-500/50 mt-1">/global_rank</p>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <a 
          href={`https://leetcode.com/u/${username}/`} 
          target="_blank"
          className="text-xs font-mono text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          [ ACCESS_PROFILE ]
        </a>
      </div>
    </div>
  );
}