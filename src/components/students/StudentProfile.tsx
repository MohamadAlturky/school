import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from '@/contexts/LanguageContext';
import { StudentProfileHeader } from './StudentProfileHeader';
import { StudentProfileTabs } from './StudentProfileTabs';
import { StudentOverview } from './StudentOverview';
import { StudentCourses } from './StudentCourses';
import { StudentAchievements } from './StudentAchievements';
import { StudentAcademicHistory } from './StudentAcademicHistory';

interface StudentProfileProps {
  student: {
    id: number;
    name: string;
    grade: string;
    image: string;
    email: string;
    attendance: number;
    gpa: number;
    courses: {
      id: number;
      name: string;
      progress: number;
      grade?: string;
    }[];
    achievements: {
      id: number;
      title: string;
      date: string;
      description: string;
    }[];
    academicHistory: {
      year: string;
      grade: string;
      gpa: number;
    }[];
  };
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student }) => {
  const { t } = useLanguage();

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <StudentProfileHeader 
          name={student.name}
          grade={student.grade}
          email={student.email}
          image={student.image}
        />
      </CardHeader>
      
      <CardContent className="pt-6">
        <Tabs defaultValue="overview">
          <StudentProfileTabs />
          
          <TabsContent value="overview">
            <StudentOverview
              attendance={student.attendance}
              gpa={student.gpa}
              courses={student.courses}
            />
          </TabsContent>
          
          <TabsContent value="courses">
            <StudentCourses courses={student.courses} />
          </TabsContent>
          
          <TabsContent value="achievements">
            <StudentAchievements achievements={student.achievements} />
          </TabsContent>
          
          <TabsContent value="history">
            <StudentAcademicHistory history={student.academicHistory} />
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <Separator />
      
      <CardFooter className="flex justify-between py-4">
        <Button variant="outline">{t('printReport')}</Button>
        <Button>{t('sendMessage')}</Button>
      </CardFooter>
    </Card>
  );
};

export default StudentProfile;
