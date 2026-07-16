export async function getCodeforcesStats(handle: string) {
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    if (!res.ok) {
      console.warn(`Codeforces API returned status ${res.status} for handle: ${handle}`);
      return null;
    }
    const data = await res.json();
    
    if (data.status === 'OK') {
      return data.result[0];
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch Codeforces stats', error);
    return null;
  }
}