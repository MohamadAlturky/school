import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search, MoreVertical, Phone, Video, Image, File, Mic, MessageSquare } from "lucide-react";
import { motion } from 'framer-motion';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

const Chat = () => {
  const { t, isRtl } = useLanguage();
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Mock data initialization
  useEffect(() => {
    setChats([
      {
        id: 1,
        name: 'محمد أحمد',
        avatar: '/school/placeholder.svg',
        lastMessage: 'مرحباً، كيف حالك؟',
        timestamp: '10:30 AM',
        unreadCount: 2,
        isOnline: true
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        avatar: '/school/placeholder.svg',
        lastMessage: 'Can you send me the notes?',
        timestamp: 'Yesterday',
        unreadCount: 0,
        isOnline: true
      },
      {
        id: 3,
        name: 'أحمد علي',
        avatar: '/school/placeholder.svg',
        lastMessage: 'شكراً على المساعدة',
        timestamp: 'Yesterday',
        unreadCount: 0,
        isOnline: false
      }
    ]);

    setMessages([
      {
        id: 1,
        sender: 'محمد أحمد',
        content: 'مرحباً، كيف حالك؟',
        timestamp: '10:30 AM',
        isMe: false,
        status: 'read',
        type: 'text'
      },
      {
        id: 2,
        sender: 'You',
        content: 'أنا بخير، شكراً!',
        timestamp: '10:31 AM',
        isMe: true,
        status: 'read',
        type: 'text'
      }
    ]);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'You',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        status: 'sent',
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary">{t('chat')}</h2>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('search')}
              className="pl-9"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center p-4 gap-3 cursor-pointer hover:bg-accent/50 transition-colors ${
                selectedChat === chat.id ? 'bg-accent/50' : ''
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold truncate">{chat.name}</h3>
                  <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {chat.unreadCount}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={chats.find(c => c.id === selectedChat)?.avatar} />
                  <AvatarFallback>
                    {chats.find(c => c.id === selectedChat)?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {chats.find(c => c.id === selectedChat)?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {chats.find(c => c.id === selectedChat)?.isOnline ? t('online') : t('offline')}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.isMe
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {msg.type === 'text' && <p>{msg.content}</p>}
                      {msg.type === 'image' && (
                        <img
                          src={msg.content}
                          alt="Message"
                          className="rounded-lg max-h-60 object-cover"
                        />
                      )}
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs opacity-70">
                          {msg.timestamp}
                        </span>
                        {msg.isMe && msg.status && (
                          <span className="text-xs">
                            {msg.status === 'read' ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Button variant="ghost" size="icon" type="button">
                  <Image className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" type="button">
                  <File className="h-5 w-5" />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('typeMessage')}
                  className="flex-grow"
                />
                <Button variant="ghost" size="icon" type="button">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button type="submit" size="icon">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-2">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-xl font-semibold">{t('selectChat')}</h3>
              <p className="text-muted-foreground">{t('selectChatDescription')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat; 