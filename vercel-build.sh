#!/bin/bash
# Debugging info
echo "Node version: $(node -v)"
echo "Prisma version: $(npx prisma -v)"
echo "Current directory: $(pwd)"
ls -la node_modules/prisma/

# Generate client and run migrations
npx prisma generate --schema=./prisma/schema.prisma
npx prisma migrate deploy --schema=./prisma/schema.prisma

# Build Next.js
next build