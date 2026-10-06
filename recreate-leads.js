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
    
    await client.query(`DROP TABLE IF EXISTS public.leads;`);
    
    await client.query(`
      CREATE TABLE public.leads (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255),
        service VARCHAR(255) NOT NULL,
        details TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'New',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    
    await client.query(`NOTIFY pgrst, 'reload schema';`);
    console.log('Table recreated and schema reloaded');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}
run();
