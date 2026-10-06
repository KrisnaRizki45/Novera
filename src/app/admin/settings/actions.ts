'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateSettings(formData: FormData) {
  const supabase = createClient()
  
  const updates = []
  
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string' && key !== '$ACTION_ID_0') { // Ignore nextjs action ID
      updates.push({ key, value })
    }
  }

  // Update in DB
  for (const update of updates) {
    const { error } = await supabase
      .from('site_settings')
      .update({ value: update.value, updated_at: new Date().toISOString() })
      .eq('key', update.key)
      
    if (error) {
      console.error(`Error updating setting ${update.key}:`, error)
      return { success: false, error: error.message }
    }
  }

  revalidatePath('/', 'layout') // revalidate all paths
  return { success: true }
}
