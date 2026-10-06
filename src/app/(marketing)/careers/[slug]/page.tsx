import { FadeIn } from '@/components/ui/fade-in';
import { getLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Briefcase, Clock, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ApplyForm } from '../components/apply-form';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const lang = await getLanguage();
  const isId = lang === 'id';
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  return {
    title: isId ? `Lowongan: ${slug} | NOVERA` : `Role: ${slug} | NOVERA`,
  };
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const lang = await getLanguage();
  const isId = lang === 'id';
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const supabase = createClient();
  const { data: job } = await supabase
    .from('careers')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!job) {
    notFound();
  }

  const jobTitle = isId ? job.title_id : job.title_en;
  const department = job.department;
  const location = job.location;
  const type = job.employment_type;
  
  // Parse JSON fields safely
  const parseJsonStr = (val: any) => {
    if (!val) return [];
    if (typeof val === 'string') {
      try { return JSON.parse(val); } catch (e) { return []; }
    }
    return Array.isArray(val) ? val : [];
  };
  
  const responsibilities = isId ? parseJsonStr(job.responsibilities_id) : parseJsonStr(job.responsibilities_en);
  const requirements = isId ? parseJsonStr(job.requirements_id) : parseJsonStr(job.requirements_en);
  const techStack = parseJsonStr(job.technologies) || ['Digital Tools', 'Modern Workflow'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* JOB HEADER */}
      <section className="pt-40 pb-16 px-4 bg-muted/10 border-b border-border/50 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <FadeIn>
            <Link href="/careers" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> {isId ? "Kembali ke Karir" : "Back to Careers"}
            </Link>
            
            <h1 className="text-xl md:text-xl font-heading font-bold mb-6">{jobTitle}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border/50 rounded-md shadow-sm">
                <Briefcase className="w-4 h-4 text-muted-foreground" /> {department}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border/50 rounded-md shadow-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" /> {location}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border/50 rounded-md shadow-sm">
                <Clock className="w-4 h-4 text-muted-foreground" /> {type}
              </span>
            </div>

            <div className="mt-10">
              <Link href="#apply">
                <Button className="h-12 px-8 font-medium shadow-lg hover:scale-105 transition-transform bg-primary text-primary-foreground">
                  {isId ? "Lamar Pekerjaan Ini" : "Apply for this Role"}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* JOB DETAILS */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto max-w-4xl flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-2/3">
            <FadeIn delay={0.1}>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                
                <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Tentang Peran Ini" : "About the Role"}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {isId ? (job.description_id || `Sebagai ${jobTitle}, Anda akan bertanggung jawab untuk mendesain dan mengimplementasikan sistem yang digunakan oleh klien enterprise kami.`) : (job.description_en || `As a ${jobTitle}, you will be responsible for designing and implementing systems used by our enterprise clients.`)}
                </p>

                {(responsibilities && responsibilities.length > 0) && (
                  <>
                    <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Tanggung Jawab" : "Responsibilities"}</h3>
                    <ul className="space-y-3 mb-8">
                      {responsibilities.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {(requirements && requirements.length > 0) && (
                  <>
                    <h3 className="font-heading text-2xl font-bold mb-4">{isId ? "Persyaratan" : "Requirements"}</h3>
                    <ul className="space-y-3 mb-8">
                      {requirements.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

              </div>
            </FadeIn>
          </div>

          <div className="lg:w-1/3 space-y-6">
            <FadeIn delay={0.2}>
              <div className="p-6 bg-muted/10 border border-border/50 rounded-2xl sticky top-24">
                <h4 className="font-bold text-lg mb-4">{isId ? "Teknologi & Lingkungan" : "Technology & Environment"}</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {techStack.map((tech: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-background border border-border/50 rounded text-xs font-medium">{tech}</span>
                  ))}
                </div>
                
                <hr className="border-border/50 my-6" />
                
                <h4 className="font-bold text-lg mb-4">{isId ? "Benefit" : "Benefits"}</h4>
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> {isId ? "Peralatan Kerja (MacBook)" : "Work Equipment (MacBook)"}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> {isId ? "Asuransi Kesehatan" : "Health Insurance"}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> {isId ? "Anggaran Pembelajaran" : "Learning Budget"}</li>
                </ul>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* APPLY SECTION */}
      <section id="apply" className="py-16 px-4 bg-muted/10 border-t border-border/50">
        <div className="container mx-auto max-w-3xl text-center">
          <FadeIn delay={0.3}>
            <h2 className="text-xl font-heading font-bold mb-4">{isId ? "Lamar Pekerjaan Ini" : "Apply for this Role"}</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              {isId 
                ? "Kirimkan CV terbaru dan portofolio Anda. Kami sangat merekomendasikan untuk melampirkan cover letter yang menjelaskan mengapa Anda cocok untuk peran ini." 
                : "Submit your latest CV and portfolio. We highly recommend attaching a cover letter explaining why you are a great fit for this role."}
            </p>
            {job.application_url ? (
              <div className="bg-background border border-border/50 rounded-2xl p-8 max-w-2xl mx-auto text-center shadow-xl">
                <a href={job.application_url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="h-14 px-8 font-medium shadow-lg hover:scale-105 transition-transform bg-primary text-primary-foreground">
                    {isId ? "Buka Formulir Eksternal" : "Open External Form"}
                  </Button>
                </a>
              </div>
            ) : (
              <div className="bg-background border border-border/50 rounded-2xl p-8 max-w-2xl mx-auto text-left shadow-xl">
                <ApplyForm isId={isId} jobs={[{slug: slug, title: jobTitle}]} defaultJobSlug={slug} />
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
