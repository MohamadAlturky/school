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

const Index = () => {
  const { t, isRtl } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Animation */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')] opacity-10"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col justify-center space-y-4 animate-fade-in">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-fade-in">
                  {t('welcome')}
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80 animation-delay-200 animate-fade-in">
                  {t('intro')}
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 animation-delay-400 animate-fade-in">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {t('discover')}
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/20">
                  {t('contact_us')}
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center animate-fade-in animation-delay-200">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="مدرسة آفاق"
                className="rounded-lg shadow-xl border-4 border-white/20 w-full max-w-md transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                  {t('about_us')}
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('about_text')}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{t('vision')}</h3>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  {t('vision_text')}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{t('mission')}</h3>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  {t('mission_text')}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="مبنى المدرسة"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Message from Principal with Animation */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
                {t('principal_message')}
              </h2>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 animate-fade-in animation-delay-200">
              <blockquote className={`border-${isRtl ? 'r' : 'l'}-4 border-primary ${isRtl ? 'pr-6' : 'pl-6'} italic text-xl text-gray-700`}>
                {t('principal_quote')}
              </blockquote>
              <div className="flex items-center justify-center gap-4 animate-fade-in animation-delay-400">
                <img
                  src="/placeholder.svg"
                  alt={t('principal_title')}
                  className="h-14 w-14 rounded-full object-cover border-2 border-primary"
                />
                <div className={`text-${isRtl ? 'right' : 'left'}`}>
                  <div className="font-semibold">{t('principal_name')}</div>
                  <div className="text-sm text-gray-500">{t('principal_title')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                {t('news_events')}
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('news_events_desc')}
              </p>
            </div>
            <Carousel className="w-full max-w-5xl">
              <CarouselContent>
                <CarouselItem>
                  <Card>
                    <CardHeader>
                      <CardTitle>اليوم المفتوح للطلاب الجدد</CardTitle>
                      <CardDescription>10 سبتمبر 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                        alt="اليوم المفتوح"
                        className="aspect-video w-full rounded-lg object-cover"
                      />
                      <p className="mt-4">
                        تدعو مدرسة آفاق الطلاب الجدد وأولياء أمورهم لحضور اليوم المفتوح للتعرف على المدرسة ومرافقها وبرامجها التعليمية.
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
            <Button variant="outline">{t('view_all')}</Button>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="w-full py-12 md:py-24 bg-secondary text-secondary-foreground">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">{t('quick_links')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
              <CardHeader>
                <CardTitle className="text-center">{t('edu_portal')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="secondary" className="w-full">{t('login')}</Button>
              </CardContent>
            </Card>
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
