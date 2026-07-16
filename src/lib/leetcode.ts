export async function getLeetCodeStats(username: string) {
  try {
    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      console.warn(`LeetCode API returned status ${res.status} for username: ${username}`);
      return null;
    }
    const data = await res.json();
    return {
      solvedProblem: data.totalSolved,
      ranking: data.ranking
    };
  } catch (error) {
    console.error('Failed to fetch LeetCode stats', error);
    return null;
  }
}