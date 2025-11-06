-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  location_district TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Government Schemes table
CREATE TABLE IF NOT EXISTS public.government_schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  scheme_type TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  benefits TEXT NOT NULL,
  subsidy_percentage NUMERIC,
  state TEXT DEFAULT 'Maharashtra',
  source TEXT,
  application_link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Livestock Market Prices table
CREATE TABLE IF NOT EXISTS public.livestock_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  livestock_type TEXT NOT NULL,
  breed TEXT,
  price_per_unit NUMERIC NOT NULL,
  unit_type TEXT DEFAULT 'kg',
  location_district TEXT NOT NULL,
  market_name TEXT,
  date TIMESTAMP DEFAULT NOW(),
  trend TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Veterinary Services table
CREATE TABLE IF NOT EXISTS public.veterinary_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_name TEXT NOT NULL,
  veterinarian_name TEXT NOT NULL,
  specialization TEXT,
  location_address TEXT NOT NULL,
  location_district TEXT NOT NULL,
  latitude NUMERIC,
  longitude NUMERIC,
  phone_number TEXT NOT NULL,
  email TEXT,
  services TEXT,
  availability_days TEXT,
  availability_hours TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Training & Workshops table
CREATE TABLE IF NOT EXISTS public.training_workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  workshop_type TEXT NOT NULL,
  trainer_name TEXT NOT NULL,
  location_district TEXT NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  max_participants INTEGER,
  enrolled_count INTEGER DEFAULT 0,
  duration_hours NUMERIC,
  fee NUMERIC DEFAULT 0,
  topics TEXT,
  registration_deadline TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Workshop Enrollments
CREATE TABLE IF NOT EXISTS public.workshop_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workshop_id UUID NOT NULL REFERENCES public.training_workshops(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMP DEFAULT NOW(),
  completion_status TEXT DEFAULT 'enrolled',
  certificate_issued BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, workshop_id)
);

-- Enable RLS for all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.livestock_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.veterinary_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workshop_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for Government Schemes (public read)
CREATE POLICY "schemes_select_public" ON public.government_schemes FOR SELECT USING (TRUE);

-- RLS Policies for Livestock Prices (public read)
CREATE POLICY "prices_select_public" ON public.livestock_prices FOR SELECT USING (TRUE);

-- RLS Policies for Veterinary Services (public read)
CREATE POLICY "vet_select_public" ON public.veterinary_services FOR SELECT USING (TRUE);

-- RLS Policies for Training Workshops (public read)
CREATE POLICY "workshops_select_public" ON public.training_workshops FOR SELECT USING (TRUE);

-- RLS Policies for Workshop Enrollments
CREATE POLICY "enrollments_select_own" ON public.workshop_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "enrollments_insert_own" ON public.workshop_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
