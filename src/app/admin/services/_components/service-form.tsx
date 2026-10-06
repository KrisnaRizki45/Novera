"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createService, updateService } from '../actions'

export function ServiceForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const parseLines = (text: string | null) => text ? text.split('\n').map(l => l.trim()).filter(l => l) : [];
    
    const data = {
      title_en: formData.get('title_en'),
      title_id: formData.get('title_id'),
      slug: formData.get('slug'),
      short_description_en: formData.get('short_description_en'),
      short_description_id: formData.get('short_description_id'),
      description_en: formData.get('description_en'),
      description_id: formData.get('description_id'),
      features_en: JSON.stringify(parseLines(formData.get('features_en') as string)),
      features_id: JSON.stringify(parseLines(formData.get('features_id') as string)),
      use_cases_en: JSON.stringify(parseLines(formData.get('use_cases_en') as string)),
      use_cases_id: JSON.stringify(parseLines(formData.get('use_cases_id') as string)),
      business_value_en: JSON.stringify(parseLines(formData.get('business_value_en') as string)),
      business_value_id: JSON.stringify(parseLines(formData.get('business_value_id') as string)),
      is_active: formData.get('is_active') === 'on',
      display_order: parseInt(formData.get('display_order') as string || '0', 10),
    }

    try {
      const res = initialData?.id 
        ? await updateService(initialData.id, data)
        : await createService(data)
        
      if (res.success) {
        toast.success(initialData?.id ? "Service updated" : "Service created")
        router.push('/admin/services')
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
            <label className="text-sm font-medium">Short Description (EN)</label>
            <textarea name="short_description_en" defaultValue={initialData?.short_description_en || ''} rows={3} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Short Description (ID)</label>
            <textarea name="short_description_id" defaultValue={initialData?.short_description_id || ''} rows={3} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Full Description (EN)</label>
          <textarea name="description_en" defaultValue={initialData?.description_en || ''} rows={5} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
        </div>
        <div>
          <label className="text-sm font-medium">Full Description (ID)</label>
          <textarea name="description_id" defaultValue={initialData?.description_id || ''} rows={5} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Features (EN) - 1 per line</label>
            <textarea name="features_en" defaultValue={initialData?.features_en ? JSON.parse(initialData.features_en).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Use Cases (EN) - 1 per line</label>
            <textarea name="use_cases_en" defaultValue={initialData?.use_cases_en ? JSON.parse(initialData.use_cases_en).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Business Values (EN) - 1 per line</label>
            <textarea name="business_value_en" defaultValue={initialData?.business_value_en ? JSON.parse(initialData.business_value_en).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Features (ID) - 1 per line</label>
            <textarea name="features_id" defaultValue={initialData?.features_id ? JSON.parse(initialData.features_id).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Use Cases (ID) - 1 per line</label>
            <textarea name="use_cases_id" defaultValue={initialData?.use_cases_id ? JSON.parse(initialData.use_cases_id).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Business Values (ID) - 1 per line</label>
            <textarea name="business_value_id" defaultValue={initialData?.business_value_id ? JSON.parse(initialData.business_value_id).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 pt-4 border-t border-border/50">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_active" defaultChecked={initialData?.is_active ?? true} className="w-4 h-4 rounded border-border text-primary" />
          <span className="text-sm font-medium">Active (Published)</span>
        </label>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Display Order</label>
          <input type="number" name="display_order" defaultValue={initialData?.display_order || '0'} className="w-20 h-10 px-3 rounded-md border border-border/50 bg-background" />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <Button type="button" variant="outline" onClick={() => router.push('/admin/services')}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Service'}
        </Button>
      </div>
    </form>
  )
}
