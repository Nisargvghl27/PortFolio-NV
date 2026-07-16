import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  // Initialize the pg Pool with your Supabase connection string
  const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    // Optional: Prevents the pool from hanging if Supabase takes too long
    connectionTimeoutMillis: 10000, 
  })
  
  // Pass the pool to the Prisma adapter
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma