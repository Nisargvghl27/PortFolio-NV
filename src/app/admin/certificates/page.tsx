import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AddCertificateForm from '@/components/admin/AddCertificateForm'
import EditCertificateForm from '@/components/admin/EditCertificateForm'
import { deleteCertificate } from '@/app/actions/certificates'

export default async function CertificatesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>
}) {
  const resolvedParams = await searchParams
  const editId = resolvedParams.edit

  const certificates = await prisma.certificate.findMany({
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' }
    ]
  })

  let certificateToEdit = null
  if (editId) {
    certificateToEdit = await prisma.certificate.findUnique({
      where: { id: editId }
    })
  }

  return (
    <main className="max-w-2xl mx-auto px-6 pt-12 pb-24 space-y-12 font-mono relative z-10">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold text-white">Admin // <span className="text-cyan-400">Certificates</span></h1>
        <Link href="/admin" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">[ &lt;&lt; BACK_TO_HUB ]</Link>
      </div>

      {/* 1. Active Certificates (List, Edit, Delete) */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          ./active_credentials
        </h2>
        
        {certificates.length === 0 ? (
          <div className="glass-panel p-6 text-center text-gray-500 text-sm italic">
            [ NO_ACTIVE_CREDENTIALS_FOUND ]
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {certificates.map((cert) => (
              <div key={cert.id} className={`glass-panel p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 group transition-all ${editId === cert.id ? 'border-yellow-500/50 bg-yellow-500/5' : 'hover:border-cyan-500/30'}`}>
                <div>
                  <h3 className={`font-bold text-lg ${editId === cert.id ? 'text-yellow-400' : 'text-cyan-100'}`}>{cert.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{cert.issuer} {`//`} {cert.date}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/admin/certificates?edit=${cert.id}`}
                    scroll={false}
                    className="text-xs font-bold text-yellow-400 border border-yellow-500/30 px-4 py-2 hover:bg-yellow-500/10 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)] transition-all whitespace-nowrap"
                  >
                    [ EDIT ]
                  </Link>
                  
                  <form action={deleteCertificate}>
                    <input type="hidden" name="id" value={cert.id} />
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
        {certificateToEdit ? (
          <>
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full pointer-events-none"></div>
            <h2 className="text-xl font-bold text-yellow-400 mb-6">./modify_credential_parameters</h2>
            <EditCertificateForm certificate={certificateToEdit} />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full pointer-events-none"></div>
            <h2 className="text-xl font-bold text-white mb-6">./upload_new_credential</h2>
            <AddCertificateForm />
          </>
        )}
      </section>
    </main>
  )
}