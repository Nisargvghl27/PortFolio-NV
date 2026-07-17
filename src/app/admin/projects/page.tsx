import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AddProjectForm from '@/components/AddProjectForm'
import EditProjectForm from '@/components/EditProjectForm'
import { deleteProject } from '@/app/actions/project'

export default async function ProjectsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>
}) {
  // In Next.js 15, searchParams is a Promise
  const resolvedParams = await searchParams
  const editId = resolvedParams.edit

  // Fetch all projects for the list
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // If the URL has ?edit=id, fetch that specific project to populate the form
  let projectToEdit = null
  if (editId) {
    projectToEdit = await prisma.project.findUnique({
      where: { id: editId }
    })
  }

  return (
    <main className="max-w-2xl mx-auto px-6 pt-12 pb-24 space-y-12 font-mono relative z-10">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold text-white">Admin // <span className="text-cyan-400">Projects</span></h1>
        <Link href="/admin" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">[ &lt;&lt; BACK_TO_HUB ]</Link>
      </div>

      {/* 1. Active Systems (List, Edit, Delete) */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          ./active_systems
        </h2>
        
        {projects.length === 0 ? (
          <div className="glass-panel p-6 text-center text-gray-500 text-sm italic">
            [ NO_ACTIVE_SYSTEMS_FOUND ]
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {projects.map((project) => (
              <div key={project.id} className={`glass-panel p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 group transition-all ${editId === project.id ? 'border-yellow-500/50 bg-yellow-500/5' : 'hover:border-cyan-500/30'}`}>
                <div>
                  <h3 className={`font-bold text-lg ${editId === project.id ? 'text-yellow-400' : 'text-cyan-100'}`}>{project.title}</h3>
                  <p className="text-xs text-gray-500 truncate max-w-[350px] mt-1">{project.description}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* EDIT BUTTON (Updates the URL to trigger the edit form) */}
                  <Link 
                    href={`/admin/projects?edit=${project.id}`}
                    scroll={false}
                    className="text-xs font-bold text-yellow-400 border border-yellow-500/30 px-4 py-2 hover:bg-yellow-500/10 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)] transition-all whitespace-nowrap"
                  >
                    [ EDIT ]
                  </Link>

                  {/* DELETE BUTTON */}
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <button 
                      type="submit" 
                      className="text-xs font-bold text-red-400 border border-red-500/30 px-4 py-2 hover:bg-red-500/10 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] transition-all whitespace-nowrap"
                    >
                      [ DELETE ]
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
        {projectToEdit ? (
          <>
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full pointer-events-none"></div>
            <h2 className="text-xl font-bold text-yellow-400 mb-6">./modify_system_parameters</h2>
            <EditProjectForm project={projectToEdit} />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full pointer-events-none"></div>
            <h2 className="text-xl font-bold text-white mb-6">./deploy_new_system</h2>
            <AddProjectForm />
          </>
        )}
      </section>

    </main>
  )
}