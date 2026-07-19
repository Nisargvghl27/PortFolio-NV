export function CPSkeleton() {
  return (
    <div className="glass-panel relative overflow-hidden flex flex-col justify-between font-mono rounded-md min-h-[220px] animate-pulse">
      <div className="bg-black/50 border-b border-neon/20 px-4 py-2 flex items-center justify-between z-10">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-700" />
          <span className="w-2 h-2 rounded-full bg-slate-700" />
          <span className="w-2 h-2 rounded-full bg-slate-700" />
        </div>
        <div className="w-32 h-3 bg-neon/10 rounded"></div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-center relative z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-neon/10 pb-2">
            <div>
              <div className="w-16 h-2 bg-slate-800 rounded mb-2"></div>
              <div className="w-24 h-4 bg-slate-700 rounded"></div>
            </div>
            <div className="w-16 h-4 bg-emerald-500/10 rounded"></div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <div>
              <div className="w-20 h-2 bg-slate-800 rounded mb-2"></div>
              <div className="w-16 h-8 bg-neon/20 rounded mb-1"></div>
              <div className="w-12 h-2 bg-slate-700 rounded"></div>
            </div>
            <div>
              <div className="w-16 h-2 bg-slate-800 rounded mb-2"></div>
              <div className="w-16 h-8 bg-slate-700 rounded mb-1"></div>
              <div className="w-12 h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/30 border-t border-neon/10 px-4 py-2 flex items-center justify-between">
        <div className="w-20 h-2 bg-slate-800 rounded"></div>
        <div className="w-24 h-4 bg-slate-800 rounded"></div>
      </div>
    </div>
  )
}

export function LeetCodeSkeleton() {
  return (
    <div className="glass-panel relative overflow-hidden flex flex-col justify-between font-mono rounded-md min-h-[220px] animate-pulse">
      <div className="bg-black/50 border-b border-neon/20 px-4 py-2 flex items-center justify-between z-10">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-700" />
          <span className="w-2 h-2 rounded-full bg-slate-700" />
        </div>
        <div className="w-32 h-3 bg-neon/10 rounded"></div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-center relative z-10">
        <div className="flex flex-col sm:grid sm:grid-cols-5 gap-4 sm:items-center">
          <div className="sm:col-span-2 border-b sm:border-b-0 sm:border-r border-neon/20 pb-3 sm:pb-0 sm:pr-2 mb-2 sm:mb-0">
            <div className="w-20 h-2 bg-slate-800 rounded mb-3"></div>
            <div className="w-16 h-10 bg-slate-700 rounded mb-2"></div>
            <div className="w-16 h-2 bg-neon/10 rounded"></div>
          </div>

          <div className="sm:col-span-3 space-y-4 sm:pl-2">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <div className="w-10 h-2 bg-slate-700 rounded"></div>
                  <div className="w-6 h-2 bg-slate-700 rounded"></div>
                </div>
                <div className="h-1 bg-slate-800 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black/30 border-t border-neon/10 px-4 py-2 flex items-center justify-between">
        <div className="w-20 h-2 bg-slate-800 rounded"></div>
        <div className="w-24 h-4 bg-slate-800 rounded"></div>
      </div>
    </div>
  )
}
