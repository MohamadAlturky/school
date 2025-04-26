
import React from 'react';
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from '@/contexts/LanguageContext';

const CalendarPage = () => {
  const { t } = useLanguage();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Mock data for courses and exams
  const events = [
    { id: 1, title: 'Mathematics', type: 'course', time: '09:00 AM' },
    { id: 2, title: 'Physics Exam', type: 'exam', time: '11:00 AM' },
    { id: 3, title: 'English', type: 'course', time: '02:00 PM' },
  ];

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">{t('calendar')}</h1>
      
      <div className="grid md:grid-cols-[350px_1fr] gap-6">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="pointer-events-auto"
          />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            {date ? date.toLocaleDateString() : t('selectDate')}
          </h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  event.type === 'exam' ? 'bg-destructive/20 text-destructive' : 'bg-secondary/20 text-secondary-foreground'
                }`}>
                  {t(event.type)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
