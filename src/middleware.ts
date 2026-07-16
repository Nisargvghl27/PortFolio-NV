import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Get the authorization header from the request
  const basicAuth = req.headers.get('authorization')
  
  if (basicAuth) {
    // The header looks like "Basic Base64EncodedString", so we split it to get the token
    const authValue = basicAuth.split(' ')[1]
    
    // Decode the Base64 string back into "username:password" using the Edge-compatible atob()
    const [user, pwd] = atob(authValue).split(':')

    // Fetch the secret credentials from our environment variables
    const validUser = process.env.ADMIN_USERNAME
    const validPass = process.env.ADMIN_PASSWORD

    // If they match perfectly, let the user proceed to the admin page
    if (user === validUser && pwd === validPass) {
      return NextResponse.next()
    }
  }

  // If there is no auth header or the credentials fail, block access
  // This specific response triggers the browser's native login prompt
  return new NextResponse('System Access Denied.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Terminal Area"',
    },
  })
}

// The config block tells Next.js EXACTLY which routes this bouncer should protect.
// The '/admin/:path*' matcher locks down /admin and every sub-route (like /admin/garden).
export const config = {
  matcher: ['/admin/:path*'],
}