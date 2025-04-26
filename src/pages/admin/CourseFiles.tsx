import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, FileVideo, Image as ImageIcon } from 'lucide-react';

const mockFiles = [
  { id: 1, name: 'Lecture Notes', type: 'txt', url: '#' },
  { id: 2, name: 'Course Introduction', type: 'video', url: '#' },
  { id: 3, name: 'Diagram', type: 'image', url: '#' },
];

const getTypeIcon = (type) => {
  switch (type) {
    case 'txt':
      return <FileText className="h-5 w-5 text-primary" />;
    case 'video':
      return <FileVideo className="h-5 w-5 text-primary" />;
    case 'image':
      return <ImageIcon className="h-5 w-5 text-primary" />;
    default:
      return null;
  }
};

const CourseFiles = () => {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>ملفات المادة</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الملف</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{getTypeIcon(file.type)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">عرض</Button>
                    <Button variant="outline" size="sm" className="ml-2">تحميل</Button>
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

export default CourseFiles; 