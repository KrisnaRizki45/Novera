"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { submitCareerApplication } from "../submit-action";
import { FileUp, CheckCircle2, X } from "lucide-react";

type JobOption = {
  slug: string;
  title: string;
};

export function ApplyForm({ isId, jobs = [], defaultJobSlug }: { isId: boolean, jobs?: JobOption[], defaultJobSlug?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedJob, setSelectedJob] = useState(defaultJobSlug || (jobs.length > 0 ? jobs[0].slug : "general"));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (PDF only)
    if (file.type !== "application/pdf") {
      toast.warning(isId ? "Format File Tidak Didukung" : "Unsupported File Format", {
        description: isId ? "Mohon unggah CV dalam format PDF." : "Please upload your CV in PDF format."
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      setSelectedFile(null);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(isId ? "File Terlalu Besar" : "File Too Large", {
        description: isId ? "Ukuran maksimal file CV adalah 5MB." : "Maximum CV file size is 5MB."
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    toast.success(isId ? "File Berhasil Dilampirkan" : "File Attached Successfully", {
      description: file.name
    });
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.warning(isId ? "CV Belum Diunggah" : "CV Not Uploaded", {
        description: isId ? "Mohon lampirkan CV Anda (PDF)." : "Please attach your CV (PDF)."
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      formData.append('jobSlug', selectedJob);
      formData.append('resume', selectedFile);
      
      const result = await submitCareerApplication(formData);
      
      if (result.success) {
        toast.success(
          isId ? "Lamaran Berhasil Dikirim!" : "Application Submitted Successfully!", 
          {
            description: isId ? "Tim rekrutmen kami akan segera menghubungi Anda." : "Our recruitment team will contact you shortly."
          }
        );
        formElement.reset();
        setSelectedJob(defaultJobSlug || (jobs.length > 0 ? jobs[0].slug : "general"));
        setSelectedFile(null);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(
        isId ? "Gagal Mengirim Lamaran" : "Failed to Submit Application",
        {
          description: isId ? "Terjadi kesalahan pada sistem saat mengunggah lamaran Anda. Silakan coba lagi." : "A system error occurred while uploading your application. Please try again."
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
          <input name="fullName" required type="text" className="w-full h-12 px-4 rounded-lg bg-muted/30 border border-border/50 focus:border-primary outline-none transition-colors" placeholder={isId ? "John Doe" : "John Doe"} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{isId ? "Email" : "Email Address"}</label>
          <input name="email" required type="email" className="w-full h-12 px-4 rounded-lg bg-muted/30 border border-border/50 focus:border-primary outline-none transition-colors" placeholder="john@example.com" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{isId ? "Tautan Portofolio / LinkedIn / GitHub" : "Portfolio / LinkedIn / GitHub URL"}</label>
        <input name="portfolioUrl" required type="url" className="w-full h-12 px-4 rounded-lg bg-muted/30 border border-border/50 focus:border-primary outline-none transition-colors" placeholder="https://" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{isId ? "Surat Pengantar (Cover Letter)" : "Cover Letter"}</label>
        <textarea name="coverLetter" required rows={4} className="w-full p-4 rounded-lg bg-muted/30 border border-border/50 focus:border-primary outline-none transition-colors resize-none" placeholder={isId ? "Mengapa Anda cocok untuk posisi ini?" : "Why are you a good fit for this role?"}></textarea>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{isId ? "Unggah CV / Resume (PDF Max 5MB)" : "Upload CV / Resume (PDF Max 5MB)"}</label>
        
        {!selectedFile ? (
          <div className="border-2 border-dashed border-border/50 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/10 relative group">
            <input 
              ref={fileInputRef}
              type="file" 
              accept="application/pdf" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
              <FileUp className="w-6 h-6 text-primary" />
            </div>
            <span className="font-medium text-foreground mb-1">{isId ? "Klik untuk mengunggah CV" : "Click to upload your CV"}</span>
            <span className="text-xs text-muted-foreground">{isId ? "Hanya format PDF, maksimal 5MB" : "PDF format only, maximum 5MB"}</span>
          </div>
        ) : (
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium text-sm truncate">{selectedFile.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <a 
                    href={URL.createObjectURL(selectedFile)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-primary hover:underline flex items-center"
                  >
                    {isId ? "Lihat Detail" : "View File"}
                  </a>
                </div>
              </div>
            </div>
            <button 
              type="button" 
              onClick={removeFile}
              className="p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-full transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <Button disabled={isSubmitting} type="submit" className="w-full h-12 text-base font-semibold shadow-lg bg-primary text-primary-foreground hover:scale-[1.02] transition-transform mt-4">
        {isSubmitting 
          ? (isId ? "Mengunggah & Mengirim..." : "Uploading & Submitting...") 
          : (isId ? "Kirim Lamaran & CV" : "Submit Application & CV")
        }
      </Button>
    </form>
  );
}
