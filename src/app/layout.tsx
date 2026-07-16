import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import CursorGlow from '@/components/CursorGlow'
import ScrollProgress from '@/components/ScrollProgress'
import SectionNav from '@/components/SectionNav'
import MatrixRain from '@/components/MatrixRain'
import IntroScreen from '@/components/IntroScreen'
import FloatingDock from '@/components/FloatingDock'

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
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200`}>

        {/* Animated Boot Sequence (Only plays once per session) */}
        <IntroScreen />
        {/* Top Scroll Progress Bar */}
        <ScrollProgress />

        {/* Soft cyan radial glow following cursor */}
        <CursorGlow />

        {/* Floating Table of Contents / Progress Pill */}
        <SectionNav />

        {/* Secret Matrix Easter Egg */}
        <MatrixRain />

        {/* Floating Dock Social Panel */}
        <FloatingDock />

        {/* Main Content Area - padded to account for layout spacing */}
        <div className="flex-1 pt-16 pb-12">
          {children}
        </div>

        {/* Technical Footer with Social Commands */}
        <footer className="border-t border-white/10 py-12 text-center text-xs font-mono text-gray-500 bg-black/85 shadow-[0_-4px_30px_rgba(0,240,255,0.02)] relative z-10 select-none">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* System Info & Heartbeat */}
            <div className="flex items-center gap-3 text-gray-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] tracking-widest uppercase">
                SYS.ONLINE // HOST: VERCEL // LATENCY: 14ms
              </span>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold">
              <a
                href="https://github.com/nisargvghl27"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-wider"
              >
                [ ./github ]
              </a>
              <a
                href="https://linkedin.com/in/nisargvghl27"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-wider"
              >
                [ ./linkedin ]
              </a>
              <a
                href="mailto:nisargvaghela103@gmail.com"
                className="text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-wider"
              >
                [ ./email ]
              </a>
            </div>

            {/* Copyright & Time */}
            <div className="text-[10px] text-gray-600 tracking-wider flex flex-col md:items-end gap-1">
              <span>© 2026 NISARG_VAGHELA. ALL_SYSTEMS_OPERATIONAL.</span>
              <span className="text-gray-700">LOCATION: SURAT, INDIA [21.17° N, 72.83° E]</span>
            </div>
            
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  )
}