import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Layout, Database, Network, Shield, Cog } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const lang = await getLanguage();
  const isId = lang === 'id';
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  return {
    title: isId ? `Layanan: ${slug} | NOVERA` : `Service: ${slug} | NOVERA`,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const lang = await getLanguage();
  const isId = lang === 'id';
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const supabase = createClient();
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!service) {
    notFound();
  }

  const title = isId ? service.title_id : service.title_en;
  const shortDesc = isId ? service.short_description_id : service.short_description_en;
  const desc = isId ? service.description_id : service.description_en;

  const parseJsonStr = (val: any) => {
    if (!val) return [];
    if (typeof val === 'string') {
      try { return JSON.parse(val); } catch (e) { return []; }
    }
    return Array.isArray(val) ? val : [];
  };

  const features = isId ? parseJsonStr(service.features_id) : parseJsonStr(service.features_en);
  const useCases = isId ? parseJsonStr(service.use_cases_id) : parseJsonStr(service.use_cases_en);
  const businessValues = isId ? parseJsonStr(service.business_value_id) : parseJsonStr(service.business_value_en);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {isId ? "Kategori Layanan" : "Service Category"}: {title}
            </div>
            <h1 className="text-xl md:text-xl font-heading font-bold mb-6">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              {shortDesc || (isId
                ? "Bebaskan tim Anda dari batasan aplikasi jadi (off-the-shelf). Kami merancang arsitektur sistem presisi."
                : "Free your team from the limitations of off-the-shelf applications. We architect systems precision-engineered for you.")}
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

      {/* DESCRIPTION SECTION */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Pendekatan Kami" : "Our Approach"}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {desc || (isId 
                ? "Bisnis yang berkembang sering kali terjebak dalam ekosistem IT yang terfragmentasi. Kami membantu Anda merestrukturisasi sistem dengan metodologi enterprise-grade yang scalable."
                : "Growing businesses often find themselves trapped in fragmented IT ecosystems. We help you restructure your systems using scalable, enterprise-grade methodologies.")}
            </p>

            {features.length > 0 && (
              <ul className="space-y-4 mb-8">
                {features.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-foreground/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </FadeIn>
        </div>
      </section>

      {/* CAPABILITIES / FALLBACK */}
      <section className="py-16 px-4 bg-muted/20 border-y border-border/50">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-xl md:text-xl font-heading font-bold mb-4">
                {isId ? "Nilai Bisnis Utama" : "Core Business Values"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {isId ? "Dampak yang kami berikan ke operasional Anda." : "The impact we bring to your operations."}
              </p>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessValues.length > 0 ? businessValues.map((val: string, i: number) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="h-full bg-background/50 hover:bg-background border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6 text-center flex flex-col items-center">
                    <Shield className="w-10 h-10 text-primary mb-4" />
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed">{val}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            )) : [
              { icon: Layout, title: isId ? "Desain Sistem" : "System Design", desc: isId ? "Arsitektur yang kuat." : "Robust architecture." },
              { icon: Database, title: "Data Engineering", desc: isId ? "Manajemen data yang aman." : "Secure data management." },
              { icon: Shield, title: "Keamanan", desc: isId ? "Keamanan standar industri." : "Industry standard security." }
            ].map((cap, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="h-full bg-background/50 hover:bg-background border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <cap.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-3">{cap.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{cap.desc}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      {useCases.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="text-xl md:text-xl font-heading font-bold mb-12 text-center">
                {isId ? "Skenario Penggunaan" : "Use Cases"}
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {useCases.map((uc: string, i: number) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="border-l-4 border-primary pl-6 py-2">
                    <p className="text-muted-foreground">{uc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
