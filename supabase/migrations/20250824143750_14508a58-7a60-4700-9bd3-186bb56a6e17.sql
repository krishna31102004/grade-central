-- Tighten INSERT policy on public.notes and add trigger to set user_id automatically

-- 1) Remove overly-permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can upload notes" ON public.notes;

-- 2) Require authentication for inserts
CREATE POLICY "Users can create notes (auth required)"
ON public.notes
FOR INSERT
TO public
WITH CHECK (auth.uid() IS NOT NULL);

-- 3) Ensure rows are owned by the uploader (auto-fill user_id when authenticated)
CREATE OR REPLACE FUNCTION public.set_notes_user_id_default()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    NEW.user_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

-- Create the trigger (idempotent)
DROP TRIGGER IF EXISTS trg_set_notes_user_id_default ON public.notes;
CREATE TRIGGER trg_set_notes_user_id_default
BEFORE INSERT ON public.notes
FOR EACH ROW
EXECUTE FUNCTION public.set_notes_user_id_default();
