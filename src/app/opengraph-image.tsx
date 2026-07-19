import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Nisarg Vaghela - Full Stack AI & Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          backgroundImage: 'linear-gradient(to bottom right, #000000, #0a0a0a)',
          color: 'white',
          padding: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* Main Title */}
          <div
            style={{
              fontSize: '100px',
              fontWeight: '900',
              letterSpacing: '-0.05em',
              color: '#10b981', // Emerald green/neon
              marginBottom: '20px',
              textShadow: '0 0 40px rgba(16, 185, 129, 0.4)',
            }}
          >
            Nisarg Vaghela
          </div>
          
          {/* Subtitle */}
          <div style={{ fontSize: '42px', color: '#a3a3a3', fontWeight: '600', letterSpacing: '-0.02em' }}>
            Full-Stack AI & Software Engineer
          </div>

          {/* Tech Stack Bar */}
          <div
            style={{
              display: 'flex',
              marginTop: '60px',
              borderTop: '2px solid rgba(16, 185, 129, 0.2)',
              paddingTop: '40px',
              fontSize: '28px',
              color: '#666',
              fontWeight: '500',
              letterSpacing: '0.05em'
            }}
          >
            NEXT.JS • TYPESCRIPT • TAILWIND • PRISMA • SUPABASE
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
