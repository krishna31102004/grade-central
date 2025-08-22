import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MessageSquare, Bug, Lightbulb, ThumbsUp, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Feedback() {
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.subject || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        description: "Type, subject, and message are required.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would implement actual form submission
    console.log('Feedback submitted:', formData);
    
    toast({
      title: "Feedback submitted successfully!",
      description: "Thank you for your feedback. We'll review it and get back to you if needed.",
    });
    
    // Reset form
    setFormData({
      type: '',
      subject: '',
      email: '',
      message: ''
    });
  };
  
  const feedbackTypes = [
    { value: 'bug', label: 'Bug Report', icon: Bug, description: 'Report a technical issue' },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb, description: 'Suggest a new feature' },
    { value: 'content', label: 'Content Issue', icon: AlertCircle, description: 'Report incorrect content' },
    { value: 'general', label: 'General Feedback', icon: MessageSquare, description: 'General comments or suggestions' },
    { value: 'praise', label: 'Compliment', icon: ThumbsUp, description: 'Share positive feedback' },
  ];
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 hero-heading">Send Us Feedback</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your feedback helps us improve A-Level Central. Report bugs, suggest features, 
            or let us know how we're doing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="feedback-type">Feedback Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent>
                        {feedbackTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.type && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {feedbackTypes.find(t => t.value === formData.type)?.description}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your feedback"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="search-focus"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="search-focus"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Provide your email if you'd like a response from us.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide as much detail as possible..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="search-focus"
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Feedback Types Guide */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {feedbackTypes.map(type => (
                  <div key={type.value} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <type.icon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">{type.label}</h4>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Bug Reports:</strong> Include steps to reproduce the issue and what you expected to happen.
                  </p>
                  <p>
                    <strong>Feature Requests:</strong> Describe the problem you're trying to solve and how the feature would help.
                  </p>
                  <p>
                    <strong>Content Issues:</strong> Specify the subject, topic, and what needs to be corrected.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-subjects-mathematics border-subjects-mathematics-dark/20">
              <CardContent className="p-4 text-center">
                <ThumbsUp className="h-8 w-8 text-subjects-mathematics-dark mx-auto mb-2" />
                <p className="text-sm text-subjects-mathematics-dark">
                  Love using A-Level Central? We'd love to hear about it!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="bg-muted/30">
          <CardContent className="p-6 text-center">
            <h3 className="font-medium mb-2">Other Ways to Reach Us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>General Inquiries</strong>
                <br />
                <span className="text-muted-foreground">contact@alevelcentral.com</span>
              </div>
              <div>
                <strong>Technical Support</strong>
                <br />
                <span className="text-muted-foreground">support@alevelcentral.com</span>
              </div>
              <div>
                <strong>Content Issues</strong>
                <br />
                <span className="text-muted-foreground">content@alevelcentral.com</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}