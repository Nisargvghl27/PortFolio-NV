'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function sendContactMessage(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    throw new Error('All fields are required.')
  }

  // Save the message directly to Supabase
  await prisma.message.create({
    data: { name, email, message }
  })

  // Refresh the page data
  revalidatePath('/')
}