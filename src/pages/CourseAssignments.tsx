import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const CourseAssignments = () => {
  const { courseId } = useParams();
  return (
    <div className="container py-6">
      <Card>
        <CardHeader>
          <CardTitle>Assignments for Course #{courseId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Assignments list will be shown here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseAssignments; 