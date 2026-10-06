import React from 'react';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function AdminProcessPage() {
  const supabase = createClient();
  const { data: steps, error } = await supabase
    .from('process_steps')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-bold mb-1">Working Process</h1>
          <p className="text-muted-foreground text-sm">Manage the steps of your business process.</p>
        </div>
        <Link href="/admin/process/new">
          <Button className="h-10">
            <Plus className="w-4 h-4 mr-2" /> Add Step
          </Button>
        </Link>
      </div>

      <div className="bg-background border border-border/50 rounded-xl shadow-sm overflow-hidden">
        {error ? (
          <div className="p-6 text-center text-destructive">Failed to load process steps: {error.message}</div>
        ) : !steps || steps.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <h3 className="text-lg font-medium mb-1">No process steps found</h3>
            <Link href="/admin/process/new"><Button variant="outline">Add Step</Button></Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/20 uppercase border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Step</th>
                  <th className="px-6 py-4 font-medium">Title (EN)</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {steps.map((step) => (
                  <tr key={step.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-medium text-muted-foreground">Step {step.display_order}</td>
                    <td className="px-6 py-4 font-medium text-foreground">{step.title_en}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${step.is_active ? 'bg-green-100 text-green-800' : 'bg-muted text-muted-foreground'}`}>
                        {step.is_active ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/process/${step.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Edit className="w-4 h-4" /></Button>
                        </Link>
                      </div>
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
