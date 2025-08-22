-- Allow anonymous uploads to notes table
DROP POLICY IF EXISTS "Users can upload their own notes" ON public.notes;

CREATE POLICY "Anyone can upload notes"
ON public.notes
FOR INSERT
USING (true)
WITH CHECK (true);