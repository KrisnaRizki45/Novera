require('dotenv').config({ path: '.env.local' });

async function createAdminUser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }

  const email = 'admin@novera.com';
  const password = 'admin';

  console.log(`Mencoba membuat user: ${email}...`);

  const response = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`
    },
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      app_metadata: { role: 'admin' }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.msg && errorData.msg.includes('already been registered')) {
      console.log("✅ User admin@novera.com sudah ada di database. Silakan langsung login.");
    } else {
      console.error("❌ Gagal membuat user:", errorData);
    }
  } else {
    console.log("✅ Berhasil membuat user baru!");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Silakan login di halaman admin.");
  }
}

createAdminUser();
