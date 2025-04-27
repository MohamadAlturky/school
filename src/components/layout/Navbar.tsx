import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Menu, X, Bell, LogIn, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { guestNavItems, studentNavItems, teacherNavItems, parentNavItems, adminNavItems, NavItem } from '@/routes/navigation';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const NavLink = ({ item }: { item: NavItem }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={item.path}
          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
        >
          {item.icon}
          {t(item.label)}
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t(item.tooltip)}</p>
      </TooltipContent>
    </Tooltip>
  );

  const getNavItems = () => {
    switch (user?.role) {
      case 'student':
        return studentNavItems;
      case 'teacher':
        return teacherNavItems;
      case 'parent':
        return parentNavItems;
      case 'admin':
        return adminNavItems;
      default:
        return guestNavItems;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src="/school/placeholder.svg" alt={t('home')} className="h-8 w-8" />
            <span className="text-xl font-bold text-primary">مدرسة آفاق</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {getNavItems().map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavLink item={item} />
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-4">
          {user && (
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full" />
            </Button>
          )}
          <LanguageSwitcher />
          {user ? (
            <Button variant="outline" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              {t('logout')}
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                {t('login')}
              </Link>
            </Button>
          )}

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
            {getNavItems().map((item, index) => (
              <NavLink key={index} item={item} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
