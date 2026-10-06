require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    
    await client.query(`
      ALTER TABLE public.leads 
      ADD COLUMN IF NOT EXISTS resume_url TEXT,
      ADD COLUMN IF NOT EXISTS portfolio_url TEXT,
      ADD COLUMN IF NOT EXISTS cover_letter TEXT;
    `);
    
    await client.query(`NOTIFY pgrst, 'reload schema';`);
    console.log('Added career-specific columns to leads table');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}
run();
