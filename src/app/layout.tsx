import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'

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
  title: 'Nisarg Vaghela | Full Stack Engineer',
  description: 'Full-stack engineer and B.Tech AI student at NIT Surat. Showcasing web, mobile, and artificial intelligence projects.',
  openGraph: {
    title: 'Nisarg Vaghela | Full Stack Engineer',
    description: 'Specializing in modern full-stack web and mobile architecture. View my latest projects and engineering work.',
    url: 'https://nisargvaghela.dev', 
    siteName: 'Nisarg Vaghela Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Nisarg Vaghela Portfolio Preview' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nisarg Vaghela | Full Stack Engineer',
    description: 'Specializing in modern full-stack web and mobile architecture.',
    images: ['/og-image.jpg'],
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
        
        {/* Terminal-Inspired Glass Navigation */}
        <nav className="fixed top-0 z-50 w-full glass-panel border-b-white/10">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-mono font-bold text-lg tracking-tight flex items-center gap-2 group">
              <span className="text-cyan-400 group-hover:glow-text transition-all">~/</span>
              <span className="text-gray-200">nisarg</span>
              <span className="animate-pulse w-2 h-5 bg-cyan-400 inline-block align-middle ml-0.5"></span>
            </Link>
            <div className="flex gap-6 text-sm font-mono text-gray-400">
              <Link href="/" className="hover:text-cyan-400 transition-colors">./work</Link>
              <Link href="/garden" className="hover:text-cyan-400 transition-colors">./garden</Link>
              <Link href="/admin" className="hover:text-cyan-400 transition-colors">./admin</Link>
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