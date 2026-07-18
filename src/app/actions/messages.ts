'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { sendReplyEmail } from '@/lib/email'

export async function toggleMessageRead(id: string, currentStatus: boolean) {
  await prisma.message.update({
    where: { id },
    data: { isRead: !currentStatus },
  })
  revalidatePath('/admin/messages')
  revalidatePath('/admin')
}

export async function deleteMessage(id: string) {
  await prisma.message.delete({
    where: { id },
  })
  revalidatePath('/admin/messages')
  revalidatePath('/admin')
}

export async function replyToMessage(id: string, email: string, replyBody: string) {
  if (!replyBody.trim()) throw new Error('Reply body cannot be empty')

  // Send the reply email
  await sendReplyEmail({
    to: email,
    subject: 'Re: Your message to Nisarg Vaghela',
    replyBody,
  })

  // Mark as replied and read in the database
  await prisma.message.update({
    where: { id },
    data: { 
      isReplied: true,
      isRead: true
    },
  })

  revalidatePath('/admin/messages')
  revalidatePath('/admin')
}