import React from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-3 text-muted-foreground animate-pulse">
        <Loader2 className="w-5 h-5 text-primary/60 animate-spin" />
        <span className="text-sm font-medium tracking-wider uppercase">loading..</span>
      </div>
    </div>
  );
}
