"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Mail, Info } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Gagal Masuk", {
          description: error.message || "Email atau password salah."
        });
        setIsLoading(false);
        return;
      }

      toast.success("Login Berhasil", {
        description: "Selamat datang di Admin Console NOVERA."
      });
      
      router.push('/admin');
      router.refresh(); // Refresh the router to apply middleware redirects properly
    } catch (error: any) {
      toast.error("Terjadi Kesalahan", {
        description: "Gagal memproses permintaan Anda."
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Website
        </Link>
        
        <div className="bg-background border border-border/50 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 pb-6 text-center border-b border-border/50 bg-muted/10">
            <h1 className="text-xl font-heading font-bold mb-2">Admin Console</h1>
            <p className="text-muted-foreground text-sm">Masuk untuk mengelola konten website.</p>
          </div>
          
          <div className="p-8">

            
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-background border border-border/50 focus:border-primary outline-none transition-colors" 
                    placeholder="email@perusahaan.com" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <label className="text-sm font-medium text-foreground">Password</label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-background border border-border/50 focus:border-primary outline-none transition-colors" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full h-11 font-medium mt-2" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
