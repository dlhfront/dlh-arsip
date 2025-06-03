@echo off
echo [Build] Starting Prisma generation...
npx prisma generate --schema=prisma/schema.prisma || exit /b 1

echo [Build] Running migrations...
npx prisma migrate deploy --schema=prisma/schema.prisma || exit /b 1

echo [Build] Building Next.js...
next build || exit /b 1

echo [Build] Completed successfully