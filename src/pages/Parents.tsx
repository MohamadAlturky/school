
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';

interface Student {
  id: number;
  name: string;
  grade: string;
  image: string;
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

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: "قادم" | "منتهي" | "ملغي";
}

interface Payment {
  id: number;
  description: string;
  amount: number;
  dueDate: string;
  status: "مدفوع" | "غير مدفوع" | "متأخر";
  paymentDate?: string;
}

const ParentDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  
  const [selectedStudent, setSelectedStudent] = useState<number>(1);

  const students: Student[] = [
    {
      id: 1,
      name: "عبد الله محمد",
      grade: "الصف السابع أ",
      image: "/school/placeholder.svg",
    },
    {
      id: 2,
      name: "سارة محمد",
      grade: "الصف الخامس ب",
      image: "/school/placeholder.svg",
    },
  ];

  const attendance: Record<number, Attendance[]> = {
    1: [
      { date: "2025/04/23", status: "حاضر" },
      { date: "2025/04/22", status: "حاضر" },
      { date: "2025/04/21", status: "متأخر", notes: "تأخر 15 دقيقة" },
      { date: "2025/04/20", status: "حاضر" },
      { date: "2025/04/19", status: "حاضر" },
      { date: "2025/04/18", status: "غائب", notes: "بسبب المرض" },
      { date: "2025/04/17", status: "حاضر" },
    ],
    2: [
      { date: "2025/04/23", status: "حاضر" },
      { date: "2025/04/22", status: "حاضر" },
      { date: "2025/04/21", status: "حاضر" },
      { date: "2025/04/20", status: "إذن", notes: "زيارة طبية" },
      { date: "2025/04/19", status: "حاضر" },
      { date: "2025/04/18", status: "حاضر" },
      { date: "2025/04/17", status: "حاضر" },
    ]
  };

  const academicResults: Record<number, Record<string, number>> = {
    1: {
      "اللغة العربية": 85,
      "الرياضيات": 92,
      "العلوم": 88,
      "اللغة الإنجليزية": 79,
      "التربية الإسلامية": 94,
      "الدراسات الاجتماعية": 82,
      "الحاسب الآلي": 90,
    },
    2: {
      "اللغة العربية": 90,
      "الرياضيات": 85,
      "العلوم": 92,
      "اللغة الإنجليزية": 88,
      "التربية الإسلامية": 95,
      "الدراسات الاجتماعية": 87,
      "الحاسب الآلي": 93,
    }
  };

  const teacherNotes: Record<number, TeacherNote[]> = {
    1: [
      {
        id: 1,
        teacherName: "أحمد محمد",
        subject: "اللغة العربية",
        date: "2025/04/22",
        message: "يظهر عبد الله تفوقاً ملحوظاً في مادة اللغة العربية، وخاصة في مهارات التعبير الكتابي.",
        category: "أكاديمية",
        severity: "إيجابية",
      },
      {
        id: 2,
        teacherName: "سارة عبدالله",
        subject: "الرياضيات",
        date: "2025/04/20",
        message: "يواجه عبد الله بعض الصعوبات في فهم موضوع المعادلات، يرجى متابعته في المنزل.",
        category: "أكاديمية",
        severity: "محايدة",
      },
      {
        id: 3,
        teacherName: "خالد العلي",
        subject: "العلوم",
        date: "2025/04/18",
        message: "تأخر عبد الله في تسليم مشروع العلوم، يرجى الحرص على متابعة واجباته.",
        category: "سلوكية",
        severity: "سلبية",
      },
    ],
    2: [
      {
        id: 4,
        teacherName: "نورة السالم",
        subject: "اللغة الإنجليزية",
        date: "2025/04/21",
        message: "تتميز سارة بالمشاركة الفعالة في الفصل ومستواها ممتاز في اللغة الإنجليزية.",
        category: "أكاديمية",
        severity: "إيجابية",
      },
      {
        id: 5,
        teacherName: "محمد العمري",
        subject: "التربية الإسلامية",
        date: "2025/04/19",
        message: "سارة طالبة مهذبة وملتزمة بآداب الحوار والنقاش داخل الفصل.",
        category: "سلوكية",
        severity: "إيجابية",
      },
    ]
  };

  const meetings: Meeting[] = [
    {
      id: 1,
      title: "اجتماع أولياء الأمور العام",
      date: "2025/05/05",
      time: "16:00",
      location: "القاعة الرئيسية",
      description: "مناقشة خطة الفصل الدراسي القادم والإجابة على استفسارات أولياء الأمور.",
      status: "قادم",
    },
    {
      id: 2,
      title: "لقاء مع معلم اللغة العربية",
      date: "2025/04/28",
      time: "14:30",
      location: "غرفة الاجتماعات 2",
      description: "مناقشة مستوى الطالب في مادة اللغة العربية وسبل تحسين أدائه.",
      status: "قادم",
    },
    {
      id: 3,
      title: "اجتماع لجنة أولياء الأمور",
      date: "2025/04/15",
      time: "17:00",
      location: "القاعة الصغرى",
      description: "مناقشة أنشطة المدرسة للفصل الدراسي الحالي ودور أولياء الأمور في دعمها.",
      status: "منتهي",
    },
  ];

  const payments: Payment[] = [
    {
      id: 1,
      description: "الرسوم الدراسية - الفصل الثاني",
      amount: 5000,
      dueDate: "2025/04/01",
      status: "مدفوع",
      paymentDate: "2025/03/25",
    },
    {
      id: 2,
      description: "رسوم الأنشطة الإضافية",
      amount: 800,
      dueDate: "2025/04/15",
      status: "مدفوع",
      paymentDate: "2025/04/10",
    },
    {
      id: 3,
      description: "رسوم الرحلة المدرسية",
      amount: 350,
      dueDate: "2025/05/01",
      status: "غير مدفوع",
    },
    {
      id: 4,
      description: "رسوم الكتب الدراسية",
      amount: 600,
      dueDate: "2025/03/15",
      status: "متأخر",
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "يرجى إدخال اسم المستخدم وكلمة المرور",
        variant: "destructive",
      });
      return;
    }

    // For demo purposes, accept any login
    setIsLoggedIn(true);
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: `مرحبًا بك ${username}`,
    });
  };

  // Get attendance statistics for the selected student
  const getAttendanceStats = () => {
    const studentAttendance = attendance[selectedStudent] || [];
    const total = studentAttendance.length;
    const present = studentAttendance.filter(a => a.status === "حاضر").length;
    const absent = studentAttendance.filter(a => a.status === "غائب").length;
    const late = studentAttendance.filter(a => a.status === "متأخر").length;
    const excused = studentAttendance.filter(a => a.status === "إذن").length;
    
    return { total, present, absent, late, excused };
  };

  const stats = getAttendanceStats();

  if (!isLoggedIn) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">بوابة ولي الأمر</CardTitle>
            <CardDescription className="text-center">يرجى تسجيل الدخول للوصول إلى حسابك</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">اسم المستخدم</Label>
                <Input
                  id="username"
                  placeholder="أدخل اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">تسجيل الدخول</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link">نسيت كلمة المرور؟</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">بوابة ولي الأمر</h1>
          <p className="text-gray-600">مرحبًا بك، محمد أحمد</p>
        </div>
        <Button 
          variant="outline" 
          className="mt-4 md:mt-0"
          onClick={() => {
            setIsLoggedIn(false);
            setUsername('');
            setPassword('');
            toast({
              title: "تم تسجيل الخروج بنجاح",
            });
          }}
        >
          تسجيل الخروج
        </Button>
      </div>
      
      {students.length > 1 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">اختر الطالب</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {students.map((student) => (
              <button
                key={student.id}
                className={`flex flex-col items-center p-2 border rounded-lg min-w-[120px] transition-all ${
                  selectedStudent === student.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedStudent(student.id)}
              >
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-16 h-16 rounded-full mb-2 object-cover"
                />
                <span className="font-medium text-sm">{student.name}</span>
                <span className="text-xs text-gray-500">{student.grade}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="dashboard">الرئيسية</TabsTrigger>
          <TabsTrigger value="attendance">الحضور والغياب</TabsTrigger>
          <TabsTrigger value="academic">المستوى الأكاديمي</TabsTrigger>
          <TabsTrigger value="behavior">ملاحظات المعلمين</TabsTrigger>
          <TabsTrigger value="meetings">الاجتماعات والمدفوعات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Current Student Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>معلومات الطالب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <img
                    src={students.find(s => s.id === selectedStudent)?.image || "/school/placeholder.svg"}
                    alt="صورة الطالب"
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold mb-1">
                    {students.find(s => s.id === selectedStudent)?.name || ""}
                  </h3>
                  <p className="text-gray-600">
                    {students.find(s => s.id === selectedStudent)?.grade || ""}
                  </p>
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
                  {Object.entries(academicResults[selectedStudent] || {}).slice(0, 4).map(([subject, score]) => (
                    <div key={subject} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{subject}</span>
                        <span className="font-medium">{score}%</span>
                      </div>
                      <Progress value={score} />
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
                {(teacherNotes[selectedStudent] || []).slice(0, 3).map((note) => (
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
          
          {/* Upcoming Meetings */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>الاجتماعات القادمة</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العنوان</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الوقت</TableHead>
                    <TableHead>المكان</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meetings
                    .filter(meeting => meeting.status === "قادم")
                    .map((meeting) => (
                    <TableRow key={meeting.id}>
                      <TableCell className="font-medium">{meeting.title}</TableCell>
                      <TableCell>{meeting.date}</TableCell>
                      <TableCell>{meeting.time}</TableCell>
                      <TableCell>{meeting.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Payment Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>ملخص المدفوعات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {payments.filter(p => p.status === "مدفوع").length}
                  </div>
                  <div className="text-sm text-gray-600">مدفوع</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {payments.filter(p => p.status === "غير مدفوع").length}
                  </div>
                  <div className="text-sm text-gray-600">غير مدفوع</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {payments.filter(p => p.status === "متأخر").length}
                  </div>
                  <div className="text-sm text-gray-600">متأخر</div>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">المدفوعات المستحقة</h4>
              <div className="space-y-2">
                {payments.filter(p => p.status !== "مدفوع").map((payment) => (
                  <div
                    key={payment.id}
                    className={`flex justify-between items-center p-3 rounded-md ${
                      payment.status === "متأخر" ? "bg-red-50" : "bg-blue-50"
                    }`}
                  >
                    <div>
                      <p className="font-medium">{payment.description}</p>
                      <p className="text-sm text-gray-600">تاريخ الاستحقاق: {payment.dueDate}</p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold">{payment.amount} ر.س</p>
                      <Button size="sm" className="mt-1">دفع</Button>
                    </div>
                  </div>
                ))}
              </div>
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
                    
                    <div className="flex justify-between items-center">
                      <span>الإذن</span>
                      <span className="font-medium">{stats.excused} أيام</span>
                    </div>
                    <Progress value={(stats.excused / stats.total) * 100} className="h-2 bg-gray-200">
                      <div className="h-full bg-blue-600 rounded-full" />
                    </Progress>
                  </div>
                </div>
                
                <div className="border-l pl-6">
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
                    <div className="space-y-2">
                      <Label htmlFor="absence-file">المرفقات (اختياري)</Label>
                      <Input id="absence-file" type="file" />
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
                  {(attendance[selectedStudent] || []).map((record, index) => (
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
              
              <div className="mt-4 text-center">
                <Button variant="outline">تحميل سجل الحضور والغياب</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="academic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>المستوى الأكاديمي</CardTitle>
              <CardDescription>نتائج الطالب في المواد الدراسية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <h3 className="font-medium text-lg">نتائج المواد</h3>
                  {Object.entries(academicResults[selectedStudent] || {}).map(([subject, score]) => (
                    <div key={subject} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{subject}</span>
                        <span className="font-medium">{score}%</span>
                      </div>
                      <Progress
                        value={score}
                        className="h-2"
                        indicatorColor={
                          score >= 90 ? "bg-green-600" :
                          score >= 75 ? "bg-blue-600" :
                          score >= 60 ? "bg-yellow-600" : "bg-red-600"
                        }
                      />
                      <div className="text-xs text-left">
                        <span className={
                          score >= 90 ? "text-green-600" :
                          score >= 75 ? "text-blue-600" :
                          score >= 60 ? "text-yellow-600" : "text-red-600"
                        }>
                          {score >= 90 ? "ممتاز" :
                           score >= 75 ? "جيد جداً" :
                           score >= 60 ? "جيد" : "ضعيف"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-4">تطور المستوى الدراسي</h3>
                  {/* This would typically be a chart showing progress over time */}
                  <div className="rounded-md border p-4 h-[300px] flex items-center justify-center bg-muted">
                    <p className="text-center text-gray-500">
                      الرسم البياني لتطور المستوى الدراسي على مدار الفصل الدراسي
                    </p>
                  </div>
                  
                  <h3 className="font-medium text-lg mt-6 mb-4">توصيات المعلمين</h3>
                  <div className="space-y-3">
                    <div className="border-r-4 border-r-blue-500 rounded-md p-3 bg-blue-50">
                      <p className="font-medium">اللغة العربية</p>
                      <p className="text-sm">التركيز على تحسين مهارات الكتابة الإبداعية والتعبير.</p>
                    </div>
                    <div className="border-r-4 border-r-yellow-500 rounded-md p-3 bg-yellow-50">
                      <p className="font-medium">الرياضيات</p>
                      <p className="text-sm">يحتاج إلى مزيد من التدريب على حل المسائل المعقدة.</p>
                    </div>
                    <div className="border-r-4 border-r-green-500 rounded-md p-3 bg-green-50">
                      <p className="font-medium">العلوم</p>
                      <p className="text-sm">أداء ممتاز في التجارب العملية، يُنصح بالمشاركة في نادي العلوم.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium text-lg mb-4">الواجبات والمشاريع</h3>
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
                    <TableRow>
                      <TableCell>اللغة العربية</TableCell>
                      <TableCell>تحليل قصيدة</TableCell>
                      <TableCell>2025/05/01</TableCell>
                      <TableCell>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">قيد التنفيذ</span>
                      </TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>الرياضيات</TableCell>
                      <TableCell>حل مسائل المعادلات</TableCell>
                      <TableCell>2025/04/28</TableCell>
                      <TableCell>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">مكتمل</span>
                      </TableCell>
                      <TableCell>90/100</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>العلوم</TableCell>
                      <TableCell>تقرير عن الخلية</TableCell>
                      <TableCell>2025/04/20</TableCell>
                      <TableCell>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">متأخر</span>
                      </TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 text-center">
                <Button>تحميل التقرير الأكاديمي الكامل</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="behavior" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>ملاحظات المعلمين</CardTitle>
              <CardDescription>ملاحظات المعلمين حول أداء وسلوك الطالب</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-800 text-lg">ملاحظات إيجابية</CardTitle>
                    <CardDescription className="text-green-700">
                      {(teacherNotes[selectedStudent] || []).filter(n => n.severity === "إيجابية").length} ملاحظة
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-800 text-lg">ملاحظات محايدة</CardTitle>
                    <CardDescription className="text-blue-700">
                      {(teacherNotes[selectedStudent] || []).filter(n => n.severity === "محايدة").length} ملاحظة
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-red-50 border-red-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-red-800 text-lg">ملاحظات سلبية</CardTitle>
                    <CardDescription className="text-red-700">
                      {(teacherNotes[selectedStudent] || []).filter(n => n.severity === "سلبية").length} ملاحظة
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-4">جميع الملاحظات</h3>
                  {(teacherNotes[selectedStudent] || []).map((note) => (
                    <div
                      key={note.id}
                      className={`border-r-4 rounded-md p-4 mb-4 ${
                        note.severity === "إيجابية" ? "border-r-green-500 bg-green-50" :
                        note.severity === "سلبية" ? "border-r-red-500 bg-red-50" :
                        "border-r-blue-500 bg-blue-50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-lg">{note.teacherName}</h4>
                          <p className="text-sm text-gray-600">{note.subject} • {note.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          note.category === "سلوكية" ? "bg-purple-100 text-purple-800" :
                          note.category === "أكاديمية" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {note.category}
                        </span>
                      </div>
                      <p>{note.message}</p>
                      <div className="mt-3 flex justify-end">
                        <Button variant="outline" size="sm">الرد</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium text-lg mb-4">إرسال رسالة للمعلم</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher">المعلم</Label>
                    <select
                      id="teacher"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="">اختر المعلم...</option>
                      <option value="1">أحمد محمد - اللغة العربية</option>
                      <option value="2">سارة عبدالله - الرياضيات</option>
                      <option value="3">خالد العلي - العلوم</option>
                      <option value="4">نورة السالم - اللغة الإنجليزية</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message-subject">الموضوع</Label>
                    <Input id="message-subject" placeholder="أدخل موضوع الرسالة" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message-content">الرسالة</Label>
                    <textarea
                      id="message-content"
                      className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      placeholder="اكتب رسالتك هنا..."
                    ></textarea>
                  </div>
                  <Button className="w-full">إرسال الرسالة</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="meetings" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>الاجتماعات</CardTitle>
                <CardDescription>اجتماعات المدرسة وأولياء الأمور</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <h3 className="font-medium text-lg">الاجتماعات القادمة</h3>
                  {meetings.filter(m => m.status === "قادم").map((meeting) => (
                    <Card key={meeting.id} className="mb-4">
                      <CardHeader className="py-3">
                        <CardTitle className="text-lg">{meeting.title}</CardTitle>
                        <CardDescription>
                          <span>{meeting.date}</span>
                          <span className="mx-2">•</span>
                          <span>{meeting.time}</span>
                          <span className="mx-2">•</span>
                          <span>{meeting.location}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="py-0">
                        <p>{meeting.description}</p>
                      </CardContent>
                      <CardFooter className="pt-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">تغيير الموعد</Button>
                        <Button size="sm">تأكيد الحضور</Button>
                      </CardFooter>
                    </Card>
                  ))}
                  
                  <h3 className="font-medium text-lg mt-8">الاجتماعات السابقة</h3>
                  {meetings.filter(m => m.status !== "قادم").map((meeting) => (
                    <Card key={meeting.id} className="mb-4 bg-muted/30">
                      <CardHeader className="py-3">
                        <CardTitle className="text-lg">{meeting.title}</CardTitle>
                        <CardDescription>
                          <span>{meeting.date}</span>
                          <span className="mx-2">•</span>
                          <span>{meeting.time}</span>
                          <span className="mx-2">•</span>
                          <span>{meeting.location}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="py-0">
                        <p>{meeting.description}</p>
                      </CardContent>
                      <CardFooter className="pt-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          meeting.status === "منتهي" ? "bg-gray-100 text-gray-800" : 
                          "bg-red-100 text-red-800"
                        }`}>
                          {meeting.status}
                        </span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>المدفوعات</CardTitle>
                <CardDescription>سجل المدفوعات المدرسية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <h3 className="font-medium text-lg">المدفوعات المستحقة</h3>
                  {payments.filter(p => p.status !== "مدفوع").map((payment) => (
                    <div
                      key={payment.id}
                      className={`flex justify-between items-center p-4 rounded-md mb-3 ${
                        payment.status === "متأخر" ? "bg-red-50 border border-red-200" : 
                        "bg-blue-50 border border-blue-200"
                      }`}
                    >
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-sm text-gray-600">تاريخ الاستحقاق: {payment.dueDate}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-bold">{payment.amount} ر.س</p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="mt-1">دفع الآن</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>دفع الرسوم</DialogTitle>
                              <DialogDescription>
                                {payment.description} - {payment.amount} ر.س
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="payment-method">طريقة الدفع</Label>
                                <select
                                  id="payment-method"
                                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                >
                                  <option value="">اختر طريقة الدفع...</option>
                                  <option value="card">بطاقة ائتمان</option>
                                  <option value="bank">تحويل بنكي</option>
                                  <option value="cash">نقداً في المدرسة</option>
                                </select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="card-number">رقم البطاقة</Label>
                                <Input id="card-number" placeholder="أدخل رقم البطاقة" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="expiry">تاريخ انتهاء الصلاحية</Label>
                                  <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
                                  <Input id="cvv" placeholder="123" />
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">تأكيد الدفع</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                  
                  <h3 className="font-medium text-lg mt-8">سجل المدفوعات</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الوصف</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>تاريخ الدفع</TableHead>
                        <TableHead>الحالة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.filter(p => p.status === "مدفوع").map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell>{payment.amount} ر.س</TableCell>
                          <TableCell>{payment.paymentDate}</TableCell>
                          <TableCell>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {payment.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline">تحميل إيصالات الدفع</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Parents = () => {
  return (
    <div>
      <ParentDashboard />
    </div>
  );
};

export default Parents;
