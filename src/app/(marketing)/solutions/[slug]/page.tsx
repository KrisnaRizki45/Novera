import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Layout, Database, Network, Shield, Cog } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const lang = await getLanguage();
  const isId = lang === 'id';
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  return {
    title: isId ? `Solusi: ${slug} | NOVERA` : `Solution: ${slug} | NOVERA`,
  };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const lang = await getLanguage();
  const isId = lang === 'id';
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const supabase = createClient();
  const { data: solution } = await supabase
    .from('solutions')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!solution) {
    notFound();
  }

  const title = isId ? solution.title_id : solution.title_en;
  const shortDesc = isId ? solution.short_description_id : solution.short_description_en;
  const prob = isId ? solution.business_problem_id : solution.business_problem_en;
  const appr = isId ? solution.solution_approach_id : solution.solution_approach_en;
  
  const parseJsonStr = (val: any) => {
    if (!val) return [];
    if (typeof val === 'string') {
      try { return JSON.parse(val); } catch (e) { return []; }
    }
    return Array.isArray(val) ? val : [];
  };
  
  const benefits = isId ? parseJsonStr(solution.benefits_id) : parseJsonStr(solution.benefits_en);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {isId ? "Kategori Solusi" : "Solution Category"}: {title}
            </div>
            <h1 className="text-xl md:text-xl font-heading font-bold mb-6">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              {shortDesc || (isId 
                ? "Bebaskan manajemen dari kekacauan operasional. Kami merancang arsitektur sistem yang menyatukan seluruh departemen Anda."
                : "Free your management from operational chaos. We engineer system architectures that unify all your departments.")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/start-a-project">
                <Button size="lg" className="h-12 px-8 shadow-xl">
                  {isId ? "Konsultasikan Masalah Anda" : "Consult Your Bottlenecks"}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROBLEM & SOLUTION OVERVIEW */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-destructive mb-4">
                {isId ? "Tantangan Bisnis" : "Business Challenge"}
              </h2>
              <h3 className="text-xl md:text-xl font-heading font-bold mb-6">
                {isId ? "Silo Data & Proses yang Terpecah" : "Data Silos & Fragmented Processes"}
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {prob || (isId 
                  ? "Ketika perusahaan bertumbuh, manajemen manual tidak lagi memadai. Visibilitas menjadi gelap."
                  : "When a company grows, manual management breaks down. Visibility goes dark.")}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-background border border-border/50 rounded-3xl p-8 md:p-10 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-3xl" />
                <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4 relative z-10">
                  {isId ? "Arsitektur Solusi" : "Solution Architecture"}
                </h2>
                <h3 className="text-2xl font-bold mb-4 relative z-10">
                  {isId ? "Pendekatan Kami" : "Our Approach"}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8 relative z-10">
                  {appr || (isId 
                    ? "Kami membangun portal operasi terpusat untuk memaksa konsistensi prosedur dan melacak mutasi data."
                    : "We build centralized operational portals to enforce consistency and track data mutations.")}
                </p>
                
                {benefits.length > 0 && (
                  <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20 relative z-10">
                    <h4 className="font-semibold text-foreground mb-3">
                      {isId ? "Dampak Langsung:" : "Immediate Impact:"}
                    </h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {benefits.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
