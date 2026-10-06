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
    
    const res = await client.query(`SELECT COUNT(*) FROM leads;`);
    console.log('Count:', res.rows[0].count);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}
run();
