import { prisma } from '@/lib/prisma'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import CPStats from '@/components/CPStats'
import LeetCodeStats from '@/components/LeetCodeStats'
import Education from '@/components/Education'
import TypingEffect from '@/components/TypingEffect'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import GitHubCalendar from '@/components/GitHubCalendar'
import ProjectCard from '@/components/ProjectCard'
import ScanlineDivider from '@/components/ScanlineDivider'
import InteractiveConsole from '@/components/InteractiveConsole'

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
      {/* Terminal Hero Section */}
      <section id="hero" className="pt-8 md:pt-16 min-h-[70vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn direction="scale">
              {/* Availability tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] tracking-wider mb-2 uppercase select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                [ SYSTEM STATUS: ACTIVE / OPEN FOR HIRE ]
              </div>
              <TypingEffect />
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white select-none">
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 glow-text glitch-text"
                  data-text="Nisarg Vaghela"
                >
                  Nisarg Vaghela
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2} direction="up">
              <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl font-light">
                Full-Stack Software Engineer & Applied AI Student.
                Specializing in scalable web architectures, machine learning integration, and high-performance mobile applications.
              </p>
            </FadeIn>

            {/* Action Terminals */}
            <FadeIn delay={0.3} direction="up">
              <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs md:text-sm">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 px-5 py-3 hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
                >
                  [ EXECUTE: VIEW_RESUME ]
                </a>
                <a
                  href="https://github.com/nisargvghl27"
                  target="_blank"
                  className="glass-panel text-gray-300 px-5 py-3 hover:text-white hover:border-gray-400 transition-all"
                >
                  [ CONNECT: GITHUB ]
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Interactive Workstation Right */}
          <div className="lg:col-span-5 w-full">
            <FadeIn delay={0.25} direction="scale">
              <InteractiveConsole />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Matrix Project Cards */}
      <section id="systems">
        <FadeIn delay={0.2} direction="left">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">01.</span> Deployed_Systems</h2>
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
        {/* The Skills component internally maps and triggers animations */}
        <Skills />
      </section>

      {/* Experience / Timeline Section */}
      <section id="experience">
        <FadeIn delay={0.2} direction="left">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">05.</span> Experience_Log</h2>
            <ScanlineDivider />
          </div>
        </FadeIn>
        {/* The Experience component internally maps and triggers animations */}
        <Experience />
      </section>

      {/* Contact Form Section */}
      <FadeIn delay={0.2} direction="scale">
        <section id="contact" className="glass-panel p-8 md:p-12 relative overflow-hidden">
          {/* Cyberpunk corner accent */}
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50"></div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-mono font-bold mb-4 text-white">Initialize_Connection</h2>
            <p className="text-gray-400 mb-8 font-light">
              Secure channel open. Ping me for collaborations, architectural reviews, or full-stack opportunities.
            </p>
            <ContactForm />
          </div>
        </section>
      </FadeIn>
    </main>
  )
}