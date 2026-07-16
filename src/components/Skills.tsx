import FadeIn from './FadeIn'

const skillsData = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Dart', 'C++', 'Java']
  },
  {
    category: 'Frontend',
    items: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Flutter']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Supabase', 'REST APIs']
  },
  {
    category: 'Tools_&_DevOps',
    items: ['Git', 'GitHub', 'Docker', 'Vercel', 'Linux', 'Postman']
  }
]

export default function Skills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
      {skillsData.map((skillGroup, index) => (
        <FadeIn key={skillGroup.category} delay={0.2 + (index * 0.1)}>
          <div className="glass-panel p-6 glow-border-hover">
            <h3 className="text-sm font-bold text-gray-400 mb-4 tracking-widest uppercase">
              // {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillGroup.items.map((skill) => (
                <span 
                  key={skill} 
                  className="bg-white/5 border border-white/10 text-cyan-200 text-xs px-2 py-1 font-mono hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:glow-text transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}