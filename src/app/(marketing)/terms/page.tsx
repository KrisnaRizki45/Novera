import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';

export default async function TermsPage() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              {isId ? "Syarat & Ketentuan" : "Terms of Service"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {isId 
                ? "Ketentuan yang mengatur penggunaan situs web kami serta inkuiri proyek enterprise Anda bersama NOVERA." 
                : "The terms governing the use of our website and your enterprise project inquiries with NOVERA."}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <FadeIn delay={0.2}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              
              <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Penggunaan Situs Web" : "Website Usage"}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Situs web ini dirancang untuk menyediakan informasi komprehensif mengenai kapabilitas rekayasa perangkat lunak kami. Penggunaan yang dapat diterima (acceptable use) melarang segala upaya intervensi teknis, peretasan, atau penyalahgunaan formulir inkuiri kami." 
                  : "This website is designed to provide comprehensive information regarding our software engineering capabilities. Acceptable use prohibits any technical intervention, hacking attempts, or misuse of our inquiry forms."}
              </p>

              <h3 className="font-heading text-2xl font-bold mb-4 mt-10">{isId ? "Kekayaan Intelektual" : "Intellectual Property"}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Seluruh konten visual, arsitektur, dan materi tertulis pada situs web ini merupakan kekayaan intelektual NOVERA. Pengaturan kepemilikan dan lisensi (Intellectual property ownership and licensing terms) untuk proyek yang dikembangkan akan didefinisikan secara khusus sesuai dengan dokumen perjanjian proyek klien." 
                  : "All visual content, architecture, and written materials on this website are the intellectual property of NOVERA. Intellectual property ownership and licensing terms for developed projects are strictly defined according to the applicable project agreement document."}
              </p>

              <h3 className="font-heading text-2xl font-bold mb-4 mt-10">{isId ? "Kerahasiaan & NDA" : "Confidentiality & NDAs"}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Kesepakatan kerahasiaan, termasuk Non-Disclosure Agreements (NDA), dapat ditetapkan dan disepakati bersama bergantung pada sifat operasional dan persyaratan teknis dari setiap inkuiri atau penugasan proyek." 
                  : "Confidentiality arrangements, including Non-Disclosure Agreements (NDAs), may be established depending on the nature and operational requirements of an engagement or inquiry."}
              </p>

              <h3 className="font-heading text-2xl font-bold mb-4 mt-10">{isId ? "Batasan Tanggung Jawab" : "Limitation of Liability"}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Informasi arsitektur dan kapabilitas yang ditampilkan di sini disajikan sebagaimana adanya. NOVERA tidak memegang liabilitas atas implikasi dari keputusan bisnis eksternal yang diambil semata-mata berdasarkan interpretasi dari konten publik ini." 
                  : "Architectural and capability information displayed herein is provided on an 'as is' basis. NOVERA holds no liability for implications arising from external business decisions made solely based on the interpretation of this public content."}
              </p>

            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
