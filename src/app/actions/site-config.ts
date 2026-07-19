'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getSiteConfig() {
  return await prisma.siteConfig.findUnique({
    where: { id: 'singleton' }
  })
}

export async function updateSiteConfig(formData: FormData) {
  // ... existing implementation
  revalidatePath('/')
  revalidatePath('/admin/site-config')
}

// ADD THIS EXPORT IF IT IS MISSING:
export async function incrementVisitorCount(): Promise<number> {
  const config = await prisma.siteConfig.update({
    where: { id: 'singleton' },
    data: { visitorCount: { increment: 1 } },
  })
  return config.visitorCount
}