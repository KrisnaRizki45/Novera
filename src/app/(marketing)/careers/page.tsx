import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Briefcase, Clock, Code2, Users, Lightbulb, Shield, Target } from 'lucide-react';
import { JobList } from './components/job-list';
import { FAQAccordion } from '@/components/ui/faq-accordion';

import { createClient } from '@/lib/supabase/server';

export async function generateMetadata() {
  const lang = await getLanguage();
  const isId = lang === 'id';
  return {
    title: isId ? 'Karir | NOVERA' : 'Careers | NOVERA',
    description: isId 
      ? 'Bangun teknologi yang bermakna. Bergabunglah dengan lingkungan rekayasa yang menghargai kualitas teknis dan kolaborasi.'
      : 'Build meaningful technology. Join an engineering environment that values technical quality and collaboration.',
  };
}

// Fallback MOCK DATA if Supabase is not configured yet
const MOCK_JOBS = [
  {
    slug: 'software-engineer-backend',
    title: 'Software Engineer (Backend)',
    department: 'Engineering',
    location: 'Jakarta (Hybrid)',
    type: 'Full-time'
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time'
  }
];

export default async function CareersPage() {
  const lang = await getLanguage();
  const isId = lang === 'id';

  let openJobs = MOCK_JOBS;
  
  try {
    const supabase = createClient();
    const { data: jobs, error } = await supabase
      .from('careers')
      .select('slug, title_en, title_id, department, location, employment_type')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
      
    if (jobs && jobs.length > 0 && !error) {
      openJobs = jobs.map(j => ({
        slug: j.slug,
        title: isId ? j.title_id : j.title_en,
        department: j.department,
        location: j.location,
        type: j.employment_type
      }));
    }
  } catch (err) {
    console.error("Supabase not configured or error fetching jobs", err);
  }

  // Generate lightweight job options for the dropdown form
  const jobOptions = openJobs.map(j => ({ slug: j.slug, title: j.title }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <FadeIn>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              {isId ? "Bergabung dengan Tim Kami" : "Join Our Team"}
            </div>
            <h1 className="text-xl md:text-2xl lg:text-7xl font-heading font-bold mb-6 tracking-tight">
              {isId ? "Bangun Apa yang Bermakna." : "Build What Matters."} <br />
              <span className="text-muted-foreground">{isId ? "Tumbuh Bersama NOVERA." : "Grow With NOVERA."}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              {isId 
                ? "Kami mencari pemecah masalah (problem solvers) yang menghargai kualitas kode, otonomi, dan ingin membangun perangkat lunak enterprise kelas dunia." 
                : "We are looking for problem solvers who value code quality, autonomy, and want to build world-class enterprise software."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CULTURE SECTION */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <FadeIn delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-xl font-heading font-bold mb-4">{isId ? "Budaya Rekayasa Kami" : "Our Engineering Culture"}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isId ? "Kami tidak hanya menulis kode, kami merekayasa sistem yang memecahkan masalah operasional nyata." : "We don't just write code, we engineer systems that solve real operational problems."}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Target, title: isId ? "Kepemilikan (Ownership)" : "Extreme Ownership", desc: isId ? "Anda bertanggung jawab penuh atas fitur yang Anda bangun, dari arsitektur hingga deployment." : "You take full responsibility for the features you build, from architecture to deployment." },
                { icon: Lightbulb, title: isId ? "Pembelajaran Berkelanjutan" : "Continuous Learning", desc: isId ? "Kami menyediakan lingkungan di mana bereksperimen dengan teknologi baru adalah hal yang didorong." : "We provide an environment where experimenting with new technologies is encouraged." },
                { icon: Users, title: isId ? "Kolaborasi Tanpa Ego" : "Egoless Collaboration", desc: isId ? "Ide terbaik yang menang. Kami menghargai dokumentasi yang baik dan review kode yang konstruktif." : "The best idea wins. We highly value good documentation and constructive code reviews." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-muted/10 border border-border/50 rounded-2xl">
                  <item.icon className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="py-16 px-4 bg-muted/5 border-y border-border/50" id="open-positions">
        <div className="container mx-auto max-w-5xl">
          <FadeIn delay={0.2}>
            <JobList jobs={openJobs} isId={isId} />
          </FadeIn>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <FadeIn delay={0.3}>
            <div className="text-center mb-16">
              <h2 className="text-xl font-heading font-bold mb-4">{isId ? "Proses Rekrutmen (Khas)" : "Typical Hiring Process"}</h2>
              <p className="text-muted-foreground">
                {isId ? "Kami menjaga proses wawancara kami setransparan mungkin." : "We keep our interview process as transparent as possible."}
              </p>
            </div>
            
            <div className="relative border-l border-border/50 ml-4 md:ml-8 pl-8 space-y-12">
              {[
                { step: "01", title: "Application Review", desc: isId ? "Kami meninjau pengalaman dan kesesuaian Anda dengan kualifikasi." : "We review your experience and fit based on the role requirements." },
                { step: "02", title: "Initial Chat", desc: isId ? "Diskusi santai 30 menit mengenai ekspektasi, budaya kerja, dan latar belakang Anda." : "A casual 30-minute discussion regarding expectations, culture, and your background." },
                { step: "03", title: "Technical/Case Assessment", desc: isId ? "Sesi live coding pendek atau case study tergantung posisi (tanpa take-home test yang panjang)." : "Short live coding session or case study depending on the role (no long take-home tests)." },
                { step: "04", title: "Team Interview", desc: isId ? "Bertemu dengan calon rekan satu tim Anda." : "Meet your potential future teammates." },
                { step: "05", title: "Offer", desc: isId ? "Penyelarasan akhir, penawaran resmi, dan penyambutan ke tim." : "Final alignment, official offer, and welcome to the team." }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[45px] bg-background border border-border/50 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center text-primary mt-1">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <FAQAccordion 
        title={isId ? "Pertanyaan Umum" : "Frequently Asked Questions"}
        faqs={[
          { q: isId ? "Apakah NOVERA mendukung kerja jarak jauh (Remote)?" : "Does NOVERA support remote work?", a: isId ? "Ya, bergantung pada perannya, kami mendukung opsi hybrid maupun 100% remote untuk talenta yang sesuai." : "Yes, depending on the role, we support both hybrid and 100% remote options for the right talent." },
          { q: isId ? "Apakah saya perlu memiliki gelar sarjana IT?" : "Do I need an IT degree?", a: isId ? "Tidak wajib. Kami lebih peduli pada portofolio, kemampuan problem solving, dan kode nyata yang pernah Anda tulis." : "Not strictly. We care far more about your portfolio, problem-solving skills, and the actual code you have written." },
          { q: isId ? "Berapa lama proses rekrutmen ini berlangsung?" : "How long does the hiring process take?", a: isId ? "Biasanya memakan waktu 2 hingga 3 minggu sejak aplikasi diajukan." : "It typically takes 2 to 3 weeks from the time of application." }
        ]}
      />
    </div>
  );
}
