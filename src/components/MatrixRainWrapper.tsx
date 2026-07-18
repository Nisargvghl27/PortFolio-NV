'use client'

import dynamic from 'next/dynamic'

// Lazy-loaded — excluded from initial bundle, downloaded only on first Ctrl+Shift+M trigger
const MatrixRain = dynamic(() => import('@/components/MatrixRain'), { ssr: false })

export default function MatrixRainWrapper() {
  return <MatrixRain />
}
