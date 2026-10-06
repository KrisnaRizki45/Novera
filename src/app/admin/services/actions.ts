'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createService(data: any) {
  const supabase = createClient()
  const { error } = await supabase.from('services').insert(data)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/services')
  revalidatePath('/services')
  return { success: true }
}

export async function updateService(id: string, data: any) {
  const supabase = createClient()
  const { error } = await supabase.from('services').update(data).eq('id', id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/services')
  revalidatePath('/services')
  return { success: true }
}

export async function deleteService(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('services').delete().eq('id', id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/services')
  revalidatePath('/services')
  return { success: true }
}
