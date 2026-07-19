'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// 1. Add Project Action
export async function addProject(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const githubLink = formData.get('githubLink') as string
  const liveLink = formData.get('liveLink') as string
  const imageUrl = formData.get('imageUrl') as string
  const projectType = formData.get('projectType') as string
  
  const impactUsers = formData.get('impactUsers') as string
  const impactUptime = formData.get('impactUptime') as string
  const impactScore = formData.get('impactScore') as string
  const impactStars = formData.get('impactStars') as string
  
  const order = parseInt(formData.get('order') as string) || 0

  const techStackInput = formData.get('techStack') as string
  const techStack = techStackInput
    ? techStackInput.split(',').map((tech) => tech.trim())
    : []

  if (!title || !description) {
    throw new Error('Title and Description are required.')
  }

  await prisma.project.create({
    data: {
      title,
      description,
      techStack,
      githubLink: githubLink || null,
      liveLink: liveLink || null,
      imageUrl: imageUrl || null,
      projectType: projectType || 'other',
      impactUsers: impactUsers || null,
      impactUptime: impactUptime || null,
      impactScore: impactScore || null,
      impactStars: impactStars || null,
      order,
      featured: false,
    },
  })

  // Refresh both the homepage and the admin dashboard
  revalidatePath('/')
  revalidatePath('/admin/projects')
}

// 2. Delete Project Action
export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string
  
  if (!id) {
    throw new Error('Project ID is required.')
  }

  await prisma.project.delete({
    where: { id },
  })

  // Refresh both the homepage and the admin dashboard
  revalidatePath('/')
  revalidatePath('/admin/projects')
}

// 3. Update Project Action
export async function updateProject(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const githubLink = formData.get('githubLink') as string
  const liveLink = formData.get('liveLink') as string
  const imageUrl = formData.get('imageUrl') as string
  const projectType = formData.get('projectType') as string

  const impactUsers = formData.get('impactUsers') as string
  const impactUptime = formData.get('impactUptime') as string
  const impactScore = formData.get('impactScore') as string
  const impactStars = formData.get('impactStars') as string

  const order = parseInt(formData.get('order') as string) || 0

  const techStackInput = formData.get('techStack') as string
  const techStack = techStackInput
    ? techStackInput.split(',').map((tech) => tech.trim())
    : []

  if (!id || !title || !description) {
    throw new Error('ID, Title, and Description are required.')
  }

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      techStack,
      githubLink: githubLink || null,
      liveLink: liveLink || null,
      imageUrl: imageUrl || null,
      projectType: projectType || 'other',
      impactUsers: impactUsers || null,
      impactUptime: impactUptime || null,
      impactScore: impactScore || null,
      impactStars: impactStars || null,
      order,
    },
  })

  // Refresh both the homepage and the admin dashboard
  revalidatePath('/')
  revalidatePath('/admin/projects')
}