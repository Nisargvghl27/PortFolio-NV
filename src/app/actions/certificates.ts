'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addCertificate(formData: FormData) {
  const title = formData.get('title') as string
  const issuer = formData.get('issuer') as string
  const date = formData.get('date') as string
  const url = formData.get('url') as string
  const desc = formData.get('desc') as string
  const order = parseInt(formData.get('order') as string) || 0

  if (!title || !issuer || !date || !url || !desc) {
    throw new Error('All fields are required.')
  }

  await prisma.certificate.create({
    data: { title, issuer, date, url, desc, order },
  })

  revalidatePath('/')
  revalidatePath('/admin/certificates')
}

export async function deleteCertificate(formData: FormData) {
  const id = formData.get('id') as string

  if (!id) {
    throw new Error('Certificate ID is required.')
  }

  await prisma.certificate.delete({
    where: { id },
  })

  revalidatePath('/')
  revalidatePath('/admin/certificates')
}

export async function updateCertificate(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const issuer = formData.get('issuer') as string
  const date = formData.get('date') as string
  const url = formData.get('url') as string
  const desc = formData.get('desc') as string
  const order = parseInt(formData.get('order') as string) || 0

  if (!id || !title || !issuer || !date || !url || !desc) {
    throw new Error('All fields are required.')
  }

  await prisma.certificate.update({
    where: { id },
    data: { title, issuer, date, url, desc, order },
  })

  revalidatePath('/')
  revalidatePath('/admin/certificates')
}