import { getCodeforcesStats } from '@/lib/codeforces';

export default async function CPStats({ handle }: { handle: string }) {
  const stats = await getCodeforcesStats(handle);

  if (!stats) return null;

  return (
    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
      <h3 className="text-sm font-medium text-zinc-500 mb-4">Competitive Programming</h3>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold tracking-tight">{stats.rating || 'Unrated'}</span>
        <span className="text-zinc-500 mb-1">rating</span>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Rank: <span className="font-semibold">{stats.rank}</span>
      </p>
      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <a 
          href={`https://codeforces.com/profile/${handle}`} 
          target="_blank"
          className="text-sm text-blue-600 hover:underline"
        >
          View Profile →
        </a>
      </div>
    </div>
  );
}