'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteLead(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id)
    
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/leads')
  return { success: true }
}

export async function updateLeadStatus(id: string, status: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)
    
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/leads')
  return { success: true }
}
