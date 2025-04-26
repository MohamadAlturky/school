import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const Index = () => {
  const { t, isRtl } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Enhanced Animation */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-primary/90 via-primary/80 to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  {t('welcome')}
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80">
                  {t('intro')}
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {t('discover')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent text-white border-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  {t('contact_us')}
                </Button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center items-center"
            >
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="مدرسة آفاق"
                className="rounded-lg shadow-2xl border-4 border-white/20 w-full max-w-md transform hover:scale-105 transition-all duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section with Enhanced Design */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  {t('about_us')}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t('about_text')}
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                  <h3 className="text-xl font-bold text-primary">{t('vision')}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {t('vision_text')}
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                  <h3 className="text-xl font-bold text-primary">{t('mission')}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {t('mission_text')}
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="مبنى المدرسة"
                className="rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Message from Principal with Enhanced Design */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-muted to-background">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-6 text-center"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                {t('principal_message')}
              </h2>
            </div>
            <div className="mx-auto max-w-3xl space-y-6">
              <blockquote className={`p-6 rounded-xl bg-primary/5 border border-primary/10 ${isRtl ? 'pr-6' : 'pl-6'} italic text-xl text-muted-foreground`}>
                {t('principal_quote')}
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img
                  src="/placeholder.svg"
                  alt={t('principal_title')}
                  className="h-16 w-16 rounded-full object-cover border-2 border-primary shadow-lg"
                />
                <div className={`text-${isRtl ? 'right' : 'left'}`}>
                  <div className="font-semibold text-lg">{t('principal_name')}</div>
                  <div className="text-sm text-muted-foreground">{t('principal_title')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News & Events with Enhanced Design */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-6 text-center"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                {t('news_events')}
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
                {t('news_events_desc')}
              </p>
            </div>
            <Carousel className="w-full max-w-5xl">
              <CarouselContent>
                <CarouselItem>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{t('news_events')}</CardTitle>
                      <CardDescription>{t('news_events_desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                        alt="اليوم المفتوح"
                        className="aspect-video w-full rounded-lg object-cover transform hover:scale-105 transition-all duration-500"
                      />
                      <p className="mt-4 text-muted-foreground">
                        {t('news_events_desc')}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">{t('read_more')}</Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card>
                    <CardHeader>
                      <CardTitle>مسابقة العلوم والابتكار</CardTitle>
                      <CardDescription>15 أكتوبر 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                        alt="مسابقة العلوم"
                        className="aspect-video w-full rounded-lg object-cover"
                      />
                      <p className="mt-4">
                        تقيم المدرسة مسابقة العلوم والابتكار السنوية لتشجيع الطلاب على البحث والابتكار في مجالات العلوم المختلفة.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button>{t('read_more')}</Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card>
                    <CardHeader>
                      <CardTitle>الرحلة المدرسية السنوية</CardTitle>
                      <CardDescription>5 نوفمبر 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src="https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                        alt="الرحلة المدرسية"
                        className="aspect-video w-full rounded-lg object-cover"
                      />
                      <p className="mt-4">
                        تنظم المدرسة رحلتها السنوية للطلاب إلى المتحف الوطني، حيث سيتعرف الطلاب على تاريخ وتراث بلدهم.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button>{t('read_more')}</Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className={isRtl ? "right-2" : "left-2"} />
              <CarouselNext className={isRtl ? "left-2" : "right-2"} />
            </Carousel>
            <Button variant="outline" className="mt-4">{t('view_all')}</Button>
          </motion.div>
        </div>
      </section>

      {/* Quick Links with Enhanced Design */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-secondary to-secondary/90 text-secondary-foreground">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              {t('quick_links')}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-center">{t('edu_portal')}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="secondary" className="w-full">{t('login')}</Button>
                </CardContent>
              </Card>
            </motion.div>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
              <CardHeader>
                <CardTitle className="text-center">{t('exam_schedule')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="secondary" className="w-full">{t('view_all')}</Button>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
              <CardHeader>
                <CardTitle className="text-center">{t('student_activities')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="secondary" className="w-full">{t('discover')}</Button>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
              <CardHeader>
                <CardTitle className="text-center">{t('academic_calendar')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="secondary" className="w-full">{t('download')}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
