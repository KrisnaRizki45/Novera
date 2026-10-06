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

const servicesContent = [
  {
    slug: 'web-development',
    title_en: 'Web Development',
    title_id: 'Pengembangan Web',
    short_description_en: 'Scalable, high-performance web platforms for modern enterprises.',
    short_description_id: 'Platform web skalabel berkinerja tinggi untuk perusahaan modern.',
    description_en: 'We build modern web applications that are fast, secure, and highly scalable. Using cutting-edge architectures like Next.js, React, and robust backend microservices, we ensure your digital presence can handle immense traffic and complex business logic.',
    description_id: 'Kami membangun aplikasi web modern yang cepat, aman, dan sangat skalabel. Menggunakan arsitektur mutakhir seperti Next.js, React, dan layanan mikro backend yang kuat, kami memastikan kehadiran digital Anda dapat menangani lalu lintas besar dan logika bisnis kompleks.',
    features_en: JSON.stringify([
      "Server-Side Rendering (SSR) & Static Site Generation (SSG)",
      "Progressive Web Apps (PWA) Development",
      "API-First Architecture",
      "Advanced Web Security (OWASP Top 10)",
      "High-availability Cloud Deployments"
    ]),
    features_id: JSON.stringify([
      "Perenderan Sisi Server (SSR) & Pembuatan Situs Statis (SSG)",
      "Pengembangan Aplikasi Web Progresif (PWA)",
      "Arsitektur Berbasis API (API-First)",
      "Keamanan Web Lanjutan (OWASP Top 10)",
      "Penerapan Cloud Ketersediaan Tinggi"
    ]),
    use_cases_en: JSON.stringify([
      "Enterprise SaaS Platforms",
      "High-volume B2B eCommerce Portals",
      "Internal Business Dashboards",
      "Client & Vendor Management Portals"
    ]),
    use_cases_id: JSON.stringify([
      "Platform SaaS Skala Perusahaan",
      "Portal eCommerce B2B Volume Tinggi",
      "Dasbor Bisnis Internal",
      "Portal Manajemen Klien & Vendor"
    ]),
    business_value_en: JSON.stringify([
      "Sub-second Page Load Times",
      "Higher SEO Rankings & Discoverability",
      "Seamless Cross-device Experience",
      "Lower Infrastructure Costs via Serverless"
    ]),
    business_value_id: JSON.stringify([
      "Waktu Muat Halaman Kurang dari Satu Detik",
      "Peringkat SEO & Penemuan yang Lebih Tinggi",
      "Pengalaman Lintas Perangkat yang Mulus",
      "Biaya Infrastruktur Lebih Rendah via Serverless"
    ])
  },
  {
    slug: 'mobile-development',
    title_en: 'Mobile Development',
    title_id: 'Pengembangan Mobile',
    short_description_en: 'Native iOS and Android applications for your enterprise needs.',
    short_description_id: 'Aplikasi iOS dan Android native untuk kebutuhan enterprise Anda.',
    description_en: 'Delivering exceptional mobile experiences requires deep platform knowledge. We create robust iOS and Android applications that integrate securely with your enterprise systems, offering offline capabilities, biometric security, and fluid UI.',
    description_id: 'Memberikan pengalaman mobile yang luar biasa membutuhkan pengetahuan platform yang mendalam. Kami menciptakan aplikasi iOS dan Android yang kuat yang terintegrasi secara aman dengan sistem enterprise Anda, menawarkan kemampuan offline, keamanan biometrik, dan UI yang mulus.',
    features_en: JSON.stringify([
      "Native iOS (Swift) & Android (Kotlin) Development",
      "Cross-platform Solutions (React Native, Flutter)",
      "Secure Offline Data Synchronization",
      "Hardware Integration (Bluetooth, NFC, Biometrics)",
      "Automated App Store Deployments"
    ]),
    features_id: JSON.stringify([
      "Pengembangan Native iOS (Swift) & Android (Kotlin)",
      "Solusi Lintas Platform (React Native, Flutter)",
      "Sinkronisasi Data Offline yang Aman",
      "Integrasi Perangkat Keras (Bluetooth, NFC, Biometrik)",
      "Penerapan App Store Otomatis"
    ]),
    use_cases_en: JSON.stringify([
      "Field Worker Operations Apps",
      "Consumer Banking and FinTech Apps",
      "Logistics Driver Tracking Apps",
      "Enterprise Communication Tools"
    ]),
    use_cases_id: JSON.stringify([
      "Aplikasi Operasi Pekerja Lapangan",
      "Aplikasi Perbankan Konsumen dan FinTech",
      "Aplikasi Pelacakan Pengemudi Logistik",
      "Alat Komunikasi Perusahaan"
    ]),
    business_value_en: JSON.stringify([
      "Reach Customers on Every Device",
      "Enhanced Data Collection from the Field",
      "Higher User Engagement Rates",
      "Improved Security with On-device Encryption"
    ]),
    business_value_id: JSON.stringify([
      "Jangkau Pelanggan di Setiap Perangkat",
      "Peningkatan Pengumpulan Data dari Lapangan",
      "Tingkat Keterlibatan Pengguna yang Lebih Tinggi",
      "Peningkatan Keamanan dengan Enkripsi Pada Perangkat"
    ])
  },
  {
    slug: 'business-systems',
    title_en: 'Business Systems',
    title_id: 'Sistem Bisnis',
    short_description_en: 'ERP and operational software engineered for complex workflows.',
    short_description_id: 'ERP dan perangkat lunak operasional dirancang untuk alur kerja yang kompleks.',
    description_en: 'We build comprehensive enterprise resource planning and business management systems that adapt to your operations, not the other way around. From finance to HR to supply chain, unify your data into a single source of truth.',
    description_id: 'Kami membangun sistem perencanaan sumber daya perusahaan dan manajemen bisnis komprehensif yang beradaptasi dengan operasi Anda, bukan sebaliknya. Dari keuangan hingga SDM hingga rantai pasokan, satukan data Anda ke dalam satu sumber kebenaran tunggal.',
    features_en: JSON.stringify([
      "Custom ERP Module Development",
      "Role-based Workflow Approvals",
      "Real-time Data Analytics and Reporting",
      "Legacy System Migration",
      "Multi-currency & Multi-company Accounting"
    ]),
    features_id: JSON.stringify([
      "Pengembangan Modul ERP Kustom",
      "Persetujuan Alur Kerja Berbasis Peran",
      "Analitik Data dan Pelaporan Waktu-nyata",
      "Migrasi Sistem Lama",
      "Akuntansi Multi-mata uang & Multi-perusahaan"
    ]),
    use_cases_en: JSON.stringify([
      "Manufacturing Production Planning",
      "Corporate Financial Consolidation",
      "Human Capital Management Systems",
      "Comprehensive Asset Management"
    ]),
    use_cases_id: JSON.stringify([
      "Perencanaan Produksi Manufaktur",
      "Konsolidasi Keuangan Perusahaan",
      "Sistem Manajemen Modal Manusia",
      "Manajemen Aset Komprehensif"
    ]),
    business_value_en: JSON.stringify([
      "Eliminate Data Silos",
      "Streamlined Regulatory Compliance",
      "Automated Financial Reconciliation",
      "Real-time Executive Visibility"
    ]),
    business_value_id: JSON.stringify([
      "Menghilangkan Silo Data",
      "Kepatuhan Peraturan yang Disederhanakan",
      "Rekonsiliasi Keuangan Otomatis",
      "Visibilitas Eksekutif Waktu-nyata"
    ])
  },
  {
    slug: 'automation',
    title_en: 'Business Automation',
    title_id: 'Otomatisasi Bisnis',
    short_description_en: 'Automate repetitive processes and eliminate human error.',
    short_description_id: 'Otomatisasi proses repetitif dan hilangkan kesalahan manusia.',
    description_en: 'Stop wasting valuable human capital on repetitive, manual tasks. We implement intelligent middleware, RPA (Robotic Process Automation), and script-based automations that connect disparate systems and execute tasks autonomously.',
    description_id: 'Berhentilah membuang modal manusia yang berharga untuk tugas-tugas manual yang repetitif. Kami mengimplementasikan middleware cerdas, RPA (Robotic Process Automation), dan otomatisasi berbasis skrip yang menghubungkan sistem yang berbeda dan mengeksekusi tugas secara otonom.',
    features_en: JSON.stringify([
      "API Integration & Webhook Orchestration",
      "Robotic Process Automation (RPA)",
      "Automated Data Entry & Scraping",
      "Scheduled Batch Processing",
      "Event-driven Architecture"
    ]),
    features_id: JSON.stringify([
      "Integrasi API & Orkestrasi Webhook",
      "Robotic Process Automation (RPA)",
      "Entri Data & Scraping Otomatis",
      "Pemrosesan Batch Terjadwal",
      "Arsitektur Berbasis Acara"
    ]),
    use_cases_en: JSON.stringify([
      "Automated End-of-Day Financial Reporting",
      "Data Synchronization between CRM and ERP",
      "Automated Employee Onboarding Workflows",
      "Email Parsing and Ticket Creation"
    ]),
    use_cases_id: JSON.stringify([
      "Pelaporan Keuangan Akhir Hari Otomatis",
      "Sinkronisasi Data antara CRM dan ERP",
      "Alur Kerja Onboarding Karyawan Otomatis",
      "Penguraian Email dan Pembuatan Tiket"
    ]),
    business_value_en: JSON.stringify([
      "Drastic Reduction in Operational Costs",
      "Zero Human Error in Data Transfers",
      "24/7 Uninterrupted Operations",
      "Free up Staff for Strategic Work"
    ]),
    business_value_id: JSON.stringify([
      "Pengurangan Drastis dalam Biaya Operasional",
      "Nol Kesalahan Manusia dalam Transfer Data",
      "Operasi 24/7 Tanpa Henti",
      "Bebaskan Staf untuk Pekerjaan Strategis"
    ])
  },
  {
    slug: 'system-integration',
    title_en: 'System Integration',
    title_id: 'Integrasi Sistem',
    short_description_en: 'Connect disparate systems, APIs, and legacy infrastructure.',
    short_description_id: 'Hubungkan sistem yang berbeda, API, dan infrastruktur lama.',
    description_en: 'We solve the enterprise puzzle by making your software talk to each other. Whether it\'s connecting a modern SaaS CRM to a 20-year-old on-premise database, or building unified GraphQL gateways, we engineer seamless data flow.',
    description_id: 'Kami memecahkan teka-teki perusahaan dengan membuat perangkat lunak Anda saling berbicara. Baik itu menghubungkan SaaS CRM modern ke database on-premise berusia 20 tahun, atau membangun gateway GraphQL terpadu, kami merekayasa aliran data yang mulus.',
    features_en: JSON.stringify([
      "Custom Middleware & API Gateway Design",
      "Legacy SOAP to Modern REST/GraphQL Conversion",
      "Secure Message Queues (Kafka, RabbitMQ)",
      "Bi-directional Data Synchronization",
      "Identity and Access Management (IAM) Integration"
    ]),
    features_id: JSON.stringify([
      "Desain Middleware & API Gateway Kustom",
      "Konversi SOAP Lama ke REST/GraphQL Modern",
      "Antrian Pesan Aman (Kafka, RabbitMQ)",
      "Sinkronisasi Data Dua Arah",
      "Integrasi Manajemen Identitas dan Akses (IAM)"
    ]),
    use_cases_en: JSON.stringify([
      "Connecting Shopify to Custom WMS",
      "Integrating Salesforce with SAP ERP",
      "Unified Single Sign-On (SSO) across 10+ Apps",
      "Aggregating Data for Business Intelligence"
    ]),
    use_cases_id: JSON.stringify([
      "Menghubungkan Shopify ke WMS Kustom",
      "Mengintegrasikan Salesforce dengan SAP ERP",
      "Single Sign-On (SSO) Terpadu di lebih dari 10 Aplikasi",
      "Menggabungkan Data untuk Intelijen Bisnis"
    ]),
    business_value_en: JSON.stringify([
      "Single Source of Truth across the Organization",
      "Extended Lifespan of Legacy Systems",
      "Faster Time-to-Market for New Digital Initiatives",
      "Reduced IT Maintenance Overheads"
    ]),
    business_value_id: JSON.stringify([
      "Satu Sumber Kebenaran di seluruh Organisasi",
      "Memperpanjang Masa Pakai Sistem Lama",
      "Waktu ke Pasar Lebih Cepat untuk Inisiatif Digital Baru",
      "Pengurangan Biaya Pemeliharaan TI"
    ])
  }
];

const solutionsContent = [
  {
    slug: 'order-management',
    title_en: 'Order Management',
    title_id: 'Manajemen Pesanan',
    short_description_en: 'Automate fulfillment pipelines from click to delivery.',
    short_description_id: 'Otomatisasi jalur pemenuhan dari klik hingga pengiriman.',
    business_problem_en: 'Processing orders manually leads to lost invoices, delayed shipping, customer dissatisfaction, and an inability to scale during peak sales seasons.',
    business_problem_id: 'Memproses pesanan secara manual menyebabkan hilangnya faktur, pengiriman yang tertunda, ketidakpuasan pelanggan, dan ketidakmampuan untuk melakukan penskalaan selama musim penjualan puncak.',
    solution_approach_en: 'We implement a unified order management system (OMS) that captures orders from all sales channels, validates inventory, triggers payment gateways, and routes fulfillment to the optimal warehouse instantly.',
    solution_approach_id: 'Kami mengimplementasikan sistem manajemen pesanan (OMS) terpadu yang menangkap pesanan dari semua saluran penjualan, memvalidasi inventaris, memicu gateway pembayaran, dan merutekan pemenuhan ke gudang optimal secara instan.',
    benefits_en: JSON.stringify([
      "Omnichannel Order Aggregation",
      "Automated Invoicing & Payment Verification",
      "Dynamic Courier Routing",
      "Real-time Customer Tracking Portals"
    ]),
    benefits_id: JSON.stringify([
      "Agregasi Pesanan Omnichannel",
      "Verifikasi Faktur & Pembayaran Otomatis",
      "Perutean Kurir Dinamis",
      "Portal Pelacakan Pelanggan Waktu-nyata"
    ])
  },
  {
    slug: 'field-service',
    title_en: 'Field Service Management',
    title_id: 'Manajemen Layanan Lapangan',
    short_description_en: 'Manage remote workforces, dispatching, and field data collection.',
    short_description_id: 'Kelola tenaga kerja jarak jauh, pengiriman, dan pengumpulan data lapangan.',
    business_problem_en: 'Managing technicians or sales reps in the field using paper forms and WhatsApp leads to severe miscommunication, delayed reporting, and lost revenue from unrecorded work.',
    business_problem_id: 'Mengelola teknisi atau perwakilan penjualan di lapangan menggunakan formulir kertas dan WhatsApp menyebabkan miskomunikasi yang parah, pelaporan yang tertunda, dan hilangnya pendapatan dari pekerjaan yang tidak tercatat.',
    solution_approach_en: 'A mobile-first platform equipped with GPS tracking, offline-first data entry, dynamic dispatch scheduling, and instant job-completion signatures, fully integrated back to HQ.',
    solution_approach_id: 'Platform mobile-first yang dilengkapi dengan pelacakan GPS, entri data offline-first, penjadwalan pengiriman dinamis, dan tanda tangan penyelesaian pekerjaan instan, terintegrasi penuh kembali ke HQ.',
    benefits_en: JSON.stringify([
      "Offline-capable Mobile Apps for Technicians",
      "Live GPS Dispatching Dashboard",
      "Digital Signatures and Photo Proof of Work",
      "Automated Timesheets and Expense Tracking"
    ]),
    benefits_id: JSON.stringify([
      "Aplikasi Seluler berkemampuan Offline untuk Teknisi",
      "Dasbor Pengiriman GPS Langsung",
      "Tanda Tangan Digital dan Bukti Foto Pekerjaan",
      "Timesheet Otomatis dan Pelacakan Pengeluaran"
    ])
  },
  {
    slug: 'business-intelligence',
    title_en: 'Business Intelligence',
    title_id: 'Intelijen Bisnis',
    short_description_en: 'Real-time analytical dashboards turning raw data into strategic insights.',
    short_description_id: 'Dasbor analitik waktu-nyata yang mengubah data mentah menjadi wawasan strategis.',
    business_problem_en: 'Executives are forced to make critical decisions based on Excel reports that are weeks old, heavily biased, and lack drill-down capabilities.',
    business_problem_id: 'Para eksekutif dipaksa untuk membuat keputusan penting berdasarkan laporan Excel yang sudah berumur berminggu-minggu, sangat bias, dan tidak memiliki kemampuan drill-down.',
    solution_approach_en: 'We build data pipelines that ingest data from your ERP, CRM, and marketing tools into a secure data warehouse. We then deploy interactive, real-time dashboards (using tools like Metabase or custom React frontends).',
    solution_approach_id: 'Kami membangun jalur pipa data yang menyerap data dari ERP, CRM, dan alat pemasaran Anda ke dalam gudang data yang aman. Kami kemudian menyebarkan dasbor interaktif waktu-nyata (menggunakan alat seperti Metabase atau frontend React kustom).',
    benefits_en: JSON.stringify([
      "Automated Data Warehousing (ETL)",
      "Custom Executive KPI Dashboards",
      "Predictive Trend Analysis",
      "Self-service Reporting for Managers"
    ]),
    benefits_id: JSON.stringify([
      "Pergudangan Data Otomatis (ETL)",
      "Dasbor KPI Eksekutif Kustom",
      "Analisis Tren Prediktif",
      "Pelaporan Mandiri untuk Manajer"
    ])
  },
  {
    slug: 'automation',
    title_en: 'Middleware Automation',
    title_id: 'Otomatisasi Middleware',
    short_description_en: 'Seamlessly connect and automate data flows across legacy systems.',
    short_description_id: 'Hubungkan dan otomatisasi aliran data dengan mulus di seluruh sistem lama.',
    business_problem_en: 'Departments operate in silos because their respective software systems cannot communicate. Staff spend hours downloading CSVs from one system to upload to another.',
    business_problem_id: 'Departemen beroperasi dalam silo karena sistem perangkat lunak masing-masing tidak dapat berkomunikasi. Staf menghabiskan waktu berjam-jam mengunduh CSV dari satu sistem untuk diunggah ke sistem lain.',
    solution_approach_en: 'We deploy robust integration middleware (Event buses, APIs) that act as a central nervous system for your company. When an action happens in Sales, Finance and Logistics are updated instantly.',
    solution_approach_id: 'Kami menyebarkan middleware integrasi yang kuat (Event buses, API) yang bertindak sebagai sistem saraf pusat untuk perusahaan Anda. Saat suatu tindakan terjadi di Penjualan, Keuangan dan Logistik diperbarui secara instan.',
    benefits_en: JSON.stringify([
      "Event-Driven Microservices",
      "No More Manual CSV Exports",
      "Centralized Error Logging",
      "Highly Scalable and Fault Tolerant"
    ]),
    benefits_id: JSON.stringify([
      "Layanan Mikro Berbasis Acara",
      "Tidak Ada Lagi Ekspor CSV Manual",
      "Pencatatan Kesalahan Terpusat",
      "Sangat Skalabel dan Toleran terhadap Kesalahan"
    ])
  },
  {
    slug: 'ai',
    title_en: 'AI & Smart Classification',
    title_id: 'AI & Klasifikasi Pintar',
    short_description_en: 'Leverage LLMs and computer vision to automate cognitive tasks.',
    short_description_id: 'Manfaatkan LLM dan visi komputer untuk mengotomatisasi tugas kognitif.',
    business_problem_en: 'Companies possess massive archives of unstructured data (PDFs, images, emails) that require human reading, leading to slow processing times and expensive workforce requirements.',
    business_problem_id: 'Perusahaan memiliki arsip besar data tidak terstruktur (PDF, gambar, email) yang memerlukan pembacaan manusia, yang menyebabkan waktu pemrosesan yang lambat dan kebutuhan tenaga kerja yang mahal.',
    solution_approach_en: 'We deploy custom fine-tuned Large Language Models and Optical Character Recognition (OCR) systems to read documents, extract key entities, classify intent, and trigger subsequent workflows entirely automatically.',
    solution_approach_id: 'Kami menyebarkan Model Bahasa Besar yang disempurnakan kustom dan sistem Pengenalan Karakter Optik (OCR) untuk membaca dokumen, mengekstrak entitas kunci, mengklasifikasikan niat, dan memicu alur kerja berikutnya sepenuhnya secara otomatis.',
    benefits_en: JSON.stringify([
      "Automated Invoice and Receipt Extraction",
      "Semantic Enterprise Search (RAG)",
      "Intelligent Ticket Routing",
      "Sentiment Analysis for Customer Feedback"
    ]),
    benefits_id: JSON.stringify([
      "Ekstraksi Faktur dan Tanda Terima Otomatis",
      "Pencarian Perusahaan Semantik (RAG)",
      "Perutean Tiket Cerdas",
      "Analisis Sentimen untuk Umpan Balik Pelanggan"
    ])
  }
];

async function updateFullData() {
  try {
    await client.connect();
    
    console.log('Updating all other services...');
    for (const s of servicesContent) {
      // Upsert logic just in case it doesn't exist
      await client.query(`
        INSERT INTO public.services (
          slug, title_en, title_id, short_description_en, short_description_id,
          description_en, description_id, features_en, features_id,
          use_cases_en, use_cases_id, business_value_en, business_value_id, is_active
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, true
        )
        ON CONFLICT (slug) DO UPDATE SET
          title_en = $2, title_id = $3, 
          short_description_en = $4, short_description_id = $5,
          description_en = $6, description_id = $7,
          features_en = $8, features_id = $9,
          use_cases_en = $10, use_cases_id = $11,
          business_value_en = $12, business_value_id = $13
      `, [
        s.slug, s.title_en, s.title_id, 
        s.short_description_en, s.short_description_id,
        s.description_en, s.description_id,
        s.features_en, s.features_id,
        s.use_cases_en, s.use_cases_id,
        s.business_value_en, s.business_value_id
      ]);
      console.log(`Updated service ${s.slug}`);
    }

    console.log('Updating all other solutions...');
    for (const s of solutionsContent) {
      await client.query(`
        INSERT INTO public.solutions (
          slug, title_en, title_id, short_description_en, short_description_id,
          business_problem_en, business_problem_id, solution_approach_en, solution_approach_id,
          benefits_en, benefits_id, is_active
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true
        )
        ON CONFLICT (slug) DO UPDATE SET
          title_en = $2, title_id = $3, 
          short_description_en = $4, short_description_id = $5,
          business_problem_en = $6, business_problem_id = $7,
          solution_approach_en = $8, solution_approach_id = $9,
          benefits_en = $10, benefits_id = $11
      `, [
        s.slug, s.title_en, s.title_id, 
        s.short_description_en, s.short_description_id,
        s.business_problem_en, s.business_problem_id,
        s.solution_approach_en, s.solution_approach_id,
        s.benefits_en, s.benefits_id
      ]);
      console.log(`Updated solution ${s.slug}`);
    }

    console.log('Done updating ALL rich content!');
  } catch (err) {
    console.error('Error updating content:', err);
  } finally {
    await client.end();
  }
}

updateFullData();
