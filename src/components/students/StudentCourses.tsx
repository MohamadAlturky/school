import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface StudentCoursesProps {
  courses: {
    id: number;
    name: string;
    progress: number;
    grade?: string;
  }[];
}

export const StudentCourses: React.FC<StudentCoursesProps> = ({ courses }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <Card key={course.id}>
          <CardHeader className="py-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{course.name}</CardTitle>
              {course.grade && (
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                  {course.grade}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t('progress')}</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(`/courses/${course.id}/assignments`)}>{t('viewAssignments')}</Button>
              <Button variant="outline" size="sm" onClick={() => navigate(`/courses/${course.id}/notes`)}>{t('viewNotes')}</Button>
              <Button size="sm" onClick={() => navigate(`/courses/${course.id}`)}>{t('enterCourse')}</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
