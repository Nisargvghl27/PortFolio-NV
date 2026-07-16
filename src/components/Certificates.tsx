'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  type: 'Hackathon' | 'Certification' | 'Milestone'
  verifyId: string
  url: string
  desc: string
}

const certificatesData: Certificate[] = [
  {
    id: 'sih-2024',
    title: 'Smart India Hackathon Finalist',
    issuer: 'Ministry of Education, Govt of India',
    date: 'DEC 2024',
    type: 'Hackathon',
    verifyId: 'SIH-2024-NIT-9082',
    url: 'https://sih.gov.in',
    desc: 'Led a team to build a secure system for tracking academic research grant disbursements, optimizing release latency by 35%.'
  },
  {
    id: 'hackout-2024',
    title: 'DA-IICT - Hackout Participant',
    issuer: 'Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)',
    date: 'OCT 2024',
    type: 'Hackathon',
    verifyId: 'DAIICT-HO-24-NISARG',
    url: 'https://hackout.co',
    desc: 'Designed and prototyped a collaborative developer dashboard and smart search portal during the 36-hour hackathon sprint.'
  },
  {
    id: 'odoo-gcet-2025',
    title: 'Odoo X GCET Hackathon Competitor',
    issuer: 'Odoo & G H Patel College of Engineering & Technology (GCET)',
    date: 'FEB 2025',
    type: 'Hackathon',
    verifyId: 'ODOO-GCET-2025-VAGHELA',
    url: 'https://www.odoo.com',
    desc: 'Built custom business automation flows and integrated ERP workflows to solve real-world industry logistics problems.'
  },
  {
    id: 'hack-the-tank-svnit',
    title: 'Hack The Tank - SVNIT Contender',
    issuer: 'Sardar Vallabhbhai National Institute of Technology (SVNIT)',
    date: 'MAR 2025',
    type: 'Hackathon',
    verifyId: 'SVNIT-HTT-25-1049',
    url: 'https://svnit.ac.in',
    desc: 'Developed and optimized backend server pipelines and real-time socket updates for a collaborative web project.'
  },
  {
    id: 'aws-ccp',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    date: 'JAN 2025',
    type: 'Certification',
    verifyId: 'AWS-CCP-9831-N27',
    url: 'https://aws.amazon.com/verification',
    desc: 'Validated foundational understanding of cloud security, core AWS services, architecture design principles, and pricing frameworks.'
  },
  {
    id: 'leetcode-50',
    title: 'LeetCode 50 Days Active Badge',
    issuer: 'LeetCode Platform',
    date: 'OCT 2025',
    type: 'Milestone',
    verifyId: 'LC-BADGE-2025-50D',
    url: 'https://leetcode.com/nisargvghl27',
    desc: 'Solved algorithmic problems consistently for 50+ consecutive days, focusing on dynamic programming and graph structures.'
  },
  {
    id: 'codechef-3s',
    title: 'CodeChef 3-Star Coder (Rating 1650+)',
    issuer: 'CodeChef competitive platform',
    date: 'MAR 2025',
    type: 'Milestone',
    verifyId: 'CC-RATING-3STAR-1658',
    url: 'https://codechef.com',
    desc: 'Participated in regular division rounds, ranking in top 5% of division candidates for optimal space-time complexity submissions.'
  }
]

export default function Certificates() {
  const [activeCertId, setActiveCertId] = useState<string>(certificatesData[0].id)
  const [filterType, setFilterType] = useState<string>('all')

  const filteredCerts = filterType === 'all'
    ? certificatesData
    : certificatesData.filter(c => c.type === filterType)

  const activeCert = certificatesData.find(c => c.id === activeCertId) || certificatesData[0]

  return (
    <div className="font-mono w-full max-w-6xl mx-auto relative">
      <FadeIn delay={0.1} direction="up">
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2.5 justify-center border-b border-white/10 pb-5">
            {['all', 'Hackathon', 'Certification', 'Milestone'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                suppressHydrationWarning
                className={`relative px-4 py-2 border transition-all text-xs font-bold uppercase tracking-wider select-none ${
                  filterType === type
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                    : 'border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                }`}
              >
                {filterType === type && (
                  <>
                    <span className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-cyan-400" />
                    <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-cyan-400" />
                  </>
                )}
                [ {type === 'all' ? 'ALL_CREDENTIALS' : type.toUpperCase()} ]
              </button>
            ))}
          </div>

          {/* Master Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Left Side: Directory navigation panel (Takes 1 column) */}
            <div className="lg:col-span-1 relative glass-panel p-5 border border-white/10 rounded-lg bg-black/60 shadow-[0_0_40px_rgba(0,0,0,0.4)] flex flex-col justify-start min-h-[320px]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 select-none z-10">
                <span className="text-[10px] tracking-wider text-cyan-400 font-bold uppercase">// CREDENTIALS_DIR</span>
                <span className="text-[9px] text-gray-600 font-bold">[ {filteredCerts.length} FILES ]</span>
              </div>

              <div className="flex flex-col gap-2 z-10">
                {filteredCerts.map((cert) => {
                  const isActive = cert.id === activeCertId
                  return (
                    <button
                      key={cert.id}
                      onClick={() => setActiveCertId(cert.id)}
                      suppressHydrationWarning
                      className={`w-full text-left p-3 border transition-all relative flex flex-col group ${
                        isActive
                          ? 'border-cyan-500/50 bg-cyan-500/5 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.05)]'
                          : 'border-white/5 bg-black/20 text-gray-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan-400" />
                      )}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wide group-hover:text-cyan-500/60 transition-colors">
                          {cert.type}
                        </span>
                        <span className="text-[9px] text-gray-500 font-mono">
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

            {/* Right Side: Virtual Certificate Telemetry Viewport (Takes 2 columns) */}
            <div className="lg:col-span-2 relative glass-panel p-6 border border-white/10 rounded-lg bg-black/85 shadow-[0_0_50px_rgba(0,240,255,0.02)] flex flex-col justify-between overflow-hidden min-h-[320px]">
              {/* Scanline CRT Sweep Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,240,255,0.04)_50%,transparent_60%)] bg-[size:100%_300%] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />

              <div className="absolute top-3 right-4 text-[8px] text-gray-600 font-mono tracking-widest select-none">[ SECURE_ACCESS_GRANTED ]</div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5 z-10"
                >
                  {/* Status header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">// CREDENTIAL_OBJECT</span>
                      <h3 className="text-lg font-bold text-white tracking-wide">{activeCert.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1 border border-green-500/20 bg-green-500/5 text-green-400 font-bold text-[9px] select-none rounded-sm">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      VERIFIED
                    </div>
                  </div>

                  {/* Metadata matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">// ISSUING_ORGANIZATION</span>
                      <div className="text-cyan-300 font-semibold text-xs mt-0.5">{activeCert.issuer}</div>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">// VALIDATION_HASH</span>
                      <div className="text-gray-300 text-xs font-mono mt-0.5">{activeCert.verifyId}</div>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">// DATE_ISSUED</span>
                      <div className="text-gray-300 text-xs mt-0.5">{activeCert.date}</div>
                    </div>
                  </div>

                  {/* Description details */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">// CREDENTIAL_DESCR</span>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-2xl bg-black/40 p-3 border border-white/5 rounded-sm">
                      {activeCert.desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action and verification stream footer */}
              <div className="border-t border-white/10 pt-4 mt-6 flex flex-wrap gap-4 items-center justify-between z-10">
                <div className="text-[8px] text-gray-500 flex flex-col gap-0.5 select-none">
                  <span className="font-bold text-gray-600">ENCRYPTION: SH256 // TLS_1.3</span>
                  <span className="text-cyan-500/70 font-semibold">
                    [ VERIFICATION_ROUTE_SECURE: PASS ]
                  </span>
                </div>
                <a
                  href={activeCert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold text-xs uppercase tracking-wider hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all select-none rounded-sm"
                >
                  [ VIEW_CREDENTIAL_DATA ]
                </a>
              </div>

            </div>
          </div>

        </div>
      </FadeIn>
    </div>
  )
}
