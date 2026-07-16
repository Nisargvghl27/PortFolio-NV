'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface Project {
  title: string
  description: string
  techStack: string[]
  githubLink: string | null
  liveLink: string | null
  imageUrl: string | null
}

export default function ProjectCard({ project }: { project: Project }) {
  const divRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    
    // Spotlight position
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPosition({ x, y })

    // 3D Tilt calculation (max 8 degrees)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // The tilt logic "pushes" the card down where the mouse is
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Reset tilt smoothly when mouse leaves
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group gradient-border rounded-none p-0 h-full flex flex-col justify-between relative overflow-hidden"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        // Fast transition for tracking, slower smooth transition for resetting when mouse leaves
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
    >
      {/* Spotlight overlay (Feature 1) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ease-in-out rounded-inherit"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(0,240,255,0.06), transparent 80%)`,
        }}
      />

      {/* Project Image (if exists) */}
      {project.imageUrl && (
        <div className="w-full h-48 relative overflow-hidden border-b border-white/10 z-20">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Cyan tint overlay that fades on hover */}
          <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
        </div>
      )}

      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between relative z-20">
        {/* Subtle top-right accent (only show if no image to avoid cluttering) */}
        {!project.imageUrl && (
          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>
        )}

        <div>
          <h3 className="text-2xl font-bold mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6 font-light text-sm">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-white/5 border border-white/10 text-cyan-200 text-xs px-2 py-1 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-6 text-sm font-mono font-bold">
          {project.liveLink && (
            <Link
              href={project.liveLink}
              target="_blank"
              className="text-cyan-400 hover:text-cyan-300 hover:glow-text flex items-center gap-2"
            >
              [ LIVE_DEMO ]
            </Link>
          )}
          {project.githubLink && (
            <Link
              href={project.githubLink}
              target="_blank"
              className="text-gray-400 hover:text-white flex items-center gap-2"
            >
              [ SRC_CODE ]
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}