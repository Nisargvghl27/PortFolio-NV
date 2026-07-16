'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'

// Categories for filter buttons
const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'Languages', label: 'LANGUAGES' },
  { id: 'Frontend', label: 'FRONTEND' },
  { id: 'Backend', label: 'BACKEND' },
  { id: 'Tools_&_DevOps', label: 'DEVOPS & TOOLS' }
]

// Mapping of custom SVG icons for each skill
const skillIcons: Record<string, React.ReactNode> = {
  TypeScript: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.163 9.395h-3.108v9.902h-3.085V9.395H9.017V6.705h9.271v2.69zm3.504 5.922c0 2.94-1.921 4.298-4.977 4.298-1.74 0-3.324-.627-4.14-1.428l1.378-2.222c.783.748 1.838 1.258 2.87 1.258 1.488 0 2.213-.67 2.213-1.63 0-.96-.605-1.485-2.022-2.09l-.887-.375c-2.483-1.047-3.69-2.31-3.69-4.57 0-2.836 2.055-4.21 4.545-4.21 1.688 0 3.016.516 3.75 1.144l-1.305 2.247c-.69-.477-1.503-.812-2.385-.812-1.296 0-1.896.591-1.896 1.344 0 .807.562 1.22 1.807 1.745l.885.378c2.616 1.103 3.863 2.378 3.863 4.966z" />
    </svg>
  ),
  JavaScript: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0V0zm22.034 18.268c-.175-1.53-1.135-2.643-2.925-3.203-1.16-.36-2.685-.68-2.685-1.53 0-.44.41-.66 1.09-.66.84 0 1.5.34 1.895 1.02.26-.49.965-.965 1.58-1.3-1.01-1.67-2.66-2.24-4.565-2.24-3.415 0-5.01 2.29-5.01 4.565 0 3.12 2.07 4.15 4.395 4.8 2.685.74 3.44.92 3.44 2.24 0 .72-.53 1.12-1.39 1.12-1.22 0-1.92-.61-2.42-1.54l-1.36.96c.74 1.53 2.16 2.06 3.655 2.06 2.87 0 5.485-1.33 5.485-4.31zM9.465 11.53h1.835v9.11c0 2.28-.68 3.36-2.73 3.36-1.57 0-2.49-.66-3.055-1.5l1.32-.9c.42.66.97.96 1.735.96.885 0 1.01-.58 1.01-1.89V11.53z" />
    </svg>
  ),
  Python: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.25.18c.9 0 1.66.73 1.66 1.65v2.85h2.47c1.7 0 2.5 1.04 2.5 2.76v3.2c0 1.7-.8 2.8-2.5 2.8h-1.6v-1.6H14.2v2.7h-3.4v1.6H6.1c-1.7 0-2.5-1-2.5-2.8v-3.2c0-1.7.8-2.8 2.5-2.8h2.4V4.6C8.5 2.9 9.3 1.8 11 1.8h3.2zm-2.8 2.5a.7.7 0 100 1.4.7.7 0 000-1.4zm6.6 6.6a.7.7 0 100 1.4.7.7 0 000-1.4z" />
      <path d="M9.75 23.82c-.9 0-1.66-.73-1.66-1.65v-2.85H5.62c-1.7 0-2.5-1.04-2.5-2.76v-3.2c0-1.7.8-2.8 2.5-2.8h1.6v1.6H9.8v-2.7h3.4v-1.6h4.7c1.7 0 2.5 1 2.5 2.8v3.2c0 1.7-.8 2.8-2.5 2.8h-2.4v2.9c0 1.7-.8 2.8-2.5 2.8H9.75zm2.8-2.5a.7.7 0 100-1.4.7.7 0 000 1.4zm-6.6-6.6a.7.7 0 100-1.4.7.7 0 000-1.4z" />
    </svg>
  ),
  Dart: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L2.4 9.6l2.1 2.1 5.4-5.4 7.2 7.2 2.1-2.1L12 0zm-2.1 8.7L2.4 16.2l9.6 9.6 4.5-4.5-9.6-9.6-1.5 1.5l4.5 4.5-.6.6-4.5-4.5-1.2 1.2 5.7 5.7 3.3-3.3-5.7-5.7z" />
    </svg>
  ),
  'C++': (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.35 12c0-5.32 4.31-9.65 9.65-9.65 2.85 0 5.42 1.24 7.2 3.22l2.67-2.67C19.26 1.05 15.82 0 12 0 5.37 0 0 5.37 0 12s5.37 12 12 12c3.82 0 7.26-1.05 9.87-2.9l-2.67-2.67c-1.78 1.98-4.35 3.22-7.2 3.22-5.34 0-9.65-4.33-9.65-9.65zM17.4 10.5v3h-3v1h3v3h1h.1v-3h3v-1h-3v-3zm5.6 0v3h-3v1h3v3h1.1v-3h3v-1h-3v-3z" />
    </svg>
  ),
  Java: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.02 21.058c-1.396.066-2.697-.243-3.69-.974-.634-.467-.937-1.042-.904-1.745.034-.73.435-1.315 1.103-1.8 1.157-.84 2.87-1.26 4.793-1.264.444 0 .86.012 1.268.038-.344.423-.65.882-.907 1.378-1.57.067-2.906.33-3.722.842-.395.247-.61.5-.644.757-.037.282.164.55.602.793.856.47 2.228.723 3.864.708 1.488-.013 2.91-.252 4.004-.672.176.452.392.883.654 1.28-1.42.483-3.328.727-5.166.868zm9.585-7.794c.376.126.69.317.933.568.21.22.317.47.318.736a1.9 1.9 0 0 1-.365.992c-.173.238-.396.444-.664.62l.85 1.18c.456-.28.827-.638 1.1-1.054.343-.523.515-1.127.513-1.782-.002-.628-.198-1.196-.583-1.688-.415-.532-1.002-.937-1.747-1.2L18.6 13.26z" />
    </svg>
  ),
  'Next.js': (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 16V8l8 8" />
      <path d="M12 8v4" />
    </svg>
  ),
  React: (
    <svg className="w-3.5 h-3.5 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  'Tailwind CSS': (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 6.036c-2.286 0-3.428 1.143-3.428 3.429 0 2.285 1.142 3.428 3.428 3.428 2.286 0 3.429-1.143 3.429-3.428 0-2.286-1.143-3.429-3.429-3.429zm0 7.429c-2.286 0-3.428 1.143-3.428 3.428 0 2.286 1.142 3.429 3.428 3.429 2.286 0 3.429-1.143 3.429-3.429 0-2.285-1.143-3.428-3.429-3.428z" />
    </svg>
  ),
  'Framer Motion': (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h12v12H0V0zm12 12h12v12H12V12zm0-12h12l-12 12V0zM0 12h12L0 24V12z" />
    </svg>
  ),
  Flutter: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.3 0L0 14.3 4.5 18.8 23.3 0H14.3zM14.3 9.2L9.8 13.7 14.3 18.2 23.3 9.2H14.3zM14.3 18.4L9.8 22.9 8.7 24H17.7L22.2 19.5 23.3 18.4H14.3z" />
    </svg>
  ),
  'Node.js': (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l-10.4 6v12l10.4 6 10.4-6v-12l-10.4-6zm-1.8 17.2c-.8 0-1.5-.3-2.1-.9-.6-.6-.9-1.3-.9-2.1v-.8h1.8v.8c0 .3.1.6.3.8.2.2.5.3.8.3.3 0 .6-.1.8-.3.2-.2.3-.5.3-.8 0-.3-.1-.5-.3-.7l-.8-.6c-1-.7-1.5-1.5-1.5-2.5 0-.8.3-1.5.9-2.1.6-.6 1.3-.9 2.1-.9.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v.8h-1.8v-.8c0-.3-.1-.6-.3-.8-.2-.2-.5-.3-.8-.3-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8 0 .3.1.5.3.7l.8.6c1 .7 1.5 1.5 1.5 2.5 0 .8-.3 1.5-.9 2.1-.6.6-1.3.9-2.1.9z" />
    </svg>
  ),
  Express: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 9h4M7 12h4M7 15h2" />
    </svg>
  ),
  PostgreSQL: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
    </svg>
  ),
  Prisma: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L1.5 18h21L12 0zm0 4.4L18.8 16H5.2L12 4.4z" />
    </svg>
  ),
  Supabase: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.36 9.886H12.89l5.054-9.043A.77.77 0 0017.27.02L2.64 11.233a.77.77 0 00.323 1.343h8.471l-5.055 9.043a.77.77 0 00.672.825l14.63-12.212a.77.77 0 00-.322-1.346z" />
    </svg>
  ),
  'REST APIs': (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Git: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.2 10.8L13.2.8C12.7.3 12 .3 11.5.8L9.2 3.1l2.4 2.4c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.4 2.4c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5l-2.4-2.4c-.2.1-.4.2-.6.2-.2 0-.4-.1-.6-.2L8.5 11l.2.6c.2.5.1 1.1-.3 1.5-.4.4-1 .5-1.5.3L4.5 15.8c.2.5.1 1.1-.3 1.5-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.4-.4 1-.5 1.5-.3l2.4-2.4c-.2-.5-.1-1.1.3-1.5.4-.4 1-.5 1.5-.3l2.4-2.4L.8 11.5c-.5-.5-.5-1.2 0-1.7l10-10C11.3-.7 12-.7 12.5-.2l10.7 10.7c.5.5.5 1.3 0 1.8-.5-.5-.5-.5 0 0z" />
    </svg>
  ),
  GitHub: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  Docker: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119c.102 0 .186-.084.186-.186V8.77c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.122c0 .101.084.186.186.186zm-2.93 0h2.119c.102 0 .185-.084.185-.186V8.77c0-.102-.083-.186-.185-.186h-2.119c-.102 0-.186.084-.186.186v2.122c0 .101.084.186.186.186zm-2.93 0h2.12c.102 0 .185-.084.185-.186V8.77c0-.102-.083-.186-.185-.186h-2.12c-.102 0-.186.084-.186.186v2.122c0 .101.084.186.186.186zm-2.93 0h2.119c.102 0 .185-.084.185-.186V8.77c0-.102-.083-.186-.185-.186H5.193c-.102 0-.185.084-.185.186v2.122c0 .101.083.186.185.186zm-2.93 0h2.12c.102 0 .185-.084.185-.186V8.77c0-.102-.083-.186-.185-.186h-2.12c-.102 0-.186.084-.186.186v2.122c0 .101.084.186.186.186zm2.93-2.93h2.12c.102 0 .185-.084.185-.185V5.84c0-.102-.083-.186-.185-.186h-2.12c-.102 0-.186.084-.186.186v2.121c0 .101.084.185.186.185zm2.93 0h2.119c.102 0 .185-.084.185-.185V5.84c0-.102-.083-.186-.185-.186h-2.119c-.102 0-.185.084-.185.186v2.121c0 .101.083.185.185.185zm2.93 0h2.12c.102 0 .185-.084.185-.185V5.84c0-.102-.083-.186-.185-.186h-2.12c-.102 0-.186.084-.186.186v2.121c0 .101.084.185.186.185zm-8.79 0h2.119c.102 0 .185-.084.185-.185V5.84c0-.102-.083-.186-.185-.186H5.193c-.102 0-.185.084-.185.186v2.121c0 .101.083.185.185.185zm12.012-4.148c-.115-.039-.314-.09-.506-.09h-3.23c-.102 0-.186.083-.186.185v2.122c0 .101.084.185.186.185h3.23c.102 0 .186-.084.186-.185v-2.122a.185.185 0 00-.18-.195zm5.72 5.08c-.287-.417-.798-.57-1.312-.663l-.147-.025c-.217-.037-.461-.077-.732-.077h-.146v1.464h.146c.928 0 1.633.242 1.633.585 0 .285-.5.586-1.633.586h-17.7c-1.127 0-1.633-.301-1.633-.586 0-.343.705-.585 1.633-.585h.88V6.848H2.3c-.928 0-1.633.243-1.633.586 0 .307.567.625 1.838.641l.245.002H21.5c1.472 0 2.213-.67 2.213-1.642 0-.36-.103-.7-.272-1.015z" />
    </svg>
  ),
  Vercel: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 22.525H0L12 1.475L24 22.525Z" />
    </svg>
  ),
  Linux: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-.67 0-1.28.08-1.84.23-.27.08-.54.2-.76.38-.45.35-.74.88-.79 1.44-.06.7.21 1.4.67 1.94.34.4.83.69 1.34.82.52.14 1.07.13 1.59-.03.5-.16.96-.48 1.28-.9.41-.53.62-1.2.55-1.86-.06-.55-.32-1.07-.74-1.42-.23-.2-.5-.32-.78-.4-.53-.14-1.09-.2-1.62-.2zm-3.03 2.82c-.36.08-.7.25-.97.51-.43.43-.65 1.02-.6 1.63.04.57.3 1.1.72 1.48.42.38.97.58 1.54.55.53-.02 1.05-.23 1.44-.59.4-.38.64-.9.67-1.45.03-.58-.19-1.15-.59-1.57-.4-.42-.96-.65-1.54-.64-.23 0-.46.03-.67.08z" />
    </svg>
  ),
  Postman: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.836 14.18c-.378.118-.755.195-1.127.234-.51.055-.99.075-1.425.06-1.15-.04-2.144-.316-2.923-.812-.66-.42-1.14-.997-1.41-1.696-.067-.17-.116-.35-.145-.536-.046-.3-.046-.615-.002-.91.063-.443.208-.857.433-1.233.364-.606.914-1.07 1.622-1.37.587-.247 1.272-.376 2.015-.376.814 0 1.542.155 2.128.455.52.266.924.646 1.182 1.11.23.414.34 88.005.327 1.36-.01 1.04-.374 1.954-1.085 2.678-.582.593-1.365.945-2.222 1.026z" />
    </svg>
  )
}

interface Skill {
  name: string
  category: string
  color: string
  level: string
  latency: string
  status: string
  desc: string
}

const skillsData: Skill[] = [
  { name: 'TypeScript', category: 'Languages', color: 'hover:text-[#3178C6] hover:border-[#3178C6]/50 hover:bg-[#3178C6]/5', level: '92%', latency: '8ms', status: 'READY', desc: 'Type-safe JavaScript compilation' },
  { name: 'JavaScript', category: 'Languages', color: 'hover:text-[#F7DF1E] hover:border-[#F7DF1E]/50 hover:bg-[#F7DF1E]/5', level: '95%', latency: '6ms', status: 'READY', desc: 'ECMAScript core logic & scripting' },
  { name: 'Python', category: 'Languages', color: 'hover:text-[#3776AB] hover:border-[#3776AB]/50 hover:bg-[#3776AB]/5', level: '85%', latency: '24ms', status: 'OPTIMIZED', desc: 'Automation, analytics & backend' },
  { name: 'Dart', category: 'Languages', color: 'hover:text-[#0175C2] hover:border-[#0175C2]/50 hover:bg-[#0175C2]/5', level: '78%', latency: '18ms', status: 'READY', desc: 'Cross-platform app code base' },
  { name: 'C++', category: 'Languages', color: 'hover:text-[#00599C] hover:border-[#00599C]/50 hover:bg-[#00599C]/5', level: '80%', latency: '4ms', status: 'OPTIMIZED', desc: 'Performant systems & low-level structures' },
  { name: 'Java', category: 'Languages', color: 'hover:text-[#ED8B00] hover:border-[#ED8B00]/50 hover:bg-[#ED8B00]/5', level: '75%', latency: '35ms', status: 'READY', desc: 'OOP systems & legacy integrations' },
  
  { name: 'Next.js', category: 'Frontend', color: 'hover:text-white hover:border-white/50 hover:bg-white/5', level: '90%', latency: '12ms', status: 'OPTIMIZED', desc: 'Server-side rendering & app routing' },
  { name: 'React', category: 'Frontend', color: 'hover:text-[#61DAFB] hover:border-[#61DAFB]/50 hover:bg-[#61DAFB]/5', level: '94%', latency: '8ms', status: 'READY', desc: 'Component architectures & state layers' },
  { name: 'Tailwind CSS', category: 'Frontend', color: 'hover:text-[#06B6D4] hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/5', level: '96%', latency: '2ms', status: 'READY', desc: 'Utility-first layout engines' },
  { name: 'Framer Motion', category: 'Frontend', color: 'hover:text-[#F024B6] hover:border-[#F024B6]/50 hover:bg-[#F024B6]/5', level: '88%', latency: '15ms', status: 'READY', desc: 'High-performance visual physics' },
  { name: 'Flutter', category: 'Frontend', color: 'hover:text-[#02569B] hover:border-[#02569B]/50 hover:bg-[#02569B]/5', level: '80%', latency: '22ms', status: 'READY', desc: 'Multi-platform user interfaces' },
  
  { name: 'Node.js', category: 'Backend', color: 'hover:text-[#339933] hover:border-[#339933]/50 hover:bg-[#339933]/5', level: '88%', latency: '14ms', status: 'READY', desc: 'Asynchronous event-driven runtimes' },
  { name: 'Express', category: 'Backend', color: 'hover:text-gray-300 hover:border-gray-500/50 hover:bg-gray-500/5', level: '88%', latency: '10ms', status: 'READY', desc: 'REST server request management' },
  { name: 'PostgreSQL', category: 'Backend', color: 'hover:text-[#4169E1] hover:border-[#4169E1]/50 hover:bg-[#4169E1]/5', level: '84%', latency: '28ms', status: 'OPTIMIZED', desc: 'Relational data structures & queries' },
  { name: 'Prisma', category: 'Backend', color: 'hover:text-white hover:border-white/50 hover:bg-white/5', level: '90%', latency: '5ms', status: 'READY', desc: 'ORM data schema declaration' },
  { name: 'Supabase', category: 'Backend', color: 'hover:text-[#3ECF8E] hover:border-[#3ECF8E]/50 hover:bg-[#3ECF8E]/5', level: '85%', latency: '16ms', status: 'READY', desc: 'Serverless datastore & security' },
  { name: 'REST APIs', category: 'Backend', color: 'hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5', level: '92%', latency: '12ms', status: 'READY', desc: 'HTTP data-exchange protocols' },
  
  { name: 'Git', category: 'Tools_&_DevOps', color: 'hover:text-[#F05032] hover:border-[#F05032]/50 hover:bg-[#F05032]/5', level: '90%', latency: '4ms', status: 'READY', desc: 'Decentralized version control' },
  { name: 'GitHub', category: 'Tools_&_DevOps', color: 'hover:text-white hover:border-white/50 hover:bg-white/5', level: '92%', latency: '5ms', status: 'READY', desc: 'Workflows & repository operations' },
  { name: 'Docker', category: 'Tools_&_DevOps', color: 'hover:text-[#2496ED] hover:border-[#2496ED]/50 hover:bg-[#2496ED]/5', level: '80%', latency: '45ms', status: 'OPTIMIZED', desc: 'Container deployment sandboxing' },
  { name: 'Vercel', category: 'Tools_&_DevOps', color: 'hover:text-white hover:border-white/50 hover:bg-white/5', level: '95%', latency: '8ms', status: 'READY', desc: 'Global edge deployment networks' },
  { name: 'Linux', category: 'Tools_&_DevOps', color: 'hover:text-[#FCC624] hover:border-[#FCC624]/50 hover:bg-[#FCC624]/5', level: '85%', latency: '10ms', status: 'READY', desc: 'CLI scripts & server admin' },
  { name: 'Postman', category: 'Tools_&_DevOps', color: 'hover:text-[#FF6C37] hover:border-[#FF6C37]/50 hover:bg-[#FF6C37]/5', level: '88%', latency: '12ms', status: 'READY', desc: 'HTTP request diagnostics' }
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter(skill => skill.category === activeCategory)

  return (
    <div className="font-mono w-full max-w-6xl mx-auto relative px-4">
      <FadeIn delay={0.1} direction="up">
        <div className="space-y-6">
          
          {/* 1. Centered Terminal Filter Bar (Restore Previous Arrangement) */}
          <div className="flex flex-wrap gap-2.5 justify-center border-b border-white/10 pb-5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 border transition-all text-xs font-bold uppercase tracking-wider select-none ${
                    isActive
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                      : 'border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                  }`}
                >
                  {isActive && (
                    <>
                      <span className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-cyan-400" />
                      <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-cyan-400" />
                    </>
                  )}
                  [ {cat.label} ]
                </button>
              )
            })}
          </div>

          {/* 2. Main Deck Grid - Stretched height box sizes preserved */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Left Card: Skill tag deck (Centered tags, no left card header - Restore Previous Arrangement) */}
            <div className="lg:col-span-2 relative glass-panel p-8 border border-white/10 rounded-lg overflow-hidden bg-black/60 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col justify-center min-h-[340px]">
              {/* Background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Intersect symbols */}
              <span className="absolute top-2 left-2 text-cyan-500/40 text-xs font-bold pointer-events-none select-none">+</span>
              <span className="absolute top-2 right-2 text-cyan-500/40 text-xs font-bold pointer-events-none select-none">+</span>
              <span className="absolute bottom-2 left-2 text-cyan-500/40 text-xs font-bold pointer-events-none select-none">+</span>
              <span className="absolute bottom-2 right-2 text-cyan-500/40 text-xs font-bold pointer-events-none select-none">+</span>

              {/* Ambient center cyan shadow glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/5 blur-3xl pointer-events-none" />

              {/* Centered flow of tags */}
              <motion.div 
                layout 
                className="flex flex-wrap gap-4 justify-center items-center max-w-3xl mx-auto relative z-10"
              >
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill) => (
                    <motion.span
                      layout
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: -10 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`group relative flex items-center gap-2 bg-black/40 border border-white/10 text-gray-300 text-xs px-4 py-2 font-mono transition-all duration-300 cursor-default select-none rounded-sm shadow-sm ${skill.color}`}
                    >
                      <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20 group-hover:border-cyan-400 group-hover:w-1.5 group-hover:h-1.5 transition-all" />
                      <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20 group-hover:border-cyan-400 group-hover:w-1.5 group-hover:h-1.5 transition-all" />

                      {skillIcons[skill.name] && (
                        <span className="text-gray-400 group-hover:text-inherit transition-colors duration-300">
                          {skillIcons[skill.name]}
                        </span>
                      )}
                      <span className="relative tracking-wider font-semibold">
                        {skill.name}
                      </span>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Card: Live Diagnostics Deck (Takes 1 column) */}
            <div className="lg:col-span-1 relative glass-panel p-5 border border-white/10 rounded-lg bg-black/85 shadow-[0_0_40px_rgba(0,240,255,0.03)] flex flex-col justify-between overflow-hidden min-h-[340px]">
              
              {/* Scanline Sweep Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,240,255,0.06)_50%,transparent_60%)] bg-[size:100%_300%] pointer-events-none animate-[pulse_5s_ease-in-out_infinite]" />

              {/* Corner coordinates */}
              <div className="absolute top-2 right-2 text-[8px] text-gray-600 font-mono tracking-widest z-10 select-none">[ COORD_X_09 ]</div>
              
              <div className="relative z-10">
                {/* HUD Title */}
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4 select-none">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                  <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">SYSTEM_DIAGNOSTICS v3.2</span>
                </div>

                <AnimatePresence mode="wait">
                  {hoveredSkill ? (
                    <motion.div
                      key={hoveredSkill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="space-y-3 text-xs text-gray-400 font-mono"
                    >
                      {/* Brand Label Accent Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">// TECHNAME</span>
                          <div className="text-sm font-bold text-white tracking-widest uppercase">{hoveredSkill.name}</div>
                        </div>
                        <span className="text-[9px] text-cyan-400/80 px-2 py-0.5 border border-cyan-500/20 bg-cyan-500/5 select-none">[ ACTIVE ]</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">// CLASSIFY</span>
                          <div className="text-cyan-300 font-semibold text-[11px] truncate">{hoveredSkill.category}</div>
                        </div>
                        <div>
                          <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">// LATENCY</span>
                          <div className="text-green-400 text-[11px]">{hoveredSkill.latency}</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">// familiarity_bar</span>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-white/5 h-2 rounded-sm overflow-hidden border border-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: hoveredSkill.level }}
                              transition={{ duration: 0.4, ease: 'easeOut' }}
                              className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-full shadow-[0_0_8px_rgba(0,240,255,0.4)]"
                            />
                          </div>
                          <span className="text-[10px] text-cyan-400 font-bold">{hoveredSkill.level}</span>
                        </div>
                      </div>

                      {/* Live SVG Signal Pulse Animation */}
                      <div className="relative h-6 w-full bg-white/5 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full text-cyan-500/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                          <motion.path
                            d="M0 10 Q 25 10, 50 10 T 100 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            animate={{
                              d: [
                                "M0 10 Q 15 2, 30 10 T 60 10 T 80 18 T 100 10",
                                "M0 10 Q 15 18, 30 10 T 60 10 T 80 2 T 100 10",
                                "M0 10 Q 15 2, 30 10 T 60 10 T 80 18 T 100 10"
                              ]
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.2,
                              ease: "linear"
                            }}
                          />
                        </svg>
                        <span className="relative text-[8px] font-bold text-cyan-400 tracking-widest z-10 animate-pulse select-none">
                          TELEMETRY STREAMING LIVE
                        </span>
                      </div>

                      <div className="border-t border-white/5 pt-2 mt-1.5">
                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">// DESCR_DATA</span>
                        <p className="text-[10px] leading-relaxed text-gray-400 italic">
                          {hoveredSkill.desc}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="standby"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-6 flex flex-col items-center justify-center text-center font-mono space-y-4"
                    >
                      {/* Rotating concentric radar grid */}
                      <div className="relative w-28 h-28 mx-auto flex items-center justify-center border border-white/5 rounded-full overflow-hidden bg-black/40 shadow-[0_0_15px_rgba(0,240,255,0.02)]">
                        {/* Sweeping line */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/15 to-transparent rounded-full animate-[spin_3s_linear_infinite]" />
                        {/* Crosshairs */}
                        <div className="absolute w-full h-[1px] bg-white/5" />
                        <div className="absolute h-full w-[1px] bg-white/5" />
                        {/* Concentric rings */}
                        <div className="absolute w-20 h-20 border border-white/5 rounded-full" />
                        <div className="absolute w-10 h-10 border border-cyan-500/10 rounded-full" />
                        {/* Pulsing core node */}
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping absolute" />
                        <span className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                      </div>

                      <div className="space-y-1 px-2 select-none">
                        <div className="uppercase tracking-widest font-bold text-cyan-500/40 text-[9px] animate-pulse">
                          [ AWAITING_TELEMETRY ]
                        </div>
                        <p className="text-[9px] text-gray-500 leading-normal max-w-[200px] mx-auto uppercase">
                          Hover over any tech card to stream parameters.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Rolling System Log */}
              <div className="border-t border-white/10 pt-2.5 text-[8px] text-gray-500 flex flex-col gap-0.5 select-none z-10 relative">
                <div className="flex justify-between text-gray-600 font-bold uppercase tracking-wider">
                  <span>LOG: SYSTEM_DESTRUCT_BYPASS</span>
                  <span>STATUS: SECURE</span>
                </div>
                <div className="text-cyan-500/70 font-semibold truncate uppercase">
                  {hoveredSkill 
                    ? `[ TSC: 100% | LATENCY: ${hoveredSkill.latency} | PKT: OK ]`
                    : '[ STANDBY // DECK_MONITOR_ON_STANDBY_MODE ]'
                  }
                </div>
              </div>

            </div>
          </div>

        </div>
      </FadeIn>
    </div>
  )
}