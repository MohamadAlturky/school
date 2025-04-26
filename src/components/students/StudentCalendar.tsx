import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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
    const [currentDate, setCurrentDate] = useState(new Date());

    // Get current month and year
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

    // Get status text color
    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'text-orange-500';
            case 'completed':
                return 'text-green-500';
            case 'missed':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    // Navigate to previous month
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    // Navigate to next month
    const goToNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // Format month and year
    const monthNames = [
        t('january'), t('february'), t('march'), t('april'), t('may'), t('june'),
        t('july'), t('august'), t('september'), t('october'), t('november'), t('december')
    ];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        {t('calendar')}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="font-medium">
                            {monthNames[currentMonth]} {currentYear}
                        </span>
                        <Button variant="outline" size="icon" onClick={goToNextMonth}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
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
                    {calendarDays.map((day, index) => {
                        const assignmentsForDay = getAssignmentsForDate(day);
                        const hasAssignments = assignmentsForDay.length > 0;

                        return (
                            <div
                                key={index}
                                className={`relative h-20 p-1 border rounded-md ${day === new Date().getDate() &&
                                        currentMonth === new Date().getMonth() &&
                                        currentYear === new Date().getFullYear()
                                        ? 'border-primary'
                                        : 'border-border'
                                    } ${hasAssignments ? 'bg-muted/50' : ''}`}
                            >
                                {day && (
                                    <>
                                        <span className="text-sm">{day}</span>
                                        {hasAssignments && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="absolute bottom-1 left-1 right-1 flex flex-wrap gap-1">
                                                            {assignmentsForDay.map((assignment) => (
                                                                <div
                                                                    key={assignment.id}
                                                                    className={`w-5 h-5 rounded-full ${getStatusColor(assignment.status)}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="max-w-[200px]">
                                                        <div className="space-y-2">
                                                            {assignmentsForDay.map((assignment) => (
                                                                <div key={assignment.id} className="space-y-1">
                                                                    <p className={`font-medium ${getStatusTextColor(assignment.status)}`}>
                                                                        {assignment.title}
                                                                    </p>
                                                                    <div className="flex items-center justify-between text-xs">
                                                                        <span className="text-muted-foreground">
                                                                            {assignment.time}
                                                                        </span>
                                                                        <span className={`font-medium ${getStatusTextColor(assignment.status)}`}>
                                                                            {t(assignment.status)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default StudentCalendar; 