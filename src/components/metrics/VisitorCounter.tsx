'use client'

import { useEffect, useState } from 'react'
import { incrementVisitorCount, getSiteConfig } from '@/app/actions/site-config'

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    async function initVisitorCount() {
      try {
        const hasVisited = sessionStorage.getItem('visited')
        
        if (!hasVisited) {
          // New session: increment the counter
          const newCount = await incrementVisitorCount()
          setCount(newCount)
          sessionStorage.setItem('visited', 'true')
        } else {
          // Returning in same session: just fetch the current count
          const config = await getSiteConfig()
          if (config) {
            setCount(config.visitorCount)
          }
        }
      } catch (error) {
        console.error('Failed to initialize visitor count:', error)
      }
    }
    
    initVisitorCount()
  }, [])

  // Don't render until we have the count to prevent layout shift / hydration mismatch
  if (count === null) return null

  return (
    <div className="absolute bottom-4 left-6 md:bottom-6 md:left-12 font-mono text-[10px] text-slate-500 tracking-widest flex items-center z-10 select-none">
      VISITORS: {count.toLocaleString()}
      <span className="ml-1.5 w-1.5 h-3 bg-slate-500 animate-pulse inline-block" />
    </div>
  )
}