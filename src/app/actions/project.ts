'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addProject(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const githubLink = formData.get('githubLink') as string
  const liveLink = formData.get('liveLink') as string
  const imageUrl = formData.get('imageUrl') as string
  
  // Get the tech stack string and split it by commas into an array
  const techStackInput = formData.get('techStack') as string
  const techStack = techStackInput
    ? techStackInput.split(',').map((tech) => tech.trim())
    : []

  if (!title || !description) {
    throw new Error('Title and Description are required.')
  }

  // Insert the project into Supabase via Prisma
  await prisma.project.create({
    data: {
      title,
      description,
      techStack,
      githubLink: githubLink || null,
      liveLink: liveLink || null,
      imageUrl: imageUrl || null,
      featured: false,
    },
  })

  // Instantly refresh the homepage so the new project shows up
  revalidatePath('/')
}