CREATE TABLE public.student_ambassador_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200 AND email = lower(btrim(email))),
  university text NOT NULL CHECK (char_length(university) BETWEEN 1 AND 200),
  course_and_year text NOT NULL CHECK (char_length(course_and_year) BETWEEN 1 AND 200),
  social_handles text NULL CHECK (social_handles IS NULL OR char_length(social_handles) <= 200),
  why_ambassador text NOT NULL CHECK (char_length(why_ambassador) BETWEEN 1 AND 3000),
  how_get_students text NOT NULL CHECK (char_length(how_get_students) BETWEEN 1 AND 3000),
  status text NOT NULL DEFAULT 'new' CHECK (char_length(status) <= 50),
  source text NULL CHECK (source IS NULL OR char_length(source) <= 1000),
  user_agent text NULL CHECK (user_agent IS NULL OR char_length(user_agent) <= 500)
);
CREATE UNIQUE INDEX student_ambassador_applications_email_key ON public.student_ambassador_applications (lower(email));
GRANT INSERT ON public.student_ambassador_applications TO anon, authenticated;
GRANT ALL ON public.student_ambassador_applications TO service_role;
ALTER TABLE public.student_ambassador_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an application" ON public.student_ambassador_applications
FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');