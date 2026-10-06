-- Process Steps
CREATE TABLE IF NOT EXISTS public.process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  description_en TEXT,
  description_id TEXT,
  activities_en JSONB,
  activities_id JSONB,
  output_en TEXT,
  output_id TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_id TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL, -- e.g., 'portfolio', 'insight'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Portfolio
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  excerpt_en TEXT,
  excerpt_id TEXT,
  overview_en TEXT,
  overview_id TEXT,
  challenge_en TEXT,
  challenge_id TEXT,
  solution_en TEXT,
  solution_id TEXT,
  features_en JSONB,
  features_id JSONB,
  tech_stack JSONB,
  impact_en TEXT,
  impact_id TEXT,
  category_id UUID REFERENCES public.categories(id),
  cover_image TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insights
CREATE TABLE IF NOT EXISTS public.insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  excerpt_en TEXT,
  excerpt_id TEXT,
  content_en TEXT,
  content_id TEXT,
  cover_image TEXT,
  category_id UUID REFERENCES public.categories(id),
  author TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Media
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  mime_type TEXT,
  file_size INTEGER,
  alt_text_en TEXT,
  alt_text_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for new tables
ALTER TABLE public.process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Process Policies
CREATE POLICY "Public can view active process_steps" ON public.process_steps FOR SELECT USING (is_active = true);
CREATE POLICY "Admins have full access to process_steps" ON public.process_steps FOR ALL USING (auth.role() = 'authenticated');

-- Categories Policies
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins have full access to categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');

-- Portfolio Policies
CREATE POLICY "Public can view published portfolio" ON public.portfolio FOR SELECT USING (is_published = true AND published_at IS NOT NULL);
CREATE POLICY "Admins have full access to portfolio" ON public.portfolio FOR ALL USING (auth.role() = 'authenticated');

-- Insights Policies
CREATE POLICY "Public can view published insights" ON public.insights FOR SELECT USING (is_published = true AND published_at IS NOT NULL);
CREATE POLICY "Admins have full access to insights" ON public.insights FOR ALL USING (auth.role() = 'authenticated');

-- Media Policies
CREATE POLICY "Public can view media" ON public.media FOR SELECT USING (true);
CREATE POLICY "Admins have full access to media" ON public.media FOR ALL USING (auth.role() = 'authenticated');
