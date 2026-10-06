import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LeadActionsClient } from './actions-client';

export const dynamic = 'force-dynamic';

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params;
  const supabase = createClient();
  const { data: lead } = await supabase
    .from('leads')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (!lead) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/leads">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-heading font-bold mb-1">Lead Details</h1>
          <p className="text-muted-foreground text-sm">View and manage incoming inquiry.</p>
        </div>
      </div>

      <div className="bg-background border border-border/50 rounded-xl shadow-sm p-6 md:p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
            <p className="font-semibold">{lead.first_name} {lead.last_name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Inquiry Type</h3>
            <p className="font-semibold">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${lead.inquiry_type === 'Career' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                {lead.inquiry_type || 'Project'}
              </span>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h3>
            <p className="font-semibold"><a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a></p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
            <p className="font-semibold"><a href={`tel:${lead.phone}`} className="text-primary hover:underline">{lead.phone || '-'}</a></p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Requested Service</h3>
            <p className="font-semibold capitalize">{lead.service}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Date Submitted</h3>
            <p className="font-semibold">{new Date(lead.created_at).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Status</h3>
            <p className="font-semibold">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                {lead.status}
              </span>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">{lead.inquiry_type === 'Career' ? 'Application Details & Cover Letter' : 'Project Details'}</h3>
          <div className="bg-muted/30 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap border border-border/50">
            {lead.details}
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <LeadActionsClient id={lead.id} currentStatus={lead.status} />
        </div>
      </div>
    </div>
  );
}
