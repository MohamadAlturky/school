import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';
import StudentCalendar from '@/components/students/StudentCalendar';

interface Subject {
  name: string;
  grade: number;
  teacher: string;
}

interface Assignment {
  id: number;
  subject: string;
  title: string;
  dueDate: string;
  status: "مكتمل" | "قيد التنفيذ" | "متأخر";
  grade?: number;
}

interface Attendance {
  date: string;
  status: "حاضر" | "غائب" | "متأخر" | "إذن";
  notes?: string;
}

interface TeacherNote {
  id: number;
  teacherName: string;
  subject: string;
  date: string;
  message: string;
  category: "سلوكية" | "أكاديمية" | "عامة";
  severity?: "إيجابية" | "محايدة" | "سلبية";
}

const StudentDashboard = () => {
  const { toast } = useToast();
  
  const subjects: Subject[] = [
    { name: "اللغة العربية", grade: 85, teacher: "أحمد محمد" },
    { name: "الرياضيات", grade: 92, teacher: "سارة عبدالله" },
    { name: "العلوم", grade: 88, teacher: "خالد العلي" },
    { name: "اللغة الإنجليزية", grade: 79, teacher: "نورة السالم" },
    { name: "التربية الإسلامية", grade: 94, teacher: "محمد العمري" },
    { name: "الدراسات الاجتماعية", grade: 82, teacher: "فاطمة أحمد" },
    { name: "الحاسب الآلي", grade: 90, teacher: "علي حسن" },
  ];

  const assignments: Assignment[] = [
    {
      id: 1,
      subject: "اللغة العربية",
      title: "تحليل قصيدة",
      dueDate: "2025/05/01",
      status: "قيد التنفيذ",
    },
    {
      id: 2,
      subject: "الرياضيات",
      title: "حل مسائل المعادلات",
      dueDate: "2025/04/28",
      status: "مكتمل",
      grade: 90,
    },
    {
      id: 3,
      subject: "العلوم",
      title: "تقرير عن الخلية",
      dueDate: "2025/04/20",
      status: "متأخر",
    },
  ];

  const attendance: Attendance[] = [
    { date: "2025/04/23", status: "حاضر" },
    { date: "2025/04/22", status: "حاضر" },
    { date: "2025/04/21", status: "متأخر", notes: "تأخر 15 دقيقة" },
    { date: "2025/04/20", status: "حاضر" },
    { date: "2025/04/19", status: "حاضر" },
    { date: "2025/04/18", status: "غائب", notes: "بسبب المرض" },
    { date: "2025/04/17", status: "حاضر" },
  ];

  const teacherNotes: TeacherNote[] = [
    {
      id: 1,
      teacherName: "أحمد محمد",
      subject: "اللغة العربية",
      date: "2025/04/22",
      message: "يظهر تفوقاً ملحوظاً في مادة اللغة العربية، وخاصة في مهارات التعبير الكتابي.",
      category: "أكاديمية",
      severity: "إيجابية",
    },
    {
      id: 2,
      teacherName: "سارة عبدالله",
      subject: "الرياضيات",
      date: "2025/04/20",
      message: "يواجه بعض الصعوبات في فهم موضوع المعادلات، يرجى مراجعة الدرس.",
      category: "أكاديمية",
      severity: "محايدة",
    },
    {
      id: 3,
      teacherName: "خالد العلي",
      subject: "العلوم",
      date: "2025/04/18",
      message: "تأخر في تسليم مشروع العلوم، يرجى الحرص على متابعة الواجبات.",
      category: "سلوكية",
      severity: "سلبية",
    },
  ];

  // Get attendance statistics
  const getAttendanceStats = () => {
    const total = attendance.length;
    const present = attendance.filter(a => a.status === "حاضر").length;
    const absent = attendance.filter(a => a.status === "غائب").length;
    const late = attendance.filter(a => a.status === "متأخر").length;
    const excused = attendance.filter(a => a.status === "إذن").length;
    
    return { total, present, absent, late, excused };
  };

  const stats = getAttendanceStats();

  const calendarEvents = [
    { id: 1, title: 'اللغة العربية', date: '2025-05-10', type: 'class' as const, time: '09:00 صباحاً' },
    { id: 2, title: 'مشروع العلوم', date: '2025-05-15', type: 'assignment' as const, time: '11:59 مساءً' },
    { id: 3, title: 'امتحان التاريخ', date: '2025-05-20', type: 'exam' as const, time: '10:00 صباحاً' },
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">بوابة الطالب</h1>
          <p className="text-gray-600">مرحباً بك، عبد الله محمد</p>
        </div>
        <Button 
          variant="outline" 
          className="mt-4 md:mt-0"
          onClick={() => {
            toast({
              title: "تم تسجيل الخروج بنجاح",
            });
          }}
        >
          تسجيل الخروج
        </Button>
      </div>
      
      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="dashboard">الرئيسية</TabsTrigger>
          <TabsTrigger value="subjects">المواد الدراسية</TabsTrigger>
          <TabsTrigger value="assignments">الواجبات</TabsTrigger>
          <TabsTrigger value="attendance">الحضور والغياب</TabsTrigger>
          <TabsTrigger value="calendar">التقويم</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Student Info Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>معلومات الطالب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <img
                    src="/school/placeholder.svg"
                    alt="صورة الطالب"
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold mb-1">عبد الله محمد</h3>
                  <p className="text-gray-600">الصف السابع أ</p>
                  <div className="mt-4 w-full">
                    <Button className="w-full">عرض البطاقة المدرسية</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Attendance Summary Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>ملخص الحضور</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{stats.present}</div>
                    <div className="text-sm text-gray-600">حضور</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{stats.absent}</div>
                    <div className="text-sm text-gray-600">غياب</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">{stats.late}</div>
                    <div className="text-sm text-gray-600">تأخير</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${(stats.present / stats.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm mt-2">نسبة الحضور: {((stats.present / stats.total) * 100).toFixed(1)}%</p>
              </CardContent>
            </Card>
            
            {/* Academic Performance Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>المستوى الأكاديمي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subjects.slice(0, 4).map((subject) => (
                    <div key={subject.name} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{subject.name}</span>
                        <span className="font-medium">{subject.grade}%</span>
                      </div>
                      <Progress value={subject.grade} />
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">عرض جميع النتائج</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Notes */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>آخر ملاحظات المعلمين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherNotes.slice(0, 3).map((note) => (
                  <div key={note.id} className="border-r-4 border-r-primary rounded-md p-4 bg-muted/30">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-lg">{note.teacherName}</h4>
                        <p className="text-sm text-gray-600">{note.subject} • {note.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        note.severity === "إيجابية" ? "bg-green-100 text-green-800" :
                        note.severity === "سلبية" ? "bg-red-100 text-red-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {note.category}
                      </span>
                    </div>
                    <p>{note.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">عرض جميع الملاحظات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="subjects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>المواد الدراسية</CardTitle>
              <CardDescription>نتائج الطالب في المواد الدراسية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <h3 className="font-medium text-lg">نتائج المواد</h3>
                  {subjects.map((subject) => (
                    <div key={subject.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{subject.name}</span>
                        <span className="font-medium">{subject.grade}%</span>
                      </div>
                      <Progress
                        value={subject.grade}
                        className="h-2"
                        indicatorColor={
                          subject.grade >= 90 ? "bg-green-600" :
                          subject.grade >= 75 ? "bg-blue-600" :
                          subject.grade >= 60 ? "bg-yellow-600" : "bg-red-600"
                        }
                      />
                      <div className="text-xs text-left">
                        <span className={
                          subject.grade >= 90 ? "text-green-600" :
                          subject.grade >= 75 ? "text-blue-600" :
                          subject.grade >= 60 ? "text-yellow-600" : "text-red-600"
                        }>
                          {subject.grade >= 90 ? "ممتاز" :
                           subject.grade >= 75 ? "جيد جداً" :
                           subject.grade >= 60 ? "جيد" : "ضعيف"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-4">تطور المستوى الدراسي</h3>
                  <div className="rounded-md border p-4 h-[300px] flex items-center justify-center bg-muted">
                    <p className="text-center text-gray-500">
                      الرسم البياني لتطور المستوى الدراسي على مدار الفصل الدراسي
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>الواجبات والمشاريع</CardTitle>
              <CardDescription>قائمة الواجبات والمشاريع المدرسية</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المادة</TableHead>
                    <TableHead>الواجب</TableHead>
                    <TableHead>موعد التسليم</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الدرجة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{assignment.subject}</TableCell>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded ${
                          assignment.status === "مكتمل" ? "bg-green-100 text-green-800" :
                          assignment.status === "قيد التنفيذ" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {assignment.status}
                        </span>
                      </TableCell>
                      <TableCell>{assignment.grade || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل الحضور والغياب</CardTitle>
              <CardDescription>سجل حضور وغياب الطالب خلال الشهر الحالي</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-lg mb-4">إحصائيات الحضور</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>الحضور</span>
                      <span className="font-medium">{stats.present} أيام</span>
                    </div>
                    <Progress value={(stats.present / stats.total) * 100} className="h-2 bg-gray-200">
                      <div className="h-full bg-green-600 rounded-full" />
                    </Progress>
                    
                    <div className="flex justify-between items-center">
                      <span>الغياب</span>
                      <span className="font-medium">{stats.absent} أيام</span>
                    </div>
                    <Progress value={(stats.absent / stats.total) * 100} className="h-2 bg-gray-200">
                      <div className="h-full bg-red-600 rounded-full" />
                    </Progress>
                    
                    <div className="flex justify-between items-center">
                      <span>التأخير</span>
                      <span className="font-medium">{stats.late} أيام</span>
                    </div>
                    <Progress value={(stats.late / stats.total) * 100} className="h-2 bg-gray-200">
                      <div className="h-full bg-yellow-600 rounded-full" />
                    </Progress>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-4">طلب إذن غياب</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="absence-date">تاريخ الغياب</Label>
                      <Input id="absence-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="absence-reason">سبب الغياب</Label>
                      <textarea
                        id="absence-reason"
                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        placeholder="اذكر سبب الغياب..."
                      ></textarea>
                    </div>
                    <Button className="w-full">إرسال الطلب</Button>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <h3 className="font-medium text-lg mb-4">سجل الحضور والغياب</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>ملاحظات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          record.status === "حاضر" ? "bg-green-100 text-green-800" :
                          record.status === "غائب" ? "bg-red-100 text-red-800" :
                          record.status === "متأخر" ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {record.status}
                        </span>
                      </TableCell>
                      <TableCell>{record.notes || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <StudentCalendar assignments={calendarEvents.map(event => ({
            ...event,
            status: event.type === 'assignment' ? 'pending' : 'completed',
            type: event.type as 'class' | 'assignment' | 'exam'
          }))} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StudentHomepage = () => {
  return (
    <div>
      <StudentDashboard />
    </div>
  );
};

export default StudentHomepage; 