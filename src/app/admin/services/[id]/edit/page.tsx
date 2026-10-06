import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { ServiceForm } from '../../_components/service-form';
import { notFound } from 'next/navigation';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = createClient();
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/services" className="p-2 -ml-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-heading font-bold mb-1">Edit Service</h1>
          <p className="text-muted-foreground text-sm">Update {service.title_en}</p>
        </div>
      </div>

      <div className="bg-background border border-border/50 rounded-xl shadow-sm p-6 md:p-8">
        <ServiceForm initialData={service} />
      </div>
    </div>
  );
}
