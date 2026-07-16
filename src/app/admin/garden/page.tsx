import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'

export default async function GardenAdminPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Server Action to Create a Post
  async function createPost(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const published = formData.get('published') === 'on'

    await prisma.post.create({
      data: { title, slug, excerpt, content, published }
    })
    
    // Tell Next.js to refresh the pages so the new post shows up instantly
    revalidatePath('/admin/garden')
    revalidatePath('/garden')
  }

  // Server Action to Delete a Post
  async function deletePost(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    await prisma.post.delete({ where: { id } })
    
    revalidatePath('/admin/garden')
    revalidatePath('/garden')
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Garden Admin</h1>
        <div className="flex gap-4">
          <Link href="/admin" className="text-blue-600 hover:underline">← Back to Projects Admin</Link>
          <Link href="/garden" target="_blank" className="text-gray-500 hover:underline">View Live Garden ↗</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Create Post Form */}
        <section className="bg-white dark:bg-zinc-900/50 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-6">Write a new note</h2>
          <form action={createPost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input name="title" required type="text" className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-3" placeholder="e.g. How I Built Nova" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Slug (URL)</label>
              <input name="slug" required type="text" className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-3" placeholder="e.g. how-i-built-nova" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Excerpt (Optional)</label>
              <input name="excerpt" type="text" className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-3" placeholder="A brief summary..." />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea name="content" required rows={8} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-3 font-mono text-sm" placeholder="Write your post here..."></textarea>
            </div>

            <div className="flex items-center gap-2">
              <input name="published" type="checkbox" id="published" className="w-4 h-4" />
              <label htmlFor="published" className="text-sm font-medium">Publish immediately</label>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Save Post
            </button>
          </form>
        </section>

        {/* Existing Posts List */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Manage Notes</h2>
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-gray-500">No posts created yet.</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white dark:bg-zinc-900/50 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-sm text-gray-500">/{post.slug}</p>
                    <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${post.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className="text-red-500 hover:text-red-700 text-sm font-semibold px-3 py-1 bg-red-50 dark:bg-red-500/10 rounded-md transition-colors">
                      Delete
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  )
}