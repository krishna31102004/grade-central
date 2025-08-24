import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SubjectNote {
  id: string;
  title: string;
  description: string | null;
  file_name: string;
  file_path: string;
  subject_code: string;
  uploaded_at: string;
  file_size: number | null;
}

export function useSubjectNotes(subjectCode: string) {
  const [notes, setNotes] = useState<SubjectNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .eq('subject_code', subjectCode)
          .order('title', { ascending: true });

        if (error) {
          console.error('Error fetching notes:', error);
          setError(error.message);
          return;
        }

        setNotes(data || []);
      } catch (err) {
        console.error('Error in fetchNotes:', err);
        setError('Failed to fetch notes');
      } finally {
        setIsLoading(false);
      }
    }

    if (subjectCode) {
      fetchNotes();
    }
  }, [subjectCode]);

  // Function to get public URL for a note file
  const getPublicUrl = (filePath: string): string => {
    const { data } = supabase.storage
      .from('notes')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  };

  // Function to find a note for a specific topic
  const findNoteForTopic = (topicId: string, topicTitle: string): SubjectNote | null => {
    // First try to find by exact topic ID match in title
    let note = notes.find(note => 
      note.title.toLowerCase().includes(topicId.toLowerCase()) ||
      note.file_name.toLowerCase().includes(topicId.toLowerCase())
    );

    // If not found, try to match by topic title keywords
    if (!note) {
      const topicKeywords = topicTitle.toLowerCase()
        .replace(/^\d+\.\d+\s+/, '') // Remove numbering like "1.1 "
        .split(' ')
        .filter(word => word.length > 2); // Filter out short words

      note = notes.find(noteItem => {
        const noteTitle = noteItem.title.toLowerCase();
        return topicKeywords.some(keyword => noteTitle.includes(keyword));
      });
    }

    return note || null;
  };

  return {
    notes,
    isLoading,
    error,
    getPublicUrl,
    findNoteForTopic
  };
}