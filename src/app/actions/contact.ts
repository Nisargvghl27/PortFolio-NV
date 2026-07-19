// 'use server'

// import { prisma } from '@/lib/prisma'
// import { revalidatePath } from 'next/cache'
// import { sendNotificationEmail } from '@/lib/email'

// export async function sendContactMessage(formData: FormData) {
//   const name = formData.get('name') as string
//   const email = formData.get('email') as string
//   const message = formData.get('message') as string

//   if (!name || !email || !message) {
//     throw new Error('All fields are required.')
//   }

//   // Save the message to the database
//   await prisma.message.create({
//     data: { name, email, message }
//   })

//   // Send the email notification
//   await sendNotificationEmail({ name, email, message })

//   // Refresh the page data
//   revalidatePath('/')
//   revalidatePath('/admin')
// }

'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { sendNotificationEmail } from '@/lib/email'

export async function sendContactMessage(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    throw new Error('All fields are required.')
  }

  await prisma.message.create({
    data: { name, email, message }
  })

  // Notification to you, with Reply-To set to the user's email
  await sendNotificationEmail({ name, email, message })

  revalidatePath('/')
  revalidatePath('/admin')
}