import { prisma } from '@/lib/prisma'
import ContactForm from '@/components/ContactForm'
import FadeIn from '@/components/FadeIn'
import CPStats from '@/components/CPStats'
import LeetCodeStats from '@/components/LeetCodeStats'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
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

      {/* Experience / Timeline Section */}
      <section id="experience">
        <FadeIn delay={0.2} direction="left">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">05.</span> Experience_Log</h2>
            <ScanlineDivider />
          </div>
        </FadeIn>
        <Experience />
      </section>

      {/* Certificates & Achievements Section */}
      <section id="credentials">
        <FadeIn delay={0.2} direction="right">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">06.</span> Credentials_&_Awards</h2>
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