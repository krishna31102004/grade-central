import { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { subjects, type Subject, type PastPaper } from '@/data/subjects';
import { Download, FileText, GraduationCap, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFileUploadContext } from '@/context/FileUploadContext';
import FileUpload from '@/components/FileUpload';

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { toast } = useToast();
  const { getGroupedPapers } = useFileUploadContext();
  
  // Filter states
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [sessionFilter, setSessionFilter] = useState<string>('all');
  const [paperTypeFilter, setPaperTypeFilter] = useState<string>('all');
  const [showUpload, setShowUpload] = useState<boolean>(false);
  
  const subject = subjects.find(s => s.id === subjectId);
  
  if (!subject) {
    return <Navigate to="/" replace />;
  }

  // Get uploaded papers for this subject
  const uploadedPapers = getGroupedPapers(subject.code);
  
  // Generate filter options from both dummy and uploaded papers
  const allPapers = [...subject.pastPapers, ...uploadedPapers.map(p => ({
    year: p.year,
    session: p.session,
    paperNumber: p.paperNumber,
    variant: p.variant,
    paperFilename: p.paperFile?.file.name || '',
    markSchemeFilename: p.markSchemeFile?.file.name || ''
  }))];
  
  const years = Array.from(new Set(allPapers.map(p => p.year))).sort((a, b) => b - a);
  const sessions = ['FM', 'MJ', 'ND'];
  const paperNumbers = Array.from(new Set(allPapers.map(p => p.paperNumber))).sort();
  
  // Filter uploaded papers
  const filteredUploadedPapers = useMemo(() => {
    return uploadedPapers.filter(paper => {
      if (yearFilter !== 'all' && paper.year !== parseInt(yearFilter)) return false;
      if (sessionFilter !== 'all' && paper.session !== sessionFilter) return false;
      if (paperTypeFilter !== 'all' && paper.paperNumber !== parseInt(paperTypeFilter)) return false;
      return true;
    });
  }, [uploadedPapers, yearFilter, sessionFilter, paperTypeFilter]);
  
  // Filter dummy papers (only show if no uploaded papers available)
  const filteredDummyPapers = useMemo(() => {
    if (uploadedPapers.length > 0) return []; // Hide dummy papers when real ones are available
    return subject.pastPapers.filter(paper => {
      if (yearFilter !== 'all' && paper.year !== parseInt(yearFilter)) return false;
      if (sessionFilter !== 'all' && paper.session !== sessionFilter) return false;
      if (paperTypeFilter !== 'all' && paper.paperNumber !== parseInt(paperTypeFilter)) return false;
      return true;
    });
  }, [subject.pastPapers, yearFilter, sessionFilter, paperTypeFilter, uploadedPapers.length]);
  
  // Group uploaded papers by year and session
  const groupedUploadedPapers = useMemo(() => {
    const groups: { [key: string]: typeof uploadedPapers } = {};
    
    filteredUploadedPapers.forEach(paper => {
      const key = `${paper.year}-${paper.session}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(paper);
    });
    
    // Sort groups by year (desc) and then by session order
    const sortedGroups: { [key: string]: typeof uploadedPapers } = {};
    const sessionOrder = { 'FM': 0, 'MJ': 1, 'ND': 2 };
    
    Object.keys(groups)
      .sort((a, b) => {
        const [yearA, sessionA] = a.split('-');
        const [yearB, sessionB] = b.split('-');
        
        if (yearA !== yearB) {
          return parseInt(yearB) - parseInt(yearA);
        }
        
        return sessionOrder[sessionA as keyof typeof sessionOrder] - sessionOrder[sessionB as keyof typeof sessionOrder];
      })
      .forEach(key => {
        sortedGroups[key] = groups[key].sort((a, b) => a.variant.localeCompare(b.variant));
      });
    
    return sortedGroups;
  }, [filteredUploadedPapers]);

  // Group dummy papers by year and session (legacy for empty state)
  const groupedDummyPapers = useMemo(() => {
    const groups: { [key: string]: PastPaper[] } = {};
    
    filteredDummyPapers.forEach(paper => {
      const key = `${paper.year}-${paper.session}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(paper);
    });
    
    // Sort groups by year (desc) and then by session order
    const sortedGroups: { [key: string]: PastPaper[] } = {};
    const sessionOrder = { 'FM': 0, 'MJ': 1, 'ND': 2 };
    
    Object.keys(groups)
      .sort((a, b) => {
        const [yearA, sessionA] = a.split('-');
        const [yearB, sessionB] = b.split('-');
        
        if (yearA !== yearB) {
          return parseInt(yearB) - parseInt(yearA);
        }
        
        return sessionOrder[sessionA as keyof typeof sessionOrder] - sessionOrder[sessionB as keyof typeof sessionOrder];
      })
      .forEach(key => {
        sortedGroups[key] = groups[key].sort((a, b) => a.variant.localeCompare(b.variant));
      });
    
    return sortedGroups;
  }, [filteredDummyPapers]);
  
  const handleDownload = (file: string | File, type: 'notes' | 'paper' | 'markscheme') => {
    if (file instanceof File) {
      // Handle real uploaded file
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: `${type === 'paper' ? 'Question Paper' : type === 'markscheme' ? 'Mark Scheme' : 'Notes'} Downloaded`,
        description: `${file.name} has been downloaded to your device.`,
      });
    } else {
      // Handle dummy placeholder
      toast({
        title: "Download Started",
        description: `Downloading ${file}...`,
      });
      console.log(`Downloading ${type}: ${file}`);
    }
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
            <span>•</span>
            <span>{uploadedPapers.length > 0 ? uploadedPapers.length : subject.pastPapers.length} Past Papers</span>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="notes" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-fit mx-auto">
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="papers" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Past Papers
              {uploadedPapers.length > 0 && (
                <Badge variant="secondary" className="text-xs ml-1">
                  {uploadedPapers.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            {/* AS Level Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">AS Level</Badge>
                  Topics ({subject.asTopics.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subject.asTopics.map(topic => (
                  <div key={topic.id} className="p-4 rounded-lg border bg-card">
                    <h3 className="font-medium mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{topic.summary}</p>
                    <Button
                      size="sm"
                      className="download-btn w-full"
                      onClick={() => handleDownload(topic.filename, 'notes')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Notes
                    </Button>
                  </div>
                ))}
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
                {subject.aLevelTopics.map(topic => (
                  <div key={topic.id} className="p-4 rounded-lg border bg-card">
                    <h3 className="font-medium mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{topic.summary}</p>
                    <Button
                      size="sm"
                      className="download-btn w-full"
                      onClick={() => handleDownload(topic.filename, 'notes')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Notes
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Past Papers Tab */}
          <TabsContent value="papers" className="space-y-6">
            {/* Upload Section */}
            {!showUpload && (
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Upload Past Papers</h3>
                    <p className="text-muted-foreground text-sm">
                      Upload your own PDF files to replace placeholder papers
                    </p>
                  </div>
                  <Button onClick={() => setShowUpload(true)} className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Files
                  </Button>
                </CardContent>
              </Card>
            )}

            {showUpload && (
              <div className="space-y-4">
                <FileUpload 
                  subjectCode={subject.code} 
                  onFilesUploaded={() => setShowUpload(false)} 
                />
                <Button 
                  variant="outline" 
                  onClick={() => setShowUpload(false)}
                  className="w-full"
                >
                  Done Uploading
                </Button>
              </div>
            )}

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Past Papers</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Year</label>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Session</label>
                  <Select value={sessionFilter} onValueChange={setSessionFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sessions</SelectItem>
                      {sessions.map(session => (
                        <SelectItem key={session} value={session}>
                          {session} ({session === 'FM' ? 'Feb/Mar' : session === 'MJ' ? 'May/Jun' : 'Oct/Nov'})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Paper</label>
                  <Select value={paperTypeFilter} onValueChange={setPaperTypeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Papers</SelectItem>
                      {paperNumbers.map(number => (
                        <SelectItem key={number} value={number.toString()}>Paper {number}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setYearFilter('all');
                      setSessionFilter('all');
                      setPaperTypeFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Papers Grid - Show uploaded papers first, fallback to dummy */}
            <div className="space-y-6">
              {uploadedPapers.length > 0 ? (
                // Show uploaded papers
                Object.entries(groupedUploadedPapers).map(([groupKey, papers]) => {
                  const [year, session] = groupKey.split('-');
                  const sessionName = session === 'FM' ? 'February/March' : session === 'MJ' ? 'May/June' : 'October/November';
                  
                  return (
                    <Card key={groupKey}>
                      <CardHeader>
                        <CardTitle>{year} • {sessionName} ({session})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {papers.map(paper => (
                            <div key={`${paper.year}-${paper.session}-${paper.variant}`} className="p-4 rounded-lg border bg-muted/30">
                              <div className="flex items-center justify-between mb-3">
                                <Badge variant="outline">Paper {paper.paperNumber}</Badge>
                                <span className="text-sm font-mono text-muted-foreground">Variant {paper.variant}</span>
                              </div>
                              <div className="space-y-2">
                                {paper.paperFile && (
                                  <Button
                                    size="sm"
                                    className="w-full download-btn"
                                    onClick={() => handleDownload(paper.paperFile!.file, 'paper')}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Paper
                                  </Button>
                                )}
                                {paper.markSchemeFile && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full download-btn"
                                    onClick={() => handleDownload(paper.markSchemeFile!.file, 'markscheme')}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Mark Scheme
                                  </Button>
                                )}
                                {!paper.paperFile && !paper.markSchemeFile && (
                                  <p className="text-sm text-muted-foreground text-center py-2">
                                    No files uploaded for this variant
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                // Show dummy papers as fallback
                Object.entries(groupedDummyPapers).map(([groupKey, papers]) => {
                  const [year, session] = groupKey.split('-');
                  const sessionName = session === 'FM' ? 'February/March' : session === 'MJ' ? 'May/June' : 'October/November';
                  
                  return (
                    <Card key={groupKey}>
                      <CardHeader>
                        <CardTitle>{year} • {sessionName} ({session})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {papers.map(paper => (
                            <div key={`${paper.year}-${paper.session}-${paper.variant}`} className="p-4 rounded-lg border bg-muted/30">
                              <div className="flex items-center justify-between mb-3">
                                <Badge variant="outline">Paper {paper.paperNumber}</Badge>
                                <span className="text-sm font-mono text-muted-foreground">Variant {paper.variant}</span>
                              </div>
                              <div className="space-y-2">
                                <Button
                                  size="sm"
                                  className="w-full download-btn"
                                  onClick={() => handleDownload(paper.paperFilename, 'paper')}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Paper (Demo)
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-full download-btn"
                                  onClick={() => handleDownload(paper.markSchemeFilename, 'markscheme')}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Mark Scheme (Demo)
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
              
              {uploadedPapers.length === 0 && Object.keys(groupedDummyPapers).length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No papers found with the current filters.</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => setShowUpload(true)}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Your First Papers
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}