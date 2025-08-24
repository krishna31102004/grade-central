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
        
        // Map subject codes to folder names
        const folderMap: Record<string, string> = {
          '9709': 'Mathematics',
          '9231': 'Further Mathematics', 
          '9706': 'Accounting',
          '9700': 'Biology',
          '9701': 'Chemistry',
          '9618': 'Computer Science',
          '9708': 'Economics',
          '9702': 'Physics',
          '9990': 'Psychology',
          '9699': 'Sociology',
          '7115': 'Business studies'
        };

        const folderName = folderMap[subjectCode];
        if (!folderName) {
          setNotes([]);
          setIsLoading(false);
          return;
        }

        // List files in the subject folder
        const { data: files, error } = await supabase.storage
          .from('notes')
          .list(folderName, {
            limit: 100,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (error) {
          console.error('Error fetching notes:', error);
          setError(error.message);
          return;
        }

        // Convert storage files to SubjectNote format
        const notesData: SubjectNote[] = (files || [])
          .filter(file => file.name.endsWith('.pdf'))
          .map(file => ({
            id: file.id || file.name,
            title: file.name.replace('.pdf', ''),
            description: null,
            file_name: file.name,
            file_path: `${folderName}/${file.name}`,
            subject_code: subjectCode,
            uploaded_at: file.created_at || new Date().toISOString(),
            file_size: file.metadata?.size || null
          }));

        setNotes(notesData);
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