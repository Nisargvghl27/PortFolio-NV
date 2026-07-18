'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  githubLink: string | null
  liveLink: string | null
  imageUrl: string | null
}

export default function StickyProjects({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (projects.length === 0) return
    const index = Math.min(Math.floor(latest * projects.length), projects.length - 1)
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  })

  if (!projects || projects.length === 0) return null

  // SENSITIVITY FIX: Reduced to 100vh so it takes less scrolling to transition
  const containerHeight = `${projects.length * 100}vh`

  return (
    <div ref={containerRef} style={{ height: containerHeight }} className="relative w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* PINNED HEADER */}
        <div className="absolute top-20 left-0 w-full z-40">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-7xl mx-auto px-6"
          >
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-mono font-bold text-white uppercase tracking-widest">
                <span className="text-[#00f0ff]">01.</span> Deployed_Systems
              </h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00f0ff]/50 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#00f0ff] opacity-[0.02] blur-[120px] rounded-full" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 relative z-10 pt-16">
          {/* ANIMATION UPGRADE: Custom bezier curves and scale dynamics */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 1.05 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1] // Snappy Expo-Out easing
              }}
              className="w-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
            >
              {/* Image always left, Details always right */}
              <ProjectImage project={projects[activeIndex]} />
              <ProjectDetails project={projects[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Progress Indicator */}
        <div className="absolute bottom-10 left-30 -translate-x-1/2 flex gap-3 z-20">
           {projects.map((_, i) => (
              <div 
                 key={i} 
                 className={`h-1.5 transition-all duration-500 rounded-full ${
                  i === activeIndex 
                    ? 'w-10 bg-[#00f0ff] shadow-[0_0_15px_#00f0ff]' 
                    : 'w-2 bg-[#00f0ff]/20'
                }`}
              />
           ))}
        </div>
      </div>
    </div>
  )
}

function ProjectImage({ project }: { project: Project }) {
  return (
    <div className="w-full lg:w-1/2 relative glass-panel rounded-md overflow-hidden aspect-video border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.05),inset_0_0_20px_rgba(0,240,255,0.02)]">
       <div className="bg-black/80 border-b border-[#00f0ff]/20 px-4 py-2 flex items-center justify-between absolute top-0 w-full z-30">
         <div className="flex gap-2 items-center">
           <div className="w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-[#ff0055] transition-colors" />
           <div className="w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-[#00f0ff] transition-colors" />
           <div className="w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-emerald-400 transition-colors" />
         </div>
         <div className="text-[10px] text-[#00f0ff]/70 font-mono font-semibold tracking-widest uppercase">
           sys_view - {project.title.substring(0, 8).toLowerCase()}.png
         </div>
         <div className="w-10" />
       </div>
       
       {project.imageUrl ? (
         <div className="w-full h-full relative pt-8 bg-[#0a0f12]">
           <div className="relative w-full h-full">
             <Image 
               src={project.imageUrl} 
               alt={project.title} 
               fill
               sizes="(max-width: 1024px) 100vw, 50vw"
               loading="lazy"
               className="object-cover" 
             />
           </div>
           <div className="absolute inset-0 bg-[#00f0ff]/10 mix-blend-overlay pointer-events-none" />
           <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,240,255,0.1)_50%,transparent_60%)] bg-[size:100%_300%] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
         </div>
       ) : (
         <div className="w-full h-full flex items-center justify-center pt-8 bg-black/50">
           <span className="text-[#00f0ff]/50 font-mono text-sm tracking-widest">[ NO_IMAGE_DATA ]</span>
         </div>
       )}
    </div>
  )
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="w-full lg:w-1/2 font-mono flex flex-col justify-center">
       <span className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-2 block">&gt; PROJECT_IDENTIFIER</span>
       <h3 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight uppercase glow-text">
         {project.title}
         <span className="ml-2 animate-pulse text-[#00f0ff]">_</span>
       </h3>
       
       <p className="text-slate-300 leading-relaxed mb-8 text-sm md:text-base tracking-wide border-l-2 border-[#00f0ff]/50 pl-4 bg-gradient-to-r from-[#00f0ff]/5 to-transparent py-3">
         {project.description}
       </p>
       
       <div className="mb-10">
         <span className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-3 block">TARGET_ARCHITECTURE</span>
         <div className="flex flex-wrap gap-2.5">
           {project.techStack.map((tech) => (
             <span
               key={tech}
               className="bg-[#00f0ff]/5 border border-[#00f0ff]/30 text-[#00f0ff] text-xs px-3 py-1.5 uppercase tracking-widest shadow-[0_0_10px_rgba(0,240,255,0.05)]"
             >
               {tech}
             </span>
           ))}
         </div>
       </div>
       
       <div className="flex flex-wrap gap-4 text-sm font-bold uppercase tracking-widest">
         {project.liveLink && (
           <Link 
             href={project.liveLink}
             target="_blank"
             className="px-6 py-3 bg-[#00f0ff]/10 border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/20 hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2"
           >
             [ LIVE_DEMO ]
           </Link>
         )}
         {project.githubLink && (
           <Link 
             href={project.githubLink}
             target="_blank"
             className="px-6 py-3 bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2"
           >
             [ SRC_CODE ]
           </Link>
         )}
       </div>
    </div>
  )
}