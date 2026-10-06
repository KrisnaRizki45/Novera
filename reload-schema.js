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
    
    // Notify PostgREST to reload its schema cache
    await client.query(`NOTIFY pgrst, 'reload schema';`);
    
    console.log('PostgREST schema cache reloaded');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}
run();
