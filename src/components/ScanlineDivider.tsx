'use client'

import { motion } from 'framer-motion'

export default function ScanlineDivider() {
  return (
    <div className="h-px bg-white/10 flex-1 relative overflow-hidden flex items-center">
      <motion.div
        initial={{ left: '-20%', opacity: 0 }}
        whileInView={{ left: '100%', opacity: [0, 1, 1, 0] }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(0,240,255,0.8)]"
      />
    </div>
  )
}