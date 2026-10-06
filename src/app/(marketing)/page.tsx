import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/fade-in';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { Code2, Database, Bot, Network, Lightbulb, ChevronRight, CheckCircle2, Zap, Shield, Layers, Activity, Building2, Truck, ShoppingCart } from 'lucide-react';

import dynamic from 'next/dynamic';
import { getLanguage } from '@/lib/i18n';
import { FeatureCardModal } from './components/feature-card-modal';
import { ClientMarquee } from './components/client-marquee';

const EnterpriseEcosystem = dynamic(
  () => import('./components/enterprise-ecosystem').then(mod => mod.EnterpriseEcosystem),
  { 
    loading: () => (
      <div className="w-full max-w-2xl mx-auto aspect-square md:aspect-[2/1] flex items-center justify-center">
        <div className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-muted/20 border-2 border-border/30 rounded-3xl animate-pulse" />
      </div>
    )
  }
);

const CinematicTransition = dynamic(
  () => import('./components/cinematic-transition').then(mod => mod.CinematicTransition),
  { 
    loading: () => (
      <div className="w-full max-w-md mx-auto h-[420px] bg-muted/10 border border-border/30 rounded-xl shadow-sm animate-pulse" />
    )
  }
);

export default async function Home() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  // Basic dictionary for demonstration
  const t = {
    badge: isId ? "Membangun Software Enterprise" : "Building Enterprise Software",
    heroTitle1: isId ? "Teknologi Yang Membawa" : "Technology That Moves Your",
    heroTitle2: isId ? "Bisnis Anda Maju." : "Business Forward.",
    heroDesc: isId ? "NOVERA merancang dan membangun perangkat lunak kustom, sistem bisnis, otomasi, dan solusi berbasis AI yang membantu perusahaan beroperasi lebih cerdas dan berkembang dengan percaya diri." : "NOVERA designs and builds custom software, business systems, automation, and AI-powered solutions that help organizations operate smarter and scale with confidence.",
    startProject: isId ? "Mulai Proyek" : "Start a Project",
    exploreWork: isId ? "Jelajahi Portofolio Kami" : "Explore Our Work",
    
    capTitle: isId ? "Kemampuan Utama Kami" : "Our Core Capabilities",
    
    probTitle: isId ? "Bisnis Anda tidak seharusnya mengalah pada batasan software." : "Your business shouldn't have to work around its software.",
    probDesc: isId ? "Solusi instan (off-the-shelf) memaksa Anda menyesuaikan operasional dengan keterbatasan mereka. Kami membangun software yang beradaptasi dengan Anda." : "Off-the-shelf solutions force you to adapt your operations to their limitations. We build software that adapts to you.",
    
    processTitle: isId ? "Proses yang terukur untuk proyek yang kompleks." : "A predictable process for complex projects.",
    
    techTitle: isId ? "Dibangun di atas fondasi modern, aman, dan skalabel." : "Built on modern, secure, and scalable foundations.",
    
    ctaTitle: isId ? "Siap untuk meningkatkan operasional Anda?" : "Ready to upgrade your operations?",
    ctaDesc: isId ? "Mari diskusikan bagaimana teknologi kustom dapat mendorong ROI nyata bagi bisnis Anda." : "Let's discuss how customized technology can drive real ROI for your business.",
    ctaBtn: isId ? "Diskusikan Proyek Anda" : "Discuss Your Project",

    metricsTitle: isId ? "Dampak Nyata yang Terukur" : "Measurable Business Impact",
    metricsList: isId ? [
      { num: "99.9%", desc: "Uptime Sistem Server" },
      { num: "10x", desc: "Akselerasi Proses Bisnis" },
      { num: "$50M+", desc: "Nilai Transaksi Terkelola" },
      { num: "24/7", desc: "Dukungan Teknis Enterprise" }
    ] : [
      { num: "99.9%", desc: "System Uptime Guarantee" },
      { num: "10x", desc: "Business Process Acceleration" },
      { num: "$50M+", desc: "Managed Transaction Value" },
      { num: "24/7", desc: "Enterprise Technical Support" }
    ],

    pricingTitle: isId ? "Investasi Teknologi yang Transparan" : "Transparent Technology Investment",
    pricingDesc: isId ? "Struktur estimasi harga yang transparan untuk memberikan gambaran skala proyek Anda." : "Clear estimated pricing structures to give you an idea of your project scale.",
    pricingTiers: isId ? [
      {
        name: "Landing Page & Profil",
        originalPrice: "Rp 10.000.000",
        price: "Rp 4.900.000",
        desc: "Sempurna untuk validasi ide, profil perusahaan, dan landing page performa tinggi.",
        features: ["Desain UI/UX Kustom", "Animasi Modern", "Kecepatan Muat <1 Detik", "Responsive Mobile", "SEO Dasar"],
        btn: "Mulai Proyek"
      },
      {
        name: "Web Platform & SaaS",
        originalPrice: "Rp 35.000.000",
        price: "Rp 19.900.000",
        desc: "Aplikasi kompleks dengan sistem pembayaran, dashboard pengguna, dan integrasi API.",
        features: ["Semua Fitur Web", "Sistem Pembayaran Gateway", "Dashboard Custom", "Database Skalabel", "Autentikasi Aman"],
        popular: true,
        btn: "Konsultasi Platform"
      },
      {
        name: "Business Systems",
        originalPrice: "Rp 80.000.000",
        price: "Rp 49.000.000",
        desc: "Sistem manajemen internal lengkap untuk operasi bisnis lintas departemen.",
        features: ["Multi-Role Akses", "Manajemen Inventaris", "Alur Kerja Otomatis", "Laporan Real-time", "Pelatihan Tim"],
        btn: "Konsultasi Sistem"
      },
      {
        name: "Enterprise Solutions",
        price: "Harga Kustom",
        desc: "Sistem berskala besar untuk otomatisasi penuh dan infrastruktur mission-critical.",
        features: ["Arsitektur Microservices", "SLA Uptime 99.9%", "Keamanan Standar Bank", "Dedicated Engineer", "Pemeliharaan 24/7"],
        btn: "Hubungi Enterprise"
      }
    ] : [
      {
        name: "Landing Page & Profile",
        originalPrice: "$1,000",
        price: "$490",
        desc: "Perfect for idea validation, corporate profiles, and high-performance landing pages.",
        features: ["Custom UI/UX Design", "Modern Animations", "<1s Load Speeds", "Mobile Responsive", "Basic SEO"],
        btn: "Start Project"
      },
      {
        name: "Web Platform & SaaS",
        originalPrice: "$3,500",
        price: "$1,990",
        desc: "Complex applications with payment gateways, user dashboards, and API integrations.",
        features: ["All Web Features", "Payment Gateway Integration", "Custom Dashboard", "Scalable Database", "Secure Auth"],
        popular: true,
        btn: "Platform Consultation"
      },
      {
        name: "Business Systems",
        originalPrice: "$8,000",
        price: "$4,900",
        desc: "Complete internal management systems for cross-departmental business operations.",
        features: ["Multi-Role Access", "Inventory Management", "Automated Workflows", "Real-time Reporting", "Team Training"],
        btn: "System Consultation"
      },
      {
        name: "Enterprise Solutions",
        price: "Custom Pricing",
        desc: "Large-scale systems for full automation and mission-critical infrastructure.",
        features: ["Microservices Architecture", "99.9% Uptime SLA", "Bank-Grade Security", "Dedicated Engineer", "24/7 Maintenance"],
        btn: "Contact Enterprise"
      }
    ],

    indTitle: isId ? "Fokus Industri Kami" : "Our Industry Focus",
    indDesc: isId ? "Arsitektur khusus yang disesuaikan dengan regulasi dan tantangan unik setiap industri." : "Specialized architectures tailored to the unique regulations and challenges of each industry.",

    faqTitle: isId ? "Pertanyaan yang Sering Diajukan" : "Frequently Asked Questions",
    faqDesc: isId ? "Segala yang perlu Anda ketahui tentang prosedur dan standar engineering kami." : "Everything you need to know about our engineering procedures and standards."
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30">
      {/* HERO SECTION */}
      <section className="relative px-4 pt-32 pb-40 md:pt-48 md:pb-56 overflow-hidden">
        <div className="absolute inset-0 bg-background -z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-background to-background -z-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
        
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              {t.badge}
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1} direction="up">
            <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
              {t.heroTitle1} <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{t.heroTitle2}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              {t.heroDesc}
            </p>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start-a-project">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-base shadow-xl shadow-primary/20 transition-all hover:scale-105">
                  {t.startProject}
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-base backdrop-blur-md bg-background/50 hover:bg-muted transition-all hover:scale-105">
                  {t.exploreWork}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CAPABILITY SECTION */}
      <section className="py-16 bg-zinc-50/50 dark:bg-zinc-900/30 border-y border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground">{t.capTitle}</h2>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-90">
            {[
              { 
                title: isId ? 'Rekayasa Perangkat Lunak' : 'Software Engineering', 
                iconName: "Code2" as const,
                shortDesc: isId ? "Aplikasi kustom berperforma tinggi dari awal hingga akhir." : "End-to-end custom high-performance applications.",
                overview: isId ? "Kami merancang dan membangun sistem perangkat lunak yang disesuaikan untuk skala besar. Dari monolith yang efisien hingga arsitektur microservices berbasis cloud, kami memastikan kode Anda tidak hanya bekerja, tetapi juga mudah di-maintain dan siap untuk pertumbuhan eksponensial." : "We architect and build software systems tailored for massive scale. From efficient monoliths to cloud-native microservices architectures, we ensure your codebase doesn't just work—it's highly maintainable and ready for exponential growth.",
                capabilities: isId ? ["Arsitektur Cloud-Native", "Microservices & Serverless", "Legacy System Modernization", "Pengembangan API Tingkat Enterprise"] : ["Cloud-Native Architectures", "Microservices & Serverless", "Legacy System Modernization", "Enterprise API Development"],
                useCases: isId ? "Portal B2B, Aplikasi SaaS, Sistem ERP Kustom, High-Frequency Trading Dashboards." : "B2B Portals, SaaS Applications, Custom ERP Systems, High-Frequency Trading Dashboards.",
                technology: "Next.js, React, Node.js, Go, Kubernetes, Docker, AWS, GCP."
              },
              { 
                title: isId ? 'Sistem Bisnis' : 'Business Systems', 
                iconName: "Database" as const,
                shortDesc: isId ? "Transformasi operasional dengan sistem terpusat." : "Transform operations with centralized systems.",
                overview: isId ? "Kami mengintegrasikan dan membangun sistem bisnis (ERP, CRM, CMS) yang merampingkan operasional Anda. Katakan selamat tinggal pada data yang terpisah-pisah. Sistem kami bertindak sebagai single source of truth untuk seluruh organisasi Anda." : "We integrate and build business systems (ERP, CRM, CMS) that streamline your operations. Say goodbye to data silos. Our systems act as the single source of truth for your entire organization.",
                capabilities: isId ? ["Integrasi ERP & CRM Kustom", "Manajemen Inventaris Waktu Nyata", "Otomatisasi Alur Kerja HR & Keuangan", "Data Warehousing"] : ["Custom ERP & CRM Integrations", "Real-Time Inventory Management", "HR & Finance Workflow Automation", "Data Warehousing"],
                useCases: isId ? "Otomatisasi Rantai Pasokan, Sistem HR Terpusat, Integrasi Akuntansi Skala Besar." : "Supply Chain Automation, Centralized HR Systems, Large-Scale Accounting Integrations.",
                technology: "PostgreSQL, Supabase, Prisma, Redis, Kafka."
              },
              { 
                title: isId ? 'AI & Otomatisasi' : 'AI & Automation', 
                iconName: "Bot" as const,
                shortDesc: isId ? "Model AI praktis untuk otomatisasi alur kerja." : "Practical AI models for workflow automation.",
                overview: isId ? "Kami tidak sekadar menambahkan AI sebagai gimmick. Kami mengimplementasikan model LLM, Computer Vision, dan sistem otomatisasi (RPA) ke dalam alur operasional praktis yang secara nyata menghemat ribuan jam kerja manual manusia setiap bulannya." : "We don't just add AI as a gimmick. We implement LLM models, Computer Vision, and Robotic Process Automation (RPA) into practical operational workflows that verifiably save thousands of manual human hours every month.",
                capabilities: isId ? ["Otomatisasi Pemrosesan Dokumen", "Sistem Asisten AI (RAG)", "Analisis Prediktif Data", "Integrasi Alur Kerja Robotik"] : ["Document Processing Automation", "AI Assistant Systems (RAG)", "Predictive Data Analytics", "Robotic Workflow Integration"],
                useCases: isId ? "Analisis Kontrak Otomatis, Dukungan Pelanggan Cerdas (AI Agent), Prediksi Inventaris Berbasis Machine Learning." : "Automated Contract Analysis, Intelligent Customer Support (AI Agents), Machine-Learning Driven Inventory Prediction.",
                technology: "OpenAI, LangChain, Pinecone, Python, TensorFlow."
              },
            ].map((capability, index) => (
              <FadeIn key={capability.title} delay={index * 0.1} direction="up" className="h-full">
                <FeatureCardModal 
                  isId={isId}
                  iconName={capability.iconName}
                  title={capability.title}
                  shortDesc={capability.shortDesc}
                  overview={capability.overview}
                  capabilities={capability.capabilities}
                  useCases={capability.useCases}
                  technology={capability.technology}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-12 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center mb-20">
              <h2 className="text-3xl md:text-6xl font-heading font-bold mb-8 leading-tight">{t.probTitle}</h2>
              <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed">
                {t.probDesc}
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto">
            {[
              { title: isId ? "Alur kerja manual" : "Manual workflows", desc: isId ? "Membuang waktu untuk tugas yang seharusnya otomatis." : "Wasting hours on repetitive tasks that software should handle automatically." },
              { title: isId ? "Data tersebar" : "Scattered data", desc: isId ? "Informasi hilang di antara spreadsheet dan email." : "Important information lost across spreadsheets, emails, and disconnected tools." },
              { title: isId ? "Sistem tidak terhubung" : "Disconnected systems", desc: isId ? "Software Anda menolak berkomunikasi satu sama lain." : "Your CRM, inventory, and accounting software refuse to talk to each other." },
              { title: isId ? "Tugas berulang" : "Repetitive tasks", desc: isId ? "Karyawan bertindak sebagai jembatan antar aplikasi." : "Employees acting as human bridges between different software applications." },
              { title: isId ? "Visibilitas terbatas" : "Limited visibility", desc: isId ? "Mengambil keputusan berdasarkan data usang." : "Making critical business decisions based on outdated or incomplete data." },
              { title: isId ? "Proses tertinggal" : "Legacy processes", desc: isId ? "Tertahan oleh sistem lama yang berisiko di-upgrade." : "Being held back by outdated systems that are too risky or expensive to upgrade." }
            ].map((problem, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="bg-background/60 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-500 h-full">
                  <CardContent className="p-4 md:p-8 flex flex-col items-start gap-4 h-full">
                    <div className="flex-shrink-0 p-2 md:p-3 rounded-lg bg-destructive/10 text-destructive">
                      <div className="w-2 h-2 rounded-full bg-destructive shadow-[0_0_10px_rgba(255,0,0,0.5)]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-base md:text-xl text-foreground mb-2">{problem.title}</h3>
                      <p className="text-muted-foreground text-xs md:text-base leading-relaxed">{problem.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY FOCUS SECTION */}
      <section className="py-16 px-4 bg-slate-50/30 dark:bg-slate-900/20 border-t border-border/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">{t.indTitle}</h2>
                <h3 className="text-xl md:text-xl font-heading font-bold">{t.indDesc}</h3>
              </div>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: isId ? "Keuangan & Fintech" : "Finance & Fintech", icon: Building2, desc: isId ? "Sistem transaksi volume tinggi dan aman." : "High-volume, highly secure transaction engines." },
              { title: isId ? "Layanan Kesehatan" : "Healthcare", icon: Activity, desc: isId ? "Aplikasi medis dengan privasi data ketat." : "HIPAA-compliant platforms with strict data privacy." },
              { title: isId ? "Logistik & Supply Chain" : "Logistics & Supply", icon: Truck, desc: isId ? "Platform sinkronisasi inventaris real-time." : "Real-time inventory synchronization platforms." },
              { title: "Retail & eCommerce", icon: ShoppingCart, desc: isId ? "Otomatisasi ERP multi-gudang skalabel." : "Scalable multi-warehouse ERP automation." }
            ].map((ind, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-background border border-border/50 p-6 md:p-8 rounded-2xl shadow-sm hover:border-primary/50 transition-all duration-300 h-full flex flex-col group hover:-translate-y-1">
                  <ind.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="font-heading font-bold text-xl mb-3">{ind.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{ind.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-12 px-4 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center mb-20">
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">{isId ? 'Cara Kami Bekerja' : 'How We Work'}</h2>
              <h3 className="text-xl md:text-xl font-heading font-bold mb-6">{t.processTitle}</h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {isId ? 'Software enterprise membutuhkan disiplin. Kami mengikuti metodologi yang ketat dan transparan.' : 'Enterprise software requires discipline. We follow a strict, transparent methodology to ensure your project is delivered on time, securely, and exactly as required.'}
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Discovery", desc: isId ? "Menganalisis operasional dan kebutuhan Anda." : "Deep dive into your business operations, bottlenecks, and technical requirements." },
              { step: "02", title: "Architecture", desc: isId ? "Merancang database dan alur pengguna." : "Designing scalable database structures, API layouts, and intuitive user flows." },
              { step: "03", title: "Development", desc: isId ? "Rekayasa agile dengan laporan progres mingguan." : "Agile engineering with transparent weekly progress updates and staging access." },
              { step: "04", title: "Deployment", desc: isId ? "Pengujian QA ketat dan migrasi data." : "Rigorous QA, smooth data migration, and comprehensive team training." }
            ].map((phase, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative flex flex-col gap-4">
                  <div className="text-xl md:text-xl font-heading font-bold text-primary/10 mb-2">{phase.step}</div>
                  <h4 className="font-heading font-semibold text-xl md:text-2xl">{phase.title}</h4>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{phase.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ENTERPRISE CAPABILITIES / TRUST SECTION */}
      <section className="py-12 px-4 border-b border-border/40 bg-muted/5 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center">
          <FadeIn>
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
              {isId ? 'STANDAR TEKNOLOGI ENTERPRISE' : 'ENTERPRISE TECHNOLOGY STANDARDS'}
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              {isId 
                ? "Dirancang untuk ekosistem operasional yang kompleks, terintegrasi, dan membutuhkan skalabilitas."
                : "Built for Complex Business Environments & Interconnected Scale."}
            </p>
            <EnterpriseEcosystem isId={isId} />
          </FadeIn>
          
          <FadeIn delay={0.2} className="mt-20 border-t border-border/40 pt-16">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8">
              {isId ? "Dipercaya Oleh Inovator Industri" : "Trusted by Industry Innovators"}
            </h3>
            <ClientMarquee />
          </FadeIn>
        </div>
      </section>

      {/* PRICING / INVESTMENT SECTION */}
      <section className="py-12 border-t border-border/40 relative overflow-hidden bg-zinc-100/50 dark:bg-zinc-950/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeIn>
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">Investment Plans</h2>
              <h3 className="text-xl md:text-xl font-heading font-bold mb-6">{t.pricingTitle}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.pricingDesc}</p>
            </div>
          </FadeIn>
          
          <CinematicTransition>
            {t.pricingTiers.map((tier, i) => (
              <div key={i} className="h-full pb-4">
                <Card className={`relative flex flex-col h-full bg-background transition-all duration-500 overflow-hidden 
                  ${tier.popular 
                    ? 'border-primary shadow-2xl ring-1 ring-primary/20 z-10' 
                    : 'border-border/50 hover:border-primary/30 shadow-md hover:shadow-xl'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 inset-x-0 bg-primary text-primary-foreground text-xs font-bold py-2 text-center uppercase tracking-widest shadow-md">
                      {isId ? "Rekomendasi Utama" : "Recommended Option"}
                    </div>
                  )}
                  {tier.popular && (
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                  )}
                  
                  <CardContent className={`flex flex-col h-full relative z-10 ${tier.popular ? 'p-10 pt-16' : 'p-8 md:p-10'}`}>
                    <div className="mb-8 border-b border-border/50 pb-8">
                      <h4 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-4">{tier.name}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed min-h-[3rem]">{tier.desc}</p>
                    </div>
                    
                    <div className="mb-8">
                      <div className="text-sm font-medium text-muted-foreground mb-2">{isId ? "Estimasi Investasi" : "Estimated Investment"}</div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="font-heading font-bold text-3xl lg:text-4xl text-foreground">{tier.price}</div>
                        {tier.originalPrice && (
                          <div className="text-lg lg:text-xl text-muted-foreground line-through opacity-60 font-semibold">{tier.originalPrice}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-10 flex-grow">
                      <div className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">{isId ? "Lingkup Layanan:" : "Service Scope:"}</div>
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 shrink-0 ${tier.popular ? 'text-primary' : 'text-primary/60'}`} />
                          <span className="text-foreground/80 font-medium text-sm leading-snug">{feat}</span>
                        </li>
                      ))}
                    </div>
                    
                    <Link href="/start-a-project" className="mt-auto block w-full">
                      <Button variant={tier.popular ? 'default' : 'outline'} className={`w-full h-14 text-base font-bold ${tier.popular ? 'shadow-xl hover:shadow-primary/25 hover:scale-[1.02] transition-all' : 'hover:bg-primary/5'}`}>
                        {tier.btn}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </CinematicTransition>
        </div>
      </section>

      {/* WHY CHOOSE US / TESTIMONIALS SECTION */}
      <section className="py-12 px-4 bg-indigo-50/40 dark:bg-indigo-950/20 border-t border-border/40">
        <div className="container mx-auto px-0 md:px-4">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center mb-20">
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">{isId ? 'Kenapa Memilih Kami?' : 'Why Choose Us?'}</h2>
              <h3 className="text-xl md:text-xl font-heading font-bold mb-6">
                {isId ? 'Kami tidak sekadar menulis kode. Kami memecahkan masalah.' : 'We don\'t just write code. We solve problems.'}
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {isId ? 'NOVERA berfokus pada ROI bisnis. Inilah alasan mengapa perusahaan skala besar mempercayakan infrastruktur intinya kepada kami.' : 'NOVERA focuses on business ROI. Here is why large-scale enterprises entrust their core infrastructure to us.'}
              </p>
            </div>
          </FadeIn>

          <CinematicTransition>
            {[
              {
                quote: isId ? "Mereka memangkas biaya server kami hingga 40% sekaligus menghilangkan waktu downtime. Sangat luar biasa." : "They slashed our server costs by 40% while completely eliminating downtime. Truly exceptional engineering.",
                name: "Sarah Jenkins",
                role: "CTO, GlobalTech"
              },
              {
                quote: isId ? "Aplikasi ERP kustom yang dibangun NOVERA menggantikan 5 software berbeda. Tim kami jauh lebih produktif sekarang." : "The custom ERP NOVERA built replaced 5 disjointed software subscriptions. Our team is infinitely more productive.",
                name: "Marcus Aurelius",
                role: "VP of Operations, Wayne Finance"
              },
              {
                quote: isId ? "Sangat profesional. Mereka memahami logika bisnis kami sebelum menulis satu baris kode pun." : "Extremely professional. They mapped out and understood our complex business logic before writing a single line of code.",
                name: "David Chen",
                role: "Founder, ACME Corp"
              },
              {
                quote: isId ? "Eksekusinya sangat cepat dan minim hambatan. Skalabilitasnya telah teruji langsung oleh ribuan pengguna kami." : "Execution was incredibly fast and seamless. The scalability was battle-tested directly by our thousands of users.",
                name: "Rachel Zane",
                role: "Head of Product, Specter Systems"
              }
            ].map((testi, i) => (
              <div key={i} className="h-full pb-4">
                <Card className="bg-background border-border/50 shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="text-4xl text-primary/20 font-serif mb-4">"</div>
                    <p className="text-foreground/80 leading-relaxed italic mb-8 flex-grow">{testi.quote}</p>
                    <div className="mt-auto">
                      <div className="font-heading font-bold text-foreground">{testi.name}</div>
                      <div className="text-sm text-primary">{testi.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </CinematicTransition>
        </div>
      </section>

      {/* TECH STACK / TRUST SECTION */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <FadeIn direction="right">
              <div>
                <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">Enterprise-Grade</h2>
                <h3 className="text-xl md:text-xl font-heading font-bold mb-6 leading-tight">{t.techTitle}</h3>
                <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isId ? 'Kami tidak menggunakan template murahan. Kami membangun menggunakan arsitektur paling canggih yang sama dengan yang digunakan oleh perusahaan teknologi inovatif di dunia.' : "We don't use unreliable templates or legacy tech. We build using the same cutting-edge architectures trusted by the world's most innovative technology companies."}
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    isId ? "Infrastruktur skalabel tanpa downtime" : "Zero-downtime scalable infrastructure",
                    isId ? "Keamanan dan type-safety tingkat tinggi" : "End-to-end type safety and security",
                    isId ? "Sinkronisasi data real-time" : "Real-time data synchronization",
                    isId ? "Pengujian QA dan pipeline otomatis" : "Automated QA and testing pipelines"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground/80 font-medium text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/about">
                  <Button variant="outline" className="h-12 px-8">{isId ? 'Pelajari Engineering Kami' : 'Learn About Our Engineering'}</Button>
                </Link>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.2}>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { icon: Layers, title: isId ? "Framework Modern" : "Modern Frameworks", desc: "Next.js, React, Node.js" },
                  { icon: Database, title: isId ? "Database Cloud" : "Cloud Databases", desc: "PostgreSQL, Supabase" },
                  { icon: Shield, title: isId ? "Keamanan Tinggi" : "High Security", desc: "RLS, OAuth, JWT" },
                  { icon: Zap, title: isId ? "Performa Tinggi" : "High Performance", desc: "Edge Computing, CDN" }
                ].map((tech, i) => (
                  <Card key={i} className="bg-muted/30 border-border/50 hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4 md:p-6">
                      <tech.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-4" />
                      <h4 className="font-heading font-semibold text-base md:text-lg mb-1">{tech.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">{tech.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 px-4 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <FAQAccordion 
              title={t.faqTitle}
              description={t.faqDesc}
              faqs={[
                { 
                  q: isId ? "Berapa lama rata-rata waktu pengerjaan proyek?" : "How long does a typical project take?", 
                  a: isId ? "Tergantung kompleksitas. Platform web standar memakan waktu 8-12 minggu, sementara sistem ERP enterprise kustom bisa memakan waktu 4-6 bulan. Kami selalu menetapkan timeline pasti di awal." : "Depending on complexity, standard web platforms take 8-12 weeks, while custom enterprise ERPs can take 4-6 months. We always establish strict timelines upfront." 
                },
                { 
                  q: isId ? "Apakah NOVERA menyediakan dukungan pasca-peluncuran?" : "Does NOVERA provide post-launch support?", 
                  a: isId ? "Ya. Kami memposisikan diri sebagai mitra teknologi jangka panjang. Kami menyediakan SLA (Service Level Agreements) untuk pemeliharaan, keamanan, dan penskalaan setelah peluncuran." : "Yes. We view ourselves as long-term technology partners. We provide ongoing SLA agreements for maintenance, security patches, and scaling." 
                },
                { 
                  q: isId ? "Siapa yang memiliki hak cipta (IP) atas kode yang dibuat?" : "Who owns the Intellectual Property (IP) of the code?", 
                  a: isId ? "Klien kami. Setelah pelunasan, 100% hak cipta atas kode kustom berpindah ke tangan perusahaan Anda." : "Our clients do. Upon final payment, 100% of the intellectual property for the custom code is transferred directly to your organization." 
                },
                { 
                  q: isId ? "Apakah Anda menggunakan template atau membuat dari nol?" : "Do you use templates or build from scratch?", 
                  a: isId ? "Kami membangun segalanya dari nol menggunakan framework modern (Next.js, Node.js) dan arsitektur database khusus. Kami tidak pernah menggunakan template instan WordPress demi alasan keamanan dan skalabilitas." : "We build everything from scratch using modern frameworks (Next.js, Node.js) and custom database architectures. We never use out-of-the-box CMS templates for enterprise applications due to security and scaling limits." 
                }
              ]}
            />
          </FadeIn>
        </div>
      </section>

      {/* SOLUTION CTA */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 -z-10" />
        
        <div className="container mx-auto text-center px-4 relative z-10">
          <FadeIn>
            <div className="max-w-2xl mx-auto bg-primary-foreground/5 backdrop-blur-xl border border-primary-foreground/10 rounded-3xl p-8 md:p-16 shadow-2xl">
              <h2 className="text-xl md:text-xl font-heading font-bold mb-6 text-primary-foreground">{t.ctaTitle}</h2>
              <p className="text-lg md:text-xl mb-10 text-primary-foreground/80 leading-relaxed">
                {t.ctaDesc}
              </p>
              <Link href="/start-a-project">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-10 text-lg hover:scale-105 transition-transform shadow-xl">
                  {t.ctaBtn} <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
