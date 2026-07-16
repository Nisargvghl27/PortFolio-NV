import { prisma } from '@/lib/prisma'
import ContactForm from '@/components/ContactForm'
import FadeIn from '@/components/FadeIn'
import CPStats from '@/components/CPStats'
import LeetCodeStats from '@/components/LeetCodeStats'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Certificates from '@/components/Certificates'
import GitHubCalendar from '@/components/GitHubCalendar'
import ProjectCard from '@/components/ProjectCard'
import ScanlineDivider from '@/components/ScanlineDivider'
import HeroCore from '@/components/HeroCore'
import Leadership from '@/components/Leadership'

export default async function HomePage() {
  let projects: any[] = []
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error("Database connection failed during build: ", error)
  }

  return (
    <main className="max-w-5xl mx-auto px-6 space-y-32 overflow-hidden">
      
      {/* SHATTERED PARALLAX HERO INJECTION */}
      <div className="w-screen relative left-1/2 -translate-x-1/2">
        <HeroCore />
      </div>

      {/* Matrix Project Cards */}
      <section id="systems" className="pt-20">
        <FadeIn delay={0.2} direction="left">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">01.</span> Projects</h2>
            <ScanlineDivider />
          </div>
        </FadeIn>

        {projects.length === 0 ? (
          <FadeIn delay={0.3} direction="up">
            <p className="text-gray-500 font-mono italic"> No systems initialized yet...</p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={0.2 + (index * 0.1)} direction="up">
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section with new GitHub Graph */}
      <section id="metrics">
        <FadeIn delay={0.2} direction="right">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">02.</span> Algorithmic_Metrics</h2>
            <ScanlineDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mb-6">
            <CPStats handle="nisargvghl27" />
            <LeetCodeStats username="nisargvghl27" />
          </div>
          
          <GitHubCalendar />
        </FadeIn>
      </section>

      {/* Education Section */}
      <section id="academic">
        <FadeIn delay={0.2} direction="left">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">03.</span> Academic_Core</h2>
            <ScanlineDivider />
          </div>
          <Education />
        </FadeIn>
      </section>

      {/* Skills / Tech Arsenal Section */}
      <section id="arsenal">
        <FadeIn delay={0.2} direction="right">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">04.</span> Tech_Arsenal</h2>
            <ScanlineDivider />
          </div>
        </FadeIn>
        <Skills />
      </section>

      {/* Certificates & Achievements Section */}
      <section id="credentials">
        <FadeIn delay={0.2} direction="right">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">05.</span> Credentials_&_Awards</h2>
            <ScanlineDivider />
          </div>
        </FadeIn>
        <Certificates />
      </section>

      {/* Leadership Section */}
      <section id="leadership">
        <FadeIn delay={0.2} direction="left">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">06.</span> Leadership_Logs</h2>
            <ScanlineDivider />
          </div>
        </FadeIn>
        <Leadership />
      </section>

      {/* Contact Form Section */}
      <FadeIn delay={0.2} direction="scale">
        <section id="contact" className="glass-panel p-8 md:p-12 relative overflow-hidden">
          {/* Cyberpunk corner accent */}
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50"></div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              
              {/* Left Column: Direct Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-mono font-bold mb-3 text-white">Initialize_Connection</h2>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">
                    Have a project proposal, collaboration idea, or question? Initiate a secure message transmission below, or reach out directly via my official network channels.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5 font-mono">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">// DIRECT_CHANNELS</span>
                  
                  {/* Email Channel */}
                  <div className="flex items-start gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-sm hover:border-cyan-500/30 transition-colors group">
                    <span className="text-cyan-500 mt-1 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <div>
                      <span className="text-[9px] text-gray-600 font-bold block uppercase tracking-wider">EMAIL_ENDPOINT</span>
                      <a href="mailto:nisargvaghela103@gmail.com" className="text-xs text-cyan-300 hover:text-cyan-200 transition-colors hover:underline">
                        nisargvaghela103@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone Channel */}
                  <div className="flex items-start gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-sm hover:border-cyan-500/30 transition-colors group">
                    <span className="text-cyan-500 mt-1 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <div>
                      <span className="text-[9px] text-gray-600 font-bold block uppercase tracking-wider">TELEPHONY_ENDPOINT</span>
                      <a href="tel:+919409718068" className="text-xs text-cyan-300 hover:text-cyan-200 transition-colors hover:underline">
                        +91 94097 18068
                      </a>
                    </div>
                  </div>

                  {/* Instagram Channel */}
                  <div className="flex items-start gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-sm hover:border-cyan-500/30 transition-colors group">
                    <span className="text-cyan-500 mt-1 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </span>
                    <div>
                      <span className="text-[9px] text-gray-600 font-bold block uppercase tracking-wider">INSTAGRAM_ENDPOINT</span>
                      <a href="https://www.instagram.com/nisarg_vaghela9?igsh=MXh2bW1jNmZrYzRqYQ==" target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-300 hover:text-cyan-200 transition-colors hover:underline">
                        nisarg_vaghela9
                      </a>
                    </div>
                  </div>

                  {/* Social Routing */}
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-sm hover:border-cyan-500/30 transition-colors">
                    <span className="text-[9px] text-gray-600 font-bold block uppercase tracking-wider mb-3">SOCIAL_ROUTING</span>
                    <div className="flex flex-wrap gap-2.5">
                      <a
                        href="https://linkedin.com/in/nisargvghl27"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 px-3 py-1.5 rounded-sm uppercase tracking-wide transition-all bg-black/20 hover:bg-cyan-500/5 shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        LinkedIn
                      </a>
                      <a
                        href="https://github.com/nisargvghl27"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 px-3 py-1.5 rounded-sm uppercase tracking-wide transition-all bg-black/20 hover:bg-cyan-500/5 shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        GitHub
                      </a>
                      <a
                        href="https://leetcode.com/u/nisargvghl27/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 px-3 py-1.5 rounded-sm uppercase tracking-wide transition-all bg-black/20 hover:bg-cyan-500/5 shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                        </svg>
                        LeetCode
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="bg-black/30 border border-white/5 p-6 rounded-sm backdrop-blur-md">
                <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider block mb-4">// TRANSMIT_MESSAGE</span>
                <ContactForm />
              </div>

            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  )
}