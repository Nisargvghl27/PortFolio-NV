'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getSkills() {
  return await prisma.skill.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function addSkill(formData: FormData) {
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const color = formData.get('color') as string
  const level = formData.get('level') as string
  const latency = formData.get('latency') as string
  const status = formData.get('status') as string
  const desc = formData.get('desc') as string
  const order = parseInt(formData.get('order') as string) || 0

  if (!name || !category || !color || !level || !latency || !status || !desc) {
    throw new Error('All fields are required.')
  }

  await prisma.skill.create({
    data: { name, category, color, level, latency, status, desc, order },
  })

  revalidatePath('/')
  revalidatePath('/admin/skills')
}

export async function deleteSkill(formData: FormData) {
  const id = formData.get('id') as string

  if (!id) {
    throw new Error('Skill ID is required.')
  }

  await prisma.skill.delete({
    where: { id },
  })

  revalidatePath('/')
  revalidatePath('/admin/skills')
}

export async function updateSkill(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const color = formData.get('color') as string
  const level = formData.get('level') as string
  const latency = formData.get('latency') as string
  const status = formData.get('status') as string
  const desc = formData.get('desc') as string
  const order = parseInt(formData.get('order') as string) || 0

  if (!id || !name || !category || !color || !level || !latency || !status || !desc) {
    throw new Error('All fields are required.')
  }

  await prisma.skill.update({
    where: { id },
    data: { name, category, color, level, latency, status, desc, order },
  })

  revalidatePath('/')
  revalidatePath('/admin/skills')
}