import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Index from "./pages/Index";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import Parents from "./pages/Parents";
import Calendar from "./pages/Calendar";
import Courses from "./pages/admin/Courses";
import CourseManagement from "./pages/admin/CourseManagement";
import ChatTab from "./components/chat/ChatTab";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import CourseAssignments from './pages/CourseAssignments';
import CourseNotes from './pages/CourseNotes';
import CourseDetails from './pages/CourseDetails';

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Index />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/students" element={<Students />} />
              <Route path="/parents" element={<Parents />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/chat" element={<ChatTab />} />
              <Route path="/admin/courses" element={<Courses />} />
              <Route path="/admin/course-management" element={<CourseManagement />} />
              <Route path="/courses/:courseId/assignments" element={<CourseAssignments />} />
              <Route path="/courses/:courseId/notes" element={<CourseNotes />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
