'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitLead(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  details: string;
}) {
  const supabase = createClient()

  const { error } = await supabase
    .from('leads')
    .insert([{
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      service: data.service,
      details: data.details,
      status: 'New'
    }])

  if (error) {
    console.error('Error submitting lead:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
