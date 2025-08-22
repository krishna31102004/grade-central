import React, { createContext, useContext, ReactNode } from 'react';
import { useFileUpload, type ParsedFile, type UploadedPastPaper } from '@/hooks/useFileUpload';

interface FileUploadContextType {
  uploadedFiles: ParsedFile[];
  uploadFiles: (files: FileList | File[]) => Promise<ParsedFile[]>;
  removeFile: (file: ParsedFile) => void;
  clearAllFiles: () => void;
  getGroupedPapers: (subjectCode: string) => UploadedPastPaper[];
  parseFilename: (filename: string) => Omit<ParsedFile, 'file' | 'url'> | null;
}

const FileUploadContext = createContext<FileUploadContextType | null>(null);

export function FileUploadProvider({ children }: { children: ReactNode }) {
  const fileUploadHook = useFileUpload();

  return (
    <FileUploadContext.Provider value={fileUploadHook}>
      {children}
    </FileUploadContext.Provider>
  );
}

export function useFileUploadContext() {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error('useFileUploadContext must be used within a FileUploadProvider');
  }
  return context;
}