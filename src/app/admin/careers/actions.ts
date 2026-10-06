'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createCareer(data: any) {
  const supabase = createClient()
  const { error } = await supabase.from('careers').insert(data)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/careers')
  revalidatePath('/careers')
  return { success: true }
}

export async function updateCareer(id: string, data: any) {
  const supabase = createClient()
  const { error } = await supabase.from('careers').update(data).eq('id', id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/careers')
  revalidatePath('/careers')
  return { success: true }
}

export async function deleteCareer(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('careers').delete().eq('id', id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/careers')
  revalidatePath('/careers')
  return { success: true }
}
