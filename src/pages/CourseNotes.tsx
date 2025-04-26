import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const CourseNotes = () => {
  const { courseId } = useParams();
  return (
    <div className="container py-6">
      <Card>
        <CardHeader>
          <CardTitle>Notes for Course #{courseId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Notes will be shown here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseNotes; 