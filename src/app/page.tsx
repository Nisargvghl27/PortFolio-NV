import { prisma } from '@/lib/prisma'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import CPStats from '@/components/CPStats'
import LeetCodeStats from '@/components/LeetCodeStats';

export default async function HomePage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="max-w-5xl mx-auto px-6 py-20 space-y-24 overflow-hidden">

      {/* Animated Hero Section */}
      <section className="space-y-6 max-w-3xl">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Building digital <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              experiences.
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            I'm a Full-Stack Artificial Intelligence student and Software Engineer specializing in modern web and mobile architecture.
          </p>
        </FadeIn>
      </section>

      {/* Animated Project Cards */}
      <section>
        <FadeIn delay={0.3}>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Selected Work</h2>
            <div className="h-px bg-gray-200 dark:bg-zinc-800 flex-1"></div>
          </div>
        </FadeIn>

        {projects.length === 0 ? (
          <FadeIn delay={0.4}>
            <p className="text-gray-500 italic">No projects added yet.</p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={0.4 + (index * 0.1)}>
                <div className="group relative flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-zinc-900/50 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 h-full">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="bg-gray-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-3 py-1.5 rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4 text-sm font-semibold">
                    {project.liveLink && (
                      <Link href={project.liveLink} target="_blank" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                        Live Demo ↗
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link href={project.githubLink} target="_blank" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 flex items-center gap-1">
                        Source Code ↗
                      </Link>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      {/* 2. New Stats Section */}
      <section>
        <FadeIn delay={0.5}>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Competitive Stats</h2>
            <div className="h-px bg-gray-200 dark:bg-zinc-800 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <CPStats handle="nisargvghl27" />
            <LeetCodeStats username="nisargvghl27" />
          </div>
        </FadeIn>
      </section>

      {/* Animated Contact Section */}
      <FadeIn delay={0.6}>
        <section className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Let's build something.</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Have a project in mind or want to collaborate? Drop me a message below.
            </p>
            <ContactForm />
          </div>
        </section>
      </FadeIn>

    </main>
  )
}