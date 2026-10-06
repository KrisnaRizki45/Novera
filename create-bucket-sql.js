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
    // Try to create the bucket using raw SQL in Supabase storage schema
    await client.query(`
      INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
      VALUES ('applications', 'applications', true, 10485760, ARRAY['application/pdf']::text[])
      ON CONFLICT (id) DO NOTHING;
    `);
    
    // Also insert policy for anon and authenticated to be able to insert/select
    await client.query(`
      CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'applications');
      CREATE POLICY "Allow public views" ON storage.objects FOR SELECT TO public USING (bucket_id = 'applications');
    `).catch(e => console.log('Policy may already exist:', e.message));

    console.log('Bucket "applications" ensured in DB.');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}
run();
