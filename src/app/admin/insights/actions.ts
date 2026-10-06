'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createInsight(data: any) {
  const supabase = createClient()
  const { error } = await supabase.from('insights').insert(data)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/insights')
  revalidatePath('/insights')
  return { success: true }
}

export async function updateInsight(id: string, data: any) {
  const supabase = createClient()
  const { error } = await supabase.from('insights').update(data).eq('id', id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/insights')
  revalidatePath('/insights')
  return { success: true }
}

export async function deleteInsight(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('insights').delete().eq('id', id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/insights')
  revalidatePath('/insights')
  return { success: true }
}
