require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function createBucket() {
  const { data, error } = await supabase.storage.createBucket('applications', {
    public: false,
    allowedMimeTypes: ['application/pdf'],
    fileSizeLimit: 5242880 // 5MB
  });

  if (error) {
    console.error('Error creating bucket:', error);
  } else {
    console.log('Bucket created successfully:', data);
  }
}
createBucket();
