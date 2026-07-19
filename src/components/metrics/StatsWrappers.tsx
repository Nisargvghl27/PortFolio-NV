import CPStats from './CPStats'
import LeetCodeStats from './LeetCodeStats'

interface CodeforcesStats {
  handle: string
  rating: number
  maxRating: number
  rank: string
  maxRank: string
}

interface LeetCodeData {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
}

async function fetchCodeforcesStats(handle: string): Promise<CodeforcesStats | null> {
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`,
      { next: { revalidate: 86400 } }
    )
    const data = await res.json()
    
    if (data.status === 'OK' && data.result?.length > 0) {
      const user = data.result[0]
      return {
        handle: user.handle,
        rating: user.rating || 0,
        maxRating: user.maxRating || 0,
        rank: user.rank || 'unranked',
        maxRank: user.maxRank || 'unranked',
      }
    }
  } catch (err) {
    console.error('Failed fetching Codeforces stats:', err)
  }
  return null
}

async function fetchLeetCodeStats(username: string): Promise<LeetCodeData | null> {
  try {
    const res = await fetch(
      `https://leetcode-api-faisalshohag.vercel.app/${username}`,
      { next: { revalidate: 86400 } }
    )
    const data = await res.json()
    if (data) {
      return {
        totalSolved: data.totalSolved || 0,
        easySolved: data.easySolved || 0,
        mediumSolved: data.mediumSolved || 0,
        hardSolved: data.hardSolved || 0,
        ranking: data.ranking || 0,
      }
    }
  } catch (err) {
    console.error('Failed fetching LeetCode stats:', err)
  }
  return null
}

export async function CPStatsWrapper({ handle }: { handle: string }) {
  const stats = await fetchCodeforcesStats(handle)
  return <CPStats stats={stats} />
}

export async function LeetCodeStatsWrapper({ username }: { username: string }) {
  const stats = await fetchLeetCodeStats(username)
  return <LeetCodeStats stats={stats} username={username} />
}
