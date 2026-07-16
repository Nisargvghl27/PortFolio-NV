import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export default async function GardenPage() {
  // Fetch only published posts, ordered by newest first
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 space-y-12">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Digital Garden.</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          A collection of my thoughts, technical write-ups, and notes on software engineering and artificial intelligence. 
          Concepts grow and evolve here over time.
        </p>
      </FadeIn>

      <div className="space-y-8 mt-12">
        {posts.length === 0 ? (
          <FadeIn delay={0.2}>
            <p className="text-gray-500 italic">No notes planted yet. Check back soon!</p>
          </FadeIn>
        ) : (
          posts.map((post, index) => (
            <FadeIn key={post.id} delay={0.2 + (index * 0.1)}>
              <Link href={`/garden/${post.slug}`} className="block group">
                <article className="p-6 bg-white dark:bg-zinc-900/50 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold group-hover:text-blue-500 transition-colors">
                      {post.title}
                    </h2>
                    <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read note <span>→</span>
                  </div>
                </article>
              </Link>
            </FadeIn>
          ))
        )}
      </div>
    </main>
  )
}