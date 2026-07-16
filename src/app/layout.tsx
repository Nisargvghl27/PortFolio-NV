import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import CursorGlow from '@/components/CursorGlow'
import ScrollProgress from '@/components/ScrollProgress'
import SectionNav from '@/components/SectionNav'
import NavBar from '@/components/NavBar'
import MatrixRain from '@/components/MatrixRain'
import IntroScreen from '@/components/IntroScreen'

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
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-mono antialiased min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200`}>
        
        {/* Animated Boot Sequence (Only plays once per session) */}
        <IntroScreen />

        {/* Top Scroll Progress Bar */}
        <ScrollProgress />

        {/* Soft cyan radial glow following cursor */}
        <CursorGlow />

        {/* Floating Table of Contents / Progress Pill */}
        <SectionNav />

        {/* Client-side Navigation Bar with Active Route Highlighting */}
        <NavBar />
        
        {/* Secret Matrix Easter Egg */}
        <MatrixRain />

        {/* Main Content Area - padded to account for fixed navbar */}
        <div className="flex-1 pt-24 pb-12">
          {children}
        </div>

        {/* Technical Footer with Social Commands */}
        <footer className="border-t border-white/10 py-10 text-center text-xs font-mono text-gray-600 bg-black/80 shadow-[0_-1px_0_rgba(0,240,255,0.1)] relative z-10">
          <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a 
                href="https://github.com/nisargvghl27" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                [ ./github ]
              </a>
              <a 
                href="https://linkedin.com/in/nisargvaghela" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                [ ./linkedin ]
              </a>
              <a 
                href="mailto:nisargvaghela@email.com" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                [ ./email ]
              </a>
            </div>
            <p>SYS.TIME: {new Date().getFullYear()} // STATUS: ONLINE // USER: NISARG_VAGHELA</p>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  )
}