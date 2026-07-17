'use client'

import { motion } from 'framer-motion'

interface CyberButtonProps {
  text: string
  primary?: boolean
  onClick?: () => void
}

export default function CyberButton({ text, primary = false, onClick }: CyberButtonProps) {
  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`relative group px-6 py-3 md:px-8 md:py-4 font-mono text-xs md:text-sm font-bold tracking-widest uppercase overflow-hidden transition-colors ${
        primary
          ? 'text-black bg-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)]'
          : 'text-[#00f0ff] bg-black/40 border border-[#00f0ff]/50 hover:bg-[#00f0ff]/10 backdrop-blur-sm'
      }`}
    >
      {/* Corner targeting brackets that appear on hover */}
      <span className={`absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 transition-opacity duration-300 ${primary ? 'border-black' : 'border-[#00f0ff]'} opacity-0 group-hover:opacity-100`} />
      <span className={`absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 transition-opacity duration-300 ${primary ? 'border-black' : 'border-[#00f0ff]'} opacity-0 group-hover:opacity-100`} />
      <span className={`absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 transition-opacity duration-300 ${primary ? 'border-black' : 'border-[#00f0ff]'} opacity-0 group-hover:opacity-100`} />
      <span className={`absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 transition-opacity duration-300 ${primary ? 'border-black' : 'border-[#00f0ff]'} opacity-0 group-hover:opacity-100`} />

      {/* Sweeping scanline effect */}
      <motion.div
        variants={{
          hover: { x: ['-150%', '250%'] }
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`absolute inset-0 w-3/4 h-full -skew-x-12 z-0 ${
          primary ? 'bg-white/40' : 'bg-[#00f0ff]/20'
        }`}
        style={{ left: '-150%' }}
      />

      {/* Button Text & Terminal Cursor */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        <motion.span
          variants={{ 
            hover: { x: -4, opacity: 1, display: 'inline-block' },
            rest: { x: 0, opacity: 0, display: 'none' }
          }}
          initial="rest"
          className="hidden sm:inline-block"
        >
          &gt;
        </motion.span>
        
        {text}
        
        <motion.span
          variants={{ 
            hover: { opacity: [0, 1, 0] },
            rest: { opacity: 0 }
          }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          initial="rest"
          className="inline-block w-2 h-3.5 bg-current translate-y-[2px]"
        />
      </span>
    </motion.button>
  )
}