import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Subject } from '@/data/subjects';

interface SubjectCardProps {
  subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Link to={`/subject/${subject.id}`} className="block">
      <Card 
        className={`subject-card cursor-pointer h-full bg-${subject.color} border-${subject.colorDark}/20 hover:border-${subject.colorDark}/40`}
        style={{
          backgroundColor: `hsl(var(--${subject.color.replace('subjects-', '')}))`,
          borderColor: `hsl(var(--${subject.colorDark.replace('subjects-', '')}) / 0.2)`,
        }}
      >
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">{subject.icon}</div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: `hsl(var(--${subject.colorDark.replace('subjects-', '')}))` }}>
            {subject.name}
          </h3>
          <p className="text-sm font-medium opacity-80" style={{ color: `hsl(var(--${subject.colorDark.replace('subjects-', '')}))` }}>
            {subject.code}
          </p>
          <div className="mt-4 pt-4 border-t border-current/20">
            <p className="text-xs opacity-70" style={{ color: `hsl(var(--${subject.colorDark.replace('subjects-', '')}))` }}>
              {subject.asTopics.length + subject.aLevelTopics.length} Topics Available
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}