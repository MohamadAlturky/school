import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaFilter,
  FaDownload
} from 'react-icons/fa';
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from '@/components/ui/table';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import {
  Tabs, TabsList, TabsTrigger, TabsContent
} from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const UserManagement = () => {
  const { t, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    setUsers([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'student',
        status: 'active',
        joinDate: '2023-01-15'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'teacher',
        status: 'active',
        joinDate: '2023-02-20'
      },
      // Add more mock data as needed
    ]);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // TODO: Implement search functionality
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      }
      return [...prev, userId];
    });
  };

  const handleBulkAction = (action) => {
    // TODO: Implement bulk actions
    console.log(`Performing ${action} on selected users:`, selectedUsers);
  };

  const filteredUsers = users.filter(user =>
    (activeTab === 'students' && user.role === 'student') ||
    (activeTab === 'teachers' && user.role === 'teacher') ||
    (activeTab === 'parents' && user.role === 'parent')
  ).filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4">
          <div>
            <CardTitle>{t('userManagement') || 'إدارة المستخدمين'}</CardTitle>
            <CardDescription>{t('manageAllUsers') || 'إدارة جميع المستخدمين في النظام'}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
              <DialogTrigger asChild>
                <Button variant="default" onClick={() => setShowAddModal(true)}>
                  <FaUserPlus /> {t('addUser') || 'إضافة مستخدم'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('addNewUser') || 'إضافة مستخدم جديد'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('name') || 'الاسم'}</Label>
                    <Input id="name" placeholder={t('enterName') || 'أدخل الاسم'} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('email') || 'البريد الإلكتروني'}</Label>
                    <Input id="email" placeholder={t('enterEmail') || 'أدخل البريد الإلكتروني'} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">{t('role') || 'الدور'}</Label>
                    <Input id="role" placeholder={t('rolePlaceholder') || 'طالب/معلم/ولي أمر'} />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" onClick={() => setShowAddModal(false)}>
                    {t('save') || 'حفظ'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    {t('cancel') || 'إلغاء'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> 
            <Dialog open={showSearchModal} onOpenChange={setShowSearchModal}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setShowSearchModal(true)}>
                  <FaSearch /> {t('search') || 'بحث'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('searchUsers') || 'بحث عن المستخدمين'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">{t('searchQuery') || 'كلمة البحث'}</Label>
                    <Input
                      id="search"
                      placeholder={t('searchUserPlaceholder') || 'ابحث عن مستخدم...'}
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" onClick={() => setShowSearchModal(false)}>
                    {t('search') || 'بحث'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowSearchModal(false)}>
                    {t('cancel') || 'إلغاء'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <FaDownload /> {t('export') || 'تصدير'}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <FaFilter /> {t('filters') || 'فلاتر'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid grid-cols-3 w-full">
              <TabsTrigger value="students">{t('students') || 'الطلاب'}</TabsTrigger>
              <TabsTrigger value="teachers">{t('teachers') || 'المعلمون'}</TabsTrigger>
              <TabsTrigger value="parents">{t('parents') || 'أولياء الأمور'}</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-0">
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className={isRtl ? 'text-right' : 'text-left'}>{t('name') || 'الاسم'}</TableHead>
                      <TableHead className={isRtl ? 'text-right' : 'text-left'}>{t('email') || 'البريد الإلكتروني'}</TableHead>
                      <TableHead className={isRtl ? 'text-right' : 'text-left'}>{t('role') || 'الدور'}</TableHead>
                      <TableHead className={isRtl ? 'text-right' : 'text-left'}>{t('status') || 'الحالة'}</TableHead>
                      <TableHead className={isRtl ? 'text-right' : 'text-left'}>{t('joinDate') || 'تاريخ الانضمام'}</TableHead>
                      <TableHead className={isRtl ? 'text-right' : 'text-left'}>{t('actions') || 'إجراءات'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className={isRtl ? 'text-right' : 'text-left'}>{user.name}</TableCell>
                        <TableCell className={isRtl ? 'text-right' : 'text-left'}>{user.email}</TableCell>
                        <TableCell className={isRtl ? 'text-right' : 'text-left'}>
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${user.role === 'student' ? 'bg-blue-100 text-blue-800' : user.role === 'teacher' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{t(user.role) || (user.role === 'student' ? 'طالب' : user.role === 'teacher' ? 'معلم' : 'ولي أمر')}</span>
                        </TableCell>
                        <TableCell className={isRtl ? 'text-right' : 'text-left'}>
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{user.status === 'active' ? t('active') || 'نشط' : t('inactive') || 'غير نشط'}</span>
                        </TableCell>
                        <TableCell className={isRtl ? 'text-right' : 'text-left'}>{user.joinDate}</TableCell>
                        <TableCell className={isRtl ? 'text-right' : 'text-left'}>
                          <Button size="icon" variant="ghost" className="mr-2"><FaEdit /></Button>
                          <Button size="icon" variant="ghost" className="text-red-600"><FaTrash /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement; 