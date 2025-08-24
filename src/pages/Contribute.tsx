import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Mail, Heart } from 'lucide-react';
import NotesUpload from '@/components/NotesUpload';

export default function Contribute() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 hero-heading">Contribute to A-Level Central</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help fellow students by sharing your notes or expertise. 
            Together, we can build the best A-Level resource platform.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              Upload Study Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Share your well-organized study notes, topic summaries, revision guides, and mind maps with other students.
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">What makes good notes:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Clear, well-structured content</li>
                <li>• Topic summaries and key points</li>
                <li>• Worked examples and explanations</li>
                <li>• Revision guides and mind maps</li>
              </ul>
            </div>
            <NotesUpload />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="subject-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary" />
                Become a Reviewer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Help us maintain quality by reviewing submitted content for accuracy and clarity.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Review notes for accuracy</li>
                <li>• Check formatting and clarity</li>
                <li>• Provide constructive feedback</li>
              </ul>
              <Button className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Join as Reviewer
              </Button>
            </CardContent>
          </Card>
          
          <Card className="subject-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                Suggest Improvements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Have ideas for new features, subjects, or ways to improve the platform?
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• New subject requests</li>
                <li>• Feature suggestions</li>
                <li>• Website improvements</li>
                <li>• Content organization ideas</li>
              </ul>
              <Button className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Suggestions
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>Contribution Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Content Quality</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Ensure content is accurate and up-to-date</li>
                  <li>• Use clear, readable formatting</li>
                  <li>• Include proper citations where applicable</li>
                  <li>• Follow CIE syllabus guidelines</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">File Requirements</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• PDF format preferred for documents</li>
                  <li>• Clear, high-resolution images</li>
                  <li>• Reasonable file sizes (under 50MB)</li>
                  <li>• Descriptive filenames</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                All contributions are reviewed before publication. By contributing, you agree that your content 
                can be freely shared with other students. Contributors will be credited appropriately.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Ready to contribute? Get in touch with us to get started.
          </p>
          <Button size="lg" className="px-8">
            <Mail className="h-5 w-5 mr-2" />
            Contact Us: contribute@alevelcentral.com
          </Button>
        </div>
      </div>
    </Layout>
  );
}