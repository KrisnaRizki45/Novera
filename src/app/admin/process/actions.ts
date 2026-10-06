'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProcessStep(data: any) {
  const supabase = createClient()
  const { error } = await supabase.from('process_steps').insert(data)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/process')
  revalidatePath('/process')
  return { success: true }
}

export async function updateProcessStep(id: string, data: any) {
  const supabase = createClient()
  const { error } = await supabase.from('process_steps').update(data).eq('id', id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/process')
  revalidatePath('/process')
  return { success: true }
}
