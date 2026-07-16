'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'

const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'Languages', label: 'LANGUAGES' },
  { id: 'Frontend', label: 'FRONTEND' },
  { id: 'Backend', label: 'BACKEND' },
  { id: 'Tools_&_DevOps', label: 'DEVOPS & TOOLS' }
]

const skillsData = [
  { name: 'TypeScript', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'Dart', category: 'Languages' },
  { name: 'C++', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  { name: 'Flutter', category: 'Frontend' },
  
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'Prisma', category: 'Backend' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },
  
  { name: 'Git', category: 'Tools_&_DevOps' },
  { name: 'GitHub', category: 'Tools_&_DevOps' },
  { name: 'Docker', category: 'Tools_&_DevOps' },
  { name: 'Vercel', category: 'Tools_&_DevOps' },
  { name: 'Linux', category: 'Tools_&_DevOps' },
  { name: 'Postman', category: 'Tools_&_DevOps' }
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter(skill => skill.category === activeCategory)

  return (
    <div className="font-mono space-y-8 w-full max-w-4xl mx-auto">
      {/* 1. Terminal Filter Bar */}
      <FadeIn delay={0.1} direction="up">
        <div className="flex flex-wrap gap-2 justify-center border-b border-white/5 pb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-[10px] md:text-xs font-bold px-3 py-1.5 border transition-all uppercase select-none ${
                  isActive
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                    : 'border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                }`}
              >
                [ {cat.label} ]
              </button>
            )
          })}
        </div>
      </FadeIn>

      {/* 2. Skills Grid Container (wraps cleanly into 3-4 lines) */}
      <FadeIn delay={0.2} direction="up">
        <div className="glass-panel p-8 glow-border-hover min-h-[160px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
          
          <motion.div 
            layout 
            className="flex flex-wrap gap-3.5 justify-center items-center max-w-3xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.span
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  key={skill.name}
                  className="bg-white/5 border border-white/10 text-cyan-200 text-xs px-3.5 py-1.5 font-mono hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all cursor-default select-none"
                >
                  {skill.name}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </FadeIn>
    </div>
  )
}