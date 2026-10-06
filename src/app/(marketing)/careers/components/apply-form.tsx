"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type JobOption = {
  slug: string;
  title: string;
};

export function ApplyForm({ isId, jobs = [], defaultJobSlug }: { isId: boolean, jobs?: JobOption[], defaultJobSlug?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedJob, setSelectedJob] = useState(defaultJobSlug || (jobs.length > 0 ? jobs[0].slug : "general"));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call to Supabase or Email service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      toast.success(
        isId ? "Lamaran Berhasil Dikirim!" : "Application Submitted Successfully!", 
        {
          description: isId ? "Tim rekrutmen kami akan segera menghubungi Anda." : "Our recruitment team will contact you shortly."
        }
      );
      
      // Reset form
      (e.target as HTMLFormElement).reset();
      setSelectedJob(defaultJobSlug || (jobs.length > 0 ? jobs[0].slug : "general"));
    } catch (error) {
      toast.error(
        isId ? "Gagal Mengirim Lamaran" : "Failed to Submit Application",
        {
          description: isId ? "Terjadi kesalahan. Silakan coba lagi nanti." : "An error occurred. Please try again later."
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium">{isId ? "Kategori Pekerjaan / Posisi" : "Job Category / Position"}</label>
        <select 
          required 
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="w-full h-12 px-4 rounded-lg bg-muted/30 border border-border/50 focus:border-primary outline-none transition-colors cursor-pointer"
        >
          {jobs.length === 0 && (
            <option value="general">{isId ? "Lamaran Umum (General Application)" : "General Application"}</option>
          )}
          {jobs.map((job) => (
            <option key={job.slug} value={job.slug}>{job.title}</option>
          ))}
          {jobs.length > 0 && !jobs.find(j => j.slug === "general") && (
            <option value="general">{isId ? "Lainnya / Lamaran Umum" : "Other / General Application"}</option>
          )}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{isId ? "Nama Lengkap" : "Full Name"}</label>
          <input required type="text" className="w-full h-12 px-4 rounded-lg bg-muted/30 border border-border/50 focus:border-primary outline-none transition-colors" placeholder={isId ? "John Doe" : "John Doe"} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{isId ? "Email" : "Email Address"}</label>
          <input required type="email" className="w-full h-12 px-4 rounded-lg bg-muted/30 border border-border/50 focus:border-primary outline-none transition-colors" placeholder="john@example.com" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{isId ? "Tautan Portofolio / LinkedIn / GitHub" : "Portfolio / LinkedIn / GitHub URL"}</label>
        <input required type="url" className="w-full h-12 px-4 rounded-lg bg-muted/30 border border-border/50 focus:border-primary outline-none transition-colors" placeholder="https://" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{isId ? "Surat Pengantar (Cover Letter)" : "Cover Letter"}</label>
        <textarea required rows={4} className="w-full p-4 rounded-lg bg-muted/30 border border-border/50 focus:border-primary outline-none transition-colors resize-none" placeholder={isId ? "Mengapa Anda cocok untuk posisi ini?" : "Why are you a good fit for this role?"}></textarea>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{isId ? "Unggah CV / Resume (PDF)" : "Upload CV / Resume (PDF)"}</label>
        <div className="border-2 border-dashed border-border/50 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/10 relative">
          <input type="file" required accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 pointer-events-none">
            <span className="text-primary font-bold">+</span>
          </div>
          <span className="text-sm text-muted-foreground pointer-events-none">{isId ? "Klik untuk memilih file" : "Click to select a file"}</span>
        </div>
      </div>
      <Button disabled={isSubmitting} type="submit" className="w-full h-12 text-base font-semibold shadow-lg bg-primary text-primary-foreground hover:scale-[1.02] transition-transform">
        {isSubmitting 
          ? (isId ? "Mengirim..." : "Submitting...") 
          : (isId ? "Kirim Lamaran" : "Submit Application")
        }
      </Button>
    </form>
  );
}
