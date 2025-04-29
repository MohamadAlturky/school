import { RouteObject } from 'react-router-dom';
import Students from '@/pages/Students';
import Calendar from '@/pages/Calendar';
import Courses from '@/pages/CourseNotes';
import CourseDetails from '@/pages/CourseDetails';
import CourseAssignments from '@/pages/CourseAssignments';
import CourseNotes from '@/pages/CourseNotes';
import StudentHomepage from '@/pages/StudentHomepage';

export const studentRoutes: RouteObject[] = [
  {
    path: 'student/homepage',
    element: <StudentHomepage />,
  },
  {
    path: 'students',
    element: <Students />,
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