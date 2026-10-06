import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';

export default async function PrivacyPage() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              {isId ? "Kebijakan Privasi" : "Privacy Policy"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {isId 
                ? "Informasi mengenai bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda sesuai dengan standar operasional B2B." 
                : "Information on how we collect, use, and protect your data in accordance with B2B operational standards."}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <FadeIn delay={0.2}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              
              <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Informasi yang Kami Kumpulkan" : "Information We Collect"}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Dalam proses interaksi profesional dan inkuiri proyek, kami dapat mengumpulkan informasi kontak bisnis, informasi terkait inkuiri proyek (seperti skala operasional dan tantangan sistem), serta informasi teknis dan analitik (log server, metrik performa) saat Anda menggunakan situs web kami." 
                  : "During professional interactions and project inquiries, we may collect business contact information, project inquiry details (such as operational scale and system challenges), as well as technical and analytics information (server logs, performance metrics) when you use our website."}
              </p>

              <h3 className="font-heading text-2xl font-bold mb-4 mt-10">{isId ? "Bagaimana Kami Menggunakan Informasi" : "How We Use Information"}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {isId ? "Informasi yang dikumpulkan secara eksplisit digunakan untuk tujuan operasional:" : "Collected information is explicitly used for operational purposes:"}
              </p>
              <ul className="text-muted-foreground mb-6 space-y-2">
                <li>{isId ? "Merespons inkuiri dan memfasilitasi komunikasi layanan." : "Responding to inquiries and facilitating service communication."}</li>
                <li>{isId ? "Meningkatkan performa, fungsionalitas, dan keamanan infrastruktur situs web." : "Improving website infrastructure performance, functionality, and security."}</li>
                <li>{isId ? "Melakukan analisis internal untuk strategi peningkatan kualitas rekayasa kami." : "Conducting internal analytics for our engineering quality improvement strategies."}</li>
              </ul>

              <h3 className="font-heading text-2xl font-bold mb-4 mt-10">{isId ? "Keamanan Data" : "Data Security"}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Kami mengimplementasikan tindakan teknis dan operasional yang dirancang untuk melindungi informasi dari akses, pengubahan, pengungkapan, atau penghancuran yang tidak sah (unauthorized access). Praktik ini mencakup kontrol akses ketat, enkripsi transmisi, dan penyimpanan sistem yang aman." 
                  : "We implement reasonable technical and organizational measures designed to protect information from unauthorized access, alteration, disclosure, or destruction. These practices include strict access controls, transmission encryption, and secure storage systems."}
              </p>

              <h3 className="font-heading text-2xl font-bold mb-4 mt-10">{isId ? "Retensi Data" : "Data Retention"}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {isId 
                  ? "Data inkuiri disimpan selama diperlukan untuk memfasilitasi komunikasi bisnis atau sepanjang siklus hidup proyek terkait, sesuai dengan kepatuhan hukum dan regulasi operasional kami." 
                  : "Inquiry data is retained as long as necessary to facilitate business communication or throughout the lifecycle of the related project, in accordance with our legal and operational regulatory compliance."}
              </p>

            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
