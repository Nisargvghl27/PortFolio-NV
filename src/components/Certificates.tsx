'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  url: string
  desc: string
}

const certificatesData: Certificate[] = [
  {
    id: 'powermind-2026',
    title: '3rd Prize - Powermind Hackathon 2026',
    issuer: 'Adani Group',
    date: 'MAY 2026',
    url: 'https://github.com/Powermind-Hackathon/ps2_choki-choki.git',
    desc: 'Secured 3rd Prize for developing ChatPDF, an AI-powered document assistant. Engineered a production RAG pipeline using FastAPI, Next.js, LlamaIndex, and FAISS for vector search. Integrated Groq (LLaMA 3) for sub-second parsing and built a split-view UI with clickable citations, backed by secure per-user data isolation via MongoDB and Supabase.'
  },
  {
    id: 'HTT',
    title: 'Hack The Tank 2026',
    issuer: 'HACK THE TANK',
    date: 'February 2026',
    url: 'https://drive.google.com/file/d/1h4w26STqKz6TPCfNXpoAbLKsF2nK0sLU/view',
    desc: 'Engineered an interactive AI host using the Gemini API for dynamic questioning and Deepgram for real-time speech transcription. Architected a video pipeline using Groq LLaMA 3 for transcript analysis and FFmpeg to auto-generate social media-ready reels. Built a browser recording engine with the MediaRecorder API to sync user video and the AI avatar.',
  },
  {
    id: 'odoo',
    title: 'Odoo x GCET Hackathon 2026',
    issuer: 'Odoo x GCET',
    date: 'February 2026',
    url: 'https://drive.google.com/file/d/1N9GHtvnoWceRxX3JzIBPr_FEtcuHQZ5v/view',
    desc: 'Competed in an intense 24-hour coding marathon, gaining invaluable hands-on experience in rapid application development. Focused on seamlessly connecting frontend and backend architectures under tight deadlines, structuring dynamic data, and collaborating effectively to deliver a functional product.',
  },
  {
    id: 'Web Wonders',
    title: 'Web Wonders 2025',
    issuer: 'Web Wonder',
    date: 'July 2025',
    url: 'https://drive.google.com/file/d/1k6Xg2SaFONsEAEqzfP1ZA7txg8PBTjEZ/view?usp=drive_link',
    desc: 'Completed an intensive coding boot camp focused on building responsive, high-performance e-commerce web applications, mastering frontend workflows, state management, and core web layouts.',
  },
  {
    id: 'ACM Summer Challenge',
    title: 'ACM Summer Challenge 2025',
    issuer: 'ACM Student Chapter',
    date: 'July 2025',
    url: 'https://drive.google.com/file/d/19_mdcBtvgWMdbdGUP8ObXqHSuT8S53gH/view?usp=sharing',
    desc: 'Participated in the competitive programming summer sprint, solving advanced algorithmic puzzles, data structures optimizations, and logic challenges under strict time constraints.',
  },
]

export default function Certificates() {
  const [activeCertId, setActiveCertId] = useState<string>(certificatesData[0].id)
  const activeCert = certificatesData.find(c => c.id === activeCertId) || certificatesData[0]

  return (
    <div className="font-mono w-full max-w-6xl mx-auto relative px-4">
      <FadeIn delay={0.1} direction="up">
        <div className="space-y-6">
          
          {/* Master Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Left Side: Directory navigation panel */}
            <div className="lg:col-span-1 relative glass-panel flex flex-col justify-start min-h-[320px] p-0">
              
              {/* Terminal Header */}
              <div className="bg-black/50 border-b border-[#00f0ff]/20 px-4 py-2 flex items-center justify-between z-20 relative">
                <span className="text-[10px] tracking-widest text-[#00f0ff] font-bold uppercase">&gt; ls ./credentials</span>
                <span className="text-[9px] text-slate-500 font-bold tracking-widest">[ {certificatesData.length} FILES ]</span>
              </div>
              
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff05_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none rounded-md" />
              
              <div className="flex flex-col gap-2 z-10 p-4">
                {certificatesData.map((cert) => {
                  const isActive = cert.id === activeCertId
                  return (
                    <button
                      key={cert.id}
                      onClick={() => setActiveCertId(cert.id)}
                      suppressHydrationWarning
                      className={`w-full text-left p-3 border transition-all relative flex flex-col group ${
                        isActive
                          ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                          : 'border-[#00f0ff]/20 bg-[#050505]/50 text-slate-400 hover:border-[#00f0ff]/50 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00f0ff]" />
                      )}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">
                          {cert.date}
                        </span>
                      </div>
                      <span className="text-xs font-semibold mt-1 tracking-wide truncate max-w-full">
                        {cert.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right Side: Virtual Certificate Telemetry Viewport */}
            <div className="lg:col-span-2 relative glass-panel flex flex-col justify-between overflow-hidden min-h-[320px] p-0">
              
              {/* Terminal Header */}
              <div className="bg-black/50 border-b border-[#00f0ff]/20 px-4 py-2 flex items-center justify-between z-20 relative">
                <div className="flex gap-2 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                </div>
                <div className="text-[10px] text-[#00f0ff]/70 font-semibold tracking-widest uppercase">
                  cat {activeCert.id.toLowerCase().replace(/\s/g, '_')}.log
                </div>
                <div className="w-10 text-right text-[8px] text-emerald-400 tracking-widest">[ SECURE ]</div>
              </div>

              {/* Scanline CRT Sweep Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,240,255,0.04)_50%,transparent_60%)] bg-[size:100%_300%] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
              
              <div className="p-6 relative z-10 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Status header */}
                    <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-4">
                      <div>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">&gt; CREDENTIAL_OBJECT</span>
                        <h3 className="text-lg font-bold text-white tracking-wide uppercase mt-1">{activeCert.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-[9px] select-none rounded-sm tracking-widest">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        VERIFIED
                      </div>
                    </div>

                    {/* Metadata matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">&gt; ISSUING_ORGANIZATION</span>
                        <div className="text-[#00f0ff] font-semibold text-xs mt-1 uppercase tracking-wide">{activeCert.issuer}</div>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">&gt; DATE_ISSUED</span>
                        <div className="text-slate-300 text-xs mt-1 uppercase tracking-wide">{activeCert.date}</div>
                      </div>
                    </div>

                    {/* Description details */}
                    <div className="space-y-2">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">&gt; CREDENTIAL_DESCR</span>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-2xl bg-[#050505]/80 p-4 border border-[#00f0ff]/20 rounded-sm">
                        {activeCert.desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action and verification stream footer */}
              <div className="bg-black/50 border-t border-[#00f0ff]/20 px-6 py-4 flex flex-wrap gap-4 items-center justify-between z-10">
                <div className="text-[8px] text-slate-500 flex flex-col gap-0.5 select-none tracking-widest uppercase">
                  <span className="font-bold">ENCRYPTION: SH256 // TLS_1.3</span>
                  <span className="text-[#00f0ff] font-semibold">
                    [ VERIFICATION_ROUTE_SECURE: PASS ]
                  </span>
                </div>
                <a
                  href={activeCert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 border border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#00f0ff] font-bold text-xs uppercase tracking-widest hover:bg-[#00f0ff]/20 hover:border-[#00f0ff] transition-all select-none rounded-sm"
                >
                  [ VIEW_SOURCE ]
                </a>
              </div>
              
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}