import { useState } from 'react';
import Layout from '@/components/Layout';
import SubjectCard from '@/components/SubjectCard';
import { subjects } from '@/data/subjects';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.includes(searchQuery) ||
    subject.asTopics.some(topic => 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    subject.aLevelTopics.some(topic => 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  return (
    <Layout onSearchChange={setSearchQuery} searchQuery={searchQuery}>
      {/* Hero Section */}
      <section className="text-center mb-12 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 hero-heading">
          A-Level Central
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Helping A-Level students succeed with reliable, free notes and past papers.
          Find everything you need for your CIE A-Level studies in one organized place.
        </p>
        
        {/* Featured Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search across all subjects and topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base search-focus"
            />
          </div>
        </div>
      </section>
      
      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredSubjects.length === 0 
              ? `No results found for "${searchQuery}"` 
              : `Found ${filteredSubjects.length} subject${filteredSubjects.length !== 1 ? 's' : ''} matching "${searchQuery}"`
            }
          </p>
        </div>
      )}
      
      {/* Subjects Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubjects.map(subject => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
        
        {filteredSubjects.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Try searching for:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Mathematics', 'Physics', 'Biology', 'Chemistry', 'Further Maths', 'Economics'].map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-3 py-1 bg-accent rounded-full text-sm hover:bg-accent/80 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
      
      {/* Statistics */}
      <section className="mt-16 py-8 bg-muted/30 rounded-xl">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">What's Available</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">11</div>
              <p className="text-muted-foreground">A-Level Subjects</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {subjects.reduce((acc, subject) => acc + subject.asTopics.length + subject.aLevelTopics.length, 0)}
              </div>
              <p className="text-muted-foreground">Study Topics</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2016-2025</div>
              <p className="text-muted-foreground">Past Papers Coverage</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}