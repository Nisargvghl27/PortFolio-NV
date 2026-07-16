import { prisma } from '@/lib/prisma'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import CPStats from '@/components/CPStats'
import LeetCodeStats from '@/components/LeetCodeStats'
import Education from '@/components/Education'

export default async function HomePage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="max-w-5xl mx-auto px-6 space-y-32 overflow-hidden">

      {/* Terminal Hero Section */}
      <section className="space-y-8 max-w-4xl pt-12">
        <div className="space-y-4">
          <FadeIn>
            <p className="font-mono text-cyan-400 text-sm mb-4">
              <span className="text-gray-500">nisarg@ai-core:~$</span> ./initialize_portfolio.sh
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
              Architecting <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 glow-text">
                digital systems.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl font-light">
              Full-Stack Software Engineer & Applied AI Student. 
              Specializing in scalable web architectures, machine learning integration, and high-performance mobile applications.
            </p>
          </FadeIn>
        </div>

        {/* Action Terminals */}
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-4 pt-4 font-mono text-sm">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 px-6 py-3 hover:bg-cyan-500/20 hover:glow-box transition-all"
            >
              [ EXECUTE: VIEW_RESUME ]
            </a>
            <a
              href="https://github.com/nisargvghl27"
              target="_blank"
              className="glass-panel text-gray-300 px-6 py-3 hover:text-white hover:border-gray-400 transition-all"
            >
              [ CONNECT: GITHUB ]
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Matrix Project Cards */}
      <section>
        <FadeIn delay={0.4}>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">01.</span> Deployed_Systems</h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
        </FadeIn>

        {projects.length === 0 ? (
          <FadeIn delay={0.5}>
            <p className="text-gray-500 font-mono italic"> No systems initialized yet...</p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={0.5 + (index * 0.1)}>
                <div className="group glass-panel rounded-none p-6 md:p-8 h-full flex flex-col justify-between glow-border-hover relative overflow-hidden">
                  {/* Subtle top-right accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/20 transition-colors"></div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6 font-light text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="bg-white/5 border border-white/10 text-cyan-200 text-xs px-2 py-1 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex gap-6 text-sm font-mono font-bold">
                    {project.liveLink && (
                      <Link href={project.liveLink} target="_blank" className="text-cyan-400 hover:text-cyan-300 hover:glow-text flex items-center gap-2">
                        [ LIVE_DEMO ]
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link href={project.githubLink} target="_blank" className="text-gray-400 hover:text-white flex items-center gap-2">
                        [ SRC_CODE ]
                      </Link>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section>
        <FadeIn delay={0.5}>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">02.</span> Algorithmic_Metrics</h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {/* Note: We will need to update the internal UI of these components 
              to match the dark mode later, but they will render fine for now! 
            */}
            <CPStats handle="nisargvghl27" />
            <LeetCodeStats username="nisargvghl27" />
          </div>
        </FadeIn>
      </section>

      {/* Education Section */}
      <section>
        <FadeIn delay={0.6}>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-mono text-white"><span className="text-cyan-400">03.</span> Academic_Core</h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
          <Education />
        </FadeIn>
      </section>

      {/* Contact Form Section */}
      <FadeIn delay={0.7}>
        <section className="glass-panel p-8 md:p-12 relative overflow-hidden">
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