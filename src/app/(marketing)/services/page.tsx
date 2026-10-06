import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { Server, Monitor, Smartphone, Cog, BrainCircuit, Network, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { CinematicTransition } from "../components/cinematic-transition";
import { ScrollDots } from "@/components/ui/scroll-dots";
import { getLanguage } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata() {
  const lang = await getLanguage();
  const isId = lang === 'id';
  return {
    title: isId ? 'Layanan Rekayasa Enterprise | NOVERA' : 'Enterprise Engineering Services | NOVERA',
    description: isId 
      ? 'Kami membangun perangkat lunak skala enterprise, sistem operasional terpusat, dan integrasi AI yang berfokus pada efisiensi bisnis riil.'
      : 'We engineer enterprise-grade software, centralized operational systems, and AI integrations focused on tangible business efficiency.',
  };
}

export default async function ServicesPage() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  const supabase = createClient();
  const { data: dbServices } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  const services = dbServices?.map(s => ({
    title: isId ? s.title_id : s.title_en,
    href: `/services/${s.slug}`,
    icon: Server, // Use default icon or map dynamically if needed
    description: isId ? s.short_description_id : s.short_description_en,
    features: isId ? s.features_id || [] : s.features_en || [],
  })) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER SECTION */}
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-6xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {isId ? "Keahlian NOVERA" : "NOVERA Capabilities"}
            </div>
            <h1 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Direkayasa Untuk Skala Enterprise." : "Engineered for Enterprise Scale."}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {isId 
                ? "Kami tidak membuat sekadar website profil. Kami merekayasa platform digital kokoh, sistem bisnis kompleks, dan infrastruktur otomatisasi untuk mendongkrak ROI riil perusahaan Anda."
                : "We do not build simple websites. We engineer robust digital platforms, complex business systems, and automation infrastructure designed to drive real corporate ROI."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES TRANSITION */}
      <section className="py-16 px-4 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div id="services-scroll" className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 scrollbar-hide relative">
            {services.map((service, index) => (
              <FadeIn key={service.title} delay={index * 0.1} className="w-[85vw] md:w-[45vw] flex-shrink-0 snap-center h-auto">
                <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 shadow-xl shadow-primary/5 group bg-background/90 backdrop-blur-sm min-h-[400px]">
                  <CardContent className="p-8 flex flex-col h-full items-start text-left">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8 border-t border-border/50 pt-6 mt-auto w-full">
                      {service.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={service.href} className="mt-4 w-full">
                      <Button variant="ghost" className="group/btn w-full justify-between hover:bg-primary/5 hover:text-primary">
                        {isId ? "Eksplorasi Layanan" : "Explore Service"} 
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
          <ScrollDots containerId="services-scroll" count={services.length} />
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-xl md:text-xl font-heading font-bold mb-6">
                {isId ? "Apa yang Kami Bangun" : "What We Can Help You Build"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {isId 
                  ? "Keahlian rekayasa kami mencakup berbagai kategori teknologi yang berpusat pada operasi bisnis Anda." 
                  : "Our engineering expertise spans multiple technology categories centered around your business operations."}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: isId ? "Aplikasi Bisnis Internal" : "Internal Business Applications" },
                { title: isId ? "Sistem Operasional" : "Operational Systems" },
                { title: isId ? "Platform Web Pelanggan" : "Customer-facing Web Platforms" },
                { title: isId ? "Aplikasi Mobile" : "Mobile Applications" },
                { title: isId ? "Otomatisasi Alur Kerja" : "Workflow Automation" },
                { title: isId ? "Solusi Bertenaga AI" : "AI-powered Solutions" },
                { title: isId ? "Integrasi Data & Sistem" : "Data & System Integration" },
                { title: isId ? "Peningkatan Proses Digital" : "Digital Process Improvement" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border/50 shadow-sm">
                  <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* HOW WE APPROACH TECHNOLOGY */}
      <section className="py-16 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-xl md:text-xl font-heading font-bold mb-6">
                {isId ? "Pendekatan Teknologi Kami" : "How We Approach Technology"}
              </h2>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-0 relative z-10">
                {[
                  { num: "01", name: "Discovery" },
                  { num: "02", name: "Design" },
                  { num: "03", name: "Development" },
                  { num: "04", name: "Quality" },
                  { num: "05", name: "Deployment" },
                  { num: "06", name: "Improvement" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-background border-2 border-primary text-primary font-bold flex items-center justify-center mb-4 text-sm relative">
                      {step.num}
                    </div>
                    <span className="font-semibold text-sm px-2">{step.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-12">
              <Link href="/start-a-project">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  {isId ? "Diskusikan Proyek Anda" : "Discuss Your Project"}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY NOVERA */}
      <section className="py-16 px-4 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-xl md:text-xl font-heading font-bold mb-6">
                  {isId ? "Mengapa Memilih NOVERA" : "Why Choose NOVERA"}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isId
                    ? "Pendekatan kami difokuskan pada rekayasa perangkat lunak yang berorientasi bisnis. Kami membangun kapabilitas nyata."
                    : "Our approach is focused on business-oriented software engineering. We build tangible capabilities."}
                </p>
                <div className="space-y-6">
                  {[
                    { title: isId ? "Rekayasa Berorientasi Bisnis" : "Business-oriented engineering", desc: isId ? "Menyelesaikan hambatan operasional." : "Solving operational bottlenecks." },
                    { title: isId ? "Solusi Custom" : "Custom-built solutions", desc: isId ? "Spesifik untuk arsitektur Anda." : "Specific to your architecture." },
                    { title: isId ? "Arsitektur Skalabel" : "Scalable architecture", desc: isId ? "Dirancang untuk ekspansi masa depan." : "Designed for future expansion." },
                    { title: isId ? "Sistem Siap Integrasi" : "Integration-ready systems", desc: isId ? "Dibuat untuk terhubung ke platform lain." : "Built to hook into other platforms." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-background border border-border/50 rounded-2xl shadow-xl flex items-center justify-center p-8 relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
                   <div className="grid grid-cols-2 gap-4 w-full z-10">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="h-24 bg-muted/50 rounded-lg border border-border/50" />
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 px-4 bg-muted/30 border-t border-border/50 text-center">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Siap Membangun Solusi Anda?" : "Ready to Build Your Solution?"}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {isId 
                ? "Jadwalkan konsultasi arsitektur gratis dengan tim engineering kami hari ini."
                : "Schedule a complimentary architectural consultation with our engineering team today."}
            </p>
            <Link href="/start-a-project">
              <Button size="lg" className="h-14 px-10 text-lg shadow-xl hover:scale-105 transition-transform">
                {isId ? "Mulai Proyek Anda" : "Start Your Project"}
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
