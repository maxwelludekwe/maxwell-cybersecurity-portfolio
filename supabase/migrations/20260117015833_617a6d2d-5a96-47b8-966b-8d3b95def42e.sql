-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin access control
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create certificates table
CREATE TABLE public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    issuer TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT,
    achievement TEXT,
    status TEXT NOT NULL DEFAULT 'completed',
    certificate_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on certificates
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Everyone can read certificates
CREATE POLICY "Certificates are viewable by everyone"
ON public.certificates
FOR SELECT
USING (true);

-- Only admins can modify certificates
CREATE POLICY "Admins can insert certificates"
ON public.certificates
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update certificates"
ON public.certificates
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete certificates"
ON public.certificates
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tools TEXT NOT NULL,
    description TEXT,
    achievement TEXT,
    date TEXT,
    image_url TEXT,
    video_url TEXT,
    status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Everyone can read projects
CREATE POLICY "Projects are viewable by everyone"
ON public.projects
FOR SELECT
USING (true);

-- Only admins can modify projects
CREATE POLICY "Admins can insert projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
ON public.projects
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create documents table for resume, cover letter, etc.
CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on documents
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Everyone can read documents
CREATE POLICY "Documents are viewable by everyone"
ON public.documents
FOR SELECT
USING (true);

-- Only admins can modify documents
CREATE POLICY "Admins can insert documents"
ON public.documents
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update documents"
ON public.documents
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete documents"
ON public.documents
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create site_settings table for about section, hero, etc.
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read site settings
CREATE POLICY "Site settings are viewable by everyone"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can modify site settings
CREATE POLICY "Admins can insert site settings"
ON public.site_settings
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site settings"
ON public.site_settings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site settings"
ON public.site_settings
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_certificates_updated_at
    BEFORE UPDATE ON public.certificates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON public.documents
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for portfolio files
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true);

-- Storage policies for portfolio bucket
CREATE POLICY "Portfolio files are publicly viewable"
ON storage.objects
FOR SELECT
USING (bucket_id = 'portfolio');

CREATE POLICY "Admins can upload portfolio files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update portfolio files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete portfolio files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));