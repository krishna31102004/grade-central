import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Home, BookOpen, MessageSquare, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LayoutProps {
  children: ReactNode;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export default function Layout({ children, onSearchChange, searchQuery }: LayoutProps) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent-foreground rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
            <span className="font-bold text-xl hero-heading">A-Level Central</span>
          </Link>
          
          {/* Search Bar */}
          {onSearchChange && (
            <div className="flex-1 max-w-md mx-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search subjects, topics, or papers..."
                  value={searchQuery || ''}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 search-focus"
                />
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/') 
                  ? 'bg-accent text-accent-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/subjects"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/subjects') 
                  ? 'bg-accent text-accent-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Subjects</span>
            </Link>
            <Link
              to="/contribute"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/contribute') 
                  ? 'bg-accent text-accent-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Contribute</span>
            </Link>
            <Link
              to="/feedback"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/feedback') 
                  ? 'bg-accent text-accent-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Feedback</span>
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent-foreground rounded flex items-center justify-center text-primary-foreground font-bold text-sm">
                  A
                </div>
                <span className="font-semibold hero-heading">A-Level Central</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Helping A-Level students succeed with reliable, free notes and past papers.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
                <li><Link to="/subjects" className="text-muted-foreground hover:text-foreground transition-colors">All Subjects</Link></li>
                <li><Link to="/contribute" className="text-muted-foreground hover:text-foreground transition-colors">Contribute</Link></li>
                <li><Link to="/feedback" className="text-muted-foreground hover:text-foreground transition-colors">Send Feedback</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Contact & Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@alevelcentral.com</li>
                <li>© 2024 A-Level Central. All rights reserved.</li>
                <li>
                  <Link to="/feedback" className="hover:text-foreground transition-colors">
                    Report an issue or suggest improvements
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer-credits" className="hover:text-foreground transition-colors">
                    Disclaimer & Credits
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}