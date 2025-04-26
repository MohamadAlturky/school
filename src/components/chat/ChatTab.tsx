import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Image, File, Mic, Phone, Video, MoreVertical, Search, Smile, Paperclip, ChevronDown, ChevronLeft, FolderClosed, X } from "lucide-react";
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
  { emoji: '🔥', label: 'Fire', icon: ChevronDown },
  { emoji: '👏', label: 'Clap', icon: ChevronDown },
  { emoji: '🎉', label: 'Party', icon: ChevronDown },
  { emoji: '🥰', label: 'In Love', icon: ChevronDown },
  { emoji: '🤔', label: 'Thinking', icon: ChevronDown },
  { emoji: '😎', label: 'Cool', icon: ChevronDown },
  { emoji: '😆', label: 'Grin', icon: ChevronDown },
  { emoji: '😭', label: 'Crying', icon: ChevronDown },
  { emoji: '🤯', label: 'Mind Blown', icon: ChevronDown },
  { emoji: '😇', label: 'Angel', icon: ChevronDown },
  { emoji: '😜', label: 'Wink', icon: ChevronDown },
  { emoji: '🤩', label: 'Starstruck', icon: ChevronDown },
  { emoji: '😏', label: 'Smirk', icon: ChevronDown },
  { emoji: '🙌', label: 'Praise', icon: ChevronDown },
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
  const [reactionPickerFor, setReactionPickerFor] = useState<number | null>(null);
  const [emojiPickerForMessageId, setEmojiPickerForMessageId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
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
  ]);

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'محمد',
      status: 'online',
      avatar: '/school/placeholder.svg',
      lastSeen: 'Active now',
      role: 'Teacher',
      unreadCount: 2
    },
    {
      id: 2,
      name: 'Sarah',
      status: 'online',
      avatar: '/school/placeholder.svg',
      lastSeen: 'Active now',
      role: 'Student'
    },
    {
      id: 3,
      name: 'Ahmed',
      status: 'away',
      avatar: '/school/placeholder.svg',
      lastSeen: 'Last seen 2h ago',
      role: 'Student',
      unreadCount: 1
    },
    {
      id: 4,
      name: 'Fatima',
      status: 'offline',
      avatar: '/school/placeholder.svg',
      lastSeen: 'Last seen yesterday',
      role: 'Student'
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Close emoji picker on outside click
    const handleClick = (e: MouseEvent) => {
      setEmojiPickerForMessageId(null);
    };
    if (emojiPickerForMessageId !== null) {
      document.addEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [emojiPickerForMessageId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleReaction = (messageId: number, emoji: string) => {
    setMessages(prevMsgs => prevMsgs.map(msg => {
      if (msg.id !== messageId) return msg;
      const newReactions = msg.reactions ? [...msg.reactions] : [];
      const user = 'You';
      const existing = newReactions.find(r => r.emoji === emoji);
      if (existing) {
        if (!existing.users.includes(user)) {
          existing.count += 1;
          existing.users.push(user);
        }
      } else {
        newReactions.push({ emoji, count: 1, users: [user] });
      }
      return { ...msg, reactions: newReactions };
    }));
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
      avatar: '/school/placeholder.svg',
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
      avatar: '/school/placeholder.svg',
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
          "w-64 md:w-80 max-w-full border-r bg-white flex flex-col z-30 h-full md:h-auto transition-transform duration-300 shadow-md md:shadow-none",
          sidebarOpen ? "fixed md:static translate-x-0 top-0" : "fixed md:static -translate-x-full md:translate-x-0",
          "left-0 md:block",
          "mt-16 md:mt-0"
        )}
        style={{
          height: '100vh',
          minHeight: '100%',
          maxHeight: '90vh',
        }}
      >
        {/* Sticky search bar at the top, but not at the very top of the screen */}
        <div className="border-b flex items-center gap-2 bg-white/80 sticky top-0 z-20 px-2 py-2 md:px-4 md:py-4" style={{ maxHeight: '4.5rem' }}>
          <Button variant="ghost" size="icon" className="md:hidden h-8 w-8" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
          <Input className="flex-1 rounded-full text-xs md:text-sm bg-gray-100 h-8 md:h-10" placeholder="Search..." />
        </div>
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 5.5rem)' }}>
          <div className="divide-y">
            {chatList.map(chat => (
              <div key={chat.id} className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-3 cursor-pointer hover:bg-blue-50 transition rounded-xl md:rounded-lg relative bg-white shadow-sm md:shadow-none">
                <div className="relative flex-shrink-0">
                  <Avatar className="h-8 w-8 md:h-10 md:w-10">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.isOnline && <span className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold truncate text-sm md:text-base">{chat.name}</span>
                    {chat.isVerified && <span className="ml-1 text-blue-500">✔️</span>}
                  </div>
                  <span className="text-xs md:text-xs text-gray-500 truncate block">{chat.lastMessage}</span>
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
            <AvatarImage src="/school/placeholder.svg" />
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
            {messages.map((msg) => (
              <div key={msg.id} className={cn(
                "flex items-end gap-2",
                msg.isMe ? "justify-end" : "justify-start"
              )}>
                {/* Message bubble with emoji picker on right-click */}
                <div className="relative">
                  <div
                    className={cn(
                      msg.isMe
                        ? "bg-blue-500 text-white rounded-2xl rounded-br-none"
                        : "bg-white text-gray-900 rounded-2xl rounded-bl-none border",
                      "p-3 shadow max-w-full md:max-w-lg text-sm md:text-base relative"
                    )}
                    onContextMenu={e => {
                      e.preventDefault();
                      setEmojiPickerForMessageId(msg.id);
                    }}
                    style={{ cursor: 'context-menu' }}
                  >
                    <div>{msg.message}</div>
                    {/* Reactions inside the message bubble, styled as Telegram */}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className={cn(
                        "flex flex-row flex-wrap gap-1 mt-2",
                        msg.isMe ? "justify-end" : "justify-start"
                      )}>
                        {msg.reactions.map((r, i) => (
                          <span
                            key={r.emoji + i}
                            className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shadow"
                            )}
                            style={{ minWidth: 28 }}
                          >
                            <span className="text-lg mr-1">{r.emoji}</span> <span className="font-semibold">{r.count}</span>
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <span className={cn("text-xs", msg.isMe ? "text-gray-200" : "text-gray-400")}>{msg.time}</span>
                      <span className={cn("text-xs", msg.status === 'read' ? 'text-blue-200' : 'text-gray-200')}>✓✓</span>
                    </div>
                  </div>
                  {/* Emoji Picker Panel on right-click - closer, scrollable, no scrollbar */}
                  {emojiPickerForMessageId === msg.id && (
                    <div
                      className={cn(
                        "absolute z-40 top-1/2 -translate-y-1/2 flex flex-col bg-white rounded-2xl shadow-lg p-1 border",
                        !msg.isMe ? "right-[0px]" : "left-[0px]"
                      )}
                      style={{ maxHeight: '220px', minHeight: '44px', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                      <style>{`.emoji-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                      <div className="emoji-scrollbar flex flex-col" style={{ overflowY: 'auto' }}>
                        {reactions.map((r) => (
                          <button
                            key={r.emoji}
                            className="text-xl p-1 hover:bg-gray-100 rounded-full"
                            type="button"
                            onClick={() => {
                              handleReaction(msg.id, r.emoji);
                              setEmojiPickerForMessageId(null);
                            }}
                          >
                            {r.emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
