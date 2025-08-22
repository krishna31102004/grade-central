import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface StoredPastPaper {
  id: string;
  user_id: string | null;
  subject_code: string;
  variant: string;
  paper_number: number;
  session: 'FM' | 'MJ' | 'ND';
  year: number;
  type: 'qp' | 'ms';
  file_name: string;
  file_path: string;
  file_size: number | null;
  uploaded_at: string;
  created_at: string;
  updated_at: string;
}

export interface ParsedFile {
  id?: string;
  file?: File;
  subjectCode: string;
  variant: string;
  paperNumber: number;
  session: 'FM' | 'MJ' | 'ND';
  year: number;
  type: 'qp' | 'ms';
  url: string;
  fileName: string;
  fileSize?: number;
}

export interface UploadedPastPaper {
  year: number;
  session: 'FM' | 'MJ' | 'ND';
  paperNumber: number;
  variant: string;
  paperFile?: ParsedFile;
  markSchemeFile?: ParsedFile;
}

export function useFileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<ParsedFile[]>([]);
  const { toast } = useToast();

  const parseFilename = useCallback((filename: string): Omit<ParsedFile, 'file' | 'url'> | null => {
    // Expected format: code_variant_sessionYear_type.pdf
    // Example: 9709_p11_m25_qp.pdf
    const match = filename.match(/^(\d{4})_(p\d{2})_([msw])(\d{2})_(qp|ms)\.pdf$/i);
    
    if (!match) {
      return null;
    }

    const [, subjectCode, variant, sessionCode, yearSuffix, type] = match;
    
    // Convert session codes: m=MJ (May/June), s=FM (Feb/March), w=ND (Oct/Nov)
    const sessionMap: { [key: string]: 'FM' | 'MJ' | 'ND' } = {
      'm': 'MJ',
      's': 'FM', 
      'w': 'ND'
    };
    
    const session = sessionMap[sessionCode.toLowerCase()];
    if (!session) {
      return null;
    }

    // Convert year suffix to full year (25 -> 2025, 24 -> 2024, etc.)
    const year = 2000 + parseInt(yearSuffix);
    const paperNumber = parseInt(variant.substring(1, 2)); // Extract paper number from variant (p11 -> 1)

    return {
      subjectCode,
      variant,
      paperNumber,
      session,
      year,
      type: type.toLowerCase() as 'qp' | 'ms',
      fileName: filename
    };
  }, []);

  // Load past papers from database
  const loadPastPapers = useCallback(async (subjectCode?: string) => {
    try {
      let query = supabase.from('past_papers').select('*');
      
      if (subjectCode) {
        query = query.eq('subject_code', subjectCode);
      }
      
      const { data: papers, error } = await query.order('year', { ascending: false });
      
      if (error) {
        console.error('Error loading past papers:', error);
        return [];
      }

      // Convert database records to ParsedFile format
      const parsedFiles: ParsedFile[] = papers?.map(paper => ({
        id: paper.id,
        subjectCode: paper.subject_code,
        variant: paper.variant,
        paperNumber: paper.paper_number,
        session: paper.session as 'FM' | 'MJ' | 'ND',
        year: paper.year,
        type: paper.type as 'qp' | 'ms',
        fileName: paper.file_name,
        fileSize: paper.file_size || undefined,
        url: supabase.storage.from('past-papers').getPublicUrl(paper.file_path).data.publicUrl
      })) || [];

      setUploadedFiles(parsedFiles);
      return parsedFiles;
    } catch (error) {
      console.error('Error loading past papers:', error);
      toast({
        title: "Error loading files",
        description: "Failed to load past papers from database.",
        variant: "destructive",
      });
      return [];
    }
  }, [toast]);

  // Load files on mount
  useEffect(() => {
    loadPastPapers();
  }, [loadPastPapers]);

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newUploadedFiles: ParsedFile[] = [];
    let errorCount = 0;

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    for (const file of fileArray) {
      if (file.type !== 'application/pdf') {
        errorCount++;
        continue;
      }

      const parsedData = parseFilename(file.name);
      if (!parsedData) {
        errorCount++;
        continue;
      }

      try {
        // Create file path
        const filePath = `${parsedData.subjectCode}/${parsedData.year}/${parsedData.session}/${file.name}`;
        
        // Upload file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from('past-papers')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          errorCount++;
          continue;
        }

        // Save metadata to database
        const { data: savedPaper, error: dbError } = await supabase
          .from('past_papers')
          .insert({
            user_id: user?.id || null,
            subject_code: parsedData.subjectCode,
            variant: parsedData.variant,
            paper_number: parsedData.paperNumber,
            session: parsedData.session,
            year: parsedData.year,
            type: parsedData.type,
            file_name: file.name,
            file_path: filePath,
            file_size: file.size
          })
          .select()
          .single();

        if (dbError) {
          console.error('Database error:', dbError);
          // Clean up uploaded file
          await supabase.storage.from('past-papers').remove([filePath]);
          errorCount++;
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('past-papers')
          .getPublicUrl(filePath);

        const parsedFile: ParsedFile = {
          id: savedPaper.id,
          subjectCode: parsedData.subjectCode,
          variant: parsedData.variant,
          paperNumber: parsedData.paperNumber,
          session: parsedData.session,
          year: parsedData.year,
          type: parsedData.type,
          fileName: file.name,
          fileSize: file.size,
          url: publicUrl
        };

        newUploadedFiles.push(parsedFile);
      } catch (error) {
        console.error('Error uploading file:', error);
        errorCount++;
      }
    }

    // Update local state
    setUploadedFiles(prev => [...prev, ...newUploadedFiles]);

    if (newUploadedFiles.length > 0) {
      toast({
        title: "Files uploaded successfully",
        description: `${newUploadedFiles.length} files uploaded to database.`,
      });
    }

    if (errorCount > 0) {
      toast({
        title: "Some files couldn't be processed",
        description: `${errorCount} files failed to upload.`,
        variant: "destructive",
      });
    }

    return newUploadedFiles;
  }, [parseFilename, toast]);

  const removeFile = useCallback(async (fileToRemove: ParsedFile) => {
    try {
      if (fileToRemove.id) {
        // Remove from database
        const { error: dbError } = await supabase
          .from('past_papers')
          .delete()
          .eq('id', fileToRemove.id);

        if (dbError) {
          console.error('Error removing from database:', dbError);
          toast({
            title: "Error removing file",
            description: "Failed to remove file from database.",
            variant: "destructive",
          });
          return;
        }

        // Remove from storage
        const filePath = `${fileToRemove.subjectCode}/${fileToRemove.year}/${fileToRemove.session}/${fileToRemove.fileName}`;
        const { error: storageError } = await supabase.storage
          .from('past-papers')
          .remove([filePath]);

        if (storageError) {
          console.error('Error removing from storage:', storageError);
        }
      }

      // Update local state
      setUploadedFiles(prev => prev.filter(f => f !== fileToRemove));
      
      toast({
        title: "File removed",
        description: "File has been successfully removed.",
      });
    } catch (error) {
      console.error('Error removing file:', error);
      toast({
        title: "Error removing file",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const getGroupedPapers = useCallback((subjectCode: string): UploadedPastPaper[] => {
    const subjectFiles = uploadedFiles.filter(f => f.subjectCode === subjectCode);
    const grouped: { [key: string]: UploadedPastPaper } = {};

    subjectFiles.forEach(file => {
      const key = `${file.year}-${file.session}-${file.variant}`;
      
      if (!grouped[key]) {
        grouped[key] = {
          year: file.year,
          session: file.session,
          paperNumber: file.paperNumber,
          variant: file.variant,
        };
      }

      if (file.type === 'qp') {
        grouped[key].paperFile = file;
      } else {
        grouped[key].markSchemeFile = file;
      }
    });

    return Object.values(grouped).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      const sessionOrder = { 'FM': 0, 'MJ': 1, 'ND': 2 };
      if (a.session !== b.session) return sessionOrder[a.session] - sessionOrder[b.session];
      return parseInt(a.variant.substring(1)) - parseInt(b.variant.substring(1));
    });
  }, [uploadedFiles]);

  const clearAllFiles = useCallback(async () => {
    try {
      // Remove all files from database and storage
      for (const file of uploadedFiles) {
        if (file.id) {
          await supabase.from('past_papers').delete().eq('id', file.id);
          const filePath = `${file.subjectCode}/${file.year}/${file.session}/${file.fileName}`;
          await supabase.storage.from('past-papers').remove([filePath]);
        }
      }
      
      setUploadedFiles([]);
      toast({
        title: "All files removed",
        description: "All files have been successfully removed.",
      });
    } catch (error) {
      console.error('Error clearing files:', error);
      toast({
        title: "Error clearing files",
        description: "Some files may not have been removed.",
        variant: "destructive",
      });
    }
  }, [uploadedFiles, toast]);

  return {
    uploadedFiles,
    uploadFiles,
    removeFile,
    clearAllFiles,
    getGroupedPapers,
    parseFilename,
    loadPastPapers
  };
}