import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Test connection immediately
prisma.$connect()
  .then(() => console.log('Prisma connected successfully'))
  .catch(err => console.error('Prisma connection error:', err))

export default prisma