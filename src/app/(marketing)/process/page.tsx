import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ProcessPage() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              {isId ? "Metodologi Engineering" : "Engineering Methodology"}
            </div>
            <h1 className="text-xl md:text-xl font-heading font-bold mb-6">
              {isId ? "Dari Masalah Bisnis ke Teknologi Siap Produksi" : "From Business Problem to Production-Ready Technology"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {isId 
                ? "Pendekatan pengiriman terstruktur kami menyelaraskan kualitas teknis dengan nilai bisnis. Kami merancang, membangun, dan memelihara sistem dengan proses rekayasa yang disiplin." 
                : "Our structured delivery approach aligns technical quality with business value. We design, engineer, and maintain systems with disciplined engineering processes."}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-12 md:space-y-0 relative">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            
            {[
              { 
                num: "01",
                title: isId ? "Discovery & Architecture" : "Discovery & Architecture", 
                desc: isId ? "Pemrograman tidak dimulai sebelum masalah bisnis dipahami sepenuhnya. Pada fase ini, kami melakukan wawancara dengan pemangku kepentingan, pemetaan alur kerja, dan penilaian sistem yang ada untuk menetapkan batasan teknis dan persyaratan integrasi." : "Coding does not start until the business problem is fully understood. In this phase, we conduct stakeholder interviews, workflow mapping, and existing system assessments to establish technical constraints and integration requirements.",
                activities: ["Business requirements", "User needs", "Technical constraints", "Initial architecture"],
                output: isId ? "Ruang lingkup dan arahan teknis yang jelas." : "Clear scope and technical direction."
              },
              { 
                num: "02",
                title: isId ? "Solution & Technical Design" : "Solution & Technical Design", 
                desc: isId ? "Kami menerjemahkan kebutuhan bisnis ke dalam cetak biru arsitektur. Ini mencakup desain API, pemodelan basis data, strategi integrasi, serta pertimbangan skalabilitas infrastruktur dan autentikasi sistem." : "We translate business requirements into an architectural blueprint. This includes API design, database modeling, integration strategy, as well as infrastructure scalability and system authentication considerations.",
                activities: ["API Design", "Database Modeling", "Integration Strategy", "Security Planning"],
                output: isId ? "Cetak biru arsitektur yang siap dikembangkan." : "Development-ready architectural blueprint."
              },
              { 
                num: "03",
                title: isId ? "Agile Development" : "Agile Development", 
                desc: isId ? "Sistem dibangun dengan siklus sprint yang berfokus pada rilis inkremental. Setiap baris kode melewati ulasan ketat (code review), strategi percabangan, dan diuji melalui pipeline CI/CD untuk memastikan kualitas rekayasa tetap terjaga." : "Systems are built using sprint cycles focused on incremental delivery. Every line of code goes through rigorous code reviews, branching strategies, and CI/CD pipelines to ensure engineering standards are maintained.",
                activities: ["Sprint Cycles", "Code Reviews", "CI/CD Pipelines", "Incremental Delivery"],
                output: isId ? "Kode berfungsi yang diuji secara bertahap." : "Functioning code tested incrementally."
              },
              { 
                num: "04",
                title: isId ? "Quality Engineering" : "Quality Engineering", 
                desc: isId ? "Pengujian adalah inti dari reliabilitas. Kami mengimplementasikan pengujian otomatis (unit dan API testing). Pengujian keamanan dapat digabungkan jika diwajibkan oleh profil risiko dan ruang lingkup proyek." : "Testing is the core of reliability. We implement automated testing (unit and API testing). Security testing can be incorporated into projects where required by the application's risk profile and engagement scope.",
                activities: ["Automated Testing", "API Testing", "Security Scans", "Performance Checks"],
                output: isId ? "Perangkat lunak yang handal dan aman." : "Reliable and secure software."
              },
              { 
                num: "05",
                title: isId ? "Deployment & Release" : "Deployment & Release", 
                desc: isId ? "Strategi penyebaran kami dirancang berdasarkan infrastruktur yang mendukung. Pendekatan seperti peluncuran bergulir, blue-green deployment, atau arsitektur ter-container diadaptasi sepenuhnya sesuai kebutuhan spesifik sistem." : "Deployment strategies can be designed around containerized infrastructure, rolling releases, blue-green deployment, or other approaches depending on system requirements.",
                activities: ["Infrastructure Setup", "Containerization", "Release Strategy", "Environment Sync"],
                output: isId ? "Sistem tayang di lingkungan produksi." : "System live in production environment."
              },
              { 
                num: "06",
                title: isId ? "Operate, Monitor & Improve" : "Operate, Monitor & Improve", 
                desc: isId ? "Pekerjaan tidak berhenti setelah sistem tayang. Kami memantau kesehatan server, menganalisis insiden, mengoptimalkan kinerja, dan melakukan iterasi fitur berkelanjutan untuk memastikan nilai bisnis terus bertumbuh." : "Work does not stop after deployment. We monitor system health, analyze incidents, optimize performance, and conduct continuous feature iteration to ensure business value grows alongside operational changes.",
                activities: ["Server Monitoring", "Incident Analysis", "Performance Tuning", "Feature Iteration"],
                output: isId ? "Sistem berkembang sejalan dengan bisnis." : "System evolves alongside the business."
              }
            ].map((step, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-4 border-primary/20 text-primary items-center justify-center font-bold shadow-xl z-10">
                    {step.num}
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 p-6 md:p-8 bg-background border border-border/50 rounded-2xl shadow-lg hover:border-primary/30 transition-colors">
                    <div className="md:hidden inline-block mb-4 px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-lg">
                      Step {step.num}
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{step.desc}</p>
                    <div className="bg-muted/30 p-4 rounded-xl border border-border/50 mb-4">
                      <p className="text-xs font-bold text-foreground/80 uppercase tracking-widest mb-2">Activities</p>
                      <div className="flex flex-wrap gap-2">
                        {step.activities.map((act, i) => (
                          <span key={i} className="text-xs bg-background border border-border/50 px-2 py-1 rounded-md text-muted-foreground">
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Output</p>
                      <p className="text-sm font-medium text-foreground">{step.output}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.3}>
            <div className="mt-24 p-10 bg-primary/5 border border-primary/20 rounded-3xl text-center flex flex-col items-center">
              <h4 className="font-heading text-3xl font-bold mb-4">{isId ? "Mulai Diskusi Proyek" : "Start a Conversation"}</h4>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                {isId ? "Mari bahas tantangan operasional Anda dan bagaimana arsitektur teknis kami dapat menyelesaikannya." : "Let's discuss your operational bottlenecks and how our technical architecture can resolve them."}
              </p>
              <Link href="/start-a-project">
                <Button size="lg" className="h-14 px-10 text-lg shadow-xl hover:scale-105 transition-transform">
                  {isId ? "Diskusikan Proyek Anda" : "Start a Project"}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
