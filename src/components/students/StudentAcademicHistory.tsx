import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from '@/contexts/LanguageContext';

interface StudentAcademicHistoryProps {
  history: {
    year: string;
    grade: string;
    gpa: number;
  }[];
}

export const StudentAcademicHistory: React.FC<StudentAcademicHistoryProps> = ({ history }) => {
  const { t } = useLanguage();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('academicYear')}</TableHead>
          <TableHead>{t('grade')}</TableHead>
          <TableHead>{t('gpa')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((year, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{year.year}</TableCell>
            <TableCell>{year.grade}</TableCell>
            <TableCell>{year.gpa}/4.0</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
