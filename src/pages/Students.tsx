import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, FileVideo, BookOpen, Award, Clock, Bell, MessageSquare } from "lucide-react";
import { NoteIcon } from "@/components/icons/NoteIcon";
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { StudentCourses } from '@/components/students/StudentCourses';
import { StudentOverview } from '@/components/students/StudentOverview';
import StudentCalendar from '@/components/students/StudentCalendar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Students = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const studentData = {
    name: 'Ahmed Mohammed',
    grade: '10th Grade',
    attendanceRate: 95,
    gpa: 3.8,
    avatar: '/path/to/avatar.jpg',
  };

  const courses = [
    { id: 1, name: 'Mathematics', progress: 75, grade: 'A-', teacher: 'Mr. Smith' },
    { id: 2, name: 'Science', progress: 60, grade: 'B+', teacher: 'Ms. Johnson' },
    { id: 3, name: 'History', progress: 80, grade: 'A', teacher: 'Mr. Brown' },
    { id: 4, name: 'English', progress: 85, grade: 'A', teacher: 'Ms. Davis' },
    { id: 5, name: 'Arabic', progress: 90, grade: 'A+', teacher: 'Mr. Al-Masri' },
  ];

  const assignments = [
    { id: 1, title: 'Math Quiz - Algebra', dueDate: '2025-05-10', status: 'pending', course: 'Mathematics' },
    { id: 2, title: 'Science Project - Ecosystem', dueDate: '2025-05-15', status: 'completed', course: 'Science' },
    { id: 3, title: 'History Essay', dueDate: '2025-05-20', status: 'pending', course: 'History' },
    { id: 3, title: 'FFF SSS', dueDate: '2025-05-20', status: 'missed', course: 'SSSS' }
  ];

  const recentActivities = [
    { id: 1, type: 'assignment', title: 'New Math Assignment Posted', time: '2 hours ago' },
    { id: 2, type: 'announcement', title: 'School Assembly Tomorrow', time: '5 hours ago' },
    { id: 3, type: 'grade', title: 'Science Test Grade Updated', time: '1 day ago' },
  ];

  const calendarEvents = [
    { id: 1, title: 'Mathematics', date: '2025-05-10', type: 'class' as const, time: '09:00 AM' },
    { id: 2, title: 'Science Project Due', date: '2025-05-15', type: 'assignment' as const, time: '11:59 PM' },
    { id: 4, title: 'Science Project Due', date: '2025-05-15', type: 'class' as const, time: '11:59 PM' },
    { id: 3, title: 'History Exam', date: '2025-05-20', type: 'exam' as const, time: '10:00 AM' },
  ];

  return (
    <div className="container py-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Welcome back, {studentData.name}!</h1>
          <p className="text-muted-foreground">{studentData.grade} • {t('attendance')}: {studentData.attendanceRate}%</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src={studentData.avatar} />
            <AvatarFallback>{studentData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('gpa')}</p>
              <p className="text-2xl font-bold">{studentData.gpa}</p>
            </div>
            <Award className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('activeCourses')}</p>
              <p className="text-2xl font-bold">{courses.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('pendingAssignments')}</p>
              <p className="text-2xl font-bold">{assignments.filter(a => a.status === 'pending').length}</p>
            </div>
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('attendance')}</p>
              <p className="text-2xl font-bold">{studentData.attendanceRate}%</p>
            </div>
            <Clock className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Courses and Assignments */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calendar">{t('calendar')}</TabsTrigger>
              <TabsTrigger value="courses">{t('courses')}</TabsTrigger>
              <TabsTrigger value="assignments">{t('assignments')}</TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
              <StudentCourses courses={courses} />
            </TabsContent>
            <TabsContent value="calendar">
              <StudentCalendar assignments={calendarEvents.map(event => ({
                ...event,
                status: event.type === 'assignment' ? 'pending' : 'completed',
                type: event.type as 'class' | 'assignment' | 'exam'
              }))} />
            </TabsContent>
            <TabsContent value="assignments">
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <Card key={assignment.id}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <Badge variant={assignment.status === 'completed' ? 'default' : 'secondary'}>
                          {t(assignment.status)}
                        </Badge>
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
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('recentActivities')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.type === 'assignment' && <FileText className="h-5 w-5 text-primary" />}
                      {activity.type === 'announcement' && <Bell className="h-5 w-5 text-primary" />}
                      {activity.type === 'grade' && <Award className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Students;