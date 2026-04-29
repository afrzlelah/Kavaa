-- Create tables for course modules and user progress tracking
CREATE TABLE IF NOT EXISTS public.course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT, -- e.g., "13:09"
  video_url TEXT,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.course_modules(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  last_watched_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Enable RLS
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Anyone can view modules" ON public.course_modules;
CREATE POLICY "Anyone can view modules" ON public.course_modules FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_module_progress;
CREATE POLICY "Users can view their own progress" ON public.user_module_progress FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_module_progress;
CREATE POLICY "Users can update their own progress" ON public.user_module_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own progress update" ON public.user_module_progress;
CREATE POLICY "Users can update their own progress update" ON public.user_module_progress FOR UPDATE USING (auth.uid() = user_id);
