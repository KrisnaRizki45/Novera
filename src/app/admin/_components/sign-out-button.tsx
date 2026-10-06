"use client"

import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function SignOutButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error("Gagal Logout", { description: error.message });
      setIsLoggingOut(false);
      return;
    }

    toast.success("Berhasil Logout", { description: "Anda telah keluar dari sesi admin." });
    setOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Logout</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin keluar dari Admin Console? Anda harus login kembali untuk mengelola konten.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoggingOut}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleSignOut} disabled={isLoggingOut}>
            {isLoggingOut ? "Keluar..." : "Ya, Keluar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
