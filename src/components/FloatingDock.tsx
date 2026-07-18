'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'

const dockItems = [
  {
    label: './github',
    href: 'https://github.com/nisargvghl27',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    )
  },
  {
    label: './linkedin',
    href: 'https://linkedin.com/in/nisargvghl27',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  {
    label: './codeforces',
    href: 'https://codeforces.com/profile/nisargvghl27',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 7.5c.83 0 1.5.67 1.5 1.5v10.5c0 .83-.67 1.5-1.5 1.5h-3C.67 21 0 20.33 0 19.5V9c0-.83.67-1.5 1.5-1.5h3zm9-4.5c.83 0 1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5h-3c-.83 0-1.5-.67-1.5-1.5v-15c0-.83.67-1.5 1.5-1.5h3zm9 7.5c.83 0 1.5.67 1.5 1.5v7.5c0 .83-.67 1.5-1.5 1.5h-3c-.83 0-1.5-.67-1.5-1.5V12c0-.83.67-1.5 1.5-1.5h3z" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    label: './leetcode',
    href: 'https://leetcode.com/u/nisargvghl27/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    label: './resume',
    href: '/resume.pdf',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    )
  }
]

// Framer Motion Animation Variants for Page Load Stagger
const containerVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 16,
      staggerChildren: 0.08,
      delayChildren: 0.4
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.7 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 140, damping: 12 }
  }
}

// Variants for Mobile Dock Container to handle staggering
const mobileContainerVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.9,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 }
  },
  visible: {
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring" as const, 
      stiffness: 200, 
      damping: 20, 
      staggerChildren: 0.05, 
      delayChildren: 0.05 
    }
  }
}

// Variants for Individual Mobile Dock Items
const mobileItemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 }
}

function DockIcon({
  mouseX,
  label,
  href,
  icon,
  hoveredIndex,
  idx,
  setHoveredIndex
}: {
  mouseX: any
  label: string
  href: string
  icon: React.ReactNode
  hoveredIndex: number | null
  idx: number
  setHoveredIndex: (idx: number | null) => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [isBouncing, setIsBouncing] = useState(false)
  const [showRipple, setShowRipple] = useState(false)
  const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 })

  // Calculate distance between mouse X and center of this icon
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Dynamic width and height of the icon button container (scales from 40px to 56px)
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 56, 40])
  
  // Dynamic internal SVG size (scales from 16px to 22px)
  const iconSizeTransform = useTransform(distance, [-150, 0, 150], [18, 24, 18])

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  })

  const iconSize = useSpring(iconSizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  })

  // Magnetic Pull Calculation when cursor moves inside the button
  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (bounds) {
      const x = e.clientX - bounds.left - bounds.width / 2
      const y = e.clientY - bounds.top - bounds.height / 2
      // Move by 35% towards cursor position
      setMagneticPosition({ x: x * 0.6, y: y * 0.6 })
    }
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setMagneticPosition({ x: 0.5, y: 0.5 })
  }

  // Bounces the icon when clicked + fires neon ripple wave
  const handleTap = () => {
    setIsBouncing(true)
    setShowRipple(true)
    setTimeout(() => setIsBouncing(false), 2400)
    setTimeout(() => setShowRipple(false), 800)
  }

  return (
    <motion.div
      variants={itemVariants}
      className="relative flex items-center justify-center h-full"
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Blinking tooltips above icons on hover */}
      <AnimatePresence>
        {hoveredIndex === idx && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: -38, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.85 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/90 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] rounded whitespace-nowrap glow-text pointer-events-none z-10 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleTap}
        onMouseMove={handleMouseMove}
        style={{ width, height: width }}
        animate={
          isBouncing 
            ? { 
                y: [0, -18, 0, -12, 0, -6, 0, -2, 0], 
                x: 0,
                transition: { 
                  duration: 1.8, 
                  ease: "easeInOut",
                  times: [0, 0.15, 0.3, 0.45, 0.6, 0.72, 0.82, 0.92, 1] 
                } 
              } 
            : hoveredIndex === idx 
              ? { x: magneticPosition.x, y: magneticPosition.y - 6  } 
              : { x: 0, y: 0 }
        }
        whileHover={{ 
          borderColor: 'rgba(0, 240, 255, 0.6)',
          boxShadow: '0 8px 16px rgba(0, 240, 255, 0.25)',
        }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 220, damping: 15 }}
        className="flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer relative"
      >
        {/* Soft neon background glow on hover */}
        {hoveredIndex === idx && (
          <motion.div
            layoutId="dock-bg-glow"
            className="absolute inset-0 rounded-full bg-cyan-500/10 blur-sm pointer-events-none"
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          />
        )}

        {/* Tap Ripple Ring Effect */}
        <AnimatePresence>
          {showRipple && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-cyan-400 bg-cyan-500/10 pointer-events-none z-0"
            />
          )}
        </AnimatePresence>
        
        {/* SVG Icon with subtle hover wiggle */}
        <motion.div 
          style={{ width: iconSize, height: iconSize }} 
          whileHover={{ rotate: [0, -10, 8, 0], transition: { duration: 0.4 } }}
          className="flex items-center justify-center [&>svg]:w-full [&>svg]:h-full z-10"
        >
          {icon}
        </motion.div>
      </motion.a>

      {/* Shared Sliding Indicator Dot at the bottom with breathing/pulsing animation */}
      {hoveredIndex === idx && (
        <motion.div
          layoutId="dock-indicator"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            scale: { repeat: Infinity, duration: 1.6, ease: "easeInOut" },
            opacity: { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
          }}
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] z-20"
        />
      )}
    </motion.div>
  )
}

export default function FloatingDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mouseX = useMotionValue(Infinity)
  const pathname = usePathname()

  // Hide the dock on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <>
      {/* --- DESKTOP DOCK --- */}
      <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 justify-center w-full max-w-fit px-4 pointer-events-none">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="glass-panel px-3.5 rounded-2xl flex items-center gap-3 bg-black/60 backdrop-blur-lg border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-auto h-16"
        >
          {dockItems.map((item, idx) => (
            <DockIcon 
              key={item.label}
              mouseX={mouseX}
              label={item.label}
              href={item.href}
              icon={item.icon}
              hoveredIndex={hoveredIndex}
              idx={idx}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </motion.div>
      </div>

      {/* --- MOBILE DOCK (HAMBURGER MENU) --- */}
      <div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="glass-panel mb-4 rounded-full bg-black/80 backdrop-blur-lg border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col gap-2 p-2"
            >
              {dockItems.map((item) => (
                <motion.a
                  key={item.label}
                  variants={mobileItemVariants}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  title={item.label}
                  className="flex items-center justify-center p-3 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                >
                  <div className="[&>svg]:w-5 [&>svg]:h-5">
                    {item.icon}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          className="glass-panel w-14 h-14 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-lg border border-white/10 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:border-cyan-500/50 transition-all z-50"
        >
          {isMobileMenuOpen ? (
            // Close (X) Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            // Hamburger (3 Line) Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </motion.button>
      </div>
    </>
  )
}