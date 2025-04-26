
import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import ActiveUsersList from './ActiveUsersList';

const ChatTab = () => {
  const { t } = useLanguage();
  const [message, setMessage] = React.useState('');

  const mockMessages = [
    { id: 1, user: 'محمد', message: 'مرحباً بالجميع', time: '10:00 AM' },
    { id: 2, user: 'Sarah', message: 'Hello everyone!', time: '10:01 AM' },
    { id: 3, user: 'Ahmed', message: 'How is the course going?', time: '10:02 AM' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
      <Card className="flex flex-col flex-grow">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-primary">{t('chat')}</h2>
        </div>
        
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex flex-col bg-card rounded-lg p-3 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">{msg.user}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="mt-1 text-foreground">{msg.message}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('typeMessage')}
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
      
      <ActiveUsersList />
    </div>
  );
};

export default ChatTab;
