import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Assignment {
    id: number;
    title: string;
    date: string;
    type: 'class' | 'assignment' | 'exam';
    time: string;
    status: 'pending' | 'completed' | 'missed';
}

interface StudentCalendarProps {
    assignments: Assignment[];
}

const StudentCalendar: React.FC<StudentCalendarProps> = ({ assignments }) => {
    const { t } = useLanguage();

    // Get current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get first day of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDayOfMonth.getDay();

    // Get number of days in the month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Generate calendar days
    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    // Get assignments for a specific date
    const getAssignmentsForDate = (day: number) => {
        if (!day) return [];
        const date = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
        return assignments.filter(assignment => assignment.date === date);
    };

    // Get color based on assignment status
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-orange-500';
            case 'completed':
                return 'bg-green-500';
            case 'missed':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    {t('calendar')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-1">
                    {/* Weekday headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-muted-foreground">
                            {day}
                        </div>
                    ))}

                    {/* Calendar days */}
                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className={`relative h-20 p-1 border rounded-md ${day === currentDate.getDate() ? 'border-primary' : 'border-border'
                                }`}
                        >
                            {day && (
                                <>
                                    <span className="text-sm">{day}</span>
                                    <div className="absolute bottom-1 left-1 right-1 flex flex-wrap gap-1">
                                        {getAssignmentsForDate(day).map((assignment) => (
                                            <TooltipProvider key={assignment.id}>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <div
                                                            className={`w-2 h-2 rounded-full ${getStatusColor(assignment.status)}`}
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="font-medium">{assignment.title}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {assignment.time} - {t(assignment.status)}
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default StudentCalendar; 