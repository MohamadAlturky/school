import { RouteObject } from 'react-router-dom';
import Teachers from '@/pages/Teachers';
import Calendar from '@/pages/Calendar';
import Courses from '@/pages/CourseAssignments';
import CourseDetails from '@/pages/CourseDetails';
import CourseAssignments from '@/pages/CourseAssignments';
import CourseNotes from '@/pages/CourseNotes';

export const teacherRoutes: RouteObject[] = [
  {
    path: 'teachers',
    element: <Teachers />,
  },
  {
    path: 'calendar',
    element: <Calendar />,
  },
  {
    path: 'courses',
    element: <Courses />,
  },
  {
    path: 'courses/:id',
    element: <CourseDetails />,
  },
  {
    path: 'courses/:id/assignments',
    element: <CourseAssignments />,
  },
  {
    path: 'courses/:id/notes',
    element: <CourseNotes />,
  },
]; 