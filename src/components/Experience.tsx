import FadeIn from './FadeIn'

const experienceData = [
  {
    id: 1,
    role: "Software Engineering Intern",
    company: "Neural_Net_Systems",
    date: "MAY 2025 - AUG 2025",
    description: [
      "Engineered a scalable microservices architecture using Node.js and Docker.",
      "Optimized database queries in PostgreSQL, reducing read latency by over 40%.",
      "Collaborated with the core AI team to integrate predictive ML models into the user-facing dashboard."
    ]
  },
  {
    id: 2,
    role: "Full-Stack Developer",
    company: "Freelance",
    date: "JAN 2024 - PRESENT",
    description: [
      "Architected and deployed high-performance web applications utilizing Next.js 15 and Tailwind CSS.",
      "Implemented secure authentication and real-time database syncing with Supabase.",
      "Maintained continuous integration and deployment pipelines (CI/CD) on Vercel."
    ]
  }
]

export default function Experience() {
  return (
    <div className="font-mono">
      <div className="relative border-l border-cyan-500/30 ml-3 pl-8 py-2">
        {experienceData.map((job, index) => (
          <FadeIn key={job.id} delay={0.1 + (index * 0.15)} direction="right">
            <div className="mb-12 relative group">
              {/* Glowing Timeline Dot */}
              <div className="absolute w-3 h-3 bg-cyan-400 -left-[38.5px] top-1.5 shadow-[0_0_10px_rgba(0,240,255,0.8)] group-hover:scale-125 transition-transform"></div>
              
              <p className="text-xs font-bold text-cyan-500 mb-2 tracking-widest uppercase">{job.date}</p>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{job.role}</h3>
              <p className="text-gray-400 font-medium mb-4 text-sm">@ {job.company}</p>
              
              <ul className="space-y-3 text-sm text-gray-400 leading-relaxed max-w-2xl font-light">
                {job.description.map((desc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan-500/50 font-mono mt-0.5">&gt;</span>
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}