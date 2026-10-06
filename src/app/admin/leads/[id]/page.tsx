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
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            {lead.inquiry_type === 'Career' ? 'Application Details & Attachments' : 'Project Details'}
          </h3>
          
          {lead.inquiry_type === 'Career' && (lead.resume_url || lead.portfolio_url || lead.cover_letter) ? (
            <div className="space-y-6">
              {(lead.resume_url || lead.portfolio_url) && (
                <div className="flex flex-wrap gap-4">
                  {lead.resume_url && (
                    <a href={lead.resume_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                        View & Download CV
                      </Button>
                    </a>
                  )}
                  {lead.portfolio_url && (
                    <a href={lead.portfolio_url.startsWith('http') ? lead.portfolio_url : `https://${lead.portfolio_url}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                        Portfolio / LinkedIn
                      </Button>
                    </a>
                  )}
                </div>
              )}
              
              {lead.cover_letter && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Cover Letter</h4>
                  <div className="bg-muted/30 rounded-lg p-5 text-sm leading-relaxed whitespace-pre-wrap border border-border/50 text-foreground">
                    {lead.cover_letter}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-5 text-sm leading-relaxed whitespace-pre-wrap border border-border/50 text-foreground">
              {lead.details ? (
                lead.details.split(/(https?:\/\/[^\s]+)/g).map((part: string, i: number) => 
                  part.match(/(https?:\/\/[^\s]+)/) ? (
                    <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium break-all inline-flex items-center gap-1">
                      {part}
                    </a>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )
              ) : '-'}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-border/50">
          <LeadActionsClient id={lead.id} currentStatus={lead.status} />
        </div>
      </div>
    </div>
  );
}
