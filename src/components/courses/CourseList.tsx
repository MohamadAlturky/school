import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, FileText, FileArchive } from "lucide-react";

const mockCourses = [
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

export const CourseList = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>اسم المادة</TableHead>
          <TableHead>المدرس</TableHead>
          <TableHead>عدد الطلاب</TableHead>
          <TableHead>الوصف</TableHead>
          <TableHead>الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockCourses.map((course) => (
          <TableRow key={course.id}>
            <TableCell className="font-medium">{course.name}</TableCell>
            <TableCell>{course.teacher}</TableCell>
            <TableCell>{course.studentsCount}</TableCell>
            <TableCell>{course.description}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" title="إدارة الطلاب">
                  <Users className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="تفاصيل المادة">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="ملفات المادة">
                  <FileArchive className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
