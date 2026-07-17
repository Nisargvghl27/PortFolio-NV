import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import CursorGlow from '@/components/CursorGlow'
import ScrollProgress from '@/components/ScrollProgress'
import SectionNav from '@/components/SectionNav'
import MatrixRain from '@/components/MatrixRain'
import IntroScreen from '@/components/IntroScreen'
import FloatingDock from '@/components/FloatingDock'

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
      <body suppressHydrationWarning className="font-sans antialiased min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">

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

        {/* Main Content Area */}
        <div className="flex-1 pb-0">
          {children}
        </div>

        <Analytics />
      </body>
    </html>
  )
}