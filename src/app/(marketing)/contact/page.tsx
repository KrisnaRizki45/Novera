import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ContactPage() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              {isId ? "Konsultasi B2B" : "B2B Technology Consultation"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              {isId ? "Mari Diskusikan Teknologi di Balik Inisiatif Bisnis Anda" : "Let's discuss the technology behind your next business initiative."}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {isId 
                ? "Bicarakan tantangan bisnis Anda, arsitektur yang dibutuhkan, dan bagaimana integrasi sistem dapat mempercepat transformasi operasional Anda." 
                : "Discuss your business challenges, required architectures, and how system integration can accelerate your operational transformation."}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <FadeIn delay={0.2}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              
              <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Fokus Konsultasi" : "Consultation Focus"}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Sesi konsultasi kami ditujukan untuk entitas bisnis dan enterprise yang membutuhkan perancangan perangkat lunak, otomatisasi, modernisasi sistem lawas (legacy modernization), integrasi sistem yang kompleks, dan konsultasi teknologi strategis." 
                  : "Our consultation sessions are designed for business entities and enterprises that require software engineering, automation, legacy system modernization, complex system integration, and strategic technology consulting."}
              </p>

              <h3 className="font-heading text-2xl font-bold mb-4 mt-12">{isId ? "Bagaimana Prosesnya?" : "What Happens Next"}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Bergantung pada ruang lingkup permintaan, inkuiri Anda akan ditinjau oleh tim teknis atau solusi yang tepat. Siklus evaluasi kami meliputi:" 
                  : "Depending on the nature of the request, your inquiry may be reviewed by the appropriate technical or solution team. Our evaluation cycle includes:"}
              </p>
              <ul className="text-muted-foreground mb-8 space-y-2">
                <li><strong>01 — Submit Inquiry:</strong> {isId ? "Penerimaan informasi dan dokumen teknis terkait." : "Reception of information and related technical documents."}</li>
                <li><strong>02 — Initial Review:</strong> {isId ? "Evaluasi awal kesesuaian dan kelayakan teknis." : "Initial evaluation of suitability and technical feasibility."}</li>
                <li><strong>03 — Requirement Discussion:</strong> {isId ? "Sesi pemahaman dan pendalaman ruang lingkup." : "Scope understanding and deepening session."}</li>
                <li><strong>04 — Technical Assessment:</strong> {isId ? "Analisis solusi dan arsitektur oleh tim spesialis." : "Solution and architecture analysis by our specialist team."}</li>
                <li><strong>05 — Proposed Approach:</strong> {isId ? "Pemaparan peta jalan teknis dan implementasi." : "Presentation of technical roadmap and implementation."}</li>
              </ul>

              <h3 className="font-heading text-2xl font-bold mb-4 mt-12">{isId ? "Dukungan & Layanan Enterprise" : "Enterprise Support & SLA"}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {isId 
                  ? "Model dukungan pasca-peluncuran dan Perjanjian Tingkat Layanan (SLA) dapat distrukturisasi sepenuhnya menyesuaikan dengan ruang lingkup proyek, kebutuhan operasional kritis, serta ekspektasi performa dari perusahaan Anda." 
                  : "Support models and Service-Level Agreements (SLA) can be structured according to project scope, operational requirements, and service-level expectations of your organization."}
              </p>

              <div className="mt-16 p-10 bg-muted/20 border border-border/50 rounded-2xl text-center flex flex-col items-center">
                <h4 className="font-heading text-2xl font-bold mb-4">{isId ? "Isi Formulir Inkuiri" : "Submit Your Inquiry"}</h4>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  {isId 
                    ? "Tim kami akan meninjau inkuiri Anda dan menghubungi Anda untuk langkah teknis selanjutnya." 
                    : "Our team will review your inquiry and get back to you with the appropriate next step."}
                </p>
                <Link href="/start-a-project">
                  <Button size="lg" className="h-12 px-8 text-base">
                    {isId ? "Buka Formulir" : "Open Form"}
                  </Button>
                </Link>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
