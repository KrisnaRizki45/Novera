'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { updateSettings } from '../actions'

export function SettingsForm({ settingsMap }: { settingsMap: Record<string, string> }) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await updateSettings(formData)
      if (res.success) {
        toast.success("Settings saved successfully")
      } else {
        toast.error("Failed to save settings", { description: res.error })
      }
    } catch (err: any) {
      toast.error("An error occurred", { description: err.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Navigation Sidebar */}
      <div className="md:col-span-1 space-y-1">
        <Button variant={activeTab === 'general' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('general')}>General & SEO</Button>
        <Button variant={activeTab === 'contact' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('contact')}>Contact & Social</Button>
      </div>

      {/* Content Area */}
      <div className="md:col-span-3 space-y-6">
        <form onSubmit={handleSubmit} className="bg-background border border-border/50 rounded-xl shadow-sm p-6 md:p-8 space-y-8">
          
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-bold mb-4">General & SEO Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="site_name">Website Name</Label>
                  <Input id="site_name" name="site_name" defaultValue={settingsMap.site_name || ''} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input id="company_name" name="company_name" defaultValue={settingsMap.company_name || ''} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo_title">Default SEO Title</Label>
                <Input id="seo_title" name="seo_title" defaultValue={settingsMap.seo_title || ''} />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seo_description_en">Default SEO Description (EN)</Label>
                  <textarea id="seo_description_en" name="seo_description_en" rows={3} className="w-full p-3 rounded-md border border-border/50 bg-background text-sm" defaultValue={settingsMap.seo_description_en || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo_description_id">Default SEO Description (ID)</Label>
                  <textarea id="seo_description_id" name="seo_description_id" rows={3} className="w-full p-3 rounded-md border border-border/50 bg-background text-sm" defaultValue={settingsMap.seo_description_id || ''} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cta_start_project_url">Default Start Project URL</Label>
                <Input id="cta_start_project_url" name="cta_start_project_url" defaultValue={settingsMap.cta_start_project_url || ''} />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-bold mb-4">Contact & Social Media</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Support Email</Label>
                  <Input id="contact_email" name="contact_email" type="email" defaultValue={settingsMap.contact_email || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input id="contact_phone" name="contact_phone" defaultValue={settingsMap.contact_phone || ''} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_whatsapp">WhatsApp Number (inc. Country Code, no +)</Label>
                <Input id="contact_whatsapp" name="contact_whatsapp" defaultValue={settingsMap.contact_whatsapp || ''} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_linkedin">LinkedIn URL</Label>
                <Input id="social_linkedin" name="social_linkedin" type="url" defaultValue={settingsMap.social_linkedin || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_instagram">Instagram URL</Label>
                <Input id="social_instagram" name="social_instagram" type="url" defaultValue={settingsMap.social_instagram || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_github">GitHub URL</Label>
                <Input id="social_github" name="social_github" type="url" defaultValue={settingsMap.social_github || ''} />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6 border-t border-border/50">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save All Settings'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
