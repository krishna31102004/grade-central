import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ParsedFile {
  file: File;
  subjectCode: string;
  variant: string;
  paperNumber: number;
  session: 'FM' | 'MJ' | 'ND';
  year: number;
  type: 'qp' | 'ms';
  url: string;
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
      type: type.toLowerCase() as 'qp' | 'ms'
    };
  }, []);

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newUploadedFiles: ParsedFile[] = [];
    let errorCount = 0;

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

      // Create object URL for the file
      const url = URL.createObjectURL(file);

      const parsedFile: ParsedFile = {
        file,
        url,
        ...parsedData
      };

      newUploadedFiles.push(parsedFile);
    }

    setUploadedFiles(prev => [...prev, ...newUploadedFiles]);

    if (newUploadedFiles.length > 0) {
      toast({
        title: "Files uploaded successfully",
        description: `${newUploadedFiles.length} files processed successfully.`,
      });
    }

    if (errorCount > 0) {
      toast({
        title: "Some files couldn't be processed",
        description: `${errorCount} files had invalid names or weren't PDFs.`,
        variant: "destructive",
      });
    }

    return newUploadedFiles;
  }, [parseFilename, toast]);

  const removeFile = useCallback((fileToRemove: ParsedFile) => {
    setUploadedFiles(prev => {
      const updated = prev.filter(f => f !== fileToRemove);
      // Revoke the object URL to free memory
      URL.revokeObjectURL(fileToRemove.url);
      return updated;
    });
  }, []);

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

  const clearAllFiles = useCallback(() => {
    uploadedFiles.forEach(file => {
      URL.revokeObjectURL(file.url);
    });
    setUploadedFiles([]);
  }, [uploadedFiles]);

  return {
    uploadedFiles,
    uploadFiles,
    removeFile,
    clearAllFiles,
    getGroupedPapers,
    parseFilename
  };
}