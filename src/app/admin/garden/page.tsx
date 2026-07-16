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
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24 font-mono">
      <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-12">
        <div>
          <p className="text-cyan-500 text-xs mb-1"> SUDO_MODE</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">System_Admin // <span className="text-cyan-400">Garden_Logs</span></h1>
        </div>
        <div className="flex gap-6 text-xs">
          <Link href="/admin" className="text-gray-500 hover:text-cyan-400 hover:glow-text transition-all">&lt;&lt; [ PROJECTS ]</Link>
          <Link href="/garden" target="_blank" className="text-gray-500 hover:text-cyan-400 hover:glow-text transition-all">[ VIEW_LIVE_GARDEN ] &gt;&gt;</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Create Post Form */}
        <section className="lg:col-span-7 glass-panel p-8 relative">
          <h2 className="text-lg font-bold mb-6 text-white"> Initialize_Log_Entry</h2>
          
          <form action={createPost} className="space-y-5">
            <div>
              <label className="block text-xs text-cyan-500 mb-2"> string title;</label>
              <input name="title" required type="text" className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700" placeholder="e.g. Protocol_Alpha" />
            </div>
            
            <div>
              <label className="block text-xs text-cyan-500 mb-2"> string slug_url;</label>
              <input name="slug" required type="text" className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700" placeholder="e.g. protocol-alpha" />
            </div>

            <div>
              <label className="block text-xs text-cyan-500 mb-2"> string excerpt_optional;</label>
              <input name="excerpt" type="text" className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700" placeholder="Brief summary of log..." />
            </div>

            <div>
              <label className="block text-xs text-cyan-500 mb-2"> text content_body;</label>
              <textarea name="content" required rows={12} className="w-full bg-black/50 border border-white/10 p-3 text-gray-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700 text-sm font-light leading-relaxed" placeholder="Write log data here..."></textarea>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input name="published" type="checkbox" id="published" className="w-4 h-4 accent-cyan-500 bg-black/50 border-white/10" />
              <label htmlFor="published" className="text-xs text-gray-300">Set boolean: is_published = true</label>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 px-4 py-3 hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all font-bold">
                [ WRITE_TO_DATABASE ]
              </button>
            </div>
          </form>
        </section>

        {/* Existing Posts List */}
        <section className="lg:col-span-5">
          <h2 className="text-lg font-bold mb-6 text-white"> Log_Registry</h2>
          
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-gray-500 italic text-sm"> Query returned 0 results.</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="glass-panel p-5 border-l-2 border-l-cyan-500/50 hover:border-l-cyan-400 transition-colors flex justify-between items-start group">
                  <div>
                    <h3 className="font-bold text-gray-200 group-hover:text-cyan-400 transition-colors">{post.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 mb-3">./{post.slug}</p>
                    
                    <span className={`inline-block text-[10px] px-2 py-1 uppercase tracking-widest ${post.published ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30'}`}>
                      {post.published ? 'LIVE' : 'DRAFT'}
                    </span>
                  </div>
                  
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className="text-red-500/70 hover:text-red-400 text-xs font-bold px-2 py-1 border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10 transition-all">
                      [ DEL ]
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