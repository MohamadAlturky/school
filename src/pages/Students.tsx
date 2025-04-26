import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, FileVideo } from "lucide-react";
import { NoteIcon } from "@/components/icons/NoteIcon";
import { useLanguage } from '@/contexts/LanguageContext';

const Students = () => {
  const { t } = useLanguage();

  const studentData = {
    name: 'Ahmed Mohammed',
    grade: '10th Grade',
    attendanceRate: '95%',
    gpa: '3.8',
  };

  const courseProgress = [
    { course: 'Mathematics', progress: 75 },
    { course: 'Science', progress: 60 },
    { course: 'History', progress: 80 },
  ];

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">{t('students')}</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Student Profile Card */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">{studentData.name}</h2>
            <p className="text-muted-foreground">{studentData.grade}</p>
            <div className="mt-4 space-y-2">
              <p>
                {t('attendanceRate')}: {studentData.attendanceRate}
              </p>
              <p>
                {t('gpa')}: {studentData.gpa}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Course Progress Card */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('courseProgress')}</h2>
            <div className="space-y-4">
              {courseProgress.map((course, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{course.course}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span>{course.progress}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="flex items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          <span>{t('viewAllCourses')}</span>
        </Card>
        <Card className="flex items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer">
          <FileText className="mr-2 h-5 w-5 text-primary" />
          <span>{t('viewAssignments')}</span>
        </Card>
        <Card className="flex items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer">
          <FileVideo className="mr-2 h-5 w-5 text-primary" />
          <span>{t('viewNotes')}</span>
        </Card>
        <Card className="flex items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer">
          <NoteIcon className="mr-2 h-5 w-5 text-primary" />
          <span>{t('enterCourse')}</span>
        </Card>
      </div>
    </div>
  );
};

export default Students;
