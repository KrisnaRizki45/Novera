import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Server, Layout, Database, Shield, Box, GitBranch } from 'lucide-react';

export async function generateMetadata() {
  const lang = await getLanguage();
  const isId = lang === 'id';
  return {
    title: isId ? 'Studi Kasus: ERP Rantai Pasok | NOVERA' : 'Case Study: Supply Chain ERP | NOVERA',
    description: isId 
      ? 'Studi kasus arsitektur untuk sistem dasbor visibilitas rantai pasokan B2B berskala besar dengan pemrosesan data waktu-nyata.'
      : 'Architectural case study for a large-scale B2B supply chain visibility dashboard system with real-time data processing.',
  };
}

export default async function PortfolioProjectPage() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn>
            <div className="inline-block mb-6 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              {isId ? "Studi Kasus Internal" : "Internal Case Study"}
            </div>
            <h1 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Arsitektur ERP Rantai Pasok Terpusat" : "Centralized Supply Chain ERP Architecture"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {isId 
                ? "Konsep rekayasa tingkat lanjut untuk sistem operasi logistik B2B. Memusatkan ribuan SKU dan menyinkronkan data antar 4 gudang secara waktu-nyata." 
                : "Advanced engineering concept for a B2B logistics operating system. Centralizing thousands of SKUs and syncing cross-warehouse data in real-time."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium">
              <span className="px-3 py-1.5 bg-background border border-border/50 rounded-md shadow-sm text-foreground/80">
                Logistics & Supply Chain
              </span>
              <span className="px-3 py-1.5 bg-background border border-border/50 rounded-md shadow-sm text-foreground/80">
                Business Systems
              </span>
              <span className="px-3 py-1.5 bg-background border border-border/50 rounded-md shadow-sm text-foreground/80">
                Data Integration
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <FadeIn delay={0.2}>
            
            {/* OVERVIEW */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Ringkasan Proyek" : "Project Overview"}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {isId 
                  ? "Sistem ini dirancang sebagai landasan pacu operasi bagi perusahaan distributor berskala menengah. Tujuannya adalah membangun 'Satu Sumber Kebenaran' (Single Source of Truth) yang mengakhiri ketergantungan pada tabel spreadsheet manual dan pelaporan via obrolan grup."
                  : "This system is architected as an operational runway for mid-scale distributor companies. The objective is to build a 'Single Source of Truth' that permanently terminates reliance on manual spreadsheets and chat-based reporting."}
              </p>
            </div>

            {/* CHALLENGE */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Tantangan Operasional" : "The Business Challenge"}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Skenario yang dipecahkan adalah fragmentasi sistem klasik. Saat perusahaan memiliki aplikasi Akuntansi terpisah, aplikasi Gudang terpisah, dan tim Sales menggunakan kertas pesanan, kekacauan terjadi." 
                  : "The scenario being solved is classic system fragmentation. When a company uses a separate Accounting app, a separate Warehouse app, and the Sales team uses paper orders, chaos ensues."}
              </p>
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                <ul className="space-y-3">
                  {[
                    isId ? "Data stok gudang selalu tertunda 24 jam dibandingkan stok fisik nyata." : "Warehouse stock data is constantly delayed by 24 hours compared to actual physical stock.",
                    isId ? "Persetujuan (Approval) diskon klien membutuhkan tanda tangan fisik direktur." : "Client discount approvals require physical director signatures.",
                    isId ? "Tidak ada visibilitas pengiriman real-time bagi pelanggan B2B." : "Zero real-time delivery visibility for B2B customers."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-destructive">
                      <span className="font-bold shrink-0 mt-0.5">•</span>
                      <span className="font-medium text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* APPROACH */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Pendekatan Rekayasa" : "Engineering Approach"}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {isId 
                  ? "Kami menghindari pendekatan 'satu aplikasi untuk semua' yang monolitik. Sebaliknya, kami merancang Sistem Arsitektur Berbasis Layanan (Microservices) di mana modul Inventory, modul Finance, dan modul Sales berdiri sendiri namun berkomunikasi melalui satu API Gateway terpusat."
                  : "We avoided the monolithic 'one app for everything' approach. Instead, we architected a Service-Oriented Architecture (SOA) where the Inventory module, Finance module, and Sales module stand independently but communicate through a single centralized API Gateway."}
              </p>
            </div>

            {/* SOLUTION & KEY FEATURES */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl font-bold mb-6">{isId ? "Solusi & Fitur Inti" : "The Solution & Key Features"}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-muted/20 border border-border/50 rounded-2xl">
                  <Shield className="w-8 h-8 text-primary mb-4" />
                  <h5 className="font-bold text-lg mb-2">{isId ? "Sistem Otorisasi RBAC" : "RBAC Authorization"}</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isId 
                      ? "Izin berlapis. Manajer gudang hanya melihat stok, manajer keuangan melihat harga pokok (HPP), dan direksi memiliki akses dasbor penuh." 
                      : "Multi-layered permissions. Warehouse managers only see stock, finance managers see Cost of Goods (COGS), and directors have full dashboard access."}
                  </p>
                </div>
                <div className="p-6 bg-muted/20 border border-border/50 rounded-2xl">
                  <GitBranch className="w-8 h-8 text-primary mb-4" />
                  <h5 className="font-bold text-lg mb-2">{isId ? "Alur Kerja Persetujuan" : "Approval Workflows"}</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isId 
                      ? "Digitalisasi struktur 'Maker, Checker, Approver'. Pesanan otomatis tertahan hingga mendapat validasi digital dari tim keuangan." 
                      : "Digitization of the 'Maker, Checker, Approver' structure. Orders are automatically held until they receive digital validation from finance."}
                  </p>
                </div>
                <div className="p-6 bg-muted/20 border border-border/50 rounded-2xl">
                  <Box className="w-8 h-8 text-primary mb-4" />
                  <h5 className="font-bold text-lg mb-2">{isId ? "Mesin Sinkronisasi Stok" : "Stock Sync Engine"}</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isId 
                      ? "Begitu kurir memindai barcode pengiriman (Outbound), sistem mengurangi angka ketersediaan stok seketika tanpa menunda proses batch." 
                      : "The moment a courier scans an outbound barcode, the system deducts stock availability instantly without delaying for batch processing."}
                  </p>
                </div>
                <div className="p-6 bg-muted/20 border border-border/50 rounded-2xl">
                  <Database className="w-8 h-8 text-primary mb-4" />
                  <h5 className="font-bold text-lg mb-2">{isId ? "Jejak Audit Permanen" : "Permanent Audit Trails"}</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isId 
                      ? "Setiap modifikasi data (Penghapusan, Pengeditan) dicatat di tabel terpisah yang tidak dapat diubah, memastikan integritas data (Compliance)." 
                      : "Every data modification (Deletions, Edits) is logged in a separate immutable table, ensuring absolute data compliance."}
                  </p>
                </div>
              </div>
            </div>

            {/* ARCHITECTURE & TECH STACK */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Tumpukan Teknologi (Tech Stack)" : "Technology Stack"}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Arsitektur dibangun di atas infrastruktur Cloud-Native untuk memastikan ketersediaan tinggi (High Availability) selama jam sibuk." 
                  : "The architecture is built on Cloud-Native infrastructure to ensure High Availability during peak operational hours."}
              </p>
              <div className="flex flex-col gap-4 bg-background border border-border/50 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <Layout className="w-6 h-6 text-muted-foreground shrink-0" />
                  <div>
                    <span className="font-bold block">Frontend (User Interface)</span>
                    <span className="text-sm text-muted-foreground">Next.js (React), Tailwind CSS, Shadcn UI</span>
                  </div>
                </div>
                <div className="w-full h-px bg-border/50" />
                <div className="flex items-center gap-4">
                  <Server className="w-6 h-6 text-muted-foreground shrink-0" />
                  <div>
                    <span className="font-bold block">Backend (API Services)</span>
                    <span className="text-sm text-muted-foreground">Node.js / Express, RESTful APIs, JWT Authentication</span>
                  </div>
                </div>
                <div className="w-full h-px bg-border/50" />
                <div className="flex items-center gap-4">
                  <Database className="w-6 h-6 text-muted-foreground shrink-0" />
                  <div>
                    <span className="font-bold block">Database & Caching</span>
                    <span className="text-sm text-muted-foreground">PostgreSQL (Relational Data), Redis (Fast Caching)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* IMPACT / OUTCOME */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Dampak yang Diharapkan" : "Expected Outcome"}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Implementasi dari arsitektur ERP tingkat produksi ini dirancang untuk menciptakan peningkatan kualitatif berikut:" 
                  : "The implementation of this production-grade ERP architecture is designed to create the following qualitative improvements:"}
              </p>
              <ul className="space-y-4">
                {[
                  isId ? "Menghilangkan sepenuhnya data yang tertumpuk ganda (Double Entry) antar departemen." : "Completely eliminate double data entry across all departments.",
                  isId ? "Menurunkan waktu rekonsiliasi data dari hitungan hari menjadi detik." : "Reduce data reconciliation time from days down to seconds.",
                  isId ? "Memberikan jajaran direksi dasbor sentral (BI) untuk keputusan berbasis metrik absolut." : "Provide the board of directors with a central BI dashboard for absolute metric-based decisions."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-20 p-10 bg-muted/20 border border-border/50 rounded-3xl text-center flex flex-col items-center">
              <h4 className="font-heading text-3xl font-bold mb-4">
                {isId ? "Terapkan Arsitektur Ini di Bisnis Anda" : "Implement This Architecture"}
              </h4>
              <p className="text-muted-foreground mb-8 text-lg max-w-lg mx-auto">
                {isId 
                  ? "Diskusikan bagaimana cetak biru teknis ini dapat dikustomisasi secara presisi untuk model operasional perusahaan Anda." 
                  : "Discuss how this technical blueprint can be precisely customized for your enterprise's operational model."}
              </p>
              <Link href="/start-a-project">
                <Button size="lg" className="h-14 px-10 text-lg shadow-xl hover:scale-105 transition-transform">
                  {isId ? "Konsultasikan Spesifikasi Sistem" : "Consult System Specifications"}
                </Button>
              </Link>
            </div>

          </FadeIn>
        </div>
      </section>
    </div>
  );
}
