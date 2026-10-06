import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminPortfolioPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-bold mb-1">Portfolio & Case Studies</h1>
          <p className="text-muted-foreground text-sm">Manage successful client projects.</p>
        </div>
        <Link href="/admin/portfolio/new">
          <Button className="h-10">
            <Plus className="w-4 h-4 mr-2" /> New Case Study
          </Button>
        </Link>
      </div>
      <div className="bg-background border border-border/50 rounded-xl shadow-sm p-12 text-center">
        <h3 className="text-lg font-medium mb-2">Portfolio module under construction</h3>
        <p className="text-muted-foreground">The Portfolio database schema is currently being finalized.</p>
      </div>
    </div>
  );
}
