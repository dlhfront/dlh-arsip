import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['warn', 'error'],
  datasourceUrl: process.env.DATABASE_URL // Explicit URL
});

// Immediate connection test
prisma.$connect()
  .then(() => console.log('Prisma connected to:', process.env.DATABASE_URL?.split('@')[1]))
  .catch(err => {
    console.error('PRISMA CONNECTION FAILED!');
    console.error('URL:', process.env.DATABASE_URL);
    console.error(err);
    process.exit(1); // Crash immediately if no DB connection
  });

export default prisma;