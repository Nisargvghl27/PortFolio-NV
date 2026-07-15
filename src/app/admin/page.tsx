'use client'

import { addProject } from '@/app/actions/project'
import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    const formData = new FormData(event.currentTarget)
    try {
      await addProject(formData)
      setStatus('success')
      ;(event.target as HTMLFormElement).reset()
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Site
        </Link>
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border">
        <h2 className="text-xl font-semibold mb-4">Add a New Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project Title</label>
            <input name="title" type="text" required placeholder="e.g., Nova Expense Tracker" className="w-full border p-2 rounded bg-white dark:bg-black text-black dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" rows={4} required placeholder="What does this project do?" className="w-full border p-2 rounded bg-white dark:bg-black text-black dark:text-white"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
            <input name="techStack" type="text" placeholder="Flutter, Dart, Next.js, TypeScript" className="w-full border p-2 rounded bg-white dark:bg-black text-black dark:text-white" />
            <p className="text-xs text-gray-400 mt-1">Separate technologies with commas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">GitHub Link (Optional)</label>
              <input name="githubLink" type="url" placeholder="https://github.com/..." className="w-full border p-2 rounded bg-white dark:bg-black text-black dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Live Demo Link (Optional)</label>
              <input name="liveLink" type="url" placeholder="https://..." className="w-full border p-2 rounded bg-white dark:bg-black text-black dark:text-white" />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {status === 'submitting' ? 'Publishing...' : 'Publish Project'}
          </button>

          {status === 'success' && (
            <p className="text-sm text-green-600 font-medium text-center mt-2">Project published successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-600 font-medium text-center mt-2">Something went wrong. Try again.</p>
          )}
        </form>
      </section>
    </main>
  )
}