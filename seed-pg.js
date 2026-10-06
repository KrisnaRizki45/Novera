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

const servicesData = [
  { slug: 'custom-software', en: 'Custom Software', id: 'Perangkat Lunak Kustom', s_en: 'End-to-end bespoke software systems designed for complex operational requirements.', s_id: 'Sistem perangkat lunak pesanan end-to-end yang dirancang untuk kebutuhan operasional kompleks.', o: 1 },
  { slug: 'web-development', en: 'Web Development', id: 'Pengembangan Web', s_en: 'High-performance enterprise web applications built for scalability.', s_id: 'Aplikasi web enterprise berkinerja tinggi yang dibangun untuk skalabilitas.', o: 2 },
  { slug: 'mobile-development', en: 'Mobile Development', id: 'Pengembangan Mobile', s_en: 'Native and cross-platform mobile solutions for your workforce and customers.', s_id: 'Solusi mobile native dan lintas platform untuk tenaga kerja dan pelanggan Anda.', o: 3 },
  { slug: 'business-systems', en: 'Business Systems', id: 'Sistem Bisnis', s_en: 'Integrated ERP, CRM, and internal tools to streamline enterprise workflows.', s_id: 'ERP terintegrasi, CRM, dan alat internal untuk merampingkan alur kerja enterprise.', o: 4 },
  { slug: 'automation', en: 'Automation', id: 'Otomatisasi', s_en: 'Process automation to eliminate manual tasks and reduce operational friction.', s_id: 'Otomatisasi proses untuk mengeliminasi tugas manual dan mengurangi gesekan operasional.', o: 5 },
  { slug: 'ai-solutions', en: 'AI Solutions', id: 'Solusi AI', s_en: 'Applied artificial intelligence for predictive analytics and intelligent operations.', s_id: 'Kecerdasan buatan terapan untuk analitik prediktif dan operasi cerdas.', o: 6 },
  { slug: 'system-integration', en: 'System Integration', id: 'Integrasi Sistem', s_en: 'Connecting disparate legacy systems into a unified data ecosystem.', s_id: 'Menghubungkan sistem lama yang berbeda menjadi ekosistem data yang terpadu.', o: 7 }
];

const solutionsData = [
  { slug: 'business-operations', en: 'Business Operations', id: 'Operasi Bisnis (Business Operations)', pb_en: 'Fragmented visibility across chat groups and spreadsheets.', pb_id: 'Visibilitas yang terpecah di berbagai grup chat dan spreadsheet.', sa_en: 'Centralized internal systems for structured approval workflows and process consistency.', sa_id: 'Sistem internal terpusat untuk alur persetujuan dan konsistensi proses.', bn_en: '["Standardized operations that can be precisely measured."]', bn_id: '["Operasi terstandarisasi yang dapat diukur secara presisi."]', o: 1 },
  { slug: 'inventory-management', en: 'Inventory Management', id: 'Manajemen Inventaris (Inventory Management)', pb_en: 'Frequent stockouts and missing goods without accurate tracking.', pb_id: 'Stok barang sering habis atau hilang tanpa pelacakan akurat.', sa_en: 'Real-time stock visibility architectures and automated reordering workflows.', sa_id: 'Arsitektur visibilitas stok waktu-nyata dan otomasi pemesanan ulang (reordering).', bn_en: '["99% warehouse accuracy and asset shrinkage prevention."]', bn_id: '["Akurasi gudang 99% dan pencegahan penyusutan aset."]', o: 2 },
  { slug: 'order-management', en: 'Order Management', id: 'Manajemen Pesanan (Order Management)', pb_en: 'Client orders processed slowly due to layered manual validations.', pb_id: 'Pesanan klien lambat diproses akibat validasi manual berlapis.', sa_en: 'Automated fulfillment pipelines from click to delivery.', sa_id: 'Pipa (pipeline) otomatis dari pemesanan hingga pemenuhan.', bn_en: '["3x faster order processing without human intervention."]', bn_id: '["Pemrosesan pesanan 3x lebih cepat tanpa intervensi manusia."]', o: 3 },
  { slug: 'field-service', en: 'Field Service', id: 'Manajemen Tenaga Lapangan (Field Service)', pb_en: 'Inability to assign or monitor staff in offline areas.', pb_id: 'Tidak bisa memantau atau memberi tugas ke staf di area tanpa internet.', sa_en: 'Offline-first field apps for context-aware reporting from anywhere.', sa_id: 'Aplikasi offline-first untuk pembaruan laporan dari mana saja.', bn_en: '["Real-time workforce coordination and authenticated proof of work."]', bn_id: '["Koordinasi tenaga kerja waktu-nyata dan bukti kerja terotentikasi."]', o: 4 },
  { slug: 'business-intelligence', en: 'Business Intelligence', id: 'Intelijen Bisnis (Business Intelligence)', pb_en: 'Strategic decisions delayed waiting for monthly data recaps.', pb_id: 'Keputusan strategis ditunda karena menunggu rekap laporan data bulanan.', sa_en: 'Executive KPI consolidation dashboards updated every second.', sa_id: 'Dasbor konsolidasi KPI eksekutif yang diperbarui setiap detik.', bn_en: '["Absolute data-driven decision support."]', bn_id: '["Dukungan keputusan berbasis data akurat (Data-driven)."]', o: 5 },
  { slug: 'automation', en: 'Automation', id: 'Otomatisasi Alur Kerja (Automation)', pb_en: 'Expert staff spend 40% of their time copy-pasting between apps.', pb_id: 'Staf ahli menghabiskan 40% waktu mereka menyalin data antar aplikasi.', sa_en: 'Background data processing scripts and scheduled triggers.', sa_id: 'Skrip pemrosesan data latar belakang dan pemicu jadwal.', bn_en: '["Eliminating human-error in repetitive operational processes."]', bn_id: '["Mengeliminasi kesalahan manusia (human-error) di proses berulang."]', o: 6 },
  { slug: 'ai', en: 'Artificial Intelligence', id: 'Kecerdasan Buatan (AI Solutions)', pb_en: 'Hundreds of thousands of unsearchable internal documents.', pb_id: 'Ratusan ribu dokumen fisik/digital yang tidak bisa dicari informasinya.', sa_en: 'Private LLM implementations for document understanding and classification.', sa_id: 'Penerapan LLM privat untuk pemahaman dokumen dan klasifikasi.', bn_en: '["Instant corporate knowledge retrieval like having a smart assistant."]', bn_id: '["Penarikan pengetahuan korporat instan bagai memiliki asisten pintar."]', o: 7 }
];

const careersData = [
  { slug: 'software-engineer-backend', en: 'Software Engineer (Backend)', id: 'Software Engineer (Backend)', dept: 'Engineering', loc: 'Jakarta (Hybrid)', emp: 'Full-time', mode: 'Hybrid', exp: 'Mid-Senior' },
  { slug: 'ui-ux-designer', en: 'UI/UX Product Designer', id: 'UI/UX Product Designer', dept: 'Design', loc: 'Remote', emp: 'Full-time', mode: 'Remote', exp: 'Mid' }
];

async function seed() {
  try {
    await client.connect();
    console.log('Connected to DB!');

    for (const s of servicesData) {
      await client.query(`
        INSERT INTO public.services (slug, title_en, title_id, short_description_en, short_description_id, display_order, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, true)
        ON CONFLICT (slug) DO UPDATE SET 
          title_en = $2, title_id = $3, short_description_en = $4, short_description_id = $5;
      `, [s.slug, s.en, s.id, s.s_en, s.s_id, s.o]);
      console.log('✔ Service:', s.slug);
    }

    for (const s of solutionsData) {
      await client.query(`
        INSERT INTO public.solutions (slug, title_en, title_id, business_problem_en, business_problem_id, solution_approach_en, solution_approach_id, benefits_en, benefits_id, display_order, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)
        ON CONFLICT (slug) DO UPDATE SET 
          title_en = $2, title_id = $3, business_problem_en = $4, business_problem_id = $5, solution_approach_en = $6, solution_approach_id = $7, benefits_en = $8, benefits_id = $9;
      `, [s.slug, s.en, s.id, s.pb_en, s.pb_id, s.sa_en, s.sa_id, s.bn_en, s.bn_id, s.o]);
      console.log('✔ Solution:', s.slug);
    }

    for (const c of careersData) {
      await client.query(`
        INSERT INTO public.careers (slug, title_en, title_id, department, location, employment_type, work_mode, experience_level, is_active, published_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, NOW())
        ON CONFLICT (slug) DO UPDATE SET 
          title_en = $2, title_id = $3, department = $4, location = $5, employment_type = $6, work_mode = $7, experience_level = $8, published_at = NOW();
      `, [c.slug, c.en, c.id, c.dept, c.loc, c.emp, c.mode, c.exp]);
      console.log('✔ Career:', c.slug);
    }

    console.log('Database Seeded Successfully!');
  } catch (err) {
    console.error('Failed to seed:', err);
  } finally {
    await client.end();
  }
}

seed();
