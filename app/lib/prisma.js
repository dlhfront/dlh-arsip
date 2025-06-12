import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['warn', 'error'],
    });
  }
  prisma = global.prisma;
}

// Immediate connection test - keep this for debugging 
prisma.$connect()
  .then(() => console.log('Prisma connected to:', process.env.DATABASE_URL?.split('@')[1]))
  .catch(err => {
    console.error('PRISMA CONNECTION FAILED!');
    console.error('URL:', process.env.DATABASE_URL);
    console.error(err);
    process.exit(1); // Crash immediately if no DB connection
  });

export default prisma;
