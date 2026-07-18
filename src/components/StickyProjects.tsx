'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'

interface Project {
    id: string
    title: string
    description: string
    techStack: string[]
    githubLink: string | null
    liveLink: string | null
    imageUrl: string | null
    projectType?: string
}

// Device Frame Helper Component
function DeviceFrame({ type, children }: { type?: string, children: React.ReactNode }) {
    if (type === 'website') {
        return (
            <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 bg-[#0a0f12]/80">
                <div className="w-full max-w-2xl relative">
                    {/* Screen */}
                    <div className="w-full aspect-[16/10] bg-[#0a0f12] rounded-t-lg md:rounded-t-xl border-t border-l border-r border-[#00f0ff]/30 p-1.5 md:p-2.5 relative shadow-[0_-5px_20px_rgba(0,240,255,0.05)]">
                        <div className="w-full h-full relative overflow-hidden rounded-sm bg-black border border-[#00f0ff]/10">
                            {children}
                        </div>
                    </div>
                    {/* Keyboard Base */}
                    <div className="w-[106%] -ml-[3%] h-3 md:h-4 bg-gradient-to-b from-[#1a2228] to-[#0a0f12] rounded-b-md md:rounded-b-xl border border-[#00f0ff]/30 border-t-[#00f0ff]/50 relative shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/5 h-1 md:h-1.5 bg-[#0a0f12] rounded-b-sm border-b border-l border-r border-[#00f0ff]/20"></div>
                    </div>
                </div>
            </div>
        )
    }
    
    if (type === 'mobile') {
        return (
            <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 bg-[#0a0f12]/80">
                <div className="relative aspect-[9/19.5] h-full max-h-[300px] md:max-h-[400px] bg-[#0a0f12] rounded-[1.5rem] md:rounded-[2rem] border-2 border-[#00f0ff]/30 p-1.5 md:p-2.5 shadow-[0_0_30px_rgba(0,240,255,0.08)]">
                    {/* Notch */}
                    <div className="absolute top-1.5 md:top-2.5 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-[#0a0f12] rounded-b-lg z-20 border-b border-l border-r border-[#00f0ff]/20"></div>
                    {/* Screen */}
                    <div className="w-full h-full relative overflow-hidden rounded-[1.2rem] md:rounded-[1.5rem] bg-black">
                        {children}
                    </div>
                    {/* Home Indicator */}
                    <div className="absolute bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-[#00f0ff]/30 rounded-full z-20"></div>
                </div>
            </div>
        )
    }

    // Default "other" plain rendering
    return <div className="w-full h-full relative bg-[#0a0f12]">{children}</div>
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

    const containerHeight = `${projects.length * 100}vh`

    return (
        <>
            {/* --- MOBILE VIEW: Highly optimized, no scroll hijacking, simple vertical stack --- */}
            <div className="lg:hidden w-full max-w-7xl mx-auto px-6 relative z-10 pt-16 pb-12 flex flex-col gap-16">
                {/* Mobile Section Header */}
                <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-xl md:text-2xl font-mono font-bold text-white uppercase tracking-widest">
                        <span className="text-[#00f0ff]">01.</span> Deployed_Systems
                    </h2>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00f0ff]/50 to-transparent" />
                </div>

                {/* Mobile Cards Stack */}
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        {/* Mobile Optimized Image Card */}
                        <div className="w-full relative glass-panel rounded-md overflow-hidden border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.05),inset_0_0_20px_rgba(0,240,255,0.02)]">
                            <div className="hidden xs:flex bg-black/80 border-b border-[#00f0ff]/20 px-4 py-2 items-center justify-between absolute top-0 w-full z-30">
                                <div className="flex gap-2 items-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                </div>
                                <div className="text-[10px] text-[#00f0ff]/70 font-mono font-semibold tracking-widest uppercase">
                                    sys_view - {project.title.substring(0, 8).toLowerCase()}.png
                                </div>
                                <div className="w-10" />
                            </div>
                            
                            <div className="w-full xs:pt-8 aspect-video">
                                <DeviceFrame type={project.projectType}>
                                    {project.imageUrl ? (
                                        <>
                                            <Image
                                                src={project.imageUrl}
                                                alt={project.title}
                                                fill
                                                sizes="100vw"
                                                loading="lazy"
                                                priority={false}
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-[#00f0ff]/10 mix-blend-overlay pointer-events-none" />
                                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,240,255,0.1)_50%,transparent_60%)] bg-[size:100%_300%] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-black/50">
                                            <span className="text-[#00f0ff]/50 font-mono text-sm tracking-widest">[ NO_IMAGE_DATA ]</span>
                                        </div>
                                    )}
                                </DeviceFrame>
                            </div>
                        </div>

                        {/* Mobile Details */}
                        <div className="w-full font-mono flex flex-col">
                            <span className="text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-1 block">&gt; PROJECT_IDENTIFIER</span>
                            <h3 className="text-2xl xs:text-3xl font-black mb-3 text-white tracking-tight uppercase glow-text">
                                {project.title}
                                <span className="ml-2 animate-pulse text-[#00f0ff]">_</span>
                            </h3>
                            <p className="text-slate-300 leading-relaxed mb-4 text-xs tracking-wide border-l-2 border-[#00f0ff]/50 pl-3 bg-gradient-to-r from-[#00f0ff]/5 to-transparent py-2 custom-scrollbar">
                                {project.description}
                            </p>
                            
                            <div className="mb-5">
                                <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase mb-2 block">TARGET_ARCHITECTURE</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-[#00f0ff]/5 border border-[#00f0ff]/30 text-[#00f0ff] text-[10px] px-2 py-1 uppercase tracking-widest shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap justify-end w-full gap-3 text-[10px] font-bold uppercase tracking-widest mt-2">
                                {project.liveLink && (
                                    <motion.a
                                        href={project.liveLink}
                                        target="_blank"
                                        whileHover="hover"
                                        whileTap="tap"
                                        initial="rest"
                                        variants={{
                                            rest: { scale: 1 },
                                            hover: { scale: 1.05, borderColor: "rgba(0, 240, 255, 1)", boxShadow: "0 0 20px rgba(0,240,255,0.4)" },
                                            tap: { scale: 0.95 }
                                        }}
                                        className="relative group overflow-hidden px-4 py-2.5 bg-[#00f0ff]/10 border border-[#00f0ff]/50 text-[#00f0ff] transition-all flex items-center gap-2 cursor-pointer"
                                    >
                                        <motion.div
                                            variants={{ rest: { left: "-150%" }, hover: { left: "150%" } }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent -skew-x-12 z-0"
                                        />
                                        <span className="relative z-10 flex items-center group-hover:text-white transition-colors">
                                            [ LIVE_DEMO ]
                                            <motion.span
                                                variants={{ rest: { opacity: 0, width: 0, marginLeft: 0 }, hover: { opacity: [1, 0, 1], width: "auto", marginLeft: "6px" } }}
                                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                className="inline-block w-2.5 h-3.5 bg-[#00f0ff]"
                                            />
                                        </span>
                                    </motion.a>
                                )}
                                
                                {project.githubLink && (
                                    <motion.a
                                        href={project.githubLink}
                                        target="_blank"
                                        whileHover="hover"
                                        whileTap="tap"
                                        initial="rest"
                                        variants={{
                                            rest: { scale: 1 },
                                            hover: { scale: 1.05, borderColor: "rgba(255, 255, 255, 0.5)", boxShadow: "0 0 20px rgba(255,255,255,0.15)" },
                                            tap: { scale: 0.95 }
                                        }}
                                        className="relative group overflow-hidden px-4 py-2.5 bg-slate-800/50 border border-slate-700 text-slate-300 transition-all flex items-center gap-2 cursor-pointer"
                                    >
                                        <motion.div
                                            variants={{ rest: { left: "-150%" }, hover: { left: "150%" } }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-0"
                                        />
                                        <span className="relative z-10 flex items-center group-hover:text-white transition-colors">
                                            [ SRC_CODE ]
                                            <motion.span
                                                variants={{ rest: { opacity: 0, width: 0, marginLeft: 0 }, hover: { opacity: [1, 0, 1], width: "auto", marginLeft: "6px" } }}
                                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                className="inline-block w-2.5 h-3.5 bg-white"
                                            />
                                        </span>
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- DESKTOP VIEW: 100% Unchanged, protected by lg:block --- */}
            <div className="hidden lg:block">
                <div ref={containerRef} style={{ height: containerHeight }} className="relative w-full">
                    <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                        
                        {/* PINNED HEADER */}
                        <div className="absolute top-24 md:top-20 left-0 w-full z-40">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="max-w-7xl mx-auto px-6"
                            >
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl md:text-2xl font-mono font-bold text-white uppercase tracking-widest">
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

                        {/* CONTENT WRAPPER */}
                        <div className="w-full max-w-7xl mx-auto px-6 relative z-10 pt-28 md:pt-16">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -40, scale: 1.05 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="w-full flex flex-col lg:flex-row gap-4 lg:gap-16 items-center"
                                >
                                    <ProjectImage project={projects[activeIndex]} />
                                    <ProjectDetails project={projects[activeIndex]} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Progress Indicator */}
                        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                            {projects.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 transition-all duration-500 rounded-full ${i === activeIndex
                                            ? 'w-10 bg-[#00f0ff] shadow-[0_0_15px_#00f0ff]'
                                            : 'w-2 bg-[#00f0ff]/20'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProjectImage({ project }: { project: Project }) {
    return (
        <div className="w-full lg:w-1/2 relative glass-panel rounded-md overflow-hidden border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.05),inset_0_0_20px_rgba(0,240,255,0.02)]">
            <div className="hidden xs:flex bg-black/80 border-b border-[#00f0ff]/20 px-4 py-2 items-center justify-between absolute top-0 w-full z-30">
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

            <div className="w-full xs:pt-8 aspect-video lg:aspect-auto lg:h-[45vh]">
                <DeviceFrame type={project.projectType}>
                    {project.imageUrl ? (
                        <>
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                loading="lazy"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[#00f0ff]/10 mix-blend-overlay pointer-events-none" />
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,240,255,0.1)_50%,transparent_60%)] bg-[size:100%_300%] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black/50">
                            <span className="text-[#00f0ff]/50 font-mono text-sm tracking-widest">[ NO_IMAGE_DATA ]</span>
                        </div>
                    )}
                </DeviceFrame>
            </div>
        </div>
    )
}

function ProjectDetails({ project }: { project: Project }) {
    return (
        <div className="w-full lg:w-1/2 font-mono flex flex-col justify-center">
            <span className="text-[#00f0ff] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 md:mb-2 block">&gt; PROJECT_IDENTIFIER</span>
            <h3 className="text-2xl xs:text-3xl md:text-5xl font-black mb-3 md:mb-6 text-white tracking-tight uppercase glow-text">
                {project.title}
                <span className="ml-2 animate-pulse text-[#00f0ff]">_</span>
            </h3>
            <p className="text-slate-300 leading-relaxed mb-4 md:mb-8 text-xs md:text-base tracking-wide border-l-2 border-[#00f0ff]/50 pl-3 md:pl-4 bg-gradient-to-r from-[#00f0ff]/5 to-transparent py-2 md:py-3 max-h-[18vh] md:max-h-none overflow-y-auto custom-scrollbar">
                {project.description}
            </p>
            
            <div className="mb-5 md:mb-10">
                <span className="text-slate-500 text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-2 md:mb-3 block">TARGET_ARCHITECTURE</span>
                <div className="flex flex-wrap gap-1.5 md:gap-2.5">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="bg-[#00f0ff]/5 border border-[#00f0ff]/30 text-[#00f0ff] text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 uppercase tracking-widest shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="flex flex-wrap justify-end w-full gap-3 md:gap-4 text-[10px] md:text-sm font-bold uppercase tracking-widest mt-2">
                {project.liveLink && (
                    <motion.a
                        href={project.liveLink}
                        target="_blank"
                        whileHover="hover"
                        whileTap="tap"
                        initial="rest"
                        variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.05, borderColor: "rgba(0, 240, 255, 1)", boxShadow: "0 0 20px rgba(0,240,255,0.4)" },
                            tap: { scale: 0.95 }
                        }}
                        className="relative group overflow-hidden px-4 py-2.5 md:px-6 md:py-3 bg-[#00f0ff]/10 border border-[#00f0ff]/50 text-[#00f0ff] transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <motion.div
                            variants={{ rest: { left: "-150%" }, hover: { left: "150%" } }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent -skew-x-12 z-0"
                        />
                        <span className="relative z-10 flex items-center group-hover:text-white transition-colors">
                            [ LIVE_DEMO ]
                            <motion.span
                                variants={{ rest: { opacity: 0, width: 0, marginLeft: 0 }, hover: { opacity: [1, 0, 1], width: "auto", marginLeft: "6px" } }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                className="inline-block w-2.5 h-3.5 md:h-4 bg-[#00f0ff]"
                            />
                        </span>
                    </motion.a>
                )}
                
                {project.githubLink && (
                    <motion.a
                        href={project.githubLink}
                        target="_blank"
                        whileHover="hover"
                        whileTap="tap"
                        initial="rest"
                        variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.05, borderColor: "rgba(255, 255, 255, 0.5)", boxShadow: "0 0 20px rgba(255,255,255,0.15)" },
                            tap: { scale: 0.95 }
                        }}
                        className="relative group overflow-hidden px-4 py-2.5 md:px-6 md:py-3 bg-slate-800/50 border border-slate-700 text-slate-300 transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <motion.div
                            variants={{ rest: { left: "-150%" }, hover: { left: "150%" } }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-0"
                        />
                        <span className="relative z-10 flex items-center group-hover:text-white transition-colors">
                            [ SRC_CODE ]
                            <motion.span
                                variants={{ rest: { opacity: 0, width: 0, marginLeft: 0 }, hover: { opacity: [1, 0, 1], width: "auto", marginLeft: "6px" } }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                className="inline-block w-2.5 h-3.5 md:h-4 bg-white"
                            />
                        </span>
                    </motion.a>
                )}
            </div>
        </div>
    )
}