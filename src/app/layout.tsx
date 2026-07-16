import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'
import CursorGlow from '@/components/CursorGlow'
import ScrollProgress from '@/components/ScrollProgress'

// Apple-esque body font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Matrix-esque technical font
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nisargvaghela.dev'),
  title: 'Nisarg Vaghela | Full Stack Engineer',
  description: 'Full-stack engineer and B.Tech AI student at NIT Surat. Showcasing web, mobile, and artificial intelligence projects.',
  keywords: ['Nisarg Vaghela', 'Next.js', 'React', 'Tailwind CSS', 'Full Stack Developer', 'Software Engineer', 'AI Student'],
  authors: [{ name: 'Nisarg Vaghela' }],
  creator: 'Nisarg Vaghela',
  openGraph: {
    title: 'Nisarg Vaghela | Full Stack Engineer',
    description: 'Specializing in modern full-stack web and mobile architecture. View my latest projects and engineering work.',
    url: 'https://nisargvaghela.dev',
    siteName: 'Nisarg Vaghela Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nisarg Vaghela | Full Stack Engineer',
    description: 'Specializing in modern full-stack web and mobile architecture.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Forced dark mode for the deep-tech aesthetic
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200`}>
        
        {/* Top Scroll Progress Bar */}
        <ScrollProgress />

        {/* Soft cyan radial glow following cursor */}
        <CursorGlow />

        {/* Terminal-Inspired Glass Navigation */}
        <nav className="fixed top-0 z-50 w-full glass-panel border-b-white/10">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-mono font-bold text-lg text-white">
              nisarg<span className="text-cyan-400">_vaghela</span>
            </Link>
            <div className="flex gap-6 text-sm font-mono text-gray-400">
              <Link href="/" className="hover:text-cyan-400 transition-colors">./work</Link>
              <Link href="/garden" className="hover:text-cyan-400 transition-colors">./garden</Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area - padded to account for fixed navbar */}
        <div className="flex-1 pt-24 pb-12">
          {children}
        </div>

        {/* Technical Footer */}
        <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-gray-600 bg-black/80">
          <p>SYS.TIME: {new Date().getFullYear()} // STATUS: ONLINE // USER: NISARG_VAGHELA</p>
        </footer>

        <Analytics />
      </body>
    </html>
  )
}