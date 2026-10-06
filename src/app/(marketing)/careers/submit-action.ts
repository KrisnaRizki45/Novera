'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const applySchema = z.object({
  jobSlug: z.string(),
  fullName: z.string().min(2),
  email: z.string().email(),
  portfolioUrl: z.string().optional().or(z.literal('')),
  coverLetter: z.string().optional().or(z.literal(''))
})

export async function submitCareerApplication(formData: FormData) {
  try {
    const rawData = {
      jobSlug: formData.get('jobSlug') as string,
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      portfolioUrl: formData.get('portfolioUrl') as string,
      coverLetter: formData.get('coverLetter') as string,
    }

    const supabase = createClient()
    
    const file = formData.get('resume') as File | null;
    let fileUrl = null;
    
    if (file && file.name) {
      // Enforce 5MB limit on the server
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Ukuran CV melebihi batas 5MB.");
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `cvs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('applications')
        .upload(filePath, file, { contentType: file.type });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw new Error("Gagal mengunggah file CV. Coba lagi.");
      }
      
      const { data: { publicUrl } } = supabase.storage.from('applications').getPublicUrl(filePath);
      fileUrl = publicUrl;
    }

    const validatedData = applySchema.parse(rawData)
    
    // Split full name
    const nameParts = validatedData.fullName.split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || '-'

    const { error } = await supabase.from('leads').insert({
      first_name: firstName,
      last_name: lastName,
      email: validatedData.email,
      phone: '-', // Optional for careers
      service: validatedData.jobSlug, // Job slug as service
      details: 'Career Application', // Fallback for old views
      resume_url: fileUrl,
      portfolio_url: validatedData.portfolioUrl,
      cover_letter: validatedData.coverLetter,
      inquiry_type: 'Career',
      status: 'New'
    })

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error: error.message || 'Failed to insert to database' }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Validation or Server Error:', error)
    return { success: false, error: error?.message || 'Invalid input' }
  }
}
