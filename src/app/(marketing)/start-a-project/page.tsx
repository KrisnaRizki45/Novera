import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import { ProjectFormClient } from './form-client';

export default async function Page() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {isId ? "Hubungi Kami" : "Contact Us"}
            </div>
            <h1 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Mulai Sebuah Proyek" : "Start a Project"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              {isId 
                ? "Beri tahu kami tentang tantangan operasional Anda." 
                : "Tell us about your operational challenges."}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <FadeIn delay={0.2}>
            <ProjectFormClient isId={isId} />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
