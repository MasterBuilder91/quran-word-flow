-- Create applications table for coaching and careers applications
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Application type
  application_type TEXT NOT NULL CHECK (application_type IN ('coaching', 'careers')),
  
  -- Applicant info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Background info
  arabic_background TEXT NOT NULL,
  years_experience INTEGER,
  why_apply TEXT NOT NULL,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected')),
  admin_notes TEXT
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application (no auth required for wider reach)
CREATE POLICY "Anyone can submit applications"
ON public.applications
FOR INSERT
WITH CHECK (true);

-- Only admins can view all applications
CREATE POLICY "Admins can view all applications"
ON public.applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update applications (for status changes and notes)
CREATE POLICY "Admins can update applications"
ON public.applications
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete applications
CREATE POLICY "Admins can delete applications"
ON public.applications
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();