import { RouteObject } from 'react-router-dom';
import Index from '@/pages/Index';

export const guestRoutes: RouteObject[] = [
  {
    index: true,
    element: <Index />,
  },
]; 