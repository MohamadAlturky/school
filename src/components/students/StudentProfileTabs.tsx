import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/contexts/LanguageContext';

export const StudentProfileTabs: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <TabsList className="grid grid-cols-4 mb-6">
      <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
      <TabsTrigger value="courses">{t('courses')}</TabsTrigger>
      <TabsTrigger value="achievements">{t('achievements')}</TabsTrigger>
      <TabsTrigger value="history">{t('academicHistory')}</TabsTrigger>
    </TabsList>
  );
};
