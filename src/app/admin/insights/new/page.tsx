import React from 'react'
import { InsightForm } from '../_components/insight-form'

export default function NewInsightPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-heading font-bold mb-1">New Article</h1>
        <p className="text-muted-foreground text-sm">Publish a new insight to the blog.</p>
      </div>

      <div className="bg-background border border-border/50 rounded-xl shadow-sm p-6">
        <InsightForm />
      </div>
    </div>
  )
}
