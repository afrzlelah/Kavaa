-- Schema for Course Feedback
CREATE TABLE IF NOT EXISTS public.course_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.course_feedback ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Anyone can view feedback" ON public.course_feedback;
CREATE POLICY "Anyone can view feedback" ON public.course_feedback FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own feedback" ON public.course_feedback;
CREATE POLICY "Users can insert their own feedback" ON public.course_feedback 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Ensure we can fetch progress for activity feed
DROP POLICY IF EXISTS "Activity feed is viewable by all users" ON public.user_module_progress;
CREATE POLICY "Activity feed is viewable by all users" ON public.user_module_progress
FOR SELECT USING (true);
