'use client'
import { Component, ReactNode } from 'react'

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError() { 
    return { hasError: true } 
  }
  
  componentDidCatch(error: Error) { 
    console.error('[ErrorBoundary]', error) 
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="font-mono text-slate-500 italic p-4 border border-neon/10 text-xs text-center">
          [ MODULE_UNAVAILABLE // RETRY_LATER ]
        </div>
      )
    }
    return this.props.children
  }
}