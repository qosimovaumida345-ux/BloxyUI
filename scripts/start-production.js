const { execSync } = require('child_process');

console.log('--- Starting BloxyUI Production Server ---');

// If DATABASE_URL is available (e.g. Render PostgreSQL attached)
if (process.env.DATABASE_URL) {
  try {
    console.log('Syncing database schema with Prisma (db push)...');
    execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });
    try {
      console.log('Seeding initial data (icons, effects, animations)...');
      execSync('node prisma/seed.js', { stdio: 'inherit' });
    } catch (seedErr) {
      console.log('Database already seeded or skip needed:', seedErr.message);
    }
  } catch (dbErr) {
    console.warn('PostgreSQL sync notice (using local catalog fallback):', dbErr.message);
  }
} else {
  console.log('DATABASE_URL not set - using built-in high-performance local catalog fallback.');
}

// Start Express server
require('../server/index.js');
