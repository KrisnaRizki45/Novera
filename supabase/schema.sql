-- Admin Users / Profiles
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  short_description_en TEXT,
  short_description_id TEXT,
  description_en TEXT,
  description_id TEXT,
  icon TEXT,
  features_en JSONB,
  features_id JSONB,
  use_cases_en JSONB,
  use_cases_id JSONB,
  business_value_en JSONB,
  business_value_id JSONB,
  cta_label_en TEXT,
  cta_label_id TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Solutions
CREATE TABLE IF NOT EXISTS public.solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  short_description_en TEXT,
  short_description_id TEXT,
  description_en TEXT,
  description_id TEXT,
  business_problem_en TEXT,
  business_problem_id TEXT,
  solution_approach_en TEXT,
  solution_approach_id TEXT,
  use_cases_en JSONB,
  use_cases_id JSONB,
  benefits_en JSONB,
  benefits_id JSONB,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Careers
CREATE TABLE IF NOT EXISTS public.careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  department TEXT NOT NULL,
  employment_type TEXT NOT NULL,
  location TEXT NOT NULL,
  work_mode TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  description_en TEXT,
  description_id TEXT,
  responsibilities_en JSONB,
  responsibilities_id JSONB,
  requirements_en JSONB,
  requirements_id JSONB,
  nice_to_have_en JSONB,
  nice_to_have_id JSONB,
  technologies JSONB,
  application_url TEXT,
  application_category TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Leads
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  project_type TEXT,
  budget TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create Policies for Services (Public read active, Admin all)
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Admins have full access to services" ON public.services FOR ALL USING (auth.role() = 'authenticated');

-- Solutions
CREATE POLICY "Public can view active solutions" ON public.solutions FOR SELECT USING (is_active = true);
CREATE POLICY "Admins have full access to solutions" ON public.solutions FOR ALL USING (auth.role() = 'authenticated');

-- Careers
CREATE POLICY "Public can view active careers" ON public.careers FOR SELECT USING (is_active = true AND published_at IS NOT NULL);
CREATE POLICY "Admins have full access to careers" ON public.careers FOR ALL USING (auth.role() = 'authenticated');

-- Leads
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins have full access to leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated');
