import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export default async function GardenPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="max-w-3xl mx-auto px-6 space-y-12 overflow-hidden pb-24 pt-12">
      <FadeIn>
        <p className="font-mono text-cyan-400 text-sm mb-4">
          <span className="text-gray-500">nisarg@ai-core:~$</span> cd ./garden && ls -la
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 glow-text">
            Knowledge_Base.
          </span>
        </h1>
        <p className="text-sm font-mono text-gray-400 leading-relaxed">
           Indexed technical write-ups, algorithmic breakdowns, and architectural notes. 
          Data persists and evolves here over time.
        </p>
      </FadeIn>

      <div className="space-y-6 mt-12">
        {posts.length === 0 ? (
          <FadeIn delay={0.2}>
            <p className="text-gray-500 font-mono italic"> Directory empty. No logs found.</p>
          </FadeIn>
        ) : (
          posts.map((post, index) => (
            <FadeIn key={post.id} delay={0.2 + (index * 0.1)}>
              <Link href={`/garden/${post.slug}`} className="block group">
                <article className="glass-panel p-6 rounded-none relative overflow-hidden glow-border-hover">
                  {/* Left accent bar */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20 group-hover:bg-cyan-400 transition-colors"></div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                    <h2 className="text-xl font-bold text-gray-100 group-hover:text-cyan-400 transition-colors tracking-tight">
                      {post.title}
                    </h2>
                    <span className="text-xs text-cyan-500/50 font-mono whitespace-nowrap">
                      [{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(/ /g, '_').toUpperCase()}]
                    </span>
                  </div>
                  
                  {post.excerpt && (
                    <p className="text-sm text-gray-400 leading-relaxed font-light mt-3">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="mt-4 text-cyan-400 text-xs font-mono font-bold flex items-center gap-2 group-hover:glow-text transition-all">
                    [ READ_LOG ]
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