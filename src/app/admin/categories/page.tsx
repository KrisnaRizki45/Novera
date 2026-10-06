import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminCategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-heading font-bold mb-1">Categories</h1>
          <p className="text-muted-foreground text-sm">Manage global content categories.</p>
        </div>
        <Link href="/admin/categories/new">
          <Button className="h-10">
            <Plus className="w-4 h-4 mr-2" /> New Category
          </Button>
        </Link>
      </div>
      <div className="bg-background border border-border/50 rounded-xl shadow-sm p-12 text-center">
        <h3 className="text-lg font-medium mb-2">Categories module under construction</h3>
        <p className="text-muted-foreground">The Category database schema is currently being finalized.</p>
      </div>
    </div>
  );
}
