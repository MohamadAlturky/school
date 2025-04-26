import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { CourseList } from "@/components/courses/CourseList";
import { AddCourseDialog } from "@/components/courses/AddCourseDialog";

const initialCourses = [
  {
    id: 1,
    name: "الرياضيات",
    teacher: "سارة عبدالله",
    studentsCount: 25,
    description: "مادة الرياضيات للصف الأول الثانوي"
  },
  {
    id: 2,
    name: "اللغة العربية",
    teacher: "أحمد محمد",
    studentsCount: 30,
    description: "مادة اللغة العربية للصف الأول الثانوي"
  }
];

const Courses = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [courses, setCourses] = React.useState(initialCourses);
  const { toast } = useToast();

  const handleAddCourse = (course) => {
    setCourses(prev => [
      ...prev,
      { ...course, id: Date.now(), studentsCount: 0 }
    ]);
    toast({ title: "تمت إضافة المادة بنجاح!" });
  };

  return (
    <div className="container px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة المواد الدراسية</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة مادة جديدة
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>المواد الدراسية</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseList courses={courses} />
        </CardContent>
      </Card>

      <AddCourseDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddCourse={handleAddCourse}
      />
    </div>
  );
};

export default Courses;
