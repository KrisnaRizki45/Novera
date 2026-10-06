import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const lang = await getLanguage();
  const isId = lang === 'id';
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const supabase = createClient();
  const { data } = await supabase.from('insights').select('title_en, title_id').eq('slug', slug).single();
  
  const title = data ? (isId ? data.title_id : data.title_en) : slug;
  return {
    title: `${title} | NOVERA Insights`,
  };
}

export default async function InsightsArticlePage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const lang = await getLanguage();
  const isId = lang === 'id';
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const supabase = createClient();
  const { data: article } = await supabase
    .from('insights')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!article) {
    notFound();
  }

  const title = isId ? article.title_id : article.title_en;
  const content = isId ? article.content_id : article.content_en;

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <FadeIn>
            <div className="inline-block mb-6 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              {article.category || (isId ? "Wawasan" : "Insight")}
            </div>
            <h1 className="text-xl md:text-xl font-heading font-bold mb-8 leading-tight">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-10">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author || 'Novera Team'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(article.published_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Link href="/insights">
                <Button variant="outline" className="gap-2 border-border/50">
                  <ArrowLeft className="w-4 h-4" /> {isId ? "Kembali ke Wawasan" : "Back to Insights"}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <FadeIn delay={0.2}>
            <article className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {content || (isId ? "Belum ada konten." : "No content available.")}
            </article>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
