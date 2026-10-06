import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { ProcessForm } from '../../_components/process-form';
import { notFound } from 'next/navigation';

export default async function EditProcessPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: step } = await supabase
    .from('process_steps')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!step) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/process" className="p-2 -ml-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-heading font-bold mb-1">Edit Process Step</h1>
          <p className="text-muted-foreground text-sm">Update {step.title_en}</p>
        </div>
      </div>

      <div className="bg-background border border-border/50 rounded-xl shadow-sm p-6 md:p-8">
        <ProcessForm initialData={step} />
      </div>
    </div>
  );
}
