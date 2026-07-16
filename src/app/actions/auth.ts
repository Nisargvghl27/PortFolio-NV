'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  // In Next.js 15, cookies() is asynchronous
  const cookieStore = await cookies()
  cookieStore.delete('admin_auth')
  
  // Redirect back to the login page
  redirect('/admin/login')
}