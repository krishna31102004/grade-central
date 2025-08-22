-- Ensure storage policies for the 'notes' bucket mirror the working behavior
-- Drop existing policies if present to avoid duplicates
DROP POLICY IF EXISTS "Public read access to notes bucket" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload to notes bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own notes files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own notes files" ON storage.objects;

-- Public read access for the notes bucket
CREATE POLICY "Public read access to notes bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'notes');

-- Allow anyone (including anonymous) to upload into the notes bucket
CREATE POLICY "Anyone can upload to notes bucket"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'notes');

-- Allow authenticated users to update their own files (those linked to their notes row)
CREATE POLICY "Users can update their own notes files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'notes'
  AND EXISTS (
    SELECT 1
    FROM public.notes n
    WHERE n.file_path = name
      AND n.user_id = auth.uid()
  )
)
WITH CHECK (
  bucket_id = 'notes'
  AND EXISTS (
    SELECT 1
    FROM public.notes n
    WHERE n.file_path = name
      AND n.user_id = auth.uid()
  )
);

-- Allow authenticated users to delete their own files (those linked to their notes row)
CREATE POLICY "Users can delete their own notes files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'notes'
  AND EXISTS (
    SELECT 1
    FROM public.notes n
    WHERE n.file_path = name
      AND n.user_id = auth.uid()
  )
);
