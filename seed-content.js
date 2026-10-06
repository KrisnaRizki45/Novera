require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const servicesData = [
  {
    slug: 'custom-software',
    title_en: 'Custom Software',
    title_id: 'Perangkat Lunak Kustom',
    short_description_en: 'End-to-end bespoke software systems designed for complex operational requirements.',
    short_description_id: 'Sistem perangkat lunak pesanan end-to-end yang dirancang untuk kebutuhan operasional kompleks.',
    display_order: 1,
    is_active: true
  },
  {
    slug: 'web-development',
    title_en: 'Web Development',
    title_id: 'Pengembangan Web',
    short_description_en: 'High-performance enterprise web applications built for scalability.',
    short_description_id: 'Aplikasi web enterprise berkinerja tinggi yang dibangun untuk skalabilitas.',
    display_order: 2,
    is_active: true
  },
  {
    slug: 'mobile-development',
    title_en: 'Mobile Development',
    title_id: 'Pengembangan Mobile',
    short_description_en: 'Native and cross-platform mobile solutions for your workforce and customers.',
    short_description_id: 'Solusi mobile native dan lintas platform untuk tenaga kerja dan pelanggan Anda.',
    display_order: 3,
    is_active: true
  },
  {
    slug: 'business-systems',
    title_en: 'Business Systems',
    title_id: 'Sistem Bisnis',
    short_description_en: 'Integrated ERP, CRM, and internal tools to streamline enterprise workflows.',
    short_description_id: 'ERP terintegrasi, CRM, dan alat internal untuk merampingkan alur kerja enterprise.',
    display_order: 4,
    is_active: true
  },
  {
    slug: 'automation',
    title_en: 'Automation',
    title_id: 'Otomatisasi',
    short_description_en: 'Process automation to eliminate manual tasks and reduce operational friction.',
    short_description_id: 'Otomatisasi proses untuk mengeliminasi tugas manual dan mengurangi gesekan operasional.',
    display_order: 5,
    is_active: true
  },
  {
    slug: 'ai-solutions',
    title_en: 'AI Solutions',
    title_id: 'Solusi AI',
    short_description_en: 'Applied artificial intelligence for predictive analytics and intelligent operations.',
    short_description_id: 'Kecerdasan buatan terapan untuk analitik prediktif dan operasi cerdas.',
    display_order: 6,
    is_active: true
  },
  {
    slug: 'system-integration',
    title_en: 'System Integration',
    title_id: 'Integrasi Sistem',
    short_description_en: 'Connecting disparate legacy systems into a unified data ecosystem.',
    short_description_id: 'Menghubungkan sistem lama yang berbeda menjadi ekosistem data yang terpadu.',
    display_order: 7,
    is_active: true
  }
];

const solutionsData = [
  {
    slug: 'business-operations',
    title_en: 'Business Operations',
    title_id: 'Operasi Bisnis (Business Operations)',
    business_problem_en: 'Fragmented visibility across chat groups and spreadsheets.',
    business_problem_id: 'Visibilitas yang terpecah di berbagai grup chat dan spreadsheet.',
    solution_approach_en: 'Centralized internal systems for structured approval workflows and process consistency.',
    solution_approach_id: 'Sistem internal terpusat untuk alur persetujuan dan konsistensi proses.',
    benefits_en: JSON.stringify(['Standardized operations that can be precisely measured.']),
    benefits_id: JSON.stringify(['Operasi terstandarisasi yang dapat diukur secara presisi.']),
    display_order: 1,
    is_active: true
  },
  {
    slug: 'inventory-management',
    title_en: 'Inventory Management',
    title_id: 'Manajemen Inventaris (Inventory Management)',
    business_problem_en: 'Frequent stockouts and missing goods without accurate tracking.',
    business_problem_id: 'Stok barang sering habis atau hilang tanpa pelacakan akurat.',
    solution_approach_en: 'Real-time stock visibility architectures and automated reordering workflows.',
    solution_approach_id: 'Arsitektur visibilitas stok waktu-nyata dan otomasi pemesanan ulang (reordering).',
    benefits_en: JSON.stringify(['99% warehouse accuracy and asset shrinkage prevention.']),
    benefits_id: JSON.stringify(['Akurasi gudang 99% dan pencegahan penyusutan aset.']),
    display_order: 2,
    is_active: true
  },
  {
    slug: 'order-management',
    title_en: 'Order Management',
    title_id: 'Manajemen Pesanan (Order Management)',
    business_problem_en: 'Client orders processed slowly due to layered manual validations.',
    business_problem_id: 'Pesanan klien lambat diproses akibat validasi manual berlapis.',
    solution_approach_en: 'Automated fulfillment pipelines from click to delivery.',
    solution_approach_id: 'Pipa (pipeline) otomatis dari pemesanan hingga pemenuhan.',
    benefits_en: JSON.stringify(['3x faster order processing without human intervention.']),
    benefits_id: JSON.stringify(['Pemrosesan pesanan 3x lebih cepat tanpa intervensi manusia.']),
    display_order: 3,
    is_active: true
  },
  {
    slug: 'field-service',
    title_en: 'Field Service',
    title_id: 'Manajemen Tenaga Lapangan (Field Service)',
    business_problem_en: 'Inability to assign or monitor staff in offline areas.',
    business_problem_id: 'Tidak bisa memantau atau memberi tugas ke staf di area tanpa internet.',
    solution_approach_en: 'Offline-first field apps for context-aware reporting from anywhere.',
    solution_approach_id: 'Aplikasi offline-first untuk pembaruan laporan dari mana saja.',
    benefits_en: JSON.stringify(['Real-time workforce coordination and authenticated proof of work.']),
    benefits_id: JSON.stringify(['Koordinasi tenaga kerja waktu-nyata dan bukti kerja terotentikasi.']),
    display_order: 4,
    is_active: true
  },
  {
    slug: 'business-intelligence',
    title_en: 'Business Intelligence',
    title_id: 'Intelijen Bisnis (Business Intelligence)',
    business_problem_en: 'Strategic decisions delayed waiting for monthly data recaps.',
    business_problem_id: 'Keputusan strategis ditunda karena menunggu rekap laporan data bulanan.',
    solution_approach_en: 'Executive KPI consolidation dashboards updated every second.',
    solution_approach_id: 'Dasbor konsolidasi KPI eksekutif yang diperbarui setiap detik.',
    benefits_en: JSON.stringify(['Absolute data-driven decision support.']),
    benefits_id: JSON.stringify(['Dukungan keputusan berbasis data akurat (Data-driven).']),
    display_order: 5,
    is_active: true
  },
  {
    slug: 'automation',
    title_en: 'Automation',
    title_id: 'Otomatisasi Alur Kerja (Automation)',
    business_problem_en: 'Expert staff spend 40% of their time copy-pasting between apps.',
    business_problem_id: 'Staf ahli menghabiskan 40% waktu mereka menyalin data antar aplikasi.',
    solution_approach_en: 'Background data processing scripts and scheduled triggers.',
    solution_approach_id: 'Skrip pemrosesan data latar belakang dan pemicu jadwal.',
    benefits_en: JSON.stringify(['Eliminating human-error in repetitive operational processes.']),
    benefits_id: JSON.stringify(['Mengeliminasi kesalahan manusia (human-error) di proses berulang.']),
    display_order: 6,
    is_active: true
  },
  {
    slug: 'ai',
    title_en: 'Artificial Intelligence',
    title_id: 'Kecerdasan Buatan (AI Solutions)',
    business_problem_en: 'Hundreds of thousands of unsearchable internal documents.',
    business_problem_id: 'Ratusan ribu dokumen fisik/digital yang tidak bisa dicari informasinya.',
    solution_approach_en: 'Private LLM implementations for document understanding and classification.',
    solution_approach_id: 'Penerapan LLM privat untuk pemahaman dokumen dan klasifikasi.',
    benefits_en: JSON.stringify(['Instant corporate knowledge retrieval like having a smart assistant.']),
    benefits_id: JSON.stringify(['Penarikan pengetahuan korporat instan bagai memiliki asisten pintar.']),
    display_order: 7,
    is_active: true
  }
];

const careersData = [
  {
    slug: 'software-engineer-backend',
    title_en: 'Software Engineer (Backend)',
    title_id: 'Software Engineer (Backend)',
    department: 'Engineering',
    location: 'Jakarta (Hybrid)',
    employment_type: 'Full-time',
    work_mode: 'Hybrid',
    experience_level: 'Mid-Senior',
    is_active: true,
    published_at: new Date().toISOString()
  },
  {
    slug: 'ui-ux-designer',
    title_en: 'UI/UX Product Designer',
    title_id: 'UI/UX Product Designer',
    department: 'Design',
    location: 'Remote',
    employment_type: 'Full-time',
    work_mode: 'Remote',
    experience_level: 'Mid',
    is_active: true,
    published_at: new Date().toISOString()
  }
];

async function insertRows(table, data) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?on_conflict=slug`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`Error inserting into ${table}:`, text);
  } else {
    console.log(`✔ Seeded ${table} successfully!`);
  }
}

async function seed() {
  console.log('Seeding via REST API...');
  await insertRows('services', servicesData);
  await insertRows('solutions', solutionsData);
  await insertRows('careers', careersData);
  console.log('Done!');
}

seed();
