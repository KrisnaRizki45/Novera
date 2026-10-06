import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return {
    title: `Category: ${resolvedParams.slug} | NOVERA Insights`,
  };
}

export default async function InsightsCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getLanguage();
  const isId = lang === 'id';
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const supabase = createClient();
  const { data: insights } = await supabase
    .from('insights')
    .select('*')
    .eq('is_active', true)
    .ilike('category', `%${decodedSlug}%`)
    .order('published_at', { ascending: false });

  if (!insights || insights.length === 0) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              {isId ? "Kategori Wawasan" : "Insight Category"}
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              {decodedSlug}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {isId 
                ? `Kumpulan artikel dan publikasi terkait ${decodedSlug}.` 
                : `Articles and publications related to ${decodedSlug}.`}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {insights.map((insight, i) => (
              <FadeIn key={insight.id} delay={i * 0.1}>
                <Link href={`/insights/${insight.slug}`}>
                  <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-primary/30 transition-colors h-full flex flex-col">
                    <div className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">{insight.category}</div>
                    <h4 className="font-heading text-xl font-bold mb-3">{isId ? insight.title_id : insight.title_en}</h4>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {isId ? insight.content_id?.substring(0, 150) : insight.content_en?.substring(0, 150)}...
                    </p>
                    <div className="mt-auto text-xs text-muted-foreground">
                      {new Date(insight.published_at).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
