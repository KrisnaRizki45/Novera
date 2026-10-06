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
    slug: 'custom-software',
    title_en: 'Custom Software Development',
    title_id: 'Pengembangan Perangkat Lunak Kustom',
    short_description_en: 'Bespoke enterprise applications built for scale and performance.',
    short_description_id: 'Aplikasi enterprise yang dirancang khusus untuk skala dan performa.',
    description_en: 'Off-the-shelf software often falls short of meeting unique enterprise requirements. We build custom, scalable, and secure software solutions tailored to your exact business processes, ensuring seamless integration and long-term viability.',
    description_id: 'Perangkat lunak pasaran sering kali tidak dapat memenuhi kebutuhan enterprise yang unik. Kami membangun solusi perangkat lunak yang kustom, skalabel, dan aman yang disesuaikan secara presisi dengan proses bisnis Anda, memastikan integrasi yang mulus dan kelangsungan jangka panjang.',
    features_en: JSON.stringify([
      "Microservices & Monolithic Architecture Design",
      "High-performance API Development",
      "Enterprise-grade Security & Role-based Access",
      "Cloud-native Deployment (AWS, GCP, Azure)",
      "Continuous Integration & Continuous Deployment (CI/CD)"
    ]),
    features_id: JSON.stringify([
      "Desain Arsitektur Microservices & Monolitik",
      "Pengembangan API Berperforma Tinggi",
      "Keamanan Skala Enterprise & Akses Berbasis Peran",
      "Penerapan Cloud-native (AWS, GCP, Azure)",
      "Integrasi Berkelanjutan & Penerapan Berkelanjutan (CI/CD)"
    ]),
    use_cases_en: JSON.stringify([
      "Core Banking Systems and Financial Dashboards",
      "Healthcare Patient Management Portals",
      "Logistics and Supply Chain Tracking Platforms",
      "Internal HR and Payroll Management Tools"
    ]),
    use_cases_id: JSON.stringify([
      "Sistem Perbankan Inti dan Dasbor Keuangan",
      "Portal Manajemen Pasien Perawatan Kesehatan",
      "Platform Pelacakan Logistik dan Rantai Pasokan",
      "Alat Manajemen SDM dan Penggajian Internal"
    ]),
    business_value_en: JSON.stringify([
      "100% Alignment with Business Workflows",
      "Zero Vendor Lock-in",
      "High Scalability for Millions of Users",
      "Reduced Long-term Licensing Costs"
    ]),
    business_value_id: JSON.stringify([
      "100% Selaras dengan Alur Kerja Bisnis",
      "Tanpa Keterikatan Vendor (Zero Vendor Lock-in)",
      "Skalabilitas Tinggi untuk Jutaan Pengguna",
      "Pengurangan Biaya Lisensi Jangka Panjang"
    ])
  },
  {
    slug: 'ai-solutions',
    title_en: 'AI & Machine Learning Solutions',
    title_id: 'Solusi AI & Machine Learning',
    short_description_en: 'Practical AI integration for business automation and insights.',
    short_description_id: 'Integrasi AI yang praktis untuk otomatisasi bisnis dan wawasan.',
    description_en: 'Artificial Intelligence shouldn\'t be just a buzzword. We implement practical AI and Machine Learning models that deliver measurable ROI, from smart document classification and RAG (Retrieval-Augmented Generation) to predictive analytics.',
    description_id: 'Kecerdasan Buatan tidak seharusnya hanya menjadi jargon. Kami mengimplementasikan model AI dan Machine Learning praktis yang memberikan ROI terukur, mulai dari klasifikasi dokumen pintar dan RAG (Retrieval-Augmented Generation) hingga analitik prediktif.',
    features_en: JSON.stringify([
      "Custom LLM Integration & Fine-tuning",
      "Retrieval-Augmented Generation (RAG) Systems",
      "Computer Vision & Image Processing",
      "Predictive Analytics & Forecasting Models",
      "Automated Customer Support Agents"
    ]),
    features_id: JSON.stringify([
      "Integrasi LLM Kustom & Fine-tuning",
      "Sistem Retrieval-Augmented Generation (RAG)",
      "Computer Vision & Pemrosesan Gambar",
      "Analitik Prediktif & Model Peramalan",
      "Agen Dukungan Pelanggan Otomatis"
    ]),
    use_cases_en: JSON.stringify([
      "Automated Invoice Processing and Extraction",
      "Intelligent Enterprise Search across internal documents",
      "Predictive Maintenance for Manufacturing",
      "Customer Churn Prediction Models"
    ]),
    use_cases_id: JSON.stringify([
      "Ekstraksi dan Pemrosesan Faktur Otomatis",
      "Pencarian Enterprise Pintar lintas dokumen internal",
      "Pemeliharaan Prediktif untuk Manufaktur",
      "Model Prediksi Churn Pelanggan"
    ]),
    business_value_en: JSON.stringify([
      "90% Reduction in Manual Data Entry",
      "24/7 Automated Customer Support",
      "Data-driven Decision Making",
      "Significant Operational Cost Savings"
    ]),
    business_value_id: JSON.stringify([
      "Pengurangan 90% pada Entri Data Manual",
      "Dukungan Pelanggan Otomatis 24/7",
      "Pengambilan Keputusan Berbasis Data",
      "Penghematan Biaya Operasional yang Signifikan"
    ])
  }
];

const solutionsContent = [
  {
    slug: 'business-operations',
    title_en: 'Business Operations Platform',
    title_id: 'Platform Operasi Bisnis',
    short_description_en: 'Streamline day-to-day workflows and unify your operational data.',
    short_description_id: 'Sederhanakan alur kerja harian dan satukan data operasional Anda.',
    business_problem_en: 'Enterprises struggle with fragmented data across multiple legacy systems, leading to manual reporting, human errors, and a severe lack of operational visibility.',
    business_problem_id: 'Perusahaan kesulitan dengan data yang terfragmentasi di berbagai sistem lama, yang menyebabkan pelaporan manual, kesalahan manusia, dan kurangnya visibilitas operasional yang parah.',
    solution_approach_en: 'We deploy a unified command center that integrates all your existing tools into a single, cohesive interface. Our platform automates data synchronization and provides real-time dashboards for executives.',
    solution_approach_id: 'Kami menyebarkan pusat komando terpadu yang mengintegrasikan semua alat Anda yang ada ke dalam satu antarmuka yang kohesif. Platform kami mengotomatiskan sinkronisasi data dan menyediakan dasbor waktu-nyata untuk eksekutif.',
    benefits_en: JSON.stringify([
      "Centralized Data Hub for all departments",
      "Automated Report Generation",
      "Custom Workflow Builders",
      "Role-based Dashboards and Metrics"
    ]),
    benefits_id: JSON.stringify([
      "Hub Data Terpusat untuk semua departemen",
      "Pembuatan Laporan Otomatis",
      "Pembangun Alur Kerja Kustom",
      "Dasbor dan Metrik Berbasis Peran"
    ])
  },
  {
    slug: 'inventory-management',
    title_en: 'Advanced Inventory Management',
    title_id: 'Manajemen Inventaris Lanjutan',
    short_description_en: 'Track stock in real-time across multiple warehouses and channels.',
    short_description_id: 'Lacak stok secara real-time di berbagai gudang dan saluran.',
    business_problem_en: 'Retailers and distributors often face stockouts, overstocking, and inaccurate forecasting due to delayed inventory syncing between eCommerce platforms and physical warehouses.',
    business_problem_id: 'Pengecer dan distributor sering menghadapi kehabisan stok, kelebihan stok, dan peramalan yang tidak akurat karena keterlambatan sinkronisasi inventaris antara platform eCommerce dan gudang fisik.',
    solution_approach_en: 'Our solution connects directly to your POS, eCommerce APIs (Shopify, WooCommerce), and warehouse scanners. It provides millisecond-accurate stock counts and uses AI to predict reorder points.',
    solution_approach_id: 'Solusi kami terhubung langsung ke POS Anda, API eCommerce (Shopify, WooCommerce), dan pemindai gudang. Solusi ini menyediakan hitungan stok seakurat milidetik dan menggunakan AI untuk memprediksi titik pemesanan ulang.',
    benefits_en: JSON.stringify([
      "Real-time Multi-channel Syncing",
      "AI-driven Demand Forecasting",
      "Barcode & RFID Integration",
      "Automated Purchase Orders"
    ]),
    benefits_id: JSON.stringify([
      "Sinkronisasi Multi-saluran Waktu-nyata",
      "Peramalan Permintaan Berbasis AI",
      "Integrasi Barcode & RFID",
      "Pesanan Pembelian Otomatis"
    ])
  }
];

async function updateData() {
  try {
    await client.connect();
    
    console.log('Updating services...');
    for (const s of servicesContent) {
      await client.query(`
        UPDATE public.services 
        SET 
          title_en = $1, title_id = $2, 
          short_description_en = $3, short_description_id = $4,
          description_en = $5, description_id = $6,
          features_en = $7, features_id = $8,
          use_cases_en = $9, use_cases_id = $10,
          business_value_en = $11, business_value_id = $12
        WHERE slug = $13
      `, [
        s.title_en, s.title_id, 
        s.short_description_en, s.short_description_id,
        s.description_en, s.description_id,
        s.features_en, s.features_id,
        s.use_cases_en, s.use_cases_id,
        s.business_value_en, s.business_value_id,
        s.slug
      ]);
      console.log(`Updated service ${s.slug}`);
    }

    console.log('Updating solutions...');
    for (const s of solutionsContent) {
      await client.query(`
        UPDATE public.solutions 
        SET 
          title_en = $1, title_id = $2, 
          short_description_en = $3, short_description_id = $4,
          business_problem_en = $5, business_problem_id = $6,
          solution_approach_en = $7, solution_approach_id = $8,
          benefits_en = $9, benefits_id = $10
        WHERE slug = $11
      `, [
        s.title_en, s.title_id, 
        s.short_description_en, s.short_description_id,
        s.business_problem_en, s.business_problem_id,
        s.solution_approach_en, s.solution_approach_id,
        s.benefits_en, s.benefits_id,
        s.slug
      ]);
      console.log(`Updated solution ${s.slug}`);
    }

    console.log('Done updating rich content!');
  } catch (err) {
    console.error('Error updating content:', err);
  } finally {
    await client.end();
  }
}

updateData();
