
import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from '@/contexts/LanguageContext';

const ActiveUsersList = () => {
  const { t } = useLanguage();
  
  const mockActiveUsers = [
    { id: 1, name: 'محمد', status: 'online' },
    { id: 2, name: 'Sarah', status: 'online' },
    { id: 3, name: 'Ahmed', status: 'online' },
    { id: 4, name: 'Fatima', status: 'away' },
  ];

  return (
    <Card className="w-64 flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-primary">{t('activeUsers')}</h3>
      </div>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-2">
          {mockActiveUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${
                user.status === 'online' ? 'bg-secondary' : 'bg-yellow-500'
              }`} />
              <span className="text-sm">{user.name}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ActiveUsersList;
