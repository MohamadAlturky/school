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
import { useNavigate } from 'react-router-dom';

export const CourseList = ({ courses }) => {
  const navigate = useNavigate();
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
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell className="font-medium">{course.name}</TableCell>
            <TableCell>{course.teacher}</TableCell>
            <TableCell>{course.studentsCount}</TableCell>
            <TableCell>{course.description}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" title="إدارة الطلاب" onClick={() => navigate(`/admin/course-management/${course.id}/students`)}>
                  <Users className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="تفاصيل المادة" onClick={() => navigate(`/courses/${course.id}`)}>
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="ملفات المادة" onClick={() => navigate(`/admin/course-management/${course.id}/files`)}>
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
