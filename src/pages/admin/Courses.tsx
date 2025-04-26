import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { CourseList } from "@/components/courses/CourseList";
import { AddCourseDialog } from "@/components/courses/AddCourseDialog";

const Courses = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

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
          <CourseList />
        </CardContent>
      </Card>

      <AddCourseDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default Courses;
