import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Categories | NOVERA Insights',
};

export default async function InsightsCategoryIndexPage() {
  const lang = await getLanguage();
  const isId = lang === 'id';
  
  const supabase = createClient();
  // Get all unique categories
  const { data: insights } = await supabase
    .from('insights')
    .select('category')
    .eq('is_active', true);
    
  const categories = Array.from(new Set(insights?.map(i => i.category).filter(Boolean) || []));

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              {isId ? "Katalog Pengetahuan" : "Knowledge Catalog"}
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              {isId ? "Kategori Wawasan" : "Insight Categories"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {isId 
                ? "Jelajahi artikel teknis, analisis bisnis, dan panduan berdasarkan kategori yang relevan dengan industri Anda." 
                : "Explore technical articles, business analysis, and guides by categories relevant to your industry."}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4 flex-1">
        <div className="container mx-auto max-w-5xl">
          {categories.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20 bg-background border border-border/50 rounded-2xl">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">{isId ? "Belum ada kategori" : "No categories yet"}</h3>
                <p className="text-muted-foreground">
                  {isId ? "Artikel dan wawasan belum dikelompokkan ke dalam kategori." : "Articles and insights have not been grouped into categories yet."}
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, i) => (
                <FadeIn key={category} delay={i * 0.1}>
                  <Link href={`/insights/category/${encodeURIComponent(category as string)}`}>
                    <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-primary/50 transition-all hover:-translate-y-1 h-full flex flex-col group cursor-pointer shadow-sm hover:shadow-md">
                      <h4 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">{category}</h4>
                      <p className="text-muted-foreground text-sm flex-1">
                        {isId ? `Eksplorasi artikel dan panduan terkait ${category}.` : `Explore articles and guides related to ${category}.`}
                      </p>
                      <div className="mt-6 flex items-center text-sm font-semibold text-primary">
                        {isId ? "Lihat Artikel" : "View Articles"}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
