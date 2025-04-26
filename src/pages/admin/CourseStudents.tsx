import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const mockStudents = [
  { id: 1, name: 'Ahmed Hassan', progress: 85 },
  { id: 2, name: 'Fatima Ali', progress: 92 },
  { id: 3, name: 'Mohammed Saleh', progress: 78 },
];

const CourseStudents = () => {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>إدارة الطلاب للمادة</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الطالب</TableHead>
                <TableHead>التقدم</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.progress}%</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">عرض الملف</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseStudents; 