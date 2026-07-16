import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Nisarg Vaghela - Full Stack Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#030303',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          borderLeft: '12px solid #00f0ff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ color: '#00f0ff', fontSize: 32, fontFamily: 'monospace', marginBottom: 20 }}>
          nisarg@ai-core:~$ ./initialize_portfolio.sh
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: 20,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <span>Architecting</span>
          <span style={{ color: '#00f0ff' }}>digital systems.</span>
        </div>
        <div style={{ fontSize: 32, color: '#888888', fontFamily: 'monospace', marginTop: 20 }}>
          Full-Stack Software Engineer & Applied AI Student
        </div>
      </div>
    ),
    { ...size }
  )
}