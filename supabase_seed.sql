-- =======================================================
-- KAVAA SEED DATA (Execute in Supabase SQL Editor)
-- =======================================================

-- 0. Clean up existing tables to ensure schema updates are applied
DROP TABLE IF EXISTS public.team_requests CASCADE;
DROP TABLE IF EXISTS public.certificates CASCADE;
DROP TABLE IF EXISTS public.tasks CASCADE;
DROP TABLE IF EXISTS public.challenges CASCADE;
DROP TABLE IF EXISTS public.user_courses CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.teams CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.mentors CASCADE;

-- 1. Create and Seed MENTORS Table
CREATE TABLE public.mentors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    avatar TEXT,
    role TEXT NOT NULL,
    company TEXT,
    mentees INTEGER DEFAULT 0,
    rating NUMERIC(2, 1) DEFAULT 0.0,
    status TEXT DEFAULT 'online',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO public.mentors (name, avatar, role, company, mentees, rating, status)
VALUES
    ('Sarah Chen', 'https://ui-avatars.com/api/?name=Sarah+Chen&background=random', 'Senior Frontend Engineer', 'TechCorp', 45, 4.9, 'online'),
    ('Budi Santoso', 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random', 'Product Designer', 'DesignStudio', 32, 4.8, 'offline'),
    ('Ahmad Rizki', 'https://ui-avatars.com/api/?name=Ahmad+Rizki&background=random', 'Backend Developer', 'StartupInc', 28, 4.7, 'in-session'),
    ('Jessica Wong', 'https://ui-avatars.com/api/?name=Jessica+Wong&background=random', 'Data Scientist', 'DataCo', 50, 4.9, 'online'),
    ('Kevin Surya', 'https://ui-avatars.com/api/?name=Kevin+Surya&background=random', 'DevOps Engineer', 'CloudTech', 15, 4.6, 'offline')
ON CONFLICT DO NOTHING;

-- 2. Create and Seed PROJECTS & TEAMS Table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    max_participants INTEGER DEFAULT 5,
    current_participants INTEGER DEFAULT 1,
    deadline DATE,
    features JSONB DEFAULT '[]',
    requirements JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    creator_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO public.projects (id, title, description, category, max_participants, current_participants, deadline, features, requirements)
VALUES
    (
        'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
        'Travel Planner App',
        'Sebuah aplikasi untuk membantu pengguna merencanakan perjalanan mereka dengan fitur kolaborasi real-time.',
        'Web Development',
        5,
        3,
        '2026-12-31',
        '["Real-time collaboration", "Interactive maps", "Expense tracking", "Itinerary generator"]',
        '["React/Next.js experience", "Node.js API knowledge", "PostgreSQL database"]'
    )
ON CONFLICT DO NOTHING;

-- 3. Create and Seed COURSES & USER_COURSES
CREATE TABLE public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    instructor TEXT,
    participants INTEGER DEFAULT 0,
    rating NUMERIC(2,1) DEFAULT 0.0,
    duration TEXT,
    level TEXT,
    is_free BOOLEAN DEFAULT true,
    theme TEXT,
    price NUMERIC DEFAULT 0.0,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO public.courses (title, description, category, instructor, participants, rating, duration, level, is_free, theme, price)
VALUES
    ('React for Beginners', 'Belajar React dari nol sampai bisa bikin project.', 'Development', 'John Doe', 1200, 4.7, '8 jam', 'Beginner', true, 'from-orange-400 to-rose-400', 0),
    ('UI/UX Fundamentals', 'Dasar desain UI/UX untuk produk digital.', 'Design', 'Jane Smith', 850, 4.5, '6 jam', 'Intermediate', true, 'from-blue-400 to-cyan-400', 0),
    ('Digital Marketing 101', 'Strategi pemasaran digital untuk pemula.', 'Marketing', 'Alex Johnson', 500, 4.8, '10 jam', 'Beginner', true, 'from-purple-400 to-indigo-400', 0),
    ('Business Strategy', 'Membangun bisnis yang berkelanjutan.', 'Business', 'Sarah Wilson', 300, 4.9, '12 jam', 'Advanced', false, 'from-emerald-400 to-teal-400', 150000),
    ('Fullstack Web Dev', 'Menjadi fullstack developer dalam 3 bulan.', 'Development', 'Mike Ross', 2000, 4.6, '40 jam', 'Intermediate', false, 'from-blue-600 to-indigo-600', 500000)
ON CONFLICT DO NOTHING;

CREATE TABLE public.user_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    course_id UUID REFERENCES public.courses(id),
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create and Seed CHALLENGES & TASKS
CREATE TABLE public.challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    reward TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    status TEXT DEFAULT 'todo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create and Seed CERTIFICATES Table
CREATE TABLE public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    course_id UUID REFERENCES public.courses(id),
    certificate_url TEXT,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_earned BOOLEAN DEFAULT true
);

-- 6. Create and Seed TEAM_REQUESTS Table
CREATE TABLE public.team_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES public.teams(id),
    user_id UUID,
    status TEXT DEFAULT 'pending',
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
