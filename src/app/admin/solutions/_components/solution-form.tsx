"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createSolution, updateSolution } from '../actions'

export function SolutionForm({ initialData }: { initialData?: any }) {
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
      business_problem_en: formData.get('business_problem_en'),
      business_problem_id: formData.get('business_problem_id'),
      solution_approach_en: formData.get('solution_approach_en'),
      solution_approach_id: formData.get('solution_approach_id'),
      benefits_en: JSON.stringify(parseLines(formData.get('benefits_en') as string)),
      benefits_id: JSON.stringify(parseLines(formData.get('benefits_id') as string)),
      is_active: formData.get('is_active') === 'on',
      display_order: parseInt(formData.get('display_order') as string || '0', 10),
    }

    try {
      const res = initialData?.id 
        ? await updateSolution(initialData.id, data)
        : await createSolution(data)
        
      if (res.success) {
        toast.success(initialData?.id ? "Solution updated" : "Solution created")
        router.push('/admin/solutions')
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Business Problem (EN)</label>
            <textarea name="business_problem_en" defaultValue={initialData?.business_problem_en || ''} rows={3} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Business Problem (ID)</label>
            <textarea name="business_problem_id" defaultValue={initialData?.business_problem_id || ''} rows={3} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Solution Approach (EN)</label>
            <textarea name="solution_approach_en" defaultValue={initialData?.solution_approach_en || ''} rows={3} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Solution Approach (ID)</label>
            <textarea name="solution_approach_id" defaultValue={initialData?.solution_approach_id || ''} rows={3} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Business Value / Benefits (EN) [1 per line]</label>
            <textarea name="benefits_en" defaultValue={initialData?.benefits_en ? (Array.isArray(initialData.benefits_en) ? initialData.benefits_en : JSON.parse(initialData.benefits_en || '[]')).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Business Value / Benefits (ID) [1 per line]</label>
            <textarea name="benefits_id" defaultValue={initialData?.benefits_id ? (Array.isArray(initialData.benefits_id) ? initialData.benefits_id : JSON.parse(initialData.benefits_id || '[]')).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background text-sm" />
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
        <Button type="button" variant="outline" onClick={() => router.push('/admin/solutions')}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Solution'}
        </Button>
      </div>
    </form>
  )
}
