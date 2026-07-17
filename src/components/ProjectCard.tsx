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

    // 3D Tilt calculation (max 6 degrees for subtle terminal feel)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group bg-[#0a0f12]/95 backdrop-blur-xl border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.02),inset_0_0_20px_rgba(0,240,255,0.02)] rounded-md h-full flex flex-col justify-between relative overflow-hidden font-mono"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
    >
      {/* Terminal Header Bar */}
      <div className="bg-black/50 border-b border-[#00f0ff]/20 px-4 py-2 flex items-center justify-between z-20 relative">
        <div className="flex gap-2 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-[#ff0055] transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-[#00f0ff] transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-emerald-400 transition-colors" />
        </div>
        <div className="text-[10px] text-[#00f0ff]/70 font-semibold tracking-widest uppercase">
          sys_run - {project.title.substring(0, 8).toLowerCase()}.exe
        </div>
        <div className="w-10" />
      </div>

      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(0,240,255,0.1), transparent 80%)`,
        }}
      />

      {/* Project Image */}
      {project.imageUrl && (
        <div className="w-full h-48 relative overflow-hidden border-b border-[#00f0ff]/20 z-20">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Scanline CRT Sweep Overlay */}
          <div className="absolute inset-0 bg-[#00f0ff]/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,240,255,0.1)_50%,transparent_60%)] bg-[size:100%_300%] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
        </div>
      )}

      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between relative z-20 bg-transparent">
        <div>
          <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#00f0ff] transition-colors tracking-tight uppercase">
            {project.title}
            <span className="ml-2 animate-pulse text-[#00f0ff] opacity-0 group-hover:opacity-100">_</span>
          </h3>
          <p className="text-slate-400 leading-relaxed mb-6 font-light text-sm tracking-wide">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs px-2 py-1 uppercase tracking-widest"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-4 text-sm font-bold uppercase tracking-widest">
          {project.liveLink && (
            <Link
              href={project.liveLink}
              target="_blank"
              className="px-4 py-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20 hover:border-[#00f0ff] transition-all flex items-center gap-2 text-xs"
            >
              [ LIVE_DEMO ]
            </Link>
          )}
          {project.githubLink && (
            <Link
              href={project.githubLink}
              target="_blank"
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all flex items-center gap-2 text-xs"
            >
              [ SRC_CODE ]
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}