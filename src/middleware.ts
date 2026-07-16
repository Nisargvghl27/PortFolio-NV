import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // If user is already on the login page, let them through
  if (pathname === '/admin/login') return NextResponse.next()

  // Check for our custom security cookie
  const authCookie = req.cookies.get('admin_auth')

  // If cookie exists and is correct, proceed
  if (authCookie?.value === process.env.ADMIN_PASSWORD) {
    return NextResponse.next()
  }

  // Otherwise, redirect to login
  return NextResponse.redirect(new URL('/admin/login', req.url))
}

export const config = {
  matcher: ['/admin/:path*'],
}