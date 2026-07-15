import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nisarg Vaghela | Software Engineer',
  description: 'Full-stack development portfolio showcasing mobile and web applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased min-h-screen flex flex-col transition-colors duration-300`}>
        
        {/* Premium Sticky Navigation */}
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-lg">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tighter">
              Nisarg<span className="text-blue-600">.</span>
            </Link>
            <div className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Work</Link>
              <Link href="/admin" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Admin</Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1">
          {children}
        </div>

        {/* Minimalist Footer */}
        <footer className="border-t border-gray-200 dark:border-zinc-800 py-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Nisarg Vaghela. All rights reserved.</p>
        </footer>
        
      </body>
    </html>
  )
}