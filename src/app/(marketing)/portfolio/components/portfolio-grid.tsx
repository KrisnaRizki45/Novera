import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollDots } from "@/components/ui/scroll-dots";
import { FadeIn } from "@/components/ui/fade-in";

// 1. The Skeleton Component
export function PortfolioGridSkeleton() {
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 gap-8 pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-[85vw] md:w-auto flex-shrink-0 snap-center md:snap-none border border-border/50 rounded-3xl p-8 bg-background h-full flex flex-col relative overflow-hidden">
          {/* Skeleton Shimmer Overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-muted/20 to-transparent z-10" />
          
          <div className="flex justify-between items-start mb-16">
            <div className="h-6 w-32 bg-muted rounded-full animate-pulse" />
            <div className="w-6 h-6 bg-muted rounded-full animate-pulse" />
          </div>
          
          <div className="mt-auto">
            <div className="h-4 w-24 bg-muted rounded animate-pulse mb-4" />
            <div className="h-8 w-3/4 bg-muted rounded animate-pulse mb-6" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// 2. The Actual Server Component that fakes a network delay
export async function PortfolioGrid({ lang }: { lang: string }) {
  const isId = lang === 'id';

  // Fake a database delay (1.5 seconds) to demonstrate the Skeleton Loading transition
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const projects = [
    {
      title: isId ? "ERP Rantai Pasok Terpusat" : "Centralized Supply Chain ERP",
      category: isId ? "Sistem Bisnis" : "Business Systems",
      desc: isId 
        ? "Menggantikan 4 platform usang yang terpisah dengan satu arsitektur ERP kustom berkinerja tinggi. Visibilitas stok antar gudang seketika menjadi akurat 100%."
        : "Replaced 4 disconnected legacy platforms with a single high-performance custom ERP architecture. Cross-warehouse stock visibility instantly hit 100% accuracy.",
      tag: isId ? "Logistik & Distribusi" : "Logistics & Distribution",
      label: isId ? "Studi Kasus Internal" : "Internal Case Study"
    },
    {
      title: isId ? "Infrastruktur Portal Pasien" : "Patient Portal Infrastructure",
      category: "Custom Software",
      desc: isId 
        ? "Membangun sistem rekam medis elektronik berstandar keamanan HIPAA. Portal ini memungkinkan pasien melacak jadwal dan merampingkan triase unit gawat darurat."
        : "Architected a HIPAA-compliant electronic medical record system. The portal allowed patients to track schedules and streamlined ER triage operations.",
      tag: isId ? "Kesehatan (Healthcare)" : "Healthcare",
      label: isId ? "Prototipe Enterprise" : "Enterprise Prototype"
    },
    {
      title: isId ? "Mesin Otomatisasi Rekonsiliasi" : "Reconciliation Automation Engine",
      category: "Automation",
      desc: isId
        ? "Middleware (Daemon) yang memproses jutaan baris data transaksi harian semalaman (overnight), mengeliminasi penuh entri data manual oleh staf akuntan."
        : "Middleware daemon processing millions of daily transaction data rows overnight, completely eliminating manual data entry for the accounting staff.",
      tag: isId ? "Fintech (Keuangan)" : "Fintech (Finance)",
      label: isId ? "Demonstrasi Arsitektur" : "Architecture Demonstration"
    },
    {
      title: isId ? "RAG Pengetahuan Hukum Privat" : "Private Legal Knowledge RAG",
      category: "AI Solutions",
      desc: isId
        ? "Mengonversi ribuan PDF kontrak fisik menjadi vektor data internal. Staf kini dapat melakukan kueri hukum kompleks ke AI tanpa data bocor ke publik."
        : "Converted thousands of physical PDF contracts into an internal vector database. Staff can now query complex legal clauses without exposing data publicly.",
      tag: isId ? "Firma Hukum (Legal)" : "Legal Firm",
      label: isId ? "Konsep Terverifikasi" : "Verified Concept"
    }
  ];

  return (
    <>
    <div id="portfolio-scroll" className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-6 -mx-4 px-4 scrollbar-hide relative">
      {projects.map((project, i) => (
        <FadeIn key={i} delay={i * 0.1} className="w-[85vw] md:w-[45vw] lg:w-[40vw] flex-shrink-0 snap-center h-auto">
          <Link href="/portfolio/project" className="group block h-full">
            <div className="border border-border/50 rounded-3xl p-8 bg-background hover:border-primary/40 transition-all duration-500 h-full flex flex-col hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden">
              <div className="flex justify-between items-start mb-16">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded-full text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                    {project.label}
                  </span>
                </div>
                <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="mt-auto">
                <span className="text-sm text-primary font-medium mb-2 block">{project.tag}</span>
                <h3 className="text-xl font-heading font-bold mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {project.desc}
                </p>
              </div>
            </div>
          </Link>
        </FadeIn>
      ))}
    </div>
    <ScrollDots containerId="portfolio-scroll" count={projects.length} />
    </>
  );
}
