import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface StoredNote {
  id: string;
  user_id: string | null;
  subject_code: string;
  title: string;
  description: string | null;
  file_name: string;
  file_path: string;
  file_size: number | null;
  uploaded_at: string;
  created_at: string;
  updated_at: string;
}

export interface ParsedNote {
  id?: string;
  file?: File;
  subjectCode: string;
  title: string;
  description?: string;
  fileName: string;
  fileSize?: number;
  url: string;
}

export function useNotesUpload() {
  const [uploadedNotes, setUploadedNotes] = useState<ParsedNote[]>([]);
  const { toast } = useToast();

  // Load notes from database
  const loadNotes = useCallback(async (subjectCode?: string) => {
    try {
      let query = supabase.from('notes').select('*');
      
      if (subjectCode) {
        query = query.eq('subject_code', subjectCode);
      }
      
      const { data: notes, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading notes:', error);
        return [];
      }

      // Convert database records to ParsedNote format
      const parsedNotes: ParsedNote[] = notes?.map(note => ({
        id: note.id,
        subjectCode: note.subject_code,
        title: note.title,
        description: note.description || undefined,
        fileName: note.file_name,
        fileSize: note.file_size || undefined,
        url: supabase.storage.from('notes').getPublicUrl(note.file_path).data.publicUrl
      })) || [];

      setUploadedNotes(parsedNotes);
      return parsedNotes;
    } catch (error) {
      console.error('Error loading notes:', error);
      toast({
        title: "Error loading notes",
        description: "Failed to load notes from database.",
        variant: "destructive",
      });
      return [];
    }
  }, [toast]);

  // Load notes on mount
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const uploadNotes = useCallback(async (
    files: FileList | File[], 
    subjectCode: string, 
    title: string, 
    description?: string
  ) => {
    console.log('Starting notes upload:', { files: files.length, subjectCode, title, description });
    
    const fileArray = Array.from(files);
    const newUploadedNotes: ParsedNote[] = [];
    let errorCount = 0;

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('User auth check:', { user: user?.id, error: userError });

    for (const file of fileArray) {
      console.log('Processing file:', file.name, file.type);
      
      if (file.type !== 'application/pdf') {
        console.error('Invalid file type:', file.type);
        errorCount++;
        continue;
      }

      try {
        // Create file path
        const filePath = `${subjectCode}/${Date.now()}-${file.name}`;
        console.log('Uploading to path:', filePath);
        
        // Upload file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from('notes')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          errorCount++;
          continue;
        }
        console.log('File uploaded successfully to storage');

        // Save metadata to database
        const insertData = {
          user_id: user?.id || null,
          subject_code: subjectCode,
          title: title,
          description: description || null,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size
        };
        console.log('Inserting to database:', insertData);

        const { data: savedNote, error: dbError } = await supabase
          .from('notes')
          .insert(insertData)
          .select()
          .single();

        if (dbError) {
          console.error('Database insert error:', dbError);
          // Clean up uploaded file
          await supabase.storage.from('notes').remove([filePath]);
          errorCount++;
          continue;
        }
        console.log('Note saved to database:', savedNote);

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('notes')
          .getPublicUrl(filePath);

        const parsedNote: ParsedNote = {
          id: savedNote.id,
          subjectCode: subjectCode,
          title: title,
          description: description,
          fileName: file.name,
          fileSize: file.size,
          url: publicUrl
        };

        newUploadedNotes.push(parsedNote);
        console.log('Note processed successfully:', parsedNote);
      } catch (error) {
        console.error('Error uploading note:', error);
        errorCount++;
      }
    }

    // Update local state
    setUploadedNotes(prev => [...prev, ...newUploadedNotes]);
    console.log('Upload complete:', { successful: newUploadedNotes.length, errors: errorCount });

    if (newUploadedNotes.length > 0) {
      toast({
        title: "Notes uploaded successfully",
        description: `${newUploadedNotes.length} notes uploaded to database.`,
      });
    }

    if (errorCount > 0) {
      toast({
        title: "Some files couldn't be processed",
        description: `${errorCount} files failed to upload.`,
        variant: "destructive",
      });
    }

    return newUploadedNotes;
  }, [toast]);

  const removeNote = useCallback(async (noteToRemove: ParsedNote) => {
    try {
      if (noteToRemove.id) {
        // Remove from database
        const { error: dbError } = await supabase
          .from('notes')
          .delete()
          .eq('id', noteToRemove.id);

        if (dbError) {
          console.error('Error removing from database:', dbError);
          toast({
            title: "Error removing note",
            description: "Failed to remove note from database.",
            variant: "destructive",
          });
          return;
        }

        // Remove from storage
        const filePath = `${noteToRemove.subjectCode}/${noteToRemove.fileName}`;
        const { error: storageError } = await supabase.storage
          .from('notes')
          .remove([filePath]);

        if (storageError) {
          console.error('Error removing from storage:', storageError);
        }
      }

      // Update local state
      setUploadedNotes(prev => prev.filter(n => n !== noteToRemove));
      
      toast({
        title: "Note removed",
        description: "Note has been successfully removed.",
      });
    } catch (error) {
      console.error('Error removing note:', error);
      toast({
        title: "Error removing note",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const clearAllNotes = useCallback(async () => {
    try {
      // Remove all notes from database and storage
      for (const note of uploadedNotes) {
        if (note.id) {
          await supabase.from('notes').delete().eq('id', note.id);
          const filePath = `${note.subjectCode}/${note.fileName}`;
          await supabase.storage.from('notes').remove([filePath]);
        }
      }
      
      setUploadedNotes([]);
      toast({
        title: "All notes removed",
        description: "All notes have been successfully removed.",
      });
    } catch (error) {
      console.error('Error clearing notes:', error);
      toast({
        title: "Error clearing notes",
        description: "Some notes may not have been removed.",
        variant: "destructive",
      });
    }
  }, [uploadedNotes, toast]);

  return {
    uploadedNotes,
    uploadNotes,
    removeNote,
    clearAllNotes,
    loadNotes
  };
}