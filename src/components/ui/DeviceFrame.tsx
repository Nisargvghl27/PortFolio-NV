'use client'

import React from 'react'

interface DeviceFrameProps {
  type?: string | null
  children: React.ReactNode
  className?: string
}

export default function DeviceFrame({ type, children, className = '' }: DeviceFrameProps) {
  if (type === 'website' || type === 'web') {
    return (
      <div className={`w-full h-full flex items-center justify-center p-4 sm:p-8 bg-[#0a0f12]/80 ${className}`}>
        <div className="w-full max-w-2xl relative">
          {/* Screen */}
          <div className="w-full aspect-[16/10] bg-[#0a0f12] rounded-t-lg md:rounded-t-xl border-t border-l border-r border-neon/30 p-1.5 md:p-2.5 relative shadow-[0_-5px_20px_rgba(var(--theme-neon-rgb), 0.05)]">
            {/* Webcam Dot */}
            <div className="absolute top-1 md:top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 md:w-1.5 md:h-1.5 bg-neon/40 rounded-full shadow-[0_0_4px_#00f0ff]"></div>
            
            <div className="w-full h-full relative overflow-hidden rounded-sm bg-black border border-neon/10">
              {children}
            </div>
          </div>
          {/* Keyboard Base */}
          <div className="w-[106%] -ml-[3%] h-3 md:h-4 bg-gradient-to-b from-[#1a2228] to-[#0a0f12] rounded-b-md md:rounded-b-xl border border-neon/30 border-t-neon/50 relative shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/5 h-1 md:h-1.5 bg-[#0a0f12] rounded-b-sm border-b border-l border-r border-neon/20"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'mobile') {
    return (
      <div className={`w-full h-full flex items-center justify-center p-4 sm:p-8 bg-[#0a0f12]/80 ${className}`}>
        <div className="relative aspect-[9/19.5] h-full max-h-[300px] md:max-h-[400px] bg-[#0a0f12] rounded-[1.5rem] md:rounded-[2rem] border-2 border-neon/30 p-1.5 md:p-2.5 shadow-[0_0_30px_rgba(var(--theme-neon-rgb), 0.08)]">
          {/* Notch / Dynamic Island */}
          <div className="absolute top-1.5 md:top-2.5 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-[#0a0f12] rounded-b-lg z-20 border-b border-l border-r border-neon/20 flex justify-center items-center">
             <div className="w-1.5 h-1.5 rounded-full bg-neon/20 ml-4"></div>
          </div>
          {/* Screen */}
          <div className="w-full h-full relative overflow-hidden rounded-[1.2rem] md:rounded-[1.5rem] bg-black">
            {children}
          </div>
          {/* Home Indicator */}
          <div className="absolute bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-neon/30 rounded-full z-20"></div>
        </div>
      </div>
    )
  }

  // Default "other" plain rendering
  return (
    <div className={`w-full h-full relative bg-[#0a0f12] border border-neon/20 rounded-md overflow-hidden ${className}`}>
      {children}
    </div>
  )
}