import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { Badge } from '@/components/ui/badge';

interface Course {
  id: string;
  title: string;
  description: string;
  teacher: string;
  schedule: string;
  duration: string;
  level: string;
  image: string;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  materials: string[];
  completed: boolean;
}

interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "مكتمل" | "قيد التنفيذ" | "متأخر";
  grade?: number;
}

interface Resource {
  id: number;
  title: string;
  type: "ملف" | "رابط" | "فيديو";
  url: string;
  description: string;
}

interface Discussion {
  id: number;
  author: string;
  date: string;
  content: string;
  replies: number;
}

const CourseDetails = () => {
  const { courseId } = useParams();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data - In a real application, this would come from an API
  const course: Course = {
    id: courseId || "1",
    title: "اللغة العربية - الصف السابع",
    description: "دورة شاملة في اللغة العربية للصف السابع تغطي قواعد اللغة، الأدب، والبلاغة.",
    teacher: "أحمد محمد",
    schedule: "الأحد، الثلاثاء، الخميس - 9:00 صباحاً",
    duration: "12 أسبوع",
    level: "متوسط",
    image: "/placeholder.svg",
  };

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "مقدمة في النحو",
      description: "تعلم أساسيات النحو العربي وأهم القواعد",
      duration: "45 دقيقة",
      videoUrl: "https://example.com/video1",
      materials: ["ملف PDF", "تمارين", "ملخص الدرس"],
      completed: true,
    },
    {
      id: 2,
      title: "البلاغة العربية",
      description: "دراسة علم البلاغة وأهم أساليبها",
      duration: "60 دقيقة",
      videoUrl: "https://example.com/video2",
      materials: ["ملف PDF", "تمارين", "أمثلة تطبيقية"],
      completed: false,
    },
    // Add more lessons...
  ];

  const assignments: Assignment[] = [
    {
      id: 1,
      title: "تحليل قصيدة",
      description: "تحليل قصيدة من الشعر العربي الحديث",
      dueDate: "2025/05/01",
      status: "قيد التنفيذ",
    },
    {
      id: 2,
      title: "بحث عن علماء النحو",
      description: "إعداد بحث عن أهم علماء النحو العرب",
      dueDate: "2025/04/25",
      status: "مكتمل",
      grade: 95,
    },
    // Add more assignments...
  ];

  const resources: Resource[] = [
    {
      id: 1,
      title: "كتاب النحو الواضح",
      type: "ملف",
      url: "https://example.com/book1",
      description: "كتاب شامل في قواعد النحو العربي",
    },
    {
      id: 2,
      title: "فيديو تعليمي عن البلاغة",
      type: "فيديو",
      url: "https://example.com/video3",
      description: "شرح مبسط لمفاهيم البلاغة",
    },
    // Add more resources...
  ];

  const discussions: Discussion[] = [
    {
      id: 1,
      author: "سارة أحمد",
      date: "2025/04/20",
      content: "هل يمكن شرح المفعول المطلق مرة أخرى؟",
      replies: 3,
    },
    {
      id: 2,
      author: "محمد خالد",
      date: "2025/04/19",
      content: "أريد مساعدة في تحليل القصيدة",
      replies: 2,
    },
    // Add more discussions...
  ];

  const handleSubmitAssignment = (assignmentId: number) => {
    toast({
      title: "تم تسليم الواجب",
      description: "تم تسليم الواجب بنجاح وسيتم تقييمه قريباً",
    });
  };

  const handleJoinDiscussion = () => {
    toast({
      title: "تم إضافة المشاركة",
      description: "تم إضافة مشاركتك في النقاش بنجاح",
    });
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">{course.level}</Badge>
            <Badge variant="outline">{course.duration}</Badge>
            <Badge variant="outline">{course.schedule}</Badge>
          </div>
        </div>
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>المعلم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={course.image}
                  alt={course.teacher}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{course.teacher}</h3>
                  <p className="text-sm text-gray-600">معلم اللغة العربية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="lessons">الدروس</TabsTrigger>
          <TabsTrigger value="assignments">الواجبات</TabsTrigger>
          <TabsTrigger value="resources">الموارد</TabsTrigger>
          <TabsTrigger value="discussions">النقاشات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>معلومات الدورة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium text-lg mb-4">وصف الدورة</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-4">متطلبات الدورة</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>معرفة أساسيات اللغة العربية</li>
                    <li>الالتزام بحضور الدروس</li>
                    <li>إكمال الواجبات في الوقت المحدد</li>
                    <li>المشاركة في النقاشات</li>
                  </ul>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-medium text-lg mb-4">تقدم الدورة</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إكمال الدروس</span>
                    <span className="font-medium">40%</span>
                  </div>
                  <Progress value={40} />
                  <div className="flex justify-between items-center">
                    <span>إكمال الواجبات</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <Progress value={60} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lessons" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>جدول الدروس</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {lessons.map((lesson) => (
                  <Card key={lesson.id} className={`${
                    lesson.completed ? 'border-green-200 bg-green-50' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{lesson.title}</CardTitle>
                          <CardDescription>{lesson.description}</CardDescription>
                        </div>
                        {lesson.completed && (
                          <Badge variant="success">مكتمل</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">{lesson.duration}</Badge>
                        {lesson.materials.map((material, index) => (
                          <Badge key={index} variant="secondary">{material}</Badge>
                        ))}
                      </div>
                      {lesson.videoUrl && (
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                          <Button variant="outline" className="w-full">
                            مشاهدة الدرس
                          </Button>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        عرض المواد
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>الواجبات</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الواجب</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>موعد التسليم</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الدرجة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.description}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            assignment.status === "مكتمل" ? "success" :
                            assignment.status === "متأخر" ? "destructive" :
                            "secondary"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {assignment.grade ? `${assignment.grade}%` : "-"}
                      </TableCell>
                      <TableCell>
                        {assignment.status !== "مكتمل" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSubmitAssignment(assignment.id)}
                          >
                            تسليم
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>الموارد التعليمية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {resources.map((resource) => (
                  <Card key={resource.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline">{resource.type}</Badge>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        تحميل/مشاهدة
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>النقاشات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {discussions.map((discussion) => (
                  <Card key={discussion.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{discussion.author}</CardTitle>
                          <CardDescription>{discussion.date}</CardDescription>
                        </div>
                        <Badge variant="outline">{discussion.replies} ردود</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{discussion.content}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm">
                        الرد
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-4">إضافة مشاركة جديدة</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="discussion-title">عنوان المشاركة</Label>
                      <Input id="discussion-title" placeholder="أدخل عنوان المشاركة" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discussion-content">المحتوى</Label>
                      <textarea
                        id="discussion-content"
                        className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        placeholder="اكتب مشاركتك هنا..."
                      />
                    </div>
                    <Button onClick={handleJoinDiscussion}>نشر المشاركة</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetails; 