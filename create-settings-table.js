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
    console.log('Connected to DB');

    // Create site_settings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.site_settings (
        key VARCHAR(255) PRIMARY KEY,
        value TEXT,
        description TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Insert default settings
    const defaultSettings = [
      ['site_name', 'NOVERA', 'Website Name'],
      ['company_name', 'NOVERA Tech', 'Company Name'],
      ['website_url', 'http://localhost:3000', 'Website URL'],
      ['default_language', 'en', 'Default Language'],
      ['contact_email', 'support@novera.com', 'Support Email'],
      ['contact_phone', '+62 812 3456 7890', 'Contact Phone'],
      ['contact_whatsapp', '6281234567890', 'WhatsApp Number'],
      ['social_linkedin', 'https://linkedin.com/company/novera', 'LinkedIn URL'],
      ['social_instagram', 'https://instagram.com/novera', 'Instagram URL'],
      ['social_github', 'https://github.com/novera', 'GitHub URL'],
      ['seo_title', 'NOVERA | Enterprise Software & Automation', 'Default SEO Title'],
      ['seo_description_en', 'NOVERA builds custom software, digital systems, automation, and AI-powered solutions.', 'Default SEO Description EN'],
      ['seo_description_id', 'NOVERA membangun perangkat lunak kustom, sistem digital, otomatisasi, dan solusi AI.', 'Default SEO Description ID'],
      ['cta_start_project_url', '/start-a-project', 'CTA Start Project URL']
    ];

    for (const [key, value, description] of defaultSettings) {
      await client.query(`
        INSERT INTO public.site_settings (key, value, description)
        VALUES ($1, $2, $3)
        ON CONFLICT (key) DO NOTHING;
      `, [key, value, description]);
    }

    console.log('Settings table created and seeded!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
