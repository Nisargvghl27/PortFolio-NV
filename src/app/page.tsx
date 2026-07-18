import { prisma } from '@/lib/prisma'
import type { Project } from '@prisma/client'
import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import FadeIn from '@/components/FadeIn'
import CPStats from '@/components/CPStats'
import LeetCodeStats from '@/components/LeetCodeStats'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Certificates from '@/components/Certificates'
import GitHubCalendar from '@/components/GitHubCalendar'
import ScanlineDivider from '@/components/ScanlineDivider'
import StickyProjects from '@/components/StickyProjects'

// ─── Type definitions ────────────────────────────────────────────────────────

interface CodeforcesStats {
  handle: string
  rating: number
  maxRating: number
  rank: string
  maxRank: string
}

interface LeetCodeData {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
}

// ─── Server-side data fetchers (cached for 1 hour at the edge) ───────────────

async function fetchCodeforcesStats(handle: string): Promise<CodeforcesStats | null> {
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`,
      { next: { revalidate: 3600 } } // cache for 1 hour
    )
    const data = await res.json()
    if (data.status === 'OK' && data.result?.length > 0) {
      const user = data.result[0]
      return {
        handle: user.handle,
        rating: user.rating || 0,
        maxRating: user.maxRating || 0,
        rank: user.rank || 'unranked',
        maxRank: user.maxRank || 'unranked',
      }
    }
  } catch (err) {
    console.error('Failed fetching Codeforces stats:', err)
  }
  return null
}

async function fetchLeetCodeStats(username: string): Promise<LeetCodeData | null> {
  try {
    const res = await fetch(
      `https://leetcode-api-faisalshohag.vercel.app/${username}`,
      { next: { revalidate: 3600 } } // cache for 1 hour
    )
    const data = await res.json()
    if (data) {
      return {
        totalSolved: data.totalSolved || 0,
        easySolved: data.easySolved || 0,
        mediumSolved: data.mediumSolved || 0,
        hardSolved: data.hardSolved || 0,
        ranking: data.ranking || 0,
      }
    }
  } catch (err) {
    console.error('Failed fetching LeetCode stats:', err)
  }
  return null
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  let projects: Project[] = []

  // All three fetches run in parallel — Prisma + Codeforces + LeetCode
  const [cfStats, lcStats] = await Promise.all([
    fetchCodeforcesStats('nisargvghl27'),
    fetchLeetCodeStats('nisargvghl27'),
  ])

  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error("Database connection failed during build: ", error)
  }

  return (
    <>
      {/* CYBERPUNK HERO SECTION */}
      <div id="hero">
        <Hero />
      </div>

      {/* Main Content Area - unified background handled globally */}
      <main className="max-w-6xl mx-auto px-6 space-y-32 overflow-clip pb-32">

        {/* Matrix Project Cards */}
        <section id="systems" className="relative">
          {projects.length === 0 ? (
            <div className="pt-20">
              <p className="text-slate-500 font-mono italic max-w-6xl mx-auto px-6">  No systems initialized yet...</p>
            </div>
          ) : (
            <StickyProjects projects={projects} />
          )}
        </section>

        {/* Stats Section with GitHub Graph */}
        <section id="metrics">
          <FadeIn delay={0.2} direction="right">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-mono font-bold text-white uppercase tracking-widest"><span className="text-[#00f0ff]">02.</span> Algorithmic_Metrics</h2>
              <ScanlineDivider />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <CPStats stats={cfStats} handle="nisargvghl27" />
              <LeetCodeStats stats={lcStats} username="nisargvghl27" />
            </div>

            <GitHubCalendar />
          </FadeIn>
        </section>


        {/* Education Section */}
        <section id="academic">
          <FadeIn delay={0.2} direction="left">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-mono font-bold text-white uppercase tracking-widest"><span className="text-[#00f0ff]">03.</span> Academic_Core</h2>
              <ScanlineDivider />
            </div>

            <Education />
          </FadeIn>
        </section>

        {/* Skills / Tech Arsenal Section */}
        <section id="arsenal">
          <FadeIn delay={0.2} direction="right">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-mono font-bold text-white uppercase tracking-widest"><span className="text-[#00f0ff]">04.</span> Tech_Arsenal</h2>
              <ScanlineDivider />
            </div>
          </FadeIn>
          <Skills />
        </section>

        {/* Certificates & Achievements Section */}
        <section id="credentials">
          <FadeIn delay={0.2} direction="right">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-mono font-bold text-white uppercase tracking-widest"><span className="text-[#00f0ff]">05.</span> Credentials_Awards</h2>
              <ScanlineDivider />
            </div>
          </FadeIn>
          <Certificates />
        </section>

        {/* Contact Form Section */}
        <FadeIn delay={0.2} direction="scale">
          <section id="contact" className="glass-panel p-8 md:p-12 relative overflow-hidden">
            {/* Cyberpunk corner accents matching Hero Panel */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#00f0ff]/40"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#00f0ff]/40"></div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left Column: Direct Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-mono font-black mb-3 text-white uppercase tracking-tighter shadow-sm">
                      Initialize_<span className="text-[#00f0ff]">Connection</span>
                    </h2>
                    <p className="text-slate-400 font-mono text-sm leading-relaxed tracking-wide">
                      // SYSTEM_PROMPT: Have a project proposal, collaboration idea, or question? Initiate a secure message transmission below, or reach out directly via my official network channels.
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-[#00f0ff]/20 font-mono">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">&gt; DIRECT_CHANNELS</span>

                    {/* Email Channel */}
                    <div className="flex items-start gap-3 bg-[#00f0ff]/5 border border-[#00f0ff]/20 p-4 rounded-sm hover:border-[#00f0ff]/50 transition-colors group">
                      <span className="text-[#00f0ff] mt-1 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </span>
                      <div>
                        <span className="text-[9px] text-[#00f0ff]/70 font-bold block uppercase tracking-widest">EMAIL_ENDPOINT</span>
                        <a href="mailto:nisargvaghela103@gmail.com" className="text-xs text-white hover:text-[#00f0ff] transition-colors hover:underline">
                          nisargvaghela103@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Phone Channel */}
                    <div className="flex items-start gap-3 bg-[#00f0ff]/5 border border-[#00f0ff]/20 p-4 rounded-sm hover:border-[#00f0ff]/50 transition-colors group">
                      <span className="text-[#00f0ff] mt-1 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </span>
                      <div>
                        <span className="text-[9px] text-[#00f0ff]/70 font-bold block uppercase tracking-widest">TELEPHONY_ENDPOINT</span>
                        <a href="tel:+919409718068" className="text-xs text-white hover:text-[#00f0ff] transition-colors hover:underline">
                          +91 94097 18068
                        </a>
                      </div>
                    </div>

                    {/* Social Routing */}
                    <div className="bg-[#00f0ff]/5 border border-[#00f0ff]/20 p-4 rounded-sm hover:border-[#00f0ff]/50 transition-colors group">
                      <span className="text-[9px] text-[#00f0ff]/70 font-bold block uppercase tracking-widest mb-3">SOCIAL_ROUTING</span>
                      <div className="flex flex-wrap gap-3">

                        {/* LinkedIn */}
                        <a
                          href="https://linkedin.com/in/nisargvghl27"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn"
                          className="flex items-center justify-center w-10 h-10 rounded-sm border border-[#00f0ff]/20 text-slate-400 bg-black/20 hover:text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 shadow-sm transition-all"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        </a>

                        {/* GitHub */}
                        <a
                          href="https://github.com/nisargvghl27"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="GitHub"
                          className="flex items-center justify-center w-10 h-10 rounded-sm border border-[#00f0ff]/20 text-slate-400 bg-black/20 hover:text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 shadow-sm transition-all"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                        </a>

                        {/* LeetCode */}
                        <a
                          href="https://leetcode.com/u/nisargvghl27/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LeetCode"
                          className="flex items-center justify-center w-10 h-10 rounded-sm border border-[#00f0ff]/20 text-slate-400 bg-black/20 hover:text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 shadow-sm transition-all"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                          </svg>
                        </a>

                        {/* Instagram */}
                        <a
                          href="https://www.instagram.com/nisarg_vaghela9?igsh=MXh2bW1jNmZrYzRqYQ=="
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Instagram"
                          className="flex items-center justify-center w-10 h-10 rounded-sm border border-[#00f0ff]/20 text-slate-400 bg-black/20 hover:text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 shadow-sm transition-all"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                          </svg>
                        </a>

                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="bg-[#050505]/80 border border-[#00f0ff]/30 p-8 rounded-md backdrop-blur-md relative">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#00f0ff]/10 rounded-bl-full pointer-events-none"></div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 bg-[#00f0ff] animate-pulse"></span>
                    <span className="text-[10px] font-mono text-[#00f0ff] font-bold uppercase tracking-widest">TRANSMIT_MESSAGE</span>
                  </div>
                  <ContactForm />
                </div>

              </div>
            </div>
          </section>
        </FadeIn>
      </main>
    </>
  )
}