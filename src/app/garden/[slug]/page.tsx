import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug }
  })

  // If the URL doesn't match a post in the database, show a 404 page
  if (!post) {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-6 pb-24 pt-12">
      <FadeIn>
        <Link href="/garden" className="text-xs font-mono text-cyan-500 hover:text-cyan-400 hover:glow-text transition-all mb-8 inline-block">
          &lt;&lt; [ RETURN_TO_ROOT ]
        </Link>
        
        <header className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            {post.title}
          </h1>
          <div className="text-cyan-500/50 font-mono text-xs flex flex-wrap items-center gap-4">
            <span>AUTHOR: NISARG_VAGHELA</span>
            <span className="hidden md:inline">//</span>
            <time>
              TIMESTAMP: {new Date(post.createdAt).toLocaleDateString('en-US', { 
                month: '2-digit', 
                day: '2-digit', 
                year: 'numeric' 
              })}
            </time>
          </div>
        </header>

        {/* Main Content: We use whitespace-pre-wrap to respect line breaks.
          The text is slightly dimmed (gray-300) with a light weight to look like a premium terminal.
        */}
        <div className="prose prose-invert prose-cyan max-w-none whitespace-pre-wrap text-gray-300 font-light leading-relaxed prose-headings:font-bold prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:glow-text prose-strong:text-white">
          {post.content}
        </div>
      </FadeIn>
    </main>
  )
}