import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import CursorGlow from '@/components/CursorGlow'
import ScrollProgress from '@/components/ScrollProgress'
import SectionNav from '@/components/SectionNav'
import MatrixRainWrapper from '@/components/MatrixRainWrapper'
import IntroScreen from '@/components/IntroScreen'
import FloatingDock from '@/components/FloatingDock'
import MobileOverlay from '@/components/MobileOverlay'

export const metadata: Metadata = {
  metadataBase: new URL('https://nisarg-dev.vercel.app'),
  alternates: {
    canonical: 'https://nisarg-dev.vercel.app',
  },
  title: 'Nisarg Vaghela | Full Stack Engineer',
  description: 'Full-stack engineer and B.Tech AI student at NIT Surat. Showcasing web, mobile, and artificial intelligence projects.',
  keywords: ['Nisarg Vaghela', 'Next.js', 'React', 'Tailwind CSS', 'Full Stack Developer', 'Software Engineer', 'AI Student'],
  authors: [{ name: 'Nisarg Vaghela' }],
  creator: 'Nisarg Vaghela',
  openGraph: {
    title: 'Nisarg Vaghela | Full Stack Engineer',
    description: 'Specializing in modern full-stack web and mobile architecture. View my latest projects and engineering work.',
    url: 'https://nisarg-dev.vercel.app',
    siteName: 'Nisarg Vaghela Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nisarg Vaghela Portfolio Preview',
      },
    ],
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
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Nisarg Vaghela",
              "url": "https://nisarg-dev.vercel.app",
              "jobTitle": "Full Stack Engineer",
              "description": "Full-stack engineer and B.Tech AI student at NIT Surat specializing in web, mobile, and AI projects.",
              "sameAs": [
                "https://github.com/nisargvghl27",
                "https://linkedin.com/in/nisargvghl27"
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased min-h-screen flex flex-col selection:bg-neon/30 selection:text-neon">
        <MobileOverlay />
        <IntroScreen />
        <ScrollProgress />
        <CursorGlow />
        <SectionNav />
        <MatrixRainWrapper />
        <FloatingDock />
        <div className="flex-1 pb-0">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}