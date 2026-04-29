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

CREATE TABLE IF NOT EXISTS public.user_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Function to calculate course progress
CREATE OR REPLACE FUNCTION public.calculate_course_progress()
RETURNS TRIGGER AS $$
DECLARE
  total_modules INTEGER;
  completed_modules INTEGER;
  current_course_id UUID;
BEGIN
  -- Get the course_id for the module
  SELECT course_id INTO current_course_id FROM public.course_modules WHERE id = NEW.module_id;
  
  -- Count total and completed modules
  SELECT COUNT(*) INTO total_modules FROM public.course_modules WHERE course_id = current_course_id;
  SELECT COUNT(*) INTO completed_modules FROM public.user_module_progress 
  WHERE user_id = NEW.user_id AND is_completed = true 
  AND module_id IN (SELECT id FROM public.course_modules WHERE course_id = current_course_id);
  
  -- Update user_courses
  INSERT INTO public.user_courses (user_id, course_id, progress)
  VALUES (NEW.user_id, current_course_id, ROUND((completed_modules::float / total_modules::float) * 100))
  ON CONFLICT (user_id, course_id) DO UPDATE
  SET progress = EXCLUDED.progress;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for progress update
DROP TRIGGER IF EXISTS on_progress_updated ON public.user_module_progress;
CREATE TRIGGER on_progress_updated
AFTER INSERT OR UPDATE ON public.user_module_progress
FOR EACH ROW EXECUTE FUNCTION public.calculate_course_progress();

-- Enable RLS
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Anyone can view modules" ON public.course_modules;
CREATE POLICY "Anyone can view modules" ON public.course_modules FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_module_progress;
CREATE POLICY "Users can view their own progress" ON public.user_module_progress FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_module_progress;
CREATE POLICY "Users can update their own progress" ON public.user_module_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own progress update" ON public.user_module_progress;
CREATE POLICY "Users can update their own progress update" ON public.user_module_progress FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own course enrollment" ON public.user_courses;
CREATE POLICY "Users can view their own course enrollment" ON public.user_courses FOR SELECT USING (auth.uid() = user_id);
