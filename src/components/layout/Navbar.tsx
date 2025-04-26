import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Menu, X, Bell, MessageSquare, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const NavLink = ({ to, children, tooltip }: { to: string; children: React.ReactNode; tooltip: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={to}
          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
        >
          {children}
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src="/placeholder.svg" alt={t('home')} className="h-8 w-8" />
            <span className="text-xl font-bold text-primary">مدرسة آفاق</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavLink to="/" tooltip={t('homeGuide')}>
                  {t('home')}
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink to="/calendar" tooltip={t('calendarGuide')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  {t('calendar')}
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink to="/chat" tooltip={t('chatGuide')}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {t('chat')}
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink to="/teachers" tooltip={t('teachersGuide')}>
                  {t('teachers')}
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink to="/students" tooltip={t('studentsGuide')}>
                  {t('students')}
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink to="/parents" tooltip={t('parentsGuide')}>
                  {t('parents')}
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink to="/admin/courses" tooltip={t('coursesGuide')}>
                  {t('courses')}
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full" />
          </Button>
          <LanguageSwitcher />
          <Button variant="outline" className="hidden md:flex">
            {t('login')}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {isOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-3 py-4">
            <Link to="/" className="px-2 py-1 text-lg hover:text-primary">
              {t('home')}
            </Link>
            <Link to="/calendar" className="px-2 py-1 text-lg hover:text-primary">
              <Calendar className="mr-2 h-4 w-4" />
              {t('calendar')}
            </Link>
            <Link to="/chat" className="px-2 py-1 text-lg hover:text-primary">
              <MessageSquare className="mr-2 h-4 w-4" />
              {t('chat')}
            </Link>
            <Link to="/teachers" className="px-2 py-1 text-lg hover:text-primary">
              {t('teachers')}
            </Link>
            <Link to="/students" className="px-2 py-1 text-lg hover:text-primary">
              {t('students')}
            </Link>
            <Link to="/parents" className="px-2 py-1 text-lg hover:text-primary">
              {t('parents')}
            </Link>
            <Link to="/admin/courses" className="px-2 py-1 text-lg hover:text-primary">
              {t('courses')}
            </Link>
            <div className="flex items-center justify-between pt-2">
              <Button className="w-full">{t('login')}</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
