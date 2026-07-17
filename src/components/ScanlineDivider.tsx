'use client'

export default function ScanlineDivider() {
  return (
    <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00f0ff]/30 via-[#00f0ff]/10 to-transparent relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_40%,#00f0ff_50%,transparent_60%)] bg-[size:200%_100%] animate-[shimmer_3s_infinite_linear]" />
    </div>
  )
}