import { getLeetCodeStats } from '@/lib/leetcode';

export default async function LeetCodeStats({ username }: { username: string }) {
  const stats = await getLeetCodeStats(username);

  if (!stats) return null;

  return (
    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
      <h3 className="text-sm font-medium text-zinc-500 mb-4">LeetCode</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-2xl font-bold">{stats.solvedProblem}</p>
          <p className="text-xs text-zinc-500">Problems Solved</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.ranking}</p>
          <p className="text-xs text-zinc-500">Global Rank</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <a 
          href={`https://leetcode.com/u/${username}/`} 
          target="_blank"
          className="text-sm text-yellow-600 hover:underline"
        >
          View Profile →
        </a>
      </div>
    </div>
  );
}