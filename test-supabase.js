require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testConnection() {
  console.log("Testing Supabase Connection...");
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("❌ Missing environment variables!");
    process.exit(1);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    // Attempt a basic auth check or just select a dummy table
    const { data, error } = await supabase.from('services').select('*').limit(1);
    
    if (error) {
      if (error.code === '42P01') {
        console.log("✅ Connection SUCCESS, but tables are not created yet (Schema missing).");
      } else {
        console.error("❌ Connection failed or Query Error:", error);
      }
    } else {
      console.log("✅ Connection SUCCESS!");
      console.log("Data retrieved:", data);
    }
  } catch (err) {
    console.error("❌ Unexpected Error:", err);
  }
}

testConnection();
