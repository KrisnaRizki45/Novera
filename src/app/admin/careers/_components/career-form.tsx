"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createCareer, updateCareer } from '../actions'

export function CareerForm({ initialData }: { initialData?: any }) {
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
      department: formData.get('department'),
      employment_type: formData.get('employment_type'),
      location: formData.get('location'),
      work_mode: formData.get('work_mode'),
      experience_level: formData.get('experience_level'),
      description_en: formData.get('description_en'),
      description_id: formData.get('description_id'),
      responsibilities_en: JSON.stringify(parseLines(formData.get('responsibilities_en') as string)),
      responsibilities_id: JSON.stringify(parseLines(formData.get('responsibilities_id') as string)),
      requirements_en: JSON.stringify(parseLines(formData.get('requirements_en') as string)),
      requirements_id: JSON.stringify(parseLines(formData.get('requirements_id') as string)),
      technologies: JSON.stringify(parseLines(formData.get('technologies') as string)),
      benefits_en: JSON.stringify(parseLines(formData.get('benefits_en') as string)),
      benefits_id: JSON.stringify(parseLines(formData.get('benefits_id') as string)),
      application_url: formData.get('application_url'),
      is_active: formData.get('is_active') === 'on',
      published_at: formData.get('is_active') === 'on' ? new Date().toISOString() : null,
    }

    try {
      const res = initialData?.id 
        ? await updateCareer(initialData.id, data)
        : await createCareer(data)
        
      if (res.success) {
        toast.success(initialData?.id ? "Career updated" : "Career created")
        router.push('/admin/careers')
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
            <label className="text-sm font-medium">Job Title (EN)</label>
            <input name="title_en" defaultValue={initialData?.title_en || ''} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Job Title (ID)</label>
            <input name="title_id" defaultValue={initialData?.title_id || ''} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
          </div>
          <div>
            <label className="text-sm font-medium">Slug</label>
            <input name="slug" defaultValue={initialData?.slug || ''} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Department</label>
            <select name="department" defaultValue={initialData?.department || 'Engineering'} className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background">
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="Sales & Marketing">Sales & Marketing</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <select name="employment_type" defaultValue={initialData?.employment_type || 'Full-time'} className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Work Mode</label>
              <select name="work_mode" defaultValue={initialData?.work_mode || 'Remote'} className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background">
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Location</label>
              <input name="location" defaultValue={initialData?.location || 'Jakarta, Indonesia'} required className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" />
            </div>
            <div>
              <label className="text-sm font-medium">Experience Level</label>
              <select name="experience_level" defaultValue={initialData?.experience_level || 'Mid-Level'} className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background">
                <option value="Junior">Junior</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Description (EN)</label>
          <textarea name="description_en" defaultValue={initialData?.description_en || ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
        </div>
        <div>
          <label className="text-sm font-medium">Description (ID)</label>
          <textarea name="description_id" defaultValue={initialData?.description_id || ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Responsibilities (EN) [1 per line]</label>
            <textarea name="responsibilities_en" defaultValue={initialData?.responsibilities_en ? (Array.isArray(initialData.responsibilities_en) ? initialData.responsibilities_en : JSON.parse(initialData.responsibilities_en || '[]')).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Requirements (EN) [1 per line]</label>
            <textarea name="requirements_en" defaultValue={initialData?.requirements_en ? (Array.isArray(initialData.requirements_en) ? initialData.requirements_en : JSON.parse(initialData.requirements_en || '[]')).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background text-sm" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Responsibilities (ID) [1 per line]</label>
            <textarea name="responsibilities_id" defaultValue={initialData?.responsibilities_id ? (Array.isArray(initialData.responsibilities_id) ? initialData.responsibilities_id : JSON.parse(initialData.responsibilities_id || '[]')).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Requirements (ID) [1 per line]</label>
            <textarea name="requirements_id" defaultValue={initialData?.requirements_id ? (Array.isArray(initialData.requirements_id) ? initialData.requirements_id : JSON.parse(initialData.requirements_id || '[]')).join('\n') : ''} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background text-sm" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Benefits (EN) [1 per line]</label>
            <textarea name="benefits_en" defaultValue={initialData?.benefits_en ? (Array.isArray(initialData.benefits_en) ? initialData.benefits_en : JSON.parse(initialData.benefits_en || '[]')).join('\n') : 'Work Equipment (MacBook)\nHealth Insurance\nLearning Budget'} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Technologies / Tools [1 per line]</label>
            <textarea name="technologies" defaultValue={initialData?.technologies ? (Array.isArray(initialData.technologies) ? initialData.technologies : JSON.parse(initialData.technologies || '[]')).join('\n') : ''} rows={3} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background text-sm" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Benefits (ID) [1 per line]</label>
            <textarea name="benefits_id" defaultValue={initialData?.benefits_id ? (Array.isArray(initialData.benefits_id) ? initialData.benefits_id : JSON.parse(initialData.benefits_id || '[]')).join('\n') : 'Peralatan Kerja (MacBook)\nAsuransi Kesehatan\nAnggaran Pembelajaran'} rows={4} className="w-full mt-1 p-3 rounded-md border border-border/50 bg-background text-sm" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Application URL (Google Form / External Link)</label>
          <input name="application_url" type="url" defaultValue={initialData?.application_url || ''} className="w-full mt-1 h-10 px-3 rounded-md border border-border/50 bg-background" placeholder="https://forms.gle/..." />
        </div>
      </div>

      <div className="flex items-center gap-6 pt-4 border-t border-border/50">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_active" defaultChecked={initialData?.is_active ?? true} className="w-4 h-4 rounded border-border text-primary" />
          <span className="text-sm font-medium">Open & Published</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <Button type="button" variant="outline" onClick={() => router.push('/admin/careers')}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Job Position'}
        </Button>
      </div>
    </form>
  )
}
