import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SolutionForm } from '../_components/solution-form';

export default function NewSolutionPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/solutions" className="p-2 -ml-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-heading font-bold mb-1">Add New Solution</h1>
          <p className="text-muted-foreground text-sm">Create a new business solution.</p>
        </div>
      </div>

      <div className="bg-background border border-border/50 rounded-xl shadow-sm p-6 md:p-8">
        <SolutionForm />
      </div>
    </div>
  );
}
