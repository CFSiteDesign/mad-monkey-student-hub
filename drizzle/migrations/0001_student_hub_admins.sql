CREATE TABLE public.student_hub_admins (
  email text PRIMARY KEY CHECK (email = lower(email)),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.student_hub_admins TO service_role;
ALTER TABLE public.student_hub_admins ENABLE ROW LEVEL SECURITY;
INSERT INTO public.student_hub_admins (email) VALUES ('charlieboyy02@gmail.com');

CREATE OR REPLACE FUNCTION public.is_student_hub_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users u
    JOIN public.student_hub_admins a ON a.email = lower(u.email)
    WHERE u.id = auth.uid() AND u.email_confirmed_at IS NOT NULL
  )
$$;
REVOKE EXECUTE ON FUNCTION public.is_student_hub_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_student_hub_admin() TO authenticated;

CREATE OR REPLACE FUNCTION public.is_student_hub_admin_email(p_email text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.student_hub_admins WHERE email = lower(trim(p_email)))
$$;
GRANT EXECUTE ON FUNCTION public.is_student_hub_admin_email(text) TO anon, authenticated;

ALTER TABLE public.student_ambassador_applications
  ADD CONSTRAINT student_ambassador_applications_status_allowed CHECK (status IN ('new','shortlisted','rejected'));

GRANT SELECT ON public.student_ambassador_applications TO authenticated;
REVOKE UPDATE ON public.student_ambassador_applications FROM authenticated;
GRANT UPDATE (status) ON public.student_ambassador_applications TO authenticated;

CREATE POLICY "Admins can read applications" ON public.student_ambassador_applications
  FOR SELECT TO authenticated USING (public.is_student_hub_admin());
CREATE POLICY "Admins can update application status" ON public.student_ambassador_applications
  FOR UPDATE TO authenticated USING (public.is_student_hub_admin()) WITH CHECK (public.is_student_hub_admin());