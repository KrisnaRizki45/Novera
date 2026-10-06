"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  details: z.string().min(20, "Please provide more details about your project"),
});

export function ProjectFormClient({ isId }: { isId: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const { submitLead } = await import('./actions');
      const res = await submitLead(data);
      
      if (res.success) {
        setIsSuccess(true);
        toast.success(
          isId ? "Inkuiri Terkirim!" : "Inquiry Submitted!",
          {
            description: isId ? "Pakar teknis kami akan segera menghubungi Anda." : "Our technical experts will get back to you shortly."
          }
        );
      } else {
        throw new Error(res.error || "Failed to submit");
      }
    } catch (err: any) {
      toast.error(
        isId ? "Gagal mengirim inkuiri" : "Failed to submit inquiry",
        {
          description: err.message || "Please try again later."
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="relative bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl p-10 md:p-14 max-w-2xl mx-auto shadow-2xl text-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 mb-8 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
            <div className="relative w-full h-full bg-gradient-to-tr from-primary to-primary/60 rounded-full flex items-center justify-center shadow-lg border-4 border-background">
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          
          <h2 className="text-3xl font-heading font-bold mb-4 tracking-tight">
            {isId ? "Inisiatif yang Hebat!" : "Great Initiative!"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
            {isId 
              ? "Detail proyek Anda telah kami terima dengan aman. Tim pakar teknis NOVERA akan segera meninjau kebutuhan Anda dan menjadwalkan sesi konsultasi dalam 24 jam ke depan." 
              : "Your project details have been safely received. NOVERA's technical experts will review your requirements and reach out to schedule a discovery call within 24 hours."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button onClick={() => window.location.href = '/'} className="w-full sm:w-auto h-12 px-8 rounded-full shadow-lg hover:shadow-primary/25 transition-all text-sm font-medium">
              {isId ? "Kembali ke Beranda" : "Return to Home"}
            </Button>
            <Button onClick={() => window.location.href = '/portfolio'} variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-full border-border/50 bg-background/50 hover:bg-muted text-sm font-medium">
              {isId ? "Lihat Portofolio Kami" : "View Our Portfolio"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border border-border/50 rounded-2xl p-8 max-w-2xl mx-auto shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">{isId ? "Inkuiri Proyek" : "Project Inquiry"}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{isId ? "Nama Depan" : "First Name"}</label>
            <input {...register("firstName")} className="w-full h-12 rounded-lg border bg-muted/30 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="John" />
            {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{isId ? "Nama Belakang" : "Last Name"}</label>
            <input {...register("lastName")} className="w-full h-12 rounded-lg border bg-muted/30 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Doe" />
            {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{isId ? "Email Kerja" : "Work Email"}</label>
            <input {...register("email")} type="email" className="w-full h-12 rounded-lg border bg-muted/30 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="john@company.com" />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{isId ? "Nomor Telepon / WhatsApp" : "Phone / WhatsApp"}</label>
            <input {...register("phone")} type="tel" className="w-full h-12 rounded-lg border bg-muted/30 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="+62 812 3456 7890" />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{isId ? "Kebutuhan Utama Anda?" : "What do you need?"}</label>
          <select {...register("service")} className="w-full h-12 rounded-lg border bg-muted/30 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all">
            <option value="">{isId ? "-- Pilih Layanan --" : "-- Select a Service --"}</option>
            <option value="custom">Custom Software</option>
            <option value="erp">Business System (ERP/CRM)</option>
            <option value="ai">AI / Automation</option>
            <option value="mobile">Mobile App</option>
          </select>
          {errors.service && <p className="text-xs text-destructive">{errors.service.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{isId ? "Detail Proyek" : "Project Details"}</label>
          <textarea {...register("details")} className="w-full h-32 rounded-lg border bg-muted/30 p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" placeholder={isId ? "Jelaskan secara singkat masalah bisnis yang ingin Anda selesaikan..." : "Briefly describe the business problem you are trying to solve..."}></textarea>
          {errors.details && <p className="text-xs text-destructive">{errors.details.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-md font-bold shadow-lg">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {isId ? "Memproses..." : "Processing..."}
            </>
          ) : (
            isId ? "Kirim Inkuiri" : "Submit Inquiry"
          )}
        </Button>
      </form>
    </div>
  );
}
