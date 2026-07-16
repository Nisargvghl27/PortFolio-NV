'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TerminalLine {
  text: string
  type: 'input' | 'output' | 'error' | 'system'
}

const COMMAND_DATA: Record<string, string[]> = {
  './specs.sh': [
    'Initializing diagnostics...',
    '--------------------------------------',
    'USER: Nisarg Vaghela',
    'ROLE: Full-Stack Software Engineer',
    'FOCUS: Scalable Architectures & ML',
    'STACK: Next.js, React, Node.js, Python',
    'DB: PostgreSQL (Prisma adapter)',
    'STATUS: Active / Available for Opportunities',
    '--------------------------------------',
    '✓ System telemetry: 100% HEALTHY'
  ],
  './skills.sh': [
    'Loading skills registry...',
    '--------------------------------------',
    'LANGUAGES : TypeScript, JavaScript, Python, C++, SQL',
    'FRONTEND  : Next.js, React, HTML5, CSS3, Tailwind',
    'BACKEND   : Node.js, Express, Prisma ORM, REST APIs',
    'AI / ML   : Applied AI, Machine Learning Integration',
    'TOOLS     : Git, Docker, Vercel, Supabase',
    '--------------------------------------',
    '✓ Tech arsenal scan completed.'
  ],
  './contact.sh': [
    'Handshake initialized...',
    '--------------------------------------',
    'EMAIL    : nisargvaghela27@gmail.com',
    'GITHUB   : github.com/nisargvghl27',
    'LINKEDIN : linkedin.com/in/nisargvaghela',
    'STATUS   : Standing by for connections...',
    '--------------------------------------',
    '✓ Handshake routes established.'
  ]
}

export default function InteractiveConsole() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'System boot successful.', type: 'system' },
    { text: 'nisarg@ai-core:~$ ./welcome.sh', type: 'input' },
    { text: 'Welcome to Nisarg\'s digital workstation terminal v1.0.0.', type: 'output' },
    { text: 'Click the shell scripts below to inspect system details.', type: 'output' }
  ])
  const [activeCommand, setActiveCommand] = useState<string | null>(null)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const runCommand = async (cmd: string) => {
    if (activeCommand) return // Busy typing

    setActiveCommand(cmd)
    
    // Add the input command line first
    setHistory((prev) => [...prev, { text: `nisarg@ai-core:~$ ${cmd}`, type: 'input' }])
    
    const lines = COMMAND_DATA[cmd] || ['Command not found.']
    
    // Stream output lines one by one to simulate typing/loading
    for (let i = 0; i < lines.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 80 + Math.random() * 60))
      setHistory((prev) => [...prev, { text: lines[i], type: 'output' }])
    }

    setActiveCommand(null)
  }

  const clearConsole = () => {
    if (activeCommand) return
    setHistory([{ text: 'nisarg@ai-core:~$ clear', type: 'input' }])
  }

  return (
    <div className="w-full glass-panel border border-cyan-500/20 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.05)] bg-black/60 relative z-10 flex flex-col font-mono text-[11px] md:text-[12px] h-[340px] text-gray-400">
      {/* Console Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] tracking-wider text-gray-500 uppercase font-mono">zsh -- nisarg-workstation</span>
        <div className="w-12" /> {/* spacer */}
      </div>

      {/* Console Display Screen */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2.5 select-text scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed whitespace-pre-wrap">
            {line.type === 'input' && (
              <span className="text-cyan-400 font-bold">{line.text}</span>
            )}
            {line.type === 'system' && (
              <span className="text-gray-600 italic">{line.text}</span>
            )}
            {line.type === 'output' && (
              <span className="text-gray-300">{line.text}</span>
            )}
            {line.type === 'error' && (
              <span className="text-red-400 font-bold">{line.text}</span>
            )}
          </div>
        ))}
        
        {/* Cursor indicator */}
        {activeCommand ? (
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 animate-pulse">Running commands...</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span className="text-cyan-500">nisarg@ai-core:~$</span>
            <span className="w-1.5 h-4 bg-cyan-400 animate-pulse inline-block" />
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Control Deck */}
      <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => runCommand('./specs.sh')}
            disabled={activeCommand !== null}
            className={`px-2 py-1 border rounded text-[10px] uppercase transition-all select-none ${
              activeCommand ? 'border-gray-800 text-gray-600 cursor-not-allowed' : 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/50'
            }`}
          >
            specs.sh
          </button>
          <button
            onClick={() => runCommand('./skills.sh')}
            disabled={activeCommand !== null}
            className={`px-2 py-1 border rounded text-[10px] uppercase transition-all select-none ${
              activeCommand ? 'border-gray-800 text-gray-600 cursor-not-allowed' : 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/50'
            }`}
          >
            skills.sh
          </button>
          <button
            onClick={() => runCommand('./contact.sh')}
            disabled={activeCommand !== null}
            className={`px-2 py-1 border rounded text-[10px] uppercase transition-all select-none ${
              activeCommand ? 'border-gray-800 text-gray-600 cursor-not-allowed' : 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/50'
            }`}
          >
            contact.sh
          </button>
        </div>

        <button
          onClick={clearConsole}
          disabled={activeCommand !== null}
          className={`px-2 py-1 text-[10px] uppercase rounded border transition-all select-none ${
            activeCommand ? 'border-gray-800 text-gray-600 cursor-not-allowed' : 'border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40'
          }`}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
