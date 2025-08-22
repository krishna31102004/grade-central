import { useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, File, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNotesUpload, type ParsedNote } from '@/hooks/useNotesUpload';

interface NotesUploadProps {
  onNotesUploaded?: (notes: ParsedNote[]) => void;
}

const subjects = [
  { code: '9709', name: 'Mathematics' },
  { code: '9700', name: 'Biology' },
  { code: '9701', name: 'Chemistry' },
  { code: '9702', name: 'Physics' },
  { code: '9706', name: 'Accounting' },
  { code: '9708', name: 'Economics' },
  { code: '9093', name: 'English Language' },
];

export default function NotesUpload({ onNotesUploaded }: NotesUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadNotes, uploadedNotes, removeNote } = useNotesUpload();
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [subjectCode, setSubjectCode] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  console.log('NotesUpload component rendered', { uploadedNotes: uploadedNotes.length });

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setSelectedFiles(Array.from(files));

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;

    setSelectedFiles(Array.from(files));
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleUpload = useCallback(async () => {
    if (!subjectCode || !title || selectedFiles.length === 0) {
      return;
    }

    setIsUploading(true);
    try {
      const newNotes = await uploadNotes(selectedFiles, subjectCode, title, description);
      onNotesUploaded?.(newNotes);
      
      // Reset form
      setSelectedFiles([]);
      setTitle('');
      setDescription('');
      setSubjectCode('');
    } finally {
      setIsUploading(false);
    }
  }, [selectedFiles, subjectCode, title, description, uploadNotes, onNotesUploaded]);

  const removeSelectedFile = useCallback((fileToRemove: File) => {
    setSelectedFiles(prev => prev.filter(f => f !== fileToRemove));
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select value={subjectCode} onValueChange={setSubjectCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.code} value={subject.code}>
                      {subject.name} ({subject.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Calculus Chapter Summary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of what these notes cover..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleFileSelect}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Upload Note PDFs</h3>
            <p className="text-muted-foreground mb-4">
              Drop your PDF files here or click to browse
            </p>
            <Button variant="outline" type="button">
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

          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Selected Files ({selectedFiles.length})</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-red-600" />
                      <span className="text-sm">{file.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSelectedFile(file)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={!subjectCode || !title || selectedFiles.length === 0 || isUploading}
            className="w-full"
          >
            {isUploading ? 'Uploading...' : 'Upload Notes'}
          </Button>
        </CardContent>
      </Card>

      {uploadedNotes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Notes ({uploadedNotes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {uploadedNotes.map((note, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <File className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">{note.title}</p>
                      <p className="text-xs text-muted-foreground">{note.fileName}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {note.subjectCode}
                        </Badge>
                        {note.description && (
                          <Badge variant="outline" className="text-xs">
                            {note.description.length > 20 ? note.description.substring(0, 20) + '...' : note.description}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNote(note)}
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