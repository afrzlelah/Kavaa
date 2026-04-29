-- Security Hardening for Kavaa
-- Ensure all tables have RLS enabled

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;

-- Policies for courses
DROP POLICY IF EXISTS "Public courses are viewable by everyone" ON public.courses;
CREATE POLICY "Public courses are viewable by everyone" ON public.courses
FOR SELECT USING (true);

-- Policies for user_courses
DROP POLICY IF EXISTS "Users can view their own course enrollment" ON public.user_courses;
CREATE POLICY "Users can view their own course enrollment" ON public.user_courses
FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can enroll themselves in courses" ON public.user_courses;
CREATE POLICY "Users can enroll themselves in courses" ON public.user_courses
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Ensure user_module_progress is also fully covered
ALTER TABLE public.user_module_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can see their own progress" ON public.user_module_progress;
CREATE POLICY "Users can see their own progress" ON public.user_module_progress
FOR SELECT USING (auth.uid() = user_id);
