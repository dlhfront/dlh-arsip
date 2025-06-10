// Force binary download if missing
const { execSync } = require('child_process');
console.log('Ensuring Prisma binaries...');
execSync('npx prisma generate', { stdio: 'inherit' });