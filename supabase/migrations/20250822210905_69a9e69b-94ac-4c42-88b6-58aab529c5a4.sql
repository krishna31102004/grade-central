-- Create storage buckets for past papers and notes
INSERT INTO storage.buckets (id, name, public) VALUES ('past-papers', 'past-papers', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('notes', 'notes', true);

-- Create table for past papers metadata
CREATE TABLE public.past_papers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  subject_code TEXT NOT NULL,
  variant TEXT NOT NULL,
  paper_number INTEGER NOT NULL,
  session TEXT NOT NULL CHECK (session IN ('FM', 'MJ', 'ND')),
  year INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('qp', 'ms')),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for notes metadata  
CREATE TABLE public.notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  subject_code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.past_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- RLS policies for past papers
CREATE POLICY "Anyone can view past papers" 
ON public.past_papers 
FOR SELECT 
USING (true);

CREATE POLICY "Users can upload their own past papers" 
ON public.past_papers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own past papers" 
ON public.past_papers 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own past papers" 
ON public.past_papers 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for notes
CREATE POLICY "Anyone can view notes" 
ON public.notes 
FOR SELECT 
USING (true);

CREATE POLICY "Users can upload their own notes" 
ON public.notes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" 
ON public.notes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" 
ON public.notes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Storage policies for past papers
CREATE POLICY "Anyone can view past papers" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'past-papers');

CREATE POLICY "Users can upload past papers" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'past-papers');

CREATE POLICY "Users can update past papers" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'past-papers');

CREATE POLICY "Users can delete past papers" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'past-papers');

-- Storage policies for notes
CREATE POLICY "Anyone can view notes" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'notes');

CREATE POLICY "Users can upload notes" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'notes');

CREATE POLICY "Users can update notes" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'notes');

CREATE POLICY "Users can delete notes" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'notes');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_past_papers_updated_at
  BEFORE UPDATE ON public.past_papers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON public.notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();