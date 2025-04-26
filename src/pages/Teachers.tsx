import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Pencil, Calendar, MessageSquare, ChartBar } from "lucide-react";

const Teachers = () => {
  const { t } = useLanguage();

  const mockTeachers = [
    {
      id: 1,
      name: 'محمد',
      subject: 'الرياضيات',
      avatarUrl: '/school/placeholder.svg',
    },
    {
      id: 2,
      name: 'Fatima',
      subject: 'العلوم',
      avatarUrl: '/school/placeholder.svg',
    },
    {
      id: 3,
      name: 'Ahmed',
      subject: 'اللغة العربية',
      avatarUrl: '/school/placeholder.svg',
    },
    {
      id: 4,
      name: 'Aisha',
      subject: 'English',
      avatarUrl: '/school/placeholder.svg',
    },
    {
      id: 5,
      name: 'Ali',
      subject: 'التاريخ',
      avatarUrl: '/school/placeholder.svg',
    },
    {
      id: 6,
      name: 'Sara',
      subject: 'الجغرافيا',
      avatarUrl: '/school/placeholder.svg',
    },
  ];

  const actionItems = [
    {
      icon: FileText,
      title: t('viewAssignments'),
      href: '#',
    },
    {
      icon: Pencil,
      title: t('editProfile'),
      href: '#',
    },
    {
      icon: Calendar,
      title: t('viewSchedule'),
      href: '#',
    },
    {
      icon: MessageSquare,
      title: t('sendMessage'),
      href: '#',
    },
    {
      icon: ChartBar,
      title: t('viewAnalytics'),
      href: '#',
    },
  ];

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">{t('teachers')}</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTeachers.map((teacher) => (
          <Card key={teacher.id} className="bg-card rounded-lg shadow-md overflow-hidden">
            <CardContent className="p-4 flex flex-col">
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
                <Avatar>
                  <AvatarImage src={teacher.avatarUrl} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-primary">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                </div>
              </div>
              <ScrollArea className="h-40 mb-3">
                <div className="flex flex-col space-y-2">
                  {actionItems.map((item, index) => (
                    <Button key={index} variant="ghost" className="justify-start">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              <Button className="w-full">{t('sendMessage')}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
