import { FaUserShield, FaChalkboardTeacher, FaUserGraduate, FaUserFriends } from 'react-icons/fa';
import { Calendar, Home } from 'lucide-react';

export interface NavItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
  tooltip: string;
}

export const guestNavItems: NavItem[] = [
  {
    path: '/',
    label: 'home',
    tooltip: 'homeGuide',
  },
  {
    path: '/login',
    label: 'login',
    tooltip: 'loginGuide',
  },
];

export const studentNavItems: NavItem[] = [
  {
    path: '/student/homepage',
    label: 'home',
    icon: <Home className="mr-2 h-4 w-4" />,
    tooltip: 'homeGuide',
  },
  {
    path: '/calendar',
    label: 'calendar',
    icon: <Calendar className="mr-2 h-4 w-4" />,
    tooltip: 'calendarGuide',
  },
  {
    path: '/courses',
    label: 'courses',
    tooltip: 'coursesGuide',
  },
  {
    path: '/assignments',
    label: 'assignments',
    tooltip: 'assignmentsGuide',
  },
];

export const teacherNavItems: NavItem[] = [
  {
    path: '/',
    label: 'home',
    tooltip: 'homeGuide',
  },
  {
    path: '/calendar',
    label: 'calendar',
    icon: <Calendar className="mr-2 h-4 w-4" />,
    tooltip: 'calendarGuide',
  },
  {
    path: '/courses',
    label: 'courses',
    tooltip: 'coursesGuide',
  },
  {
    path: '/students',
    label: 'students',
    icon: <FaUserGraduate className="mr-2 h-4 w-4" />,
    tooltip: 'studentsGuide',
  },
];

export const parentNavItems: NavItem[] = [
  {
    path: '/',
    label: 'home',
    tooltip: 'homeGuide',
  },
  {
    path: '/calendar',
    label: 'calendar',
    icon: <Calendar className="mr-2 h-4 w-4" />,
    tooltip: 'calendarGuide',
  },
  {
    path: '/children',
    label: 'children',
    icon: <FaUserFriends className="mr-2 h-4 w-4" />,
    tooltip: 'childrenGuide',
  },
  {
    path: '/reports',
    label: 'reports',
    tooltip: 'reportsGuide',
  },
];

export const adminNavItems: NavItem[] = [
  {
    path: '/',
    label: 'home',
    tooltip: 'homeGuide',
  },
  {
    path: '/admin/dashboard',
    label: 'adminDashboard',
    icon: <FaUserShield className="mr-2 h-4 w-4" />,
    tooltip: 'adminDashboardGuide',
  },
  {
    path: '/admin/users',
    label: 'users',
    tooltip: 'usersGuide',
  },
  {
    path: '/admin/courses',
    label: 'courses',
    tooltip: 'coursesGuide',
  },
  {
    path: '/admin/settings',
    label: 'settings',
    tooltip: 'settingsGuide',
  },
]; 