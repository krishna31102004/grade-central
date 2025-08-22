import { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { subjects, type Subject, type PastPaper } from '@/data/subjects';
import { Download, FileText, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { toast } = useToast();
  
  // Filter states
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [sessionFilter, setSessionFilter] = useState<string>('all');
  const [paperTypeFilter, setPaperTypeFilter] = useState<string>('all');
  
  const subject = subjects.find(s => s.id === subjectId);
  
  if (!subject) {
    return <Navigate to="/" replace />;
  }
  
  // Generate filter options
  const years = Array.from(new Set(subject.pastPapers.map(p => p.year))).sort((a, b) => b - a);
  const sessions = ['FM', 'MJ', 'ND'];
  const paperNumbers = Array.from(new Set(subject.pastPapers.map(p => p.paperNumber))).sort();
  
  // Filter past papers
  const filteredPapers = useMemo(() => {
    return subject.pastPapers.filter(paper => {
      if (yearFilter !== 'all' && paper.year !== parseInt(yearFilter)) return false;
      if (sessionFilter !== 'all' && paper.session !== sessionFilter) return false;
      if (paperTypeFilter !== 'all' && paper.paperNumber !== parseInt(paperTypeFilter)) return false;
      return true;
    });
  }, [subject.pastPapers, yearFilter, sessionFilter, paperTypeFilter]);
  
  // Group papers by year and session
  const groupedPapers = useMemo(() => {
    const groups: { [key: string]: PastPaper[] } = {};
    
    filteredPapers.forEach(paper => {
      const key = `${paper.year}-${paper.session}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(paper);
    });
    
    // Sort groups by year (descending) then session
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      const [yearA, sessionA] = a.split('-');
      const [yearB, sessionB] = b.split('-');
      
      if (yearA !== yearB) {
        return parseInt(yearB) - parseInt(yearA);
      }
      
      const sessionOrder = { 'ND': 0, 'MJ': 1, 'FM': 2 };
      return sessionOrder[sessionA as keyof typeof sessionOrder] - sessionOrder[sessionB as keyof typeof sessionOrder];
    });
    
    const sortedGroups: { [key: string]: PastPaper[] } = {};
    sortedKeys.forEach(key => {
      sortedGroups[key] = groups[key].sort((a, b) => a.variant.localeCompare(b.variant));
    });
    
    return sortedGroups;
  }, [filteredPapers]);
  
  const handleDownload = (filename: string, type: 'notes' | 'paper' | 'markscheme') => {
    toast({
      title: "Download Started",
      description: `Downloading ${filename}...`,
    });
    
    // Here you would implement actual file download
    console.log(`Downloading ${type}: ${filename}`);
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
            <span>{subject.pastPapers.length} Past Papers</span>
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
            
            {/* Papers Grid */}
            <div className="space-y-6">
              {Object.entries(groupedPapers).map(([groupKey, papers]) => {
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
                                Download Paper
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full download-btn"
                                onClick={() => handleDownload(paper.markSchemeFilename, 'markscheme')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download Mark Scheme
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {Object.keys(groupedPapers).length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No papers found with the current filters.</p>
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