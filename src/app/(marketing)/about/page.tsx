import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ShieldCheck, Target, Zap, Clock, Code2, Layers, LineChart, Network, ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollDots } from "@/components/ui/scroll-dots";
import { getLanguage } from "@/lib/i18n";

export async function generateMetadata() {
  const lang = await getLanguage();
  const isId = lang === 'id';
  return {
    title: isId ? 'Tentang NOVERA | Mitra Rekayasa Software Enterprise' : 'About NOVERA | Enterprise Software Engineering Partner',
    description: isId 
      ? 'NOVERA adalah perusahaan teknologi yang berfokus pada rekayasa perangkat lunak dan arsitektur sistem. Kami memecahkan masalah operasional yang kompleks.'
      : 'NOVERA is a technology company focused on software engineering and system architecture. We solve complex operational bottlenecks.',
  };
}

export default async function AboutPage() {
  const lang = await getLanguage();
  const isId = lang === "id";

  const principles = [
    { 
      icon: Target, 
      title: isId ? "Pahami Sebelum Membangun" : "Understand Before Building", 
      desc: isId ? "Teknologi harus mengikuti dan melayani kebutuhan bisnis nyata, bukan sebaliknya. Kami selalu memetakan masalah sebelum menulis kode." : "Technology should serve real business needs, not dictate them. We map out the problem entirely before writing a single line of code." 
    },
    { 
      icon: Layers, 
      title: isId ? "Sistem Harus Praktis" : "Keep Systems Practical", 
      desc: isId ? "Sebuah solusi hanya akan berhasil jika digunakan. Kami merancang arsitektur perangkat lunak untuk menyelesaikan masalah operasional riil." : "A solution only succeeds if it is adopted. We design software architectures to solve actual operational friction." 
    },
    { 
      icon: Code2, 
      title: isId ? "Desain Untuk Evolusi" : "Design for Evolution", 
      desc: isId ? "Perangkat lunak yang kaku akan cepat mati. Kami membangun modul arsitektur yang dapat beradaptasi ketika kebutuhan perusahaan berubah." : "Rigid software dies quickly. We build architectural modules that can gracefully adapt as corporate requirements shift over time." 
    },
    { 
      icon: Zap, 
      title: isId ? "Teknologi Tepat Guna" : "Use Technology With Purpose", 
      desc: isId ? "Teknologi baru (seperti AI) harus menciptakan nilai bisnis yang berarti, bukan sekadar menambah kompleksitas tanpa alasan." : "New technologies (like AI) should create meaningful business value, rather than merely adding complexity for the sake of hype." 
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {isId ? "Tentang Perusahaan Kami" : "About Our Company"}
            </div>
            <h1 className="text-xl md:text-xl font-heading font-bold mb-8">
              {isId ? "Kami Membangun Software yang Membangun Bisnis." : "We Build Software That Builds Businesses."}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {isId 
                ? "NOVERA adalah perusahaan teknologi yang berfokus penuh pada rekayasa perangkat lunak tingkat enterprise, otomasi operasional, dan integrasi sistem AI. Kami tidak sekadar merakit aplikasi; kami merancang infrastruktur digital."
                : "NOVERA is a technology company strictly focused on enterprise-grade software engineering, operational automation, and AI system integration. We don't just assemble apps; we architect digital infrastructure."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* WHO WE ARE & WHAT WE BELIEVE */}
      <section className="py-16 px-4 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <FadeIn>
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">
                {isId ? "Siapa Kami" : "Who We Are"}
              </h2>
              <h3 className="text-xl font-heading font-bold mb-6">
                {isId ? "Mitra Rekayasa Jangka Panjang" : "A Long-Term Engineering Partner"}
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isId 
                  ? "Banyak organisasi terjebak bekerja dengan agensi outsourcing yang berfokus pada kecepatan rilis sesaat, meninggalkan tumpukan hutang teknis (technical debt) yang tak bisa diperbaiki. NOVERA lahir untuk mengubah itu."
                  : "Many organizations are trapped working with outsourcing agencies focused on quick releases, leaving behind mountains of unmaintainable technical debt. NOVERA was born to change that."}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {isId 
                  ? "Kami memposisikan diri sebagai perpanjangan tangan dari tim operasional Anda. Ketika kami merancang sebuah platform sentralisasi, kami mengharapkannya menjadi tulang punggung bisnis Anda untuk satu dekade ke depan."
                  : "We position ourselves as an extension of your operational team. When we design a centralization platform, we fully expect it to serve as the backbone of your business for the next decade."}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">
                {isId ? "Fokus Teknologi" : "Technology Focus"}
              </h2>
              <h3 className="text-xl font-heading font-bold mb-6">
                {isId ? "Kinerja Skala Cloud" : "Cloud-Scale Performance"}
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isId 
                  ? "Kami menolak menggunakan arsitektur monolitik kuno atau CMS generik untuk perangkat lunak kritis bisnis. Fokus teknis kami sangat terarah pada ekosistem web modern (Headless Architecture, Next.js, Serverless) dan pengembangan mobile terpadu (Cross-Platform)."
                  : "We refuse to use legacy monolithic architectures or generic CMSs for business-critical software. Our technical focus is hyper-directed toward modern web ecosystems (Headless Architecture, Next.js, Serverless) and unified mobile development."}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  isId ? "Web Berkinerja Tinggi" : "High-Performance Web",
                  isId ? "Infrastruktur API" : "API Infrastructure",
                  isId ? "Implementasi LLM (AI)" : "LLM (AI) Implementations",
                  isId ? "Sistem Database Terpusat" : "Centralized Database Systems",
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground/80 bg-background border border-border/50 px-4 py-3 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {tag}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ENGINEERING PHILOSOPHY */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-xl md:text-xl font-heading font-bold mb-6">
                {isId ? "Filosofi Engineering NOVERA" : "NOVERA Engineering Philosophy"}
              </h2>
              <p className="text-xl text-muted-foreground">
                {isId 
                  ? "Di dunia yang terobsesi dengan tren sesaat (hype), kami berpijak pada prinsip fundamental yang mendatangkan dampak nyata."
                  : "In an industry obsessed with fleeting hype, we remain anchored by fundamental principles that drive tangible impact."}
              </p>
            </div>
          </FadeIn>
          
          <div id="about-philosophy-scroll" className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 scrollbar-hide relative">
            {principles.map((value, i) => (
              <FadeIn key={i} delay={i * 0.1} className="w-[85vw] md:w-[40vw] lg:w-[28vw] flex-shrink-0 snap-center h-auto">
                <div className="bg-background border border-border/50 p-8 rounded-2xl shadow-sm h-full hover:border-primary/30 transition-colors">
                  <value.icon className="w-10 h-10 text-primary mb-6" />
                  <h4 className="font-heading font-bold text-xl mb-4">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <ScrollDots containerId="about-philosophy-scroll" count={4} />
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-16 px-4 bg-muted/10 border-t border-border/50">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="text-xl md:text-xl font-heading font-bold mb-16 text-center">
              {isId ? "Pendekatan Eksekusi Kami" : "Our Execution Approach"}
            </h2>
            <div className="grid gap-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {[
                {
                  title: isId ? "1. Analisis Operasional (Discovery)" : "1. Operational Analysis (Discovery)",
                  desc: isId 
                    ? "Kami duduk bersama tim Anda, mempelajari alur kerja harian, dan mendokumentasikan spesifikasi teknis (BRD/TRD) sebelum merancang database." 
                    : "We sit down with your team, study your daily workflows, and document the technical specifications (BRD/TRD) before ever designing a database."
                },
                {
                  title: isId ? "2. Desain Arsitektur & Prototyping" : "2. Architectural Design & Prototyping",
                  desc: isId 
                    ? "Menerjemahkan dokumen analisis menjadi topologi cloud, skema API, dan prototype UI yang interaktif untuk validasi alur oleh pemangku kepentingan." 
                    : "Translating analysis documents into cloud topologies, API schemas, and interactive UI prototypes for strict stakeholder validation."
                },
                {
                  title: isId ? "3. Rekayasa Iteratif (Agile Engineering)" : "3. Iterative Engineering (Agile)",
                  desc: isId 
                    ? "Sistem dibangun dalam siklus iterasi yang terukur. Memberikan Anda transparansi mutlak atas perkembangan kode dan fungsionalitas." 
                    : "Systems are built in measurable iterative cycles, providing you with absolute transparency over code progression and functionality."
                },
                {
                  title: isId ? "4. Penerapan Global & Skalabilitas" : "4. Global Deployment & Scalability",
                  desc: isId 
                    ? "Meluncurkan perangkat lunak ke infrastruktur produksi yang dijamin aman, dipantau ketat, dan siap menangani ledakan transaksi pengguna." 
                    : "Deploying software into secure production infrastructure, tightly monitored, and ready to handle massive user transaction spikes."
                }
              ].map((step, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="font-bold text-sm">{i + 1}</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-background rounded-2xl border border-border/50 shadow-sm group-hover:border-primary/30 transition-colors">
                    <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Bangun Visi Teknologi Anda Bersama Kami" : "Build Your Technological Vision With Us"}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {isId 
                ? "Dapatkan rekan rekayasa perangkat lunak yang sama pedulinya terhadap pertumbuhan bisnis Anda seperti Anda sendiri." 
                : "Secure a software engineering partner that cares as much about your business growth as you do."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/services">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                  {isId ? "Jelajahi Kapabilitas Layanan" : "Explore Service Capabilities"}
                </Button>
              </Link>
              <Link href="/start-a-project">
                <Button size="lg" className="h-14 px-10 text-lg shadow-xl hover:scale-105 transition-transform">
                  {isId ? "Mulai Proyek Pertama Anda" : "Start Your First Project"}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
