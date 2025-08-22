import { useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, File, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useFileUpload, type ParsedFile } from '@/hooks/useFileUpload';

interface FileUploadProps {
  subjectCode?: string;
  onFilesUploaded?: (files: ParsedFile[]) => void;
}

export default function FileUpload({ subjectCode, onFilesUploaded }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFiles, uploadedFiles, removeFile } = useFileUpload();

  const handleFileSelect = useCallback(async () => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles = await uploadFiles(files);
    onFilesUploaded?.(newFiles);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [uploadFiles, onFilesUploaded]);

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;

    const newFiles = await uploadFiles(files);
    onFilesUploaded?.(newFiles);
  }, [uploadFiles, onFilesUploaded]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const relevantFiles = subjectCode 
    ? uploadedFiles.filter(f => f.subjectCode === subjectCode)
    : uploadedFiles;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleFileSelect}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Upload Past Paper PDFs</h3>
            <p className="text-muted-foreground mb-4">
              Drop your PDF files here or click to browse
            </p>
            <p className="text-sm text-muted-foreground/75 mb-4">
              Expected format: <code className="bg-muted px-2 py-1 rounded">code_variant_sessionYear_type.pdf</code>
            </p>
            <p className="text-xs text-muted-foreground/60">
              Example: <code className="bg-muted px-1 rounded">9709_p11_m25_qp.pdf</code> (Math P1 May 2025 Question Paper)
            </p>
            <Button variant="outline" className="mt-4">
              <Upload className="h-4 w-4 mr-2" />
              Select Files
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </CardContent>
      </Card>

      {relevantFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Uploaded Files ({relevantFiles.length})</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {relevantFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <File className="h-4 w-4 text-red-600" />
                     <div>
                       <p className="text-sm font-medium">{file.fileName}</p>
                       <div className="flex gap-2 mt-1">
                         <Badge variant="secondary" className="text-xs">
                           {file.subjectCode}
                         </Badge>
                         <Badge variant="outline" className="text-xs">
                           {file.variant.toUpperCase()}
                         </Badge>
                         <Badge variant="outline" className="text-xs">
                           {file.session} {file.year}
                         </Badge>
                         <Badge variant="outline" className="text-xs">
                           {file.type.toUpperCase()}
                         </Badge>
                       </div>
                     </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}