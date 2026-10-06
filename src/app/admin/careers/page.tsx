import React from 'react';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '../_components/delete-button';
import { deleteCareer } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminCareersPage() {
  const supabase = createClient();
  const { data: careers, error } = await supabase
    .from('careers')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-heading font-bold mb-1">Careers</h1>
          <p className="text-muted-foreground text-sm">Manage open job positions.</p>
        </div>
        <Link href="/admin/careers/new">
          <Button className="h-10">
            <Plus className="w-4 h-4 mr-2" /> Post Job
          </Button>
        </Link>
      </div>

      <div className="bg-background border border-border/50 rounded-xl shadow-sm overflow-hidden">
        {error ? (
          <div className="p-6 text-center text-destructive">Failed to load careers: {error.message}</div>
        ) : !careers || careers.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <h3 className="text-lg font-medium mb-1">No job positions</h3>
            <Link href="/admin/careers/new"><Button variant="outline">Post Job</Button></Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/20 uppercase border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Position</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {careers.map((job) => (
                  <tr key={job.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{job.title_en}</td>
                    <td className="px-6 py-4 text-muted-foreground">{job.department}</td>
                    <td className="px-6 py-4 text-muted-foreground">{job.location}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${job.is_active ? 'bg-green-100 text-green-800' : 'bg-muted text-muted-foreground'}`}>
                        {job.is_active ? 'Open' : 'Closed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/careers/${job.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Edit className="w-4 h-4" /></Button>
                        </Link>
                        <DeleteButton id={job.id} title={job.title_en} deleteAction={deleteCareer} />
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
