import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import Link from 'next/link';

export default async function InsightsPage() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              {isId ? "Platform Pengetahuan" : "Knowledge Platform"}
            </div>
            <h1 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Wawasan Teknologi & Rekayasa" : "Technology & Engineering Insights"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {isId 
                ? "Eksplorasi mendalam mengenai arsitektur sistem, kecerdasan buatan, keamanan, dan transformasi digital yang mendorong efisiensi operasional B2B." 
                : "Deep explorations into system architecture, artificial intelligence, security, and digital transformation driving B2B operational efficiency."}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <FadeIn delay={0.2}>
            
            {/* Empty State / Coming Soon Layout */}
            <div className="text-center mb-16">
              <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Katalog Pengetahuan" : "Knowledge Catalog"}</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isId 
                  ? "Artikel, analisis teknis, dan whitepapers kami berfokus pada kedalaman rekayasa (engineering depth) dan dampaknya terhadap kesinambungan bisnis (business continuity). Fokus topik meliputi:" 
                  : "Our articles, technical analyses, and whitepapers focus on engineering depth and its impact on business continuity. Topic focus areas include:"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-primary/30 transition-colors">
                <h4 className="font-heading text-xl font-bold mb-3">{isId ? "Rekayasa (Engineering)" : "Engineering"}</h4>
                <p className="text-muted-foreground text-sm">
                  {isId 
                    ? "Diskusi arsitektur, desain API, basis data, pengujian, performa, DevOps, dan keputusan implementasi teknis."
                    : "Architecture discussions, API design, databases, testing, performance, DevOps, and technical implementation decisions."}
                </p>
              </div>
              <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-primary/30 transition-colors">
                <h4 className="font-heading text-xl font-bold mb-3">{isId ? "AI & Otomatisasi" : "AI & Automation"}</h4>
                <p className="text-muted-foreground text-sm">
                  {isId 
                    ? "Implementasi AI, alur kerja, RAG, integrasi LLM, dan otomatisasi bisnis yang terukur."
                    : "AI implementation, workflows, RAG, LLM integration, and scalable business automation."}
                </p>
              </div>
              <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-primary/30 transition-colors">
                <h4 className="font-heading text-xl font-bold mb-3">{isId ? "Transformasi Digital" : "Digital Transformation"}</h4>
                <p className="text-muted-foreground text-sm">
                  {isId 
                    ? "Modernisasi sistem lawas (legacy), digitalisasi proses, integrasi sistem, dan visibilitas operasional."
                    : "Legacy system modernization, process digitization, system integration, and operational visibility."}
                </p>
              </div>
              <div className="p-8 bg-background border border-border/50 rounded-2xl hover:border-primary/30 transition-colors">
                <h4 className="font-heading text-xl font-bold mb-3">{isId ? "Keamanan Sistem" : "System Security"}</h4>
                <p className="text-muted-foreground text-sm">
                  {isId 
                    ? "Pengembangan aplikasi aman, autentikasi, keamanan API, dan perlindungan data tingkat enterprise."
                    : "Secure application development, authentication, API security, and enterprise-grade data protection."}
                </p>
              </div>
            </div>

            <div className="mt-8 p-12 bg-muted/20 border border-dashed border-border/60 rounded-2xl text-center">
              <h5 className="font-heading text-lg font-bold mb-2">
                {isId ? "Publikasi Mendatang" : "Upcoming Publications"}
              </h5>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                {isId 
                  ? "Sistem manajemen konten (CMS) sedang disiapkan. Analisis rekayasa teknis dan whitepapers akan segera diluncurkan di platform ini." 
                  : "Content Management System (CMS) is being provisioned. Technical engineering analyses and whitepapers will be published here shortly."}
              </p>
            </div>

          </FadeIn>
        </div>
      </section>
    </div>
  );
}
