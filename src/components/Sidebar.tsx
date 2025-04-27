import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();
  const { isRtl } = useLanguage();

  const navItems: NavItem[] = [
    {
      title: 'الرئيسية',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/dashboard'
    },
    {
      title: 'الحضور والغياب',
      icon: <Calendar className="h-5 w-5" />,
      href: '/attendance'
    },
    {
      title: 'المستوى الأكاديمي',
      icon: <BookOpen className="h-5 w-5" />,
      href: '/academic'
    },
    {
      title: 'ملاحظات المعلمين',
      icon: <MessageSquare className="h-5 w-5" />,
      href: '/teacher-notes'
    },
    {
      title: 'الاجتماعات',
      icon: <Users className="h-5 w-5" />,
      href: '/meetings'
    },
    {
      title: 'الإعدادات',
      icon: <Settings className="h-5 w-5" />,
      href: '/settings'
    }
  ];

  return (
    <div
      className={cn(
        'relative h-screen border-r transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200',
        isRtl ? 'border-l' : 'border-r',
        className
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'absolute top-4 transition-transform duration-300',
          isRtl ? 'left-4' : 'right-4',
          isCollapsed && (isRtl ? 'rotate-180' : '-rotate-180')
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </Button>

      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b">
        <img
          src="/school/logo.svg"
          alt="School Logo"
          className={cn(
            'h-8 transition-all duration-300',
            isCollapsed ? 'w-8' : 'w-32'
          )}
        />
      </div>

      {/* Navigation */}
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                'w-full justify-start gap-2',
                isCollapsed && 'justify-center',
                isRtl ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {item.icon}
              {!isCollapsed && <span>{item.title}</span>}
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default Sidebar; 