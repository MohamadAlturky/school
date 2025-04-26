import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface StudentOverviewProps {
  attendance: number;
  gpa: number;
  courses: {
    id: number;
    name: string;
    progress: number;
  }[];
}

export const StudentOverview: React.FC<StudentOverviewProps> = ({
  attendance,
  gpa,
  courses
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-lg">{t('attendance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t('attendanceRate')}</span>
                <span>{attendance}%</span>
              </div>
              <Progress value={attendance} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-lg">{t('academicPerformance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t('gpa')}</span>
                <span>{gpa}/4.0</span>
              </div>
              <Progress value={(gpa / 4) * 100} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="py-2">
          <CardTitle className="text-lg">{t('courseProgress')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between">
                  <span>{course.name}</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
