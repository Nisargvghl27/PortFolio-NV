import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AddSkillForm from '@/components/AddSkillForm'
import EditSkillForm from '@/components/EditSkillForm'
import { deleteSkill } from '@/app/actions/skills'

export default async function SkillsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>
}) {
  const resolvedParams = await searchParams
  const editId = resolvedParams.edit

  const skills = await prisma.skill.findMany({
    orderBy: [
      { order: 'asc' },
      { name: 'asc' }
    ]
  })

  let skillToEdit = null
  if (editId) {
    skillToEdit = await prisma.skill.findUnique({
      where: { id: editId }
    })
  }

  return (
    <main className="max-w-2xl mx-auto px-6 pt-12 pb-24 space-y-12 font-mono relative z-10">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold text-white">Admin // <span className="text-cyan-400">Skills</span></h1>
        <Link href="/admin" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">[ &lt;&lt; BACK_TO_HUB ]</Link>
      </div>

      {/* 1. Active Skills (List, Edit, Delete) */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          ./active_modules
        </h2>
        
        {skills.length === 0 ? (
          <div className="glass-panel p-6 text-center text-gray-500 text-sm italic">
            [ NO_ACTIVE_MODULES_FOUND ]
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            {skills.map((skill) => (
              <div key={skill.id} className={`glass-panel p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 group transition-all ${editId === skill.id ? 'border-yellow-500/50 bg-yellow-500/5' : 'hover:border-cyan-500/30'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-500 w-4 text-center">{skill.order}</span>
                  <div>
                    <h3 className={`font-bold text-sm ${editId === skill.id ? 'text-yellow-400' : 'text-cyan-100'}`}>{skill.name}</h3>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{skill.category} // {skill.status}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/admin/skills?edit=${skill.id}`}
                    scroll={false}
                    className="text-[10px] font-bold text-yellow-400 border border-yellow-500/30 px-3 py-1.5 hover:bg-yellow-500/10 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)] transition-all whitespace-nowrap"
                  >
                    [ EDIT ]
                  </Link>
                  
                  <form action={deleteSkill}>
                    <input type="hidden" name="id" value={skill.id} />
                    <button 
                      type="submit" 
                      className="text-[10px] font-bold text-red-400 border border-red-500/30 px-3 py-1.5 hover:bg-red-500/10 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] transition-all whitespace-nowrap"
                    >
                      [ DEL ]
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. Dynamic Form Section (Add OR Edit) */}
      <section className="glass-panel p-8 relative overflow-hidden" id="form-section">
        {skillToEdit ? (
          <>
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full pointer-events-none"></div>
            <h2 className="text-xl font-bold text-yellow-400 mb-6">./modify_module_parameters</h2>
            <EditSkillForm skill={skillToEdit} />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full pointer-events-none"></div>
            <h2 className="text-xl font-bold text-white mb-6">./upload_new_module</h2>
            <AddSkillForm />
          </>
        )}
      </section>
    </main>
  )
}