import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { subjects, type Subject } from '@/data/subjects';
import { Download, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSubjectNotes } from '@/hooks/useSubjectNotes';
import { supabase } from '@/integrations/supabase/client';

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { toast } = useToast();
  
  const subject = subjects.find(s => s.id === subjectId);
  
  if (!subject) {
    return <Navigate to="/" replace />;
  }

  const { notes, isLoading, error, getPublicUrl, findNoteForTopic } = useSubjectNotes(subject.code);
  
  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      // Prefer a short-lived signed URL to avoid extension blocking and ensure access
      const { data, error } = await supabase.storage
        .from('notes')
        .createSignedUrl(filePath, 300, { download: fileName });

      const url = data?.signedUrl 
        ?? `${supabase.storage.from('notes').getPublicUrl(filePath).data.publicUrl}?download=1`;

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.target = '_blank';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Download Started',
        description: `Downloading ${fileName}...`,
      });
    } catch (e) {
      toast({
        title: 'Download failed',
        description: 'Please try again in a moment.',
        variant: 'destructive',
      });
      console.error('Download error', e);
    }
  };

  const renderTopicCard = (topic: any) => {
    const note = findNoteForTopic(topic.id, topic.title);
    
    return (
      <div key={topic.id} className="p-4 rounded-lg border bg-card">
        <h3 className="font-medium mb-2">{topic.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{topic.summary}</p>
        
        {note ? (
          <Button
            size="sm"
            className="download-btn w-full"
            onClick={async () => handleDownload(note.file_path, note.file_name)}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Notes
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            disabled
          >
            <Clock className="h-4 w-4 mr-2" />
            Notes Coming Soon
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Subject Header */}
        <div 
          className="rounded-xl p-8 mb-8 text-center"
          style={{ backgroundColor: `hsl(var(--${subject.color.replace('subjects-', '')}))` }}
        >
          <div className="text-6xl mb-4">{subject.icon}</div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: `hsl(var(--${subject.colorDark.replace('subjects-', '')}))` }}>
            {subject.name}
          </h1>
          <p className="text-lg font-medium" style={{ color: `hsl(var(--${subject.colorDark.replace('subjects-', '')}) / 0.8)` }}>
            CIE A-Level • Code: {subject.code}
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm" style={{ color: `hsl(var(--${subject.colorDark.replace('subjects-', '')}) / 0.7)` }}>
            <span>{subject.asTopics.length} AS Topics</span>
            <span>•</span>
            <span>{subject.aLevelTopics.length} A-Level Topics</span>
          </div>
        </div>
        
        {/* Notes Content */}
        <div className="space-y-6">
          {/* AS Level Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">AS Level</Badge>
                Topics ({subject.asTopics.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isLoading ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">Loading notes...</p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-destructive">Error loading notes: {error}</p>
                </div>
              ) : (
                subject.asTopics.map(topic => renderTopicCard(topic))
              )}
            </CardContent>
          </Card>
          
          {/* A Level Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge>A Level</Badge>
                Topics ({subject.aLevelTopics.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isLoading ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">Loading notes...</p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-destructive">Error loading notes: {error}</p>
                </div>
              ) : (
                subject.aLevelTopics.map(topic => renderTopicCard(topic))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}