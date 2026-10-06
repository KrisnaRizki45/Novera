"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createInsight, updateInsight } from '../actions'

export function InsightForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    const data = {
      title_en: formData.get('title_en'),
      title_id: formData.get('title_id'),
      slug: formData.get('slug'),
      category: formData.get('category'),
      author: formData.get('author'),
      content_en: formData.get('content_en'),
      content_id: formData.get('content_id'),
      is_active: formData.get('is_active') === 'on',
      published_at: formData.get('is_active') === 'on' ? new Date().toISOString() : null,
    }

    try {
      const res = initialData?.id 
        ? await updateInsight(initialData.id, data)
        : await createInsight(data)
        
      if (res.success) {
        toast.success(initialData?.id ? "Insight updated" : "Insight created")
        router.push('/admin/insights')
        router.refresh()
      } else {
        toast.error("Failed to save", { description: res.error })
        setIsLoading(false)
      }
    } catch (err: any) {
      toast.error("Error", { description: err.message })
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title (EN)</label>
            <input name="title_en" defaultValue={initialData?.title_en || ''} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Title (ID)</label>
            <input name="title_id" defaultValue={initialData?.title_id || ''} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Slug</label>
            <input name="slug" defaultValue={initialData?.slug || ''} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Category</label>
            <input name="category" defaultValue={initialData?.category || ''} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" placeholder="e.g. Artificial Intelligence" />
          </div>
          <div>
            <label className="text-sm font-medium">Author</label>
            <input name="author" defaultValue={initialData?.author || ''} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" placeholder="e.g. Novera Research" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Content (EN) [Supports Markdown / Plain Text]</label>
          <textarea name="content_en" defaultValue={initialData?.content_en || ''} rows={10} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
        </div>
        <div>
          <label className="text-sm font-medium">Content (ID) [Supports Markdown / Plain Text]</label>
          <textarea name="content_id" defaultValue={initialData?.content_id || ''} rows={10} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
        </div>
      </div>

      <div className="flex items-center gap-6 pt-4 border-t border-border/50">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_active" defaultChecked={initialData?.is_active ?? true} className="w-4 h-4 rounded border-border text-primary" />
          <span className="text-sm font-medium">Published</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <Button type="button" variant="outline" onClick={() => router.push('/admin/insights')}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Article'}
        </Button>
      </div>
    </form>
  )
}
