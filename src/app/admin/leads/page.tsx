import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const supabase = createClient();
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-heading font-bold mb-1">Leads & Inquiries</h1>
          <p className="text-muted-foreground text-sm">Manage incoming project inquiries from the Start a Project form.</p>
        </div>
      </div>

      <div className="bg-background border border-border/50 rounded-xl shadow-sm overflow-hidden">
        {error ? (
          <div className="p-6 text-center text-destructive">Failed to load leads: {error.message}</div>
        ) : !leads || leads.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <h3 className="text-lg font-medium mb-1">No inquiries yet</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/20 uppercase border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{lead.first_name} {lead.last_name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${lead.inquiry_type === 'Career' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {lead.inquiry_type || 'Project'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{lead.email}</td>
                    <td className="px-6 py-4 text-muted-foreground">{lead.service}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/leads/${lead.id}`}>
                        <Button variant="outline" size="sm">View Detail</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
