import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  FaDownload,
  FaFilter,
  FaCalendarAlt,
  FaChartLine,
  FaUsers,
  FaBook,
  FaGraduationCap
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Reports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const [enrollmentData, setEnrollmentData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [userDistribution, setUserDistribution] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API calls
    setEnrollmentData([
      { month: 'Jan', students: 120 },
      { month: 'Feb', students: 150 },
      { month: 'Mar', students: 180 },
      { month: 'Apr', students: 200 },
      { month: 'May', students: 220 },
      { month: 'Jun', students: 250 }
    ]);

    setAttendanceData([
      { date: '2023-01-01', attendance: 95 },
      { date: '2023-01-02', attendance: 92 },
      { date: '2023-01-03', attendance: 88 },
      { date: '2023-01-04', attendance: 94 },
      { date: '2023-01-05', attendance: 96 }
    ]);

    setPerformanceData([
      { subject: 'Math', average: 85 },
      { subject: 'Science', average: 78 },
      { subject: 'English', average: 82 },
      { subject: 'History', average: 75 }
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
          <h1 className="text-3xl font-bold text-primary">Reports & Analytics</h1>
          <p className="text-gray-600">View and analyze school data</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <FaCalendarAlt className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <FaDownload className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FaUsers className="mr-2 h-6 w-6 text-primary" />
              <div className="text-3xl font-bold">1,200</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FaBook className="mr-2 h-6 w-6 text-primary" />
              <div className="text-3xl font-bold">45</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Graduation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FaGraduationCap className="mr-2 h-6 w-6 text-primary" />
              <div className="text-3xl font-bold">95%</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FaChartLine className="mr-2 h-6 w-6 text-primary" />
              <div className="text-3xl font-bold">82%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" fill="#8884d8" />
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
    </div>
  );
};

export default Reports; 