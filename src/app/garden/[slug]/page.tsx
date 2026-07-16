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
    <main className="max-w-3xl mx-auto px-6 py-20">
      <FadeIn>
        <Link href="/garden" className="text-sm text-blue-600 hover:underline mb-8 inline-block">
          ← Back to Garden
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{post.title}</h1>
          <div className="text-gray-500 text-sm flex items-center gap-2">
            <time>
              {new Date(post.createdAt).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </time>
            <span>•</span>
            <span>Nisarg Vaghela</span>
          </div>
        </header>

        {/* 
          Using whitespace-pre-wrap allows us to respect the line breaks you type into the database 
          without needing a complex Markdown parser just yet!
        */}
        <div className="prose prose-lg dark:prose-invert prose-blue max-w-none whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
          {post.content}
        </div>
      </FadeIn>
    </main>
  )
}