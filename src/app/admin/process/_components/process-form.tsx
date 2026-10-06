"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createProcessStep, updateProcessStep } from '../actions'

export function ProcessForm({ initialData }: { initialData?: any }) {
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
      description_en: formData.get('description_en'),
      description_id: formData.get('description_id'),
      output_en: formData.get('output_en'),
      output_id: formData.get('output_id'),
      is_active: formData.get('is_active') === 'on',
      display_order: parseInt(formData.get('display_order') as string || '0', 10),
    }

    try {
      const res = initialData?.id 
        ? await updateProcessStep(initialData.id, data)
        : await createProcessStep(data)
        
      if (res.success) {
        toast.success(initialData?.id ? "Process updated" : "Process created")
        router.push('/admin/process')
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
            <label className="text-sm font-medium">Step Title (EN)</label>
            <input name="title_en" defaultValue={initialData?.title_en || ''} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Step Title (ID)</label>
            <input name="title_id" defaultValue={initialData?.title_id || ''} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Slug</label>
            <input name="slug" defaultValue={initialData?.slug || ''} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Description (EN)</label>
            <textarea name="description_en" defaultValue={initialData?.description_en || ''} rows={3} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Description (ID)</label>
            <textarea name="description_id" defaultValue={initialData?.description_id || ''} rows={3} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Expected Output (EN)</label>
          <input name="output_en" defaultValue={initialData?.output_en || ''} className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
        </div>
        <div>
          <label className="text-sm font-medium">Expected Output (ID)</label>
          <input name="output_id" defaultValue={initialData?.output_id || ''} className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
        </div>
      </div>

      <div className="flex items-center gap-6 pt-4 border-t border-border/50">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_active" defaultChecked={initialData?.is_active ?? true} className="w-4 h-4 rounded border-border text-primary" />
          <span className="text-sm font-medium">Active</span>
        </label>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Step Order</label>
          <input type="number" name="display_order" defaultValue={initialData?.display_order || '0'} className="w-20 h-10 px-3 rounded-md border border-border/50 bg-background" />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <Button type="button" variant="outline" onClick={() => router.push('/admin/process')}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Process Step'}
        </Button>
      </div>
    </form>
  )
}
