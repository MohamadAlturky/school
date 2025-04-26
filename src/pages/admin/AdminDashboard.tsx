import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaChartLine,
  FaCog,
  FaUserShield,
  FaFileAlt,
  FaBell
} from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    activeUsers: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [courseEnrollment, setCourseEnrollment] = useState([]);
  const [userDistribution, setUserDistribution] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API calls
    setStats({
      totalStudents: 1200,
      totalTeachers: 85,
      totalCourses: 45,
      activeUsers: 850
    });

    setRecentActivity([
      { id: 1, user: 'John Doe', action: 'Enrolled in Math 101', time: '2 hours ago' },
      { id: 2, user: 'Jane Smith', action: 'Submitted assignment', time: '3 hours ago' },
      { id: 3, user: 'Mike Johnson', action: 'Created new course', time: '5 hours ago' }
    ]);

    setCourseEnrollment([
      { name: 'Math 101', students: 120 },
      { name: 'Science 201', students: 95 },
      { name: 'History 101', students: 80 },
      { name: 'English 201', students: 75 }
    ]);

    setUserDistribution([
      { name: 'Students', value: 70 },
      { name: 'Teachers', value: 20 },
      { name: 'Parents', value: 10 }
    ]);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin</p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          <FaBell className="mr-2" />
          Notifications
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FaUsers className="mr-2 h-6 w-6 text-primary" />
              <div className="text-3xl font-bold">{stats.totalStudents}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FaChalkboardTeacher className="mr-2 h-6 w-6 text-primary" />
              <div className="text-3xl font-bold">{stats.totalTeachers}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FaBook className="mr-2 h-6 w-6 text-primary" />
              <div className="text-3xl font-bold">{stats.totalCourses}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FaChartLine className="mr-2 h-6 w-6 text-primary" />
              <div className="text-3xl font-bold">{stats.activeUsers}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Course Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseEnrollment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto py-4">
                <Link to="/admin/courses" className="flex flex-col items-center">
                  <FaBook className="h-6 w-6 mb-2" />
                  <span>Manage Courses</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4">
                <Link to="/admin/users" className="flex flex-col items-center">
                  <FaUserShield className="h-6 w-6 mb-2" />
                  <span>Manage Users</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4">
                <Link to="/admin/settings" className="flex flex-col items-center">
                  <FaCog className="h-6 w-6 mb-2" />
                  <span>System Settings</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4">
                <Link to="/admin/reports" className="flex flex-col items-center">
                  <FaFileAlt className="h-6 w-6 mb-2" />
                  <span>Generate Reports</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map(activity => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.user}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard; 