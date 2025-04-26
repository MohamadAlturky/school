import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Image, File, Mic, Phone, Video, MoreVertical, Search, Smile, Paperclip, ChevronDown } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Message {
  id: number;
  user: string;
  message: string;
  time: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
  reactions?: { emoji: string; count: number; users: string[] }[];
}

interface User {
  id: number;
  name: string;
  status: 'online' | 'away' | 'offline';
  avatar: string;
  lastSeen: string;
  role: string;
  unreadCount?: number;
}

const reactions = [
  { emoji: '👍', label: 'Like', icon: ChevronDown },
  { emoji: '❤️', label: 'Love', icon: ChevronDown },
  { emoji: '😂', label: 'Laugh', icon: ChevronDown },
  { emoji: '😮', label: 'Wow', icon: ChevronDown },
  { emoji: '😢', label: 'Sad', icon: ChevronDown },
  { emoji: '😡', label: 'Angry', icon: ChevronDown },
];

const ChatTab = () => {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [emojiPanelOpen, setEmojiPanelOpen] = useState(false);

  const mockUsers: User[] = [
    { 
      id: 1, 
      name: 'محمد', 
      status: 'online', 
      avatar: '/placeholder.svg',
      lastSeen: 'Active now',
      role: 'Teacher',
      unreadCount: 2
    },
    { 
      id: 2, 
      name: 'Sarah', 
      status: 'online', 
      avatar: '/placeholder.svg',
      lastSeen: 'Active now',
      role: 'Student'
    },
    { 
      id: 3, 
      name: 'Ahmed', 
      status: 'away', 
      avatar: '/placeholder.svg',
      lastSeen: 'Last seen 2h ago',
      role: 'Student',
      unreadCount: 1
    },
    { 
      id: 4, 
      name: 'Fatima', 
      status: 'offline', 
      avatar: '/placeholder.svg',
      lastSeen: 'Last seen yesterday',
      role: 'Student'
    },
  ];

  const mockMessages: Message[] = [
    { 
      id: 1, 
      user: 'محمد', 
      message: 'مرحباً بالجميع', 
      time: '10:00 AM',
      isMe: false,
      status: 'read',
      type: 'text',
      reactions: [{ emoji: '👍', count: 2, users: ['محمد'] }, { emoji: '❤️', count: 1, users: ['محمد'] }]
    },
    { 
      id: 2, 
      user: 'Sarah', 
      message: 'Hello everyone!', 
      time: '10:01 AM',
      isMe: false,
      status: 'read',
      type: 'text'
    },
    { 
      id: 3, 
      user: 'You', 
      message: 'How is the course going?', 
      time: '10:02 AM',
      isMe: true,
      status: 'read',
      type: 'text',
      reactions: [{ emoji: '👍', count: 1, users: ['You'] }]
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mockMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleReaction = (messageId: number, emoji: string) => {
    // Here you would typically update the message reactions in your backend
    console.log('Adding reaction:', emoji, 'to message:', messageId);
  };

  // Helper for date separators
  const renderDateSeparator = (date: string) => (
    <div className="flex justify-center my-4">
      <span className="bg-card px-4 py-1 rounded-full text-xs text-muted-foreground shadow-sm border">
        {date}
      </span>
    </div>
  );

  // Mock chat list for sidebar
  const chatList = [
    {
      id: 1,
      name: 'RTX && RGB Ibrahim',
      avatar: '/placeholder.svg',
      lastMessage: 'Forwarded from RTX && RGB Ibrahim',
      time: '12:52 PM',
      unread: 2,
      isOnline: true,
      isMuted: false,
      isPinned: false,
      isVerified: false,
    },
    // Add many more mock contacts for demonstration
    ...Array.from({ length: 30 }, (_, i) => ({
      id: i + 2,
      name: `Contact ${i + 2}`,
      avatar: '/placeholder.svg',
      lastMessage: `Last message from Contact ${i + 2}`,
      time: `${10 + (i % 12)}:${(i * 3) % 60 < 10 ? '0' : ''}${(i * 3) % 60} AM`,
      unread: i % 4 === 0 ? 1 : 0,
      isOnline: i % 3 === 0,
      isMuted: false,
      isPinned: false,
      isVerified: false,
    }))
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] relative">
      {/* Sidebar (responsive) */}
      <aside
        className={cn(
          "w-80 max-w-full border-r bg-white flex flex-col z-30 h-full md:h-auto transition-transform duration-300 shadow-md md:shadow-none",
          sidebarOpen ? "fixed md:static translate-x-0" : "fixed md:static -translate-x-full md:translate-x-0",
          "top-0 left-0 md:block"
        )}
        style={{
          height: '100vh',
          minHeight: '100%',
          maxHeight: '90vh',
        }}
      >
        {/* Sticky search bar at the top, but not at the very top of the screen */}
        <div className="p-4 border-b flex items-center gap-2 bg-white sticky top-4 z-20" style={{marginTop: '1.5rem', maxHeight: '4.5rem'}}>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <ChevronDown className="h-5 w-5" />
          </Button>
          <Input className="flex-1 rounded-full text-sm bg-gray-100" placeholder="Search..." />
        </div>
        {/* Scrollable contacts list */}
        <div className="flex-1 overflow-y-auto" style={{maxHeight: 'calc(90vh - 5.5rem)'}}>
          <div className="divide-y">
            {chatList.map(chat => (
              <div key={chat.id} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50 transition rounded-lg relative">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.isOnline && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold truncate">{chat.name}</span>
                    {chat.isVerified && <span className="ml-1 text-blue-500">✔️</span>}
                  </div>
                  <span className="text-xs text-gray-500 truncate block">{chat.lastMessage}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-gray-400">{chat.time}</span>
                  {chat.unread > 0 && <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{chat.unread}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Overlay for sidebar on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Chat Header (sticky on mobile) */}
        <div className="p-4 border-b flex items-center gap-3 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>GC</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold truncate">RTX && RGB Ibrahim</span>
              <span className="text-xs text-gray-400">last seen 10 minutes ago</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Search className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
          </div>
        </div>
        {/* Messages */}
        <ScrollArea className="flex-1 px-2 md:px-8 py-2 md:py-6 space-y-2">
          {renderDateSeparator('April 19')}
          <div className="flex flex-col gap-2">
            {mockMessages.map((msg) => (
              <div key={msg.id} className={cn(
                "flex items-end gap-2",
                msg.isMe ? "justify-end" : "justify-start"
              )}>
                {/* Reactions (vertical) */}
                {!msg.isMe && (
                  <div className="flex flex-col gap-1 items-center order-2 rtl:order-1">
                    {msg.reactions && msg.reactions.map((r, i) => (
                      <span key={i} className="bg-white/80 px-2 py-1 rounded-full text-xs shadow">{r.emoji}</span>
                    ))}
                  </div>
                )}
                {/* Message bubble */}
                <div className={cn(
                  msg.isMe
                    ? "bg-blue-500 text-white rounded-2xl rounded-br-none"
                    : "bg-white text-gray-900 rounded-2xl rounded-bl-none border",
                  "p-3 shadow max-w-full md:max-w-lg text-sm md:text-base"
                )}>
                  <div>{msg.message}</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">{msg.time}</span>
                    <span className={cn("text-xs", msg.status === 'read' ? 'text-blue-500' : 'text-gray-400')}>✓✓</span>
                  </div>
                </div>
                {/* Reactions for 'me' */}
                {msg.isMe && (
                  <div className="flex flex-col gap-1 items-center order-2 rtl:order-1">
                    {msg.reactions && msg.reactions.map((r, i) => (
                      <span key={i} className="bg-white/80 px-2 py-1 rounded-full text-xs shadow">{r.emoji}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        {/* Message Input (sticky on mobile) */}
        <form onSubmit={handleSendMessage} className="p-2 md:p-4 border-t flex items-center gap-2 bg-white/80 backdrop-blur-md sticky bottom-0 z-10">
          <Button variant="ghost" size="icon" onClick={() => setEmojiPanelOpen(v => !v)} type="button">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" type="button"><Paperclip className="h-5 w-5" /></Button>
          <Input
            className="flex-1 rounded-full text-sm md:text-base bg-gray-100"
            placeholder="Write a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button variant="ghost" size="icon" type="button"><Mic className="h-5 w-5" /></Button>
          <Button type="submit" size="icon" className="bg-blue-500 hover:bg-blue-600"><Send className="h-5 w-5" /></Button>
        </form>
      </main>

      {/* Overlay for emoji panel on mobile */}
      {emojiPanelOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setEmojiPanelOpen(false)} />
      )}
    </div>
  );
};

export default ChatTab;
