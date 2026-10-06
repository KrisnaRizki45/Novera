import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { getLanguage } from "@/lib/i18n";
import { Suspense } from "react";
import { PortfolioGrid, PortfolioGridSkeleton } from "./components/portfolio-grid";

export async function generateMetadata() {
  const lang = await getLanguage();
  const isId = lang === 'id';
  return {
    title: isId ? 'Pustaka Studi Kasus | NOVERA' : 'Engineering Case Studies | NOVERA',
    description: isId 
      ? 'Jelajahi studi kasus rekayasa kami. Pelajari bagaimana kami merancang sistem skala besar dan mengotomatiskan operasi.'
      : 'Explore our engineering case studies. Learn how we architect scalable systems and automate operations.',
  };
}

export default async function PortfolioPage() {
  const lang = await getLanguage();
  const isId = lang === "id";

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-4 relative overflow-hidden bg-muted/10 border-b border-border/50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {isId ? "Pustaka Studi Kasus" : "Case Study Library"}
            </div>
            <h1 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Rekam Jejak Rekayasa Kami." : "Our Engineering Track Record."}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
              {isId 
                ? "Jelajahi perpustakaan studi kasus (Case Studies) teknis kami. Kami membedah arsitektur, tantangan bisnis, dan metodologi di balik sistem yang kami bangun." 
                : "Explore our technical Case Study library. We dissect the architectures, business challenges, and methodologies behind the systems we build."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PORTFOLIO GRID WITH SUSPENSE FOR SKELETON */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Skeleton renders instantly while the async PortfolioGrid fetches "data" */}
          <Suspense fallback={<PortfolioGridSkeleton />}>
            <PortfolioGrid lang={lang} />
          </Suspense>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4 bg-muted/30 border-t border-border/50 text-center">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Punya tantangan teknis serupa?" : "Have a similar technical challenge?"}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {isId 
                ? "Mari diskusikan bagaimana pendekatan rekayasa kami dapat diterapkan pada bisnis Anda."
                : "Let's discuss how our engineering approach can be applied to your business."}
            </p>
            <Link href="/start-a-project">
              <Button size="lg" className="h-14 px-10 text-lg shadow-xl hover:scale-105 transition-transform">
                {isId ? "Mulai Percakapan" : "Start a Conversation"}
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
