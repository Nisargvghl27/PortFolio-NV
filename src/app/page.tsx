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
                    Feel free to reach out through the form or connect with me directly through my social media profiles.
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

                  {/* Social Routing */}
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-sm hover:border-cyan-500/30 transition-colors">
                    <span className="text-[9px] text-gray-600 font-bold block uppercase tracking-wider mb-3">SOCIAL_ROUTING</span>
                    <div className="flex flex-wrap gap-2.5">
                      <a
                        href="https://linkedin.com/in/nisargvghl27"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 px-3 py-1.5 rounded-sm uppercase tracking-wide transition-all bg-black/20 hover:bg-cyan-500/5 shadow-sm"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://github.com/nisargvghl27"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 px-3 py-1.5 rounded-sm uppercase tracking-wide transition-all bg-black/20 hover:bg-cyan-500/5 shadow-sm"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://leetcode.com/u/nisargvghl27/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 px-3 py-1.5 rounded-sm uppercase tracking-wide transition-all bg-black/20 hover:bg-cyan-500/5 shadow-sm"
                      >
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