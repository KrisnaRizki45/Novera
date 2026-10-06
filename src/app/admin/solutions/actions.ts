'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createSolution(data: any) {
  const supabase = createClient()
  const { error } = await supabase.from('solutions').insert(data)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/solutions')
  revalidatePath('/solutions')
  return { success: true }
}

export async function updateSolution(id: string, data: any) {
  const supabase = createClient()
  const { error } = await supabase.from('solutions').update(data).eq('id', id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/solutions')
  revalidatePath('/solutions')
  return { success: true }
}

export async function deleteSolution(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('solutions').delete().eq('id', id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin/solutions')
  revalidatePath('/solutions')
  return { success: true }
}
