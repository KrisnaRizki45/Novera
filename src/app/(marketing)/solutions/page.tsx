import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { BarChart, Cog, Network, PackageSearch, ArrowRight, ShieldCheck, Zap, BrainCircuit, LineChart } from "lucide-react";
import { CinematicTransition } from "../components/cinematic-transition";
import { ScrollDots } from "@/components/ui/scroll-dots";
import { getLanguage } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata() {
  const lang = await getLanguage();
  const isId = lang === 'id';
  return {
    title: isId ? 'Pustaka Solusi Bisnis & Teknologi | NOVERA' : 'Business & Technology Solution Library | NOVERA',
    description: isId 
      ? 'Jelajahi perpustakaan solusi arsitektur NOVERA. Kami memecahkan masalah operasional mulai dari manajemen inventaris hingga kecerdasan buatan.'
      : 'Explore the NOVERA architectural solution library. We solve operational bottlenecks from inventory management to artificial intelligence.',
  };
}

export default async function SolutionsPage() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  const supabase = createClient();
  const { data: dbSolutions } = await supabase
    .from('solutions')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  const solutions = dbSolutions?.map(s => ({
    title: isId ? s.title_id : s.title_en,
    icon: Cog, // Map dynamically if you store icon names, defaulting to Cog
    href: `/solutions/${s.slug}`,
    problem: isId ? s.business_problem_id : s.business_problem_en,
    solution: isId ? s.solution_approach_id : s.solution_approach_en,
    value: isId ? (s.benefits_id && s.benefits_id.length > 0 ? s.benefits_id[0] : '') : (s.benefits_en && s.benefits_en.length > 0 ? s.benefits_en[0] : ''),
  })) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER SECTION */}
      <section className="pt-40 pb-20 px-4 relative overflow-hidden bg-muted/10 border-b border-border/50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-5xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {isId ? "Pustaka Solusi Bisnis" : "Business Solution Library"}
            </div>
            <h1 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Arsitektur Untuk Masalah Operasional Kompleks." : "Architectures for Complex Operational Problems."}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              {isId 
                ? "Kami tidak membangun 'software'. Kami memecahkan masalah inefisiensi nyata yang menahan perusahaan Anda untuk berekspansi."
                : "We do not build 'software'. We solve the precise operational friction points that prevent your enterprise from scaling."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SOLUTIONS TRANSITION */}
      <section className="py-16 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div id="solutions-scroll" className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-6 -mx-4 px-4 scrollbar-hide relative">
            {solutions.map((sol, index) => (
              <FadeIn key={sol.title} delay={index * 0.1} className="w-[85vw] md:w-[45vw] lg:w-[32vw] flex-shrink-0 snap-center h-auto">
                <div className="group border border-border/50 rounded-3xl p-8 bg-background/95 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 w-full h-full flex flex-col items-start text-left">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-6">
                    <sol.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-6">{sol.title}</h3>
                  
                  <div className="flex flex-col gap-5 mb-8 flex-grow w-full">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        {isId ? "Masalah Bisnis" : "The Problem"}
                      </p>
                      <p className="text-sm leading-relaxed">{sol.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        {isId ? "Solusi Kami" : "The Solution"}
                      </p>
                      <p className="text-sm leading-relaxed">{sol.solution}</p>
                    </div>
                    <div className="pt-4 border-t border-border/50 mt-auto">
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        {isId ? "Nilai Bisnis" : "Business Value"}
                      </p>
                      <p className="text-sm leading-relaxed font-medium">{sol.value}</p>
                    </div>
                  </div>

                  <Link href={sol.href} className="inline-block mt-auto w-full">
                    <Button variant="outline" className="w-full group/btn justify-between hover:bg-primary hover:text-primary-foreground border-primary/20">
                      {isId ? "Baca Studi Solusi" : "Read Solution Case"} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
          <ScrollDots containerId="solutions-scroll" count={solutions.length} />
        </div>
      </section>

      {/* BUSINESS CHALLENGES */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-xl md:text-xl font-heading font-bold mb-6">
                {isId ? "Tantangan Bisnis yang Kami Selesaikan" : "Business Challenges We Help Address"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {isId 
                  ? "Sistem NOVERA dirancang khusus untuk mengatasi akar penyebab inefisiensi operasional pada berbagai industri." 
                  : "NOVERA systems are purpose-built to address the root causes of operational inefficiency across industries."}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: isId ? "Proses Operasional Manual" : "Manual operational processes" },
                { title: isId ? "Data Bisnis Terfragmentasi" : "Fragmented business data" },
                { title: isId ? "Tugas Administratif Berulang" : "Repetitive administrative work" },
                { title: isId ? "Sistem yang Terputus" : "Disconnected systems" },
                { title: isId ? "Visibilitas Operasional Terbatas" : "Limited operational visibility" },
                { title: isId ? "Alur Kerja Tidak Efisien" : "Inefficient workflows" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-background rounded-xl border border-border/50 shadow-sm">
                  <div className="w-10 h-10 rounded bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-[15px]">{item.title}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SOLUTION FLOW */}
      <section className="py-16 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-xl md:text-xl font-heading font-bold mb-6">
                {isId ? "Dari Masalah Bisnis Menjadi Solusi Teknologi" : "From Business Problem to Technology Solution"}
              </h2>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
              {[
                { step: "1", title: "Business Challenge" },
                { step: "2", title: "Discovery" },
                { step: "3", title: "Solution Design" },
                { step: "4", title: "Technology Development" },
                { step: "5", title: "Integration" },
                { step: "6", title: "Operational Improvement" }
              ].map((phase, i) => (
                <div key={i} className="flex flex-col items-center text-center z-10 my-4 md:my-0 bg-background md:px-2">
                  <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center mb-4 font-bold ${i === 0 || i === 5 ? "bg-primary/10 border-primary text-primary" : "bg-background border-border text-foreground"}`}>
                    {phase.step}
                  </div>
                  <span className={`font-semibold text-sm max-w-[120px] ${i === 0 || i === 5 ? "text-primary" : "text-muted-foreground"}`}>{phase.title}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-muted/30 border-t border-border/50 text-center">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Tidak menemukan masalah spesifik Anda?" : "Don't see your specific problem?"}
            </h2>
            <p className="text-xl mb-10 text-muted-foreground">
              {isId 
                ? "Setiap perusahaan memiliki operasi yang unik. Konsultasikan hambatan operasional Anda bersama arsitek perangkat lunak kami."
                : "Every enterprise has unique operations. Consult your operational bottlenecks with our software architects."}
            </p>
            <Link href="/start-a-project">
              <Button className="h-12 px-8 text-base shadow-lg hover:scale-105 transition-transform">
                {isId ? "Diskusikan Tantangan Unik Anda" : "Discuss Your Unique Challenge"}
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
