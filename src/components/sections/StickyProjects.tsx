'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import DeviceFrame from '@/components/ui/DeviceFrame'

interface Project {
    id: string
    title: string
    description: string
    techStack: string[]
    githubLink: string | null
    liveLink: string | null
    imageUrl: string | null
    projectType?: string | null
    impactUsers?: string | null
    impactUptime?: string | null
    impactScore?: string | null
    impactStars?: string | null
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
                        <span className="text-neon">01.</span> Deployed_Systems
                    </h2>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-neon/50 to-transparent" />
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
                        <div className="w-full relative glass-panel rounded-md overflow-hidden border border-neon/30 shadow-[0_0_30px_rgba(var(--theme-neon-rgb), 0.05),inset_0_0_20px_rgba(var(--theme-neon-rgb), 0.02)]">
                            <div className="hidden xs:flex bg-black/80 border-b border-neon/20 px-4 py-2 items-center justify-between absolute top-0 w-full z-30">
                                <div className="flex gap-2 items-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                </div>
                                <div className="text-[10px] text-neon/70 font-mono font-semibold tracking-widest uppercase">
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
                                            <div className="absolute inset-0 bg-neon/10 mix-blend-overlay pointer-events-none" />
                                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(var(--theme-neon-rgb), 0.1)_50%,transparent_60%)] bg-[size:100%_300%] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-black/50">
                                            <span className="text-neon/50 font-mono text-sm tracking-widest">[ NO_IMAGE_DATA ]</span>
                                        </div>
                                    )}
                                </DeviceFrame>
                            </div>
                        </div>

                        {/* Mobile Details */}
                        <div className="w-full font-mono flex flex-col">
                            <span className="text-neon text-[10px] font-bold tracking-widest uppercase mb-1 block">&gt; PROJECT_IDENTIFIER</span>
                            <h3 className="text-2xl xs:text-3xl font-black mb-3 text-white tracking-tight uppercase glow-text">
                                {project.title}
                                <span className="ml-2 animate-pulse text-neon">_</span>
                            </h3>
                            <p className="text-slate-300 leading-relaxed mb-4 text-xs tracking-wide border-l-2 border-neon/50 pl-3 bg-gradient-to-r from-neon/5 to-transparent py-2 custom-scrollbar">
                                {project.description}
                            </p>

                            {(project.impactUsers || project.impactUptime || project.impactScore || project.impactStars) && (
                                <div className="flex flex-wrap gap-2 mb-5 font-mono">
                                    {project.impactUsers && (
                                        <span className="text-[9px] border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 px-2 py-1 uppercase tracking-widest">
                                            USERS: {project.impactUsers}
                                        </span>
                                    )}
                                    {project.impactUptime && (
                                        <span className="text-[9px] border border-neon/30 bg-neon/5 text-neon px-2 py-1 uppercase tracking-widest">
                                            UPTIME: {project.impactUptime}
                                        </span>
                                    )}
                                    {project.impactScore && (
                                        <span className="text-[9px] border border-violet-500/30 bg-violet-500/5 text-violet-400 px-2 py-1 uppercase tracking-widest">
                                            SCORE: {project.impactScore}
                                        </span>
                                    )}
                                    {project.impactStars && (
                                        <span className="text-[9px] border border-amber-500/30 bg-amber-500/5 text-amber-400 px-2 py-1 uppercase tracking-widest">
                                            STARS: {project.impactStars}
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="mb-5">
                                <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase mb-2 block">TARGET_ARCHITECTURE</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-neon/5 border border-neon/30 text-neon text-[10px] px-2 py-1 uppercase tracking-widest shadow-[0_0_10px_rgba(var(--theme-neon-rgb), 0.05)]"
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
                                            hover: { scale: 1.05, borderColor: "rgba(var(--theme-neon-rgb), 1)", boxShadow: "0 0 20px rgba(var(--theme-neon-rgb), 0.4)" },
                                            tap: { scale: 0.95 }
                                        }}
                                        className="relative group overflow-hidden px-4 py-2.5 bg-neon/10 border border-neon/50 text-neon transition-all flex items-center gap-2 cursor-pointer"
                                    >
                                        <motion.div
                                            variants={{ rest: { left: "-150%" }, hover: { left: "150%" } }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-neon/40 to-transparent -skew-x-12 z-0"
                                        />
                                        <span className="relative z-10 flex items-center group-hover:text-white transition-colors">
                                            [ LIVE_DEMO ]
                                            <motion.span
                                                variants={{ rest: { opacity: 0, width: 0, marginLeft: 0 }, hover: { opacity: [1, 0, 1], width: "auto", marginLeft: "6px" } }}
                                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                className="inline-block w-2.5 h-3.5 bg-neon"
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
                                        <span className="text-neon">01.</span> Deployed_Systems
                                    </h2>
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-neon/50 to-transparent" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Ambient Glow */}
                        <div className="absolute inset-0 pointer-events-none z-0">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neon opacity-[0.02] blur-[120px] rounded-full" />
                        </div>

                        {/* CONTENT WRAPPER */}
                        <div className="w-full max-w-7xl mx-auto px-6 relative z-10 pt-30 md:pt-26">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 25, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -25, scale: 1.02 }}
                                    transition={{
                                        duration: 0.5,
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
                        <div className="absolute bottom-6 md:bottom-20 left-0 right-0 mx-auto max-w-7xl px-6 flex gap-3 z-20 justify-start">
                            {projects.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 transition-all duration-500 rounded-full ${i === activeIndex
                                        ? 'w-10 bg-neon shadow-[0_0_15px_#00f0ff]'
                                        : 'w-2 bg-neon/20'
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
        <div className="w-full lg:w-1/2 relative glass-panel rounded-md overflow-hidden border border-neon/30 shadow-[0_0_30px_rgba(var(--theme-neon-rgb), 0.05),inset_0_0_20px_rgba(var(--theme-neon-rgb), 0.02)]">
            <div className="hidden xs:flex bg-black/80 border-b border-neon/20 px-4 py-2 items-center justify-between absolute top-0 w-full z-30">
                <div className="flex gap-2 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-[#ff0055] transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-neon transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-emerald-400 transition-colors" />
                </div>
                <div className="text-[10px] text-neon/70 font-mono font-semibold tracking-widest uppercase">
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
                            <div className="absolute inset-0 bg-neon/10 mix-blend-overlay pointer-events-none" />
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(var(--theme-neon-rgb), 0.1)_50%,transparent_60%)] bg-[size:100%_300%] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black/50">
                            <span className="text-neon/50 font-mono text-sm tracking-widest">[ NO_IMAGE_DATA ]</span>
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
            <span className="text-neon text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 md:mb-2 block">&gt; PROJECT_IDENTIFIER</span>
            <h3 className="text-2xl xs:text-3xl md:text-5xl font-black mb-3 md:mb-6 text-white tracking-tight uppercase glow-text">
                {project.title}
                <span className="ml-2 animate-pulse text-neon">_</span>
            </h3>
            <p className="text-slate-300 leading-relaxed mb-4 md:mb-8 text-xs md:text-base tracking-wide border-l-2 border-neon/50 pl-3 md:pl-4 bg-gradient-to-r from-neon/5 to-transparent py-2 md:py-3 max-h-[18vh] md:max-h-none overflow-y-auto custom-scrollbar">
                {project.description}
            </p>

            {(project.impactUsers || project.impactUptime || project.impactScore || project.impactStars) && (
                <div className="flex flex-wrap gap-2 mb-5 font-mono">
                    {project.impactUsers && (
                        <span className="text-[9px] border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 px-2 py-1 uppercase tracking-widest">
                            USERS: {project.impactUsers}
                        </span>
                    )}
                    {project.impactUptime && (
                        <span className="text-[9px] border border-neon/30 bg-neon/5 text-neon px-2 py-1 uppercase tracking-widest">
                            UPTIME: {project.impactUptime}
                        </span>
                    )}
                    {project.impactScore && (
                        <span className="text-[9px] border border-violet-500/30 bg-violet-500/5 text-violet-400 px-2 py-1 uppercase tracking-widest">
                            SCORE: {project.impactScore}
                        </span>
                    )}
                    {project.impactStars && (
                        <span className="text-[9px] border border-amber-500/30 bg-amber-500/5 text-amber-400 px-2 py-1 uppercase tracking-widest">
                            STARS: {project.impactStars}
                        </span>
                    )}
                </div>
            )}

            <div className="mb-5 md:mb-10">
                <span className="text-slate-500 text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-2 md:mb-3 block">TARGET_ARCHITECTURE</span>
                <div className="flex flex-wrap gap-1.5 md:gap-2.5">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="bg-neon/5 border border-neon/30 text-neon text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 uppercase tracking-widest shadow-[0_0_10px_rgba(var(--theme-neon-rgb), 0.05)]"
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
                            hover: { scale: 1.05, borderColor: "rgba(var(--theme-neon-rgb), 1)", boxShadow: "0 0 20px rgba(var(--theme-neon-rgb), 0.4)" },
                            tap: { scale: 0.95 }
                        }}
                        className="relative group overflow-hidden px-4 py-2.5 md:px-6 md:py-3 bg-neon/10 border border-neon/50 text-neon transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <motion.div
                            variants={{ rest: { left: "-150%" }, hover: { left: "150%" } }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-neon/40 to-transparent -skew-x-12 z-0"
                        />
                        <span className="relative z-10 flex items-center group-hover:text-white transition-colors">
                            [ LIVE_DEMO ]
                            <motion.span
                                variants={{ rest: { opacity: 0, width: 0, marginLeft: 0 }, hover: { opacity: [1, 0, 1], width: "auto", marginLeft: "6px" } }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                className="inline-block w-2.5 h-3.5 md:h-4 bg-neon"
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