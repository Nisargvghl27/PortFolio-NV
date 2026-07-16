'use client'

import { GitHubCalendar as ReactGitHubCalendar } from 'react-github-calendar'
import { useState, useEffect } from 'react'

export default function GitHubCalendar() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Prevent server-side rendering mismatch by showing a loading state first
  if (!isMounted) {
    return (
      <div className="glass-panel p-6 glow-border-hover mt-6 relative overflow-hidden group w-full overflow-x-auto min-h-[220px] flex flex-col items-center justify-center">
        <h3 className="text-xs font-mono text-gray-500 mb-6 tracking-wider self-start">[ GITHUB_CONTRIBUTIONS ]</h3>
        <p className="text-cyan-500/50 font-mono text-sm animate-pulse">[ LOADING_GITHUB_DATA... ]</p>
      </div>
    )
  }

  return (
    <div className="glass-panel p-6 glow-border-hover mt-6 relative overflow-hidden group w-full overflow-x-auto">
      {/* Subtle top-right accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors pointer-events-none"></div>
      
      <h3 className="text-xs font-mono text-gray-500 mb-6 tracking-wider">[ GITHUB_CONTRIBUTIONS ]</h3>
      
      <div className="min-w-[800px] flex justify-center text-sm font-mono text-gray-400">
        <ReactGitHubCalendar 
          username="nisargvghl27" 
          colorScheme="dark"
          theme={{
            dark: [
              'rgba(255, 255, 255, 0.05)', // 0 contributions
              'rgba(0, 240, 255, 0.3)',    // 1-3 contributions
              'rgba(0, 240, 255, 0.6)',    // 4-6 contributions
              'rgba(0, 240, 255, 0.8)',    // 7-9 contributions
              '#00f0ff'                    // 10+ contributions
            ]
          }}
          labels={{
            totalCount: '{{count}} commits in the last year'
          }}
          style={{
            fontFamily: 'var(--font-jetbrains-mono)'
          }}
        />
      </div>
    </div>
  )
}