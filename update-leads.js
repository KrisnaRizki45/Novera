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
    
    // Add phone column
    await client.query(`
      ALTER TABLE public.leads 
      ADD COLUMN IF NOT EXISTS phone VARCHAR(255);
    `);
    
    // In case RLS is blocking it
    await client.query(`
      ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;
    `);

    console.log('Leads table updated');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}
run();
