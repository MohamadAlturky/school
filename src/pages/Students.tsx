import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, FileVideo, BookOpen, Award, Clock } from "lucide-react";
import { NoteIcon } from "@/components/icons/NoteIcon";
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { StudentCourses } from '@/components/students/StudentCourses';
import { StudentOverview } from '@/components/students/StudentOverview';

const Students = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const studentData = {
    name: 'Ahmed Mohammed',
    grade: '10th Grade',
    attendanceRate: 95,
    gpa: 3.8,
  };

  const courses = [
    { id: 1, name: 'Mathematics', progress: 75, grade: 'A-' },
    { id: 2, name: 'Science', progress: 60, grade: 'B+' },
    { id: 3, name: 'History', progress: 80, grade: 'A' },
    { id: 4, name: 'English', progress: 85, grade: 'A' },
    { id: 5, name: 'Arabic', progress: 90, grade: 'A+' },
  ];

  const assignments = [
    { id: 1, title: 'Math Quiz - Algebra', dueDate: '2025-05-10', status: 'pending', course: 'Mathematics' },
    { id: 2, title: 'Science Project - Ecosystem', dueDate: '2025-05-15', status: 'completed', course: 'Science' },
    { id: 3, title: 'History Essay', dueDate: '2025-05-20', status: 'pending', course: 'History' },
  ];

  const calendarEvents = [
    { id: 1, title: 'Mathematics', date: '2025-05-10', type: 'class', time: '09:00 AM' },
    { id: 2, title: 'Science Project Due', date: '2025-05-15', type: 'assignment', time: '11:59 PM' },
    { id: 3, title: 'History Exam', date: '2025-05-20', type: 'exam', time: '10:00 AM' },
  ];

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">{t('students')}</h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
          <TabsTrigger value="courses">{t('courses')}</TabsTrigger>
          <TabsTrigger value="assignments">{t('assignments')}</TabsTrigger>
          <TabsTrigger value="calendar">{t('calendar')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <StudentOverview
            attendance={studentData.attendanceRate}
            gpa={studentData.gpa}
            courses={courses}
          />
        </TabsContent>

        <TabsContent value="courses">
          <StudentCourses courses={courses} />
        </TabsContent>

        <TabsContent value="assignments">
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      assignment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {t(assignment.status)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('due')}: {assignment.dueDate}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{assignment.course}</span>
                    <Button variant="outline" size="sm">
                      {t('viewDetails')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <div className="grid md:grid-cols-[350px_1fr] gap-6">
            <Card className="p-4">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="pointer-events-auto"
              />
            </Card>

            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-4">
                {date ? date.toLocaleDateString() : t('selectDate')}
              </h2>
              <div className="space-y-4">
                {calendarEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      event.type === 'exam' ? 'bg-destructive/20 text-destructive' :
                      event.type === 'assignment' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-secondary/20 text-secondary-foreground'
                    }`}>
                      {t(event.type)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="flex items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer">
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          <span>{t('viewAllCourses')}</span>
        </Card>
        <Card className="flex items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer">
          <FileText className="mr-2 h-5 w-5 text-primary" />
          <span>{t('viewAssignments')}</span>
        </Card>
        <Card className="flex items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer">
          <Award className="mr-2 h-5 w-5 text-primary" />
          <span>{t('viewGrades')}</span>
        </Card>
        <Card className="flex items-center justify-center p-4 hover:bg-accent transition-colors cursor-pointer">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          <span>{t('viewSchedule')}</span>
        </Card>
      </div>
    </div>
  );
};

export default Students;
