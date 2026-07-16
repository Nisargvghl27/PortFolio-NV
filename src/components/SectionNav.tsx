'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'hero', label: 'START' },
  { id: 'systems', label: '01. DEPLOYED_SYSTEMS' },
  { id: 'metrics', label: '02. ALGORITHMIC_METRICS' },
  { id: 'academic', label: '03. ACADEMIC_CORE' },
  { id: 'arsenal', label: '04. TECH_ARSENAL' },
  { id: 'experience', label: '05. EXPERIENCE_LOG' },
  { id: 'contact', label: 'INITIALIZE_CONNECTION' }
]

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    // Intersection Observer to track which section is currently in the middle of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' } 
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div suppressHydrationWarning={true} className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-4 glass-panel px-2 py-4 rounded-full">
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            suppressHydrationWarning
            className="relative group p-2 focus:outline-none"
            aria-label={`Scroll to ${label}`}
          >
            {/* Hover Tooltip */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.1)]">
              {label}
            </span>
            
            {/* Glowing Dot */}
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.9)]'
                  : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-cyan-500/50'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}