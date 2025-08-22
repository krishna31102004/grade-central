import { useState } from 'react';
import Layout from '@/components/Layout';
import SubjectCard from '@/components/SubjectCard';
import { subjects } from '@/data/subjects';

export default function AllSubjects() {
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
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 hero-heading">All A-Level Subjects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse all available CIE A-Level subjects and find the resources you need.
          </p>
        </div>
        
        {searchQuery && (
          <div className="text-center">
            <p className="text-muted-foreground">
              {filteredSubjects.length === 0 
                ? `No subjects found matching "${searchQuery}"` 
                : `${filteredSubjects.length} subject${filteredSubjects.length !== 1 ? 's' : ''} found`
              }
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubjects.map(subject => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
        
        {filteredSubjects.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Mathematics', 'Physics', 'Biology', 'Chemistry', 'Economics', 'Psychology'].map(suggestion => (
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
      </div>
    </Layout>
  );
}