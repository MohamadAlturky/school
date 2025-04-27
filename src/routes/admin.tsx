import { RouteObject } from 'react-router-dom';
import CourseManagement from '@/pages/admin/CourseManagement';
import CourseStudents from '@/pages/admin/CourseStudents';
import CourseFiles from '@/pages/admin/CourseFiles';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import Reports from '@/pages/admin/Reports';
import UserManagement from '@/pages/admin/UserManagement';
import SystemSettings from '@/pages/admin/SystemSettings';

export const adminRoutes: RouteObject[] = [
  {
    path: 'admin/dashboard',
    element: <AdminDashboard />,
  },
  {
    path: 'admin/courses',
    element: <CourseManagement />,
  },
  {
    path: 'admin/courses/:id/students',
    element: <CourseStudents />,
  },
  {
    path: 'admin/courses/:id/files',
    element: <CourseFiles />,
  },
  {
    path: 'admin/reports',
    element: <Reports />,
  },
  {
    path: 'admin/users',
    element: <UserManagement />,
  },
  {
    path: 'admin/settings',
    element: <SystemSettings />,
  },
]; 