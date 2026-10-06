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
      CREATE TABLE IF NOT EXISTS public.insights (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        title_en TEXT NOT NULL,
        title_id TEXT NOT NULL,
        content_en TEXT,
        content_id TEXT,
        image_url TEXT,
        author TEXT,
        category TEXT,
        is_active BOOLEAN NOT NULL DEFAULT true,
        published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      
      -- Add sample insight
      INSERT INTO public.insights (slug, title_en, title_id, content_en, content_id, category, author)
      VALUES 
      ('future-of-ai', 'The Future of AI in Enterprise', 'Masa Depan AI di Perusahaan', 'AI is revolutionizing enterprise workflows...', 'AI sedang merevolusi alur kerja perusahaan...', 'Artificial Intelligence', 'Novera Research'),
      ('automation-2027', 'Why Automation is Mandatory by 2027', 'Mengapa Otomatisasi Wajib di 2027', 'Companies failing to automate will lose...', 'Perusahaan yang gagal otomatisasi akan tertinggal...', 'Business Strategy', 'Novera Insights')
      ON CONFLICT DO NOTHING;
    `);
    console.log('Insights table created and seeded!');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
