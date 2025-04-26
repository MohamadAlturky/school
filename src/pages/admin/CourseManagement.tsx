import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar as CalendarIcon, 
  File, 
  FileVideo, 
  ChartBar,
  Pencil, 
  Archive, 
  Users, 
  Bell, 
  MessageSquare
} from 'lucide-react';
import NoteIcon from '@/components/icons/NoteIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { useParams } from 'react-router-dom';

const StudentsManagement = ({ courseId }) => (
  <div className="container py-8">
    <h2 className="text-2xl font-bold mb-4">إدارة الطلاب للمادة #{courseId}</h2>
    <p>هنا يمكنك إدارة الطلاب المسجلين في هذه المادة.</p>
    {/* Add student management UI here */}
  </div>
);

const FilesManagement = ({ courseId }) => (
  <div className="container py-8">
    <h2 className="text-2xl font-bold mb-4">ملفات المادة #{courseId}</h2>
    <p>هنا يمكنك إدارة ملفات المادة.</p>
    {/* Add file management UI here */}
  </div>
);

const CourseManagement = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { courseId, subview } = useParams();

  const [courseArchives] = useState([
    { year: '2024-2025', courses: 12 },
    { year: '2023-2024', courses: 15 },
    { year: '2022-2023', courses: 10 },
  ]);

  const [courseCalendar] = useState([
    { id: 1, title: 'Math Quiz', date: '2025-05-10', type: 'exam' },
    { id: 2, title: 'Science Project Due', date: '2025-05-15', type: 'assignment' },
    { id: 3, title: 'Arabic Literature Review', date: '2025-05-20', type: 'class' },
    { id: 4, title: 'End of Semester', date: '2025-06-15', type: 'event' },
  ]);

  const [students] = useState([
    { id: 1, name: 'Ahmed Hassan', progress: 85, files: 12, notes: 8, submitted: 15, total: 18 },
    { id: 2, name: 'Fatima Ali', progress: 92, files: 15, notes: 10, submitted: 17, total: 18 },
    { id: 3, name: 'Mohammed Saleh', progress: 78, files: 10, notes: 5, submitted: 14, total: 18 },
  ]);

  const [courseMedia] = useState([
    { id: 1, title: 'Introduction to Algebra', type: 'video', size: '120MB', uploaded: '2025-04-10' },
    { id: 2, title: 'Scientific Method Diagram', type: 'image', size: '2.5MB', uploaded: '2025-04-12' },
    { id: 3, title: 'Arabic Poetry Recitation', type: 'audio', size: '45MB', uploaded: '2025-04-15' },
  ]);

  if (subview === 'students') {
    return <StudentsManagement courseId={courseId} />;
  }
  if (subview === 'files') {
    return <FilesManagement courseId={courseId} />;
  }
  return (
    <div className="container px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('courseManagement')}</h1>
        <Button onClick={() => {
          toast({
            title: t('settingsSaved'),
            description: t('courseSettingsUpdated'),
          });
        }}>
          {t('saveChanges')}
        </Button>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            {React.createElement(CalendarIcon, { className: "h-4 w-4" })}
            {t('calendar')}
          </TabsTrigger>
          <TabsTrigger value="files" className="flex items-center gap-2">
            {React.createElement(File, { className: "h-4 w-4" })}
            {t('files')}
          </TabsTrigger>
          <TabsTrigger value="multimedia" className="flex items-center gap-2">
            {React.createElement(FileVideo, { className: "h-4 w-4" })}
            {t('multimedia')}
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            {React.createElement(NoteIcon, { className: "h-4 w-4" })}
            {t('notes')}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            {React.createElement(ChartBar, { className: "h-4 w-4" })}
            {t('analytics')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('courseCalendar')}</CardTitle>
              <CardDescription>{t('manageCourseScheduleDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">{t('upcomingEvents')}</h3>
                  <div className="space-y-3">
                    {courseCalendar.map((event) => (
                      <Card key={event.id} className="border-r-4 border-r-primary">
                        <CardHeader className="p-3">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">{event.title}</CardTitle>
                            <span className="text-sm text-muted-foreground">{event.date}</span>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>{t('addNewEvent')}</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t('addNewEvent')}</DialogTitle>
                          <DialogDescription>{t('fillEventDetails')}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="event-title">{t('eventTitle')}</Label>
                            <Input id="event-title" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="event-date">{t('eventDate')}</Label>
                            <Input type="date" id="event-date" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="event-type">{t('eventType')}</Label>
                            <select 
                              id="event-type" 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                              <option value="exam">{t('exam')}</option>
                              <option value="assignment">{t('assignment')}</option>
                              <option value="class">{t('class')}</option>
                              <option value="event">{t('event')}</option>
                            </select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="event-description">{t('description')}</Label>
                            <textarea 
                              id="event-description" 
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button>{t('save')}</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('studentFiles')}</CardTitle>
              <CardDescription>{t('manageStudentDocumentsDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">{t('studentDocuments')}</h3>
                  <Button>{t('uploadNewFile')}</Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('student')}</TableHead>
                      <TableHead>{t('files')}</TableHead>
                      <TableHead>{t('lastUpdate')}</TableHead>
                      <TableHead className="text-right">{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.files}</TableCell>
                        <TableCell>2025-04-20</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">{t('view')}</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multimedia" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('courseMultimedia')}</CardTitle>
              <CardDescription>{t('manageCourseMediaDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">{t('mediaFiles')}</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">{t('uploadVideo')}</Button>
                    <Button variant="outline">{t('uploadImage')}</Button>
                    <Button variant="outline">{t('uploadAudio')}</Button>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('title')}</TableHead>
                      <TableHead>{t('type')}</TableHead>
                      <TableHead>{t('size')}</TableHead>
                      <TableHead>{t('uploaded')}</TableHead>
                      <TableHead className="text-right">{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseMedia.map((media) => (
                      <TableRow key={media.id}>
                        <TableCell className="font-medium">{media.title}</TableCell>
                        <TableCell>{media.type}</TableCell>
                        <TableCell>{media.size}</TableCell>
                        <TableCell>{media.uploaded}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">{t('play')}</Button>
                            <Button variant="outline" size="sm">{t('download')}</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('courseNotes')}</CardTitle>
              <CardDescription>{t('manageNotesDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-6 h-[200px]">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    {React.createElement(Pencil, { className: "h-6 w-6 text-primary" })}
                  </div>
                  <Button>{t('createNewNote')}</Button>
                </Card>
                
                <Card className="h-[200px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t('mathFormulas')}</CardTitle>
                    <CardDescription>2025-04-15</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[80px] overflow-hidden text-sm">
                    <p>{t('mathFormulasDescription')}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm">{t('edit')}</Button>
                    <Button variant="ghost" size="sm">{t('share')}</Button>
                  </CardFooter>
                </Card>
                
                <Card className="h-[200px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t('arabicPoetry')}</CardTitle>
                    <CardDescription>2025-04-10</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[80px] overflow-hidden text-sm">
                    <p>{t('arabicPoetryDescription')}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm">{t('edit')}</Button>
                    <Button variant="ghost" size="sm">{t('share')}</Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('performanceAnalytics')}</CardTitle>
              <CardDescription>{t('coursePerformanceDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">{t('studentProgress')}</h3>
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div key={student.id} className="space-y-1">
                        <div className="flex justify-between">
                          <span>{student.name}</span>
                          <span>{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">{t('assignmentCompletion')}</h3>
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div key={student.id} className="space-y-1">
                        <div className="flex justify-between">
                          <span>{student.name}</span>
                          <span>{student.submitted}/{student.total}</span>
                        </div>
                        <Progress value={(student.submitted / student.total) * 100} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {React.createElement(Archive, { className: "h-4 w-4 text-primary" })}
              <CardTitle>{t('courseArchive')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseArchives.map((archive, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{archive.year}</span>
                  <span className="text-sm text-muted-foreground">
                    {archive.courses} {t('courses')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">{t('viewAll')}</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {React.createElement(Users, { className: "h-4 w-4 text-primary" })}
              <CardTitle>{t('studentProfiles')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {students.map((student) => (
                <div key={student.id} className="flex justify-between items-center">
                  <span>{student.name}</span>
                  <Button variant="ghost" size="sm">{t('view')}</Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">{t('viewAll')}</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {React.createElement(Bell, { className: "h-4 w-4 text-primary" })}
              <CardTitle>{t('notifications')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-2 bg-muted rounded-lg">
                <p className="text-sm font-medium">{t('assignmentDueSoon')}</p>
                <p className="text-xs text-muted-foreground">{t('mathQuizDue')}</p>
              </div>
              <div className="p-2 bg-muted rounded-lg">
                <p className="text-sm font-medium">{t('newStudentNote')}</p>
                <p className="text-xs text-muted-foreground">{t('studentAddedNote')}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">{t('manageNotifications')}</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {React.createElement(MessageSquare, { className: "h-4 w-4 text-primary" })}
              <CardTitle>{t('collaboration')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-2 bg-muted rounded-lg">
                <p className="text-sm font-medium">{t('scienceProjectGroup')}</p>
                <p className="text-xs text-muted-foreground">5 {t('members')}</p>
              </div>
              <div className="p-2 bg-muted rounded-lg">
                <p className="text-sm font-medium">{t('mathStudyGroup')}</p>
                <p className="text-xs text-muted-foreground">3 {t('members')}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">{t('createGroup')}</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CourseManagement;
