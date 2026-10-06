const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app', '(marketing)');

const servicesData = [
  { slug: "custom-software", idTitle: "Pengembangan Software Kustom", enTitle: "Custom Software Development", idDesc: "Kami membangun perangkat lunak skala enterprise yang disesuaikan 100% dengan alur kerja spesifik bisnis Anda, bebas dari batasan software off-the-shelf.", enDesc: "We build enterprise-grade software perfectly tailored to your specific business workflows, free from the limitations of off-the-shelf solutions." },
  { slug: "web-development", idTitle: "Pengembangan Web", enTitle: "Web Development", idDesc: "Membangun platform web berkinerja tinggi, aman, dan dapat disesuaikan skala (scalable) untuk melayani jutaan pengguna dengan arsitektur modern.", enDesc: "Building high-performance, secure, and scalable web platforms designed to serve millions of users with modern architecture." },
  { slug: "mobile-development", idTitle: "Pengembangan Aplikasi Mobile", enTitle: "Mobile App Development", idDesc: "Aplikasi iOS dan Android native dan cross-platform yang dirancang untuk performa mulus dan pengalaman pengguna tingkat enterprise.", enDesc: "Native and cross-platform iOS and Android applications designed for seamless performance and enterprise-grade user experience." },
  { slug: "business-systems", idTitle: "Sistem Bisnis & ERP", enTitle: "Business Systems & ERP", idDesc: "Merancang dan mengimplementasikan sistem inti (Core Systems), ERP, dan CRM kustom untuk menyederhanakan rantai operasi perusahaan Anda.", enDesc: "Designing and implementing core systems, custom ERPs, and CRMs to streamline your company's operational chain." },
  { slug: "automation", idTitle: "Otomasi Proses Bisnis", enTitle: "Business Process Automation", idDesc: "Menghilangkan tugas manual yang repetitif melalui skrip otomasi canggih dan integrasi alur kerja mesin.", enDesc: "Eliminate repetitive manual tasks through advanced automation scripts and machine workflow integrations." },
  { slug: "ai-solutions", idTitle: "Solusi AI Praktis", enTitle: "Practical AI Solutions", idDesc: "Mengintegrasikan model Kecerdasan Buatan (AI) ke dalam sistem Anda untuk otomatisasi cerdas, analitik prediktif, dan asisten virtual.", enDesc: "Integrating Artificial Intelligence models into your systems for intelligent automation, predictive analytics, and virtual assistants." },
  { slug: "system-integration", idTitle: "Integrasi Sistem & API", enTitle: "System & API Integration", idDesc: "Menghubungkan aplikasi lama, database terisolasi, dan layanan pihak ketiga menjadi satu ekosistem yang terpusat dan mulus.", enDesc: "Connecting legacy applications, siloed databases, and third-party services into a single, seamless centralized ecosystem." }
];

const solutionsData = [
  { slug: "business-operations", idTitle: "Operasi Bisnis", enTitle: "Business Operations", idDesc: "Sistem komprehensif untuk memonitor, mengelola, dan mengoptimalkan operasi harian perusahaan dari satu dasbor tunggal.", enDesc: "Comprehensive systems to monitor, manage, and optimize daily company operations from a single dashboard." },
  { slug: "inventory-management", idTitle: "Manajemen Inventaris", enTitle: "Inventory Management", idDesc: "Lacak pergerakan stok, prediksi permintaan, dan kurangi kehilangan barang dengan sistem inventaris waktu-nyata berbasis sensor.", enDesc: "Track stock movements, forecast demand, and reduce shrinkage with real-time, sensor-driven inventory systems." },
  { slug: "order-management", idTitle: "Manajemen Pesanan", enTitle: "Order Management", idDesc: "Otomatiskan seluruh siklus pemesanan mulai dari checkout hingga pemenuhan dan pengiriman dengan akurasi 100%.", enDesc: "Automate the entire order lifecycle from checkout to fulfillment and shipping with 100% accuracy." },
  { slug: "field-service", idTitle: "Layanan Lapangan (Field Service)", enTitle: "Field Service Management", idDesc: "Kelola armada dan pekerja jarak jauh Anda dengan rute optimal, pelacakan GPS, dan pelaporan tugas digital seketika.", enDesc: "Manage your fleet and remote workforce with optimized routing, GPS tracking, and instant digital task reporting." },
  { slug: "business-intelligence", idTitle: "Intelijen Bisnis (BI)", enTitle: "Business Intelligence", idDesc: "Ubah data mentah dari berbagai departemen menjadi wawasan visual yang dapat ditindaklanjuti oleh eksekutif.", enDesc: "Transform raw data from multiple departments into visual, actionable insights for executives." },
  { slug: "automation", idTitle: "Otomasi Alur Kerja", enTitle: "Workflow Automation", idDesc: "Gantikan birokrasi kertas dan persetujuan lambat dengan alur kerja persetujuan digital otomatis.", enDesc: "Replace paper bureaucracy and slow approvals with automated digital approval workflows." },
  { slug: "ai", idTitle: "Integrasi AI", enTitle: "AI Integration", idDesc: "Lengkapi solusi yang ada dengan kemampuan AI terdepan untuk deteksi anomali, klasifikasi data, dan prediksi cerdas.", enDesc: "Supercharge existing solutions with cutting-edge AI capabilities for anomaly detection, data classification, and smart predictions." }
];

function generateComponent(category, data) {
  const content = `import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, ChevronRight, Settings, Layout, Code2, Zap } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';

export default async function Page() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  const title = isId ? "${data.idTitle}" : "${data.enTitle}";
  const desc = isId ? "${data.idDesc}" : "${data.enDesc}";

  const features = isId ? [
    { title: "Arsitektur Skalabel", desc: "Sistem dibangun untuk menangani lonjakan lalu lintas yang masif." },
    { title: "Keamanan Standar Bank", desc: "Enkripsi end-to-end dan kepatuhan terhadap standar data global." },
    { title: "Pemantauan Real-time", desc: "Dasbor analitik bawaan untuk operasional Anda." },
    { title: "API yang Fleksibel", desc: "Integrasi mulus dengan ekosistem perangkat lunak lain." }
  ] : [
    { title: "Scalable Architecture", desc: "Systems built to handle massive traffic spikes seamlessly." },
    { title: "Bank-Grade Security", desc: "End-to-end encryption and compliance with global data standards." },
    { title: "Real-time Monitoring", desc: "Built-in analytics dashboard for your operations." },
    { title: "Flexible API", desc: "Seamless integration with other software ecosystems." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {isId ? "Kategori: ${category.toUpperCase()}" : "Category: ${category.toUpperCase()}"}
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
              {desc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/start-a-project">
                <Button size="lg" className="h-12 px-8 shadow-xl">
                  {isId ? "Diskusikan Kebutuhan Anda" : "Discuss Your Needs"}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                {isId ? "Dirancang untuk Enterprise" : "Engineered for the Enterprise"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {isId 
                  ? "Berbeda dengan template pasaran, solusi kami direkayasa dari bawah ke atas menggunakan teknologi modern seperti React, Node.js, dan arsitektur Cloud-Native. Memastikan masa pakai aplikasi yang lebih panjang dan adaptasi mulus dengan pertumbuhan perusahaan Anda."
                  : "Unlike off-the-shelf templates, our solutions are engineered from the ground up using modern stack technologies like React, Node.js, and Cloud-Native architectures. Ensuring a longer application lifespan and seamless adaptation to your company's growth."}
              </p>
              <ul className="space-y-4">
                {features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-foreground">{f.title}</h4>
                      <p className="text-muted-foreground text-sm">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-background border border-border/50 rounded-3xl p-8 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-3xl" />
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {features.map((f, i) => (
                    <div key={i} className="bg-muted/30 p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors">
                      <Zap className="w-8 h-8 text-primary mb-4" />
                      <h4 className="font-semibold mb-2">{f.title}</h4>
                      <p className="text-xs text-muted-foreground">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      <section className="py-24 px-4 bg-muted/30 border-t border-border/50 text-center">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              {isId ? "Siap untuk Membangun?" : "Ready to Build?"}
            </h2>
            <Link href="/start-a-project">
              <Button size="lg" className="h-14 px-10 text-lg shadow-xl hover:scale-105 transition-transform">
                {isId ? "Hubungi Tim Ahli Kami" : "Contact Our Experts"}
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
`;
  return content;
}

function processDirectory(category, items) {
  items.forEach(item => {
    const dirPath = path.join(baseDir, category, item.slug);
    if (fs.existsSync(dirPath)) {
      const filePath = path.join(dirPath, 'page.tsx');
      fs.writeFileSync(filePath, generateComponent(category, item));
      console.log("Updated " + category + "/" + item.slug);
    }
  });
}

processDirectory('services', servicesData);
processDirectory('solutions', solutionsData);
console.log("All subpages have been successfully transformed into bilingual functional pages without placeholders.");
