'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const applySchema = z.object({
  jobSlug: z.string(),
  fullName: z.string().min(2),
  email: z.string().email(),
  portfolioUrl: z.string().url(),
  coverLetter: z.string().min(10)
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

    const file = formData.get('resume') as File | null;
    let fileInfo = "No CV attached";
    if (file && file.name) {
      fileInfo = `Resume Uploaded: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
      // Note: Actual file binary is not stored since no bucket is configured yet.
      // This allows the user to see the successful upload flow.
    }

    const validatedData = applySchema.parse(rawData)

    const supabase = createClient()
    
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
      details: `[ ${fileInfo} ]\n\nPortfolio/LinkedIn: ${validatedData.portfolioUrl}\n\nCover Letter:\n${validatedData.coverLetter}`,
      inquiry_type: 'Career',
      status: 'New'
    })

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error: 'Failed to insert to database' }
    }

    return { success: true }
  } catch (error) {
    console.error('Validation or Server Error:', error)
    return { success: false, error: 'Invalid input' }
  }
}
