import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '../_components/delete-button';
import { deleteSolution } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminSolutionsPage() {
  const supabase = createClient();
  const { data: solutions, error } = await supabase
    .from('solutions')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-bold mb-1">Solutions</h1>
          <p className="text-muted-foreground text-sm">Manage business solutions offered by NOVERA.</p>
        </div>
        <Link href="/admin/solutions/new">
          <Button className="h-10">
            <Plus className="w-4 h-4 mr-2" /> Add Solution
          </Button>
        </Link>
      </div>

      <div className="bg-background border border-border/50 rounded-xl shadow-sm overflow-hidden">
        {error ? (
          <div className="p-6 text-center text-destructive">
            Failed to load solutions: {error.message}
          </div>
        ) : !solutions || solutions.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-lg font-medium mb-1">No solutions found</h3>
            <p className="text-muted-foreground mb-4">Get started by adding your first solution.</p>
            <Link href="/admin/solutions/new">
              <Button variant="outline">Add Solution</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/20 uppercase border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Title (EN)</th>
                  <th className="px-6 py-4 font-medium">Slug</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {solutions.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{item.title_en}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-muted text-muted-foreground'}`}>
                        {item.is_active ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/solutions/${item.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Edit className="w-4 h-4" /></Button>
                        </Link>
                        <DeleteButton id={item.id} title={item.title_en} deleteAction={deleteSolution} />
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
