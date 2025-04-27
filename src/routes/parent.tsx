import { RouteObject } from 'react-router-dom';
import Parents from '@/pages/Parents';
import Calendar from '@/pages/Calendar';

export const parentRoutes: RouteObject[] = [
  {
    path: 'children',
    element: <Parents />,
  },
  {
    path: 'calendar',
    element: <Calendar />,
  },
]; 