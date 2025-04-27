import { RouteObject } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import { adminRoutes } from './admin';
import { studentRoutes } from './student';
import { teacherRoutes } from './teacher';
import { parentRoutes } from './parent';
import { guestRoutes } from './guest';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      ...guestRoutes,
      ...studentRoutes,
      ...teacherRoutes,
      ...parentRoutes,
      ...adminRoutes,
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]; 