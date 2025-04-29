import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground w-full py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">مدرسة آفاق</h3>
            <p className="mb-4">{t('school_description')}</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('quick_links_footer')}</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="hover:text-accent">{t('home')}</Link>
              <Link to="/teachers" className="hover:text-accent">{t('teachers')}</Link>
              <Link to="/students" className="hover:text-accent">{t('students')}</Link>
              <Link to="/parents" className="hover:text-accent">{t('parents')}</Link>
              <a href="#" className="hover:text-accent">{t('about_school')}</a>
              <a href="#" className="hover:text-accent">{t('contact_us_footer')}</a>
            </nav>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contact_us_footer')}</h3>
            <div className="flex flex-col gap-2">
              <p>{t('address')}</p>
              <p>{t('email')}</p>
              <p>{t('phone')}</p>
            </div>
          </div>
        </div>
        <Separator className="my-6 bg-primary-foreground/20" />
        <div className="text-center">
          <p>© {currentYear} مدرسة آفاق. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
