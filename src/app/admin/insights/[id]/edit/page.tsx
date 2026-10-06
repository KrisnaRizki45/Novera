import React from 'react'
import { InsightForm } from '../../_components/insight-form'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditInsightPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const supabase = createClient()
  const { data: insight } = await supabase
    .from('insights')
    .select('*')
    .eq('id', id)
    .single()

  if (!insight) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-heading font-bold mb-1">Edit Article</h1>
        <p className="text-muted-foreground text-sm">Update the selected article.</p>
      </div>

      <div className="bg-background border border-border/50 rounded-xl shadow-sm p-6">
        <InsightForm initialData={insight} />
      </div>
    </div>
  )
}
