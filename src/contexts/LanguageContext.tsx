import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface TranslationDictionary {
  [key: string]: {
    en: string;
    ar: string;
  };
}

// Translation dictionary
const translations: TranslationDictionary = {
  // Existing translations
  home: { en: 'Home', ar: 'الرئيسية' },
  teachers: { en: 'Teachers', ar: 'المعلمون' },
  students: { en: 'Students', ar: 'الطلاب' },
  parents: { en: 'Parents', ar: 'أولياء الأمور' },
  admin: { en: 'Admin', ar: 'الإدارة' },
  courses: { en: 'Courses', ar: 'المواد الدراسية' },
  courseManagement: { en: 'Course Management', ar: 'إدارة المواد الدراسية' },
  settings: { en: 'Settings', ar: 'الإعدادات' },
  notifications: { en: 'Notifications', ar: 'الإشعارات' },
  profile: { en: 'Profile', ar: 'الملف الشخصي' },
  logout: { en: 'Logout', ar: 'تسجيل الخروج' },
  login: { en: 'Login', ar: 'تسجيل الدخول' },
  register: { en: 'Register', ar: 'التسجيل' },
  about: { en: 'About', ar: 'عن المدرسة' },
  contact: { en: 'Contact', ar: 'اتصل بنا' },
  search: { en: 'Search', ar: 'بحث' },
  language: { en: 'Language', ar: 'اللغة' },
  
  // Course management translations
  calendar: { en: 'Calendar', ar: 'التقويم' },
  files: { en: 'Files', ar: 'الملفات' },
  multimedia: { en: 'Multimedia', ar: 'الوسائط المتعددة' },
  notes: { en: 'Notes', ar: 'الملاحظات' },
  analytics: { en: 'Analytics', ar: 'التحليلات' },
  courseCalendar: { en: 'Course Calendar', ar: 'تقويم المادة' },
  manageCourseScheduleDescription: { 
    en: 'Manage course schedule, deadlines, and important dates', 
    ar: 'إدارة جدول المادة والمواعيد النهائية والتواريخ المهمة' 
  },
  upcomingEvents: { en: 'Upcoming Events', ar: 'الأحداث القادمة' },
  addNewEvent: { en: 'Add New Event', ar: 'إضافة حدث جديد' },
  fillEventDetails: { en: 'Fill in the details for the new event', ar: 'املأ تفاصيل الحدث الجديد' },
  eventTitle: { en: 'Event Title', ar: 'عنوان الحدث' },
  eventDate: { en: 'Event Date', ar: 'تاريخ الحدث' },
  eventType: { en: 'Event Type', ar: 'نوع الحدث' },
  description: { en: 'Description', ar: 'الوصف' },
  save: { en: 'Save', ar: 'حفظ' },
  exam: { en: 'Exam', ar: 'اختبار' },
  assignment: { en: 'Assignment', ar: 'واجب' },
  class: { en: 'Class', ar: 'حصة' },
  event: { en: 'Event', ar: 'حدث' },
  studentFiles: { en: 'Student Files', ar: 'ملفات الطلاب' },
  manageStudentDocumentsDescription: { 
    en: 'Upload and manage student documents and files', 
    ar: 'تحميل وإدارة مستندات وملفات الطلاب' 
  },
  studentDocuments: { en: 'Student Documents', ar: 'مستندات الطلاب' },
  uploadNewFile: { en: 'Upload New File', ar: 'تحميل ملف جديد' },
  student: { en: 'Student', ar: 'الطالب' },
  lastUpdate: { en: 'Last Update', ar: 'آخر تحديث' },
  actions: { en: 'Actions', ar: 'الإجراءات' },
  view: { en: 'View', ar: 'عرض' },
  courseMultimedia: { en: 'Course Multimedia', ar: 'وسائط المادة' },
  manageCourseMediaDescription: { 
    en: 'Upload and manage videos, images, and audio files related to the course', 
    ar: 'تحميل وإدارة مقاطع الفيديو والصور وملفات الصوت المتعلقة بالمادة' 
  },
  mediaFiles: { en: 'Media Files', ar: 'ملفات الوسائط' },
  uploadVideo: { en: 'Upload Video', ar: 'تحميل فيديو' },
  uploadImage: { en: 'Upload Image', ar: 'تحميل صورة' },
  uploadAudio: { en: 'Upload Audio', ar: 'تح��يل صوت' },
  title: { en: 'Title', ar: 'العنوان' },
  type: { en: 'Type', ar: 'النوع' },
  size: { en: 'Size', ar: 'الحجم' },
  uploaded: { en: 'Uploaded', ar: 'تم التحميل' },
  play: { en: 'Play', ar: 'تشغيل' },
  download: { en: 'Download', ar: 'تحميل' },
  courseNotes: { en: 'Course Notes', ar: 'ملاحظات المادة' },
  manageNotesDescription: { 
    en: 'Create, share, and manage notes related to the course', 
    ar: 'إنشاء ومشاركة وإدارة الملاحظات المتعلقة بالمادة' 
  },
  createNewNote: { en: 'Create New Note', ar: 'إنشاء ملاحظة جديدة' },
  mathFormulas: { en: 'Math Formulas', ar: 'صيغ الرياضيات' },
  mathFormulasDescription: { 
    en: 'Important formulas for the differential equations section including solving techniques and applications', 
    ar: 'صيغ مهمة لقسم المعادلات التفاضلية بما في ذلك تقنيات الحل والتطبيقات' 
  },
  arabicPoetry: { en: 'Arabic Poetry', ar: 'الشعر العربي' },
  arabicPoetryDescription: { 
    en: 'Notes on classical Arabic poetry forms, meters, and famous poets of the Abbasid era', 
    ar: 'ملاحظات حول أشكال الشعر العربي الكلاسيكي وأوزانه وشعراء العصر العباسي المشهورين' 
  },
  edit: { en: 'Edit', ar: 'تحرير' },
  share: { en: 'Share', ar: 'مشاركة' },
  performanceAnalytics: { en: 'Performance Analytics', ar: 'تحليل الأداء' },
  coursePerformanceDescription: { 
    en: 'Visual insights into student and course performance over time', 
    ar: 'رؤى مرئية لأداء الطالب والمادة بمرور الوقت' 
  },
  studentProgress: { en: 'Student Progress', ar: 'تقدم الطالب' },
  assignmentCompletion: { en: 'Assignment Completion', ar: 'إكمال الواجبات' },
  courseArchive: { en: 'Course Archive', ar: 'أرشيف المواد' },
  studentProfiles: { en: 'Student Profiles', ar: 'ملفات الطلاب' },
  viewAll: { en: 'View All', ar: 'عرض الكل' },
  assignmentDueSoon: { en: 'Assignment Due Soon', ar: 'موعد تسليم الواجب قريب' },
  mathQuizDue: { en: 'Math Quiz due on May 10th', ar: 'موعد تسليم اختبار الرياضيات في 10 مايو' },
  newStudentNote: { en: 'New Student Note', ar: 'ملاحظة طالب جديدة' },
  studentAddedNote: { en: 'Ahmed added a new note to Science class', ar: 'أضاف أحمد ملاحظة جديدة لمادة العلوم' },
  manageNotifications: { en: 'Manage Notifications', ar: 'إدارة الإشعارات' },
  collaboration: { en: 'Collaboration', ar: 'التعاون' },
  scienceProjectGroup: { en: 'Science Project Group', ar: 'مجموعة مشروع العلوم' },
  mathStudyGroup: { en: 'Math Study Group', ar: 'مجموعة دراسة الرياضيات' },
  members: { en: 'Members', ar: 'أعضاء' },
  createGroup: { en: 'Create Group', ar: 'إنشاء مجموعة' },
  saveChanges: { en: 'Save Changes', ar: 'حفظ التغييرات' },
  settingsSaved: { en: 'Settings Saved', ar: 'تم حفظ الإعدادات' },
  courseSettingsUpdated: { en: 'Course management settings have been updated', ar: 'تم تحديث إعدادات إدارة المواد' },

  // Student profile translations
  overview: { en: 'Overview', ar: 'نظرة عامة' },
  achievements: { en: 'Achievements', ar: 'الإنجازات' },
  academicHistory: { en: 'Academic History', ar: 'السجل الأكاديمي' },
  attendance: { en: 'Attendance', ar: 'الحضور' },
  attendanceRate: { en: 'Attendance Rate', ar: 'معدل الحضور' },
  academicPerformance: { en: 'Academic Performance', ar: 'الأداء الأكاديمي' },
  gpa: { en: 'GPA', ar: 'المعدل التراكمي' },
  courseProgress: { en: 'Course Progress', ar: 'تقدم المادة' },
  viewAllCourses: { en: 'View All Courses', ar: 'عرض جميع المو���د' },
  progress: { en: 'Progress', ar: 'التقدم' },
  viewAssignments: { en: 'View Assignments', ar: 'عرض الواجبات' },
  viewNotes: { en: 'View Notes', ar: 'عرض الملاحظات' },
  enterCourse: { en: 'Enter Course', ar: 'دخول المادة' },
  academicYear: { en: 'Academic Year', ar: 'العام الدراسي' },
  grade: { en: 'Grade', ar: 'الصف' },
  printReport: { en: 'Print Report', ar: 'طباعة التقرير' },
  sendMessage: { en: 'Send Message', ar: 'إرسال رسالة' },

  // Assignment manager translations
  assignmentsAndProjects: { en: 'Assignments & Projects', ar: 'الواجبات والمشاريع' },
  manageAssignmentsDescription: { 
    en: 'Create and manage assignments, track submissions and provide feedback', 
    ar: 'إنشاء وإدارة الواجبات وتتبع التسليمات وتقديم الملاحظات' 
  },
  active: { en: 'Active', ar: 'نشط' },
  past: { en: 'Past', ar: 'سابق' },
  draft: { en: 'Draft', ar: 'مسودة' },
  createAssignment: { en: 'Create Assignment', ar: 'إنشاء واجب' },
  createNewAssignment: { en: 'Create New Assignment', ar: 'إنشاء واجب جديد' },
  fillAssignmentDetails: { en: 'Fill in the assignment details', ar: 'املأ تفاصيل الواجب' },
  assignmentTitlePlaceholder: { en: 'Enter assignment title', ar: 'أدخل عنوان الواجب' },
  assignmentDescriptionPlaceholder: { en: 'Enter assignment description', ar: 'أدخل وصف الواجب' },
  dueDate: { en: 'Due Date', ar: 'تاريخ التسليم' },
  maxScore: { en: 'Max Score', ar: 'الدرجة القصوى' },
  attachments: { en: 'Attachments', ar: 'المرفقات' },
  dragFilesHere: { en: 'Drag and drop files here or click to browse', ar: 'اسحب وأفلت الملفات هنا أو انقر للتصفح' },
  browseFiles: { en: 'Browse Files', ar: 'تصفح الملفات' },
  saveAsDraft: { en: 'Save as Draft', ar: 'حفظ كمسودة' },
  publish: { en: 'Publish', ar: 'نشر' },
  due: { en: 'Due', ar: 'التسليم' },
  submitted: { en: 'Submitted', ar: 'تم التسليم' },
  graded: { en: 'Graded', ar: 'تم التقييم' },
  viewSubmissions: { en: 'View Submissions', ar: 'عرض التسليمات' },
  sendReminder: { en: 'Send Reminder', ar: 'إرسال تذكير' },
  close: { en: 'Close', ar: 'إغلاق' },
  all: { en: 'All', ar: 'الكل' },
  notSubmitted: { en: 'Not Submitted', ar: 'لم يتم التسليم' },
  needsGrading: { en: 'Needs Grading', ar: 'يحتاج إلى تقييم' },
  submittedOn: { en: 'Submitted on', ar: 'تم التسليم في' },
  feedback: { en: 'Feedback', ar: 'الملاحظات' },
  grade: { en: 'Grade', ar: 'تقييم' },
  updateGrade: { en: 'Update Grade', ar: 'تحديث التقييم' },
  gradeSubmission: { en: 'Grade Submission', ar: 'تقييم التسليم' },
  gradeSubmissionFor: { en: 'Grade submission for', ar: 'تقييم تسليم لـ' },
  score: { en: 'Score', ar: 'الدرجة' },
  outOf: { en: 'out of', ar: 'من' },
  provideFeedback: { en: 'Provide feedback to the student', ar: 'قدم ملاحظات للطالب' },
  cancel: { en: 'Cancel', ar: 'إلغاء' },
  saveGrade: { en: 'Save Grade', ar: 'حفظ التقييم' },
  submissionGraded: { en: 'Submission Graded', ar: 'تم تقييم التسليم' },
  submissionGradedMessage: { en: 'The submission has been successfully graded', ar: 'تم تقييم التسليم بنجاح' },
  mathQuizAlgebra: { en: 'Math Quiz: Algebra', ar: 'اختبار الرياضيات: الجبر' },
  mathQuizDescription: { 
    en: 'Quiz covering algebraic equations, functions, and graphing', 
    ar: 'اختبار يغطي المعادلات الجبرية والدوال والرسم البياني' 
  },
  goodWork: { en: 'Good work on the equations section!', ar: 'عمل جيد في قسم المعادلات!' },
  excellentWork: { en: 'Excellent work, very thorough answers!', ar: 'عمل ممت��ز، إجابات شاملة جدًا!' },
  scienceProjectEcosystem: { en: 'Science Project: Ecosystem', ar: 'مشروع العلوم: النظام البيئي' },
  scienceProjectDescription: { 
    en: 'Create a model of a local ecosystem and document the interactions', 
    ar: 'إنشاء نموذج للنظام البيئي المحلي وتوثيق التفاعلات' 
  },

  // Collaboration tools translations
  discussionForums: { en: 'Discussion Forums', ar: 'منتديات النقاش' },
  newTopic: { en: 'New Topic', ar: 'موضوع جديد' },
  createNewDiscussionTopic: { en: 'Create New Discussion Topic', ar: 'إنشاء موضوع نقاش جديد' },
  shareYourThoughts: { en: 'Share your thoughts with the class', ar: 'شارك أفكارك مع الفصل' },
  enterTopicTitle: { en: 'Enter topic title', ar: 'أدخل عنوان الموضوع' },
  describeYourTopic: { en: 'Describe your topic here...', ar: 'صف موضوعك هنا...' },
  tags: { en: 'Tags', ar: 'الوسوم' },
  tagsCommaSeparated: { en: 'Enter tags separated by commas', ar: 'أدخل الوسوم مفصولة بفواصل' },
  createTopic: { en: 'Create Topic', ar: 'إنشاء موضوع' },
  discussionForumsDescription: { 
    en: 'Participate in class discussions and ask questions', 
    ar: 'المشاركة في مناقشات الفصل وطرح الأسئلة' 
  },
  startedBy: { en: 'Started by', ar: 'بدأ بواسطة' },
  backToTopics: { en: 'Back to Topics', ar: 'العودة إلى المواضيع' },
  reply: { en: 'Reply', ar: 'رد' },
  writeYourMessage: { en: 'Write your message...', ar: 'اكتب رسالتك...' },
  post: { en: 'Post', ar: 'نشر' },
  mathProblemDiscussion: { en: 'Math Problem Discussion', ar: 'مناقشة مسألة رياضية' },
  discussionDescription1: { 
    en: 'Let\'s discuss approaches to solving the differential equation problem from Chapter 4', 
    ar: 'دعونا نناقش طرق حل مسألة المعادلة التفاضلية من الفصل الرابع' 
  },
  discussionMessage1: { 
    en: 'I\'m having trouble understanding how to solve the second-order differential equation. Can someone explain the steps?', 
    ar: 'أواجه صعوبة في فهم كيفية حل معادلة تفاضلية من الدرجة الثانية. هل يمكن لأحد شرح الخطوات؟' 
  },
  discussionReply1: { 
    en: 'Sure! First, you need to identify if it\'s homogeneous or non-homogeneous. Then...', 
    ar: 'بالتأكيد! أولاً، تحتاج إلى تحديد ما إذا كانت متجانسة أو غير متجانسة. ثم...' 
  },
  discussionMessage2: { 
    en: 'I found a helpful video tutorial that explains this concept. Here\'s the link...', 
    ar: 'وجدت فيديو تعليمي مفيد يشرح هذا المفهوم. إليك الرابط...' 
  },
  scienceProjectIdeas: { en: 'Science Project Ideas', ar: 'أفكار مشروع العلوم' },
  discussionDescription2: { 
    en: 'Brainstorming ideas for the upcoming science fair project', 
    ar: 'العصف الذهني لأفكار مشروع معرض العلوم القادم' 
  },
  discussionMessage3: { 
    en: 'I\'m thinking about doing a project on renewable energy sources. Any suggestions for narrowing down the topic?', 
    ar: 'أفكر في القيام بمشروع عن مصادر الطاقة المتجددة. أي اقتراحات لتضييق نطاق الموضوع؟' 
  },
  messagePosted: { en: 'Message Posted', ar: 'تم نشر الرسالة' },
  yourMessageHasBeenPosted: { en: 'Your message has been posted successfully', ar: 'تم نشر رسالتك بنجاح' },
  projectGroups: { en: 'Project Groups', ar: 'مجموعات المشاريع' },
  createNewProjectGroup: { en: 'Create New Project Group', ar: 'إنشاء مجموعة مشروع جديدة' },
  collaborateWithOthers: { en: 'Collaborate with other students on projects', ar: 'تعاون مع طلاب آخرين في المشاري��' },
  groupName: { en: 'Group Name', ar: 'اسم المجموعة' },
  enterGroupName: { en: 'Enter group name', ar: 'أدخل اسم المجموعة' },
  describeYourGroup: { en: 'Describe your group purpose and goals...', ar: 'صف غرض مجموعتك وأهدافها...' },
  inviteMembers: { en: 'Invite Members', ar: 'دعوة أعضاء' },
  enterEmailsCommaSeparated: { en: 'Enter email addresses separated by commas', ar: 'أدخل عناوين البريد الإلكتروني مفصولة بفواصل' },
  projectGroupsDescription: { 
    en: 'Collaborate with others on group projects and assignments', 
    ar: 'التعاون مع الآخرين في مشاريع وواجبات المجموعة' 
  },
  tasks: { en: 'Tasks', ar: 'المهام' },
  groupTasks: { en: 'Group Tasks', ar: 'مهام المجموعة' },
  addTask: { en: 'Add Task', ar: 'إضافة مهمة' },
  addNewTask: { en: 'Add New Task', ar: 'إضافة مهمة جديدة' },
  createTaskForGroup: { en: 'Create a new task for the group', ar: 'إنشاء مهمة جديدة للمجموعة' },
  taskTitle: { en: 'Task Title', ar: 'عنوان المهمة' },
  enterTaskTitle: { en: 'Enter task title', ar: 'أدخل عنوان المهمة' },
  assignTo: { en: 'Assign To', ar: 'تعيين إلى' },
  todo: { en: 'To Do', ar: 'للتنفيذ' },
  inProgress: { en: 'In Progress', ar: 'قيد التنفيذ' },
  completed: { en: 'Completed', ar: 'مكتمل' },
  assignedTo: { en: 'Assigned to', ar: 'مُعيَّن إلى' },
  startTask: { en: 'Start Task', ar: 'بدء المهمة' },
  completeTask: { en: 'Complete Task', ar: 'إكمال المهمة' },
  groupMembers: { en: 'Group Members', ar: 'أعضاء المجموعة' },
  message: { en: 'Message', ar: 'رسالة' },
  inviteMore: { en: 'Invite More', ar: 'دعوة المزيد' },
  sharedFiles: { en: 'Shared Files', ar: 'الملفات المشتركة' },
  uploadFile: { en: 'Upload File', ar: 'تحميل ملف' },
  noFilesYet: { en: 'No files have been shared yet', ar: 'لم يتم مشاركة أي ملفات بعد' },
  uploadFirst: { en: 'Upload First File', ar: 'تحميل أول ملف' },
  join: { en: 'Join', ar: 'انضمام' },
  createGroupDescription: { 
    en: 'Start a new group for project collaboration', 
    ar: 'بدء مجموعة جديدة للتعاون في المشروع' 
  },
  groupDescription1: { 
    en: 'Group for collaborative work on the ecosystem science project', 
    ar: 'مجموعة للعمل التعاوني في مشروع العلوم البيئية' 
  },
  groupDescription2: { 
    en: 'Study group for practicing advanced math problems', 
    ar: 'مجموعة دراسية لممارسة مسائل الرياضيات المتقدمة' 
  },
  researchTask: { en: 'Research ecosystem components', ar: 'بحث مكونات النظام البيئي' },
  experimentTask: { en: 'Conduct water quality experiment', ar: 'إجراء تجربة جودة المياه' },
  presentationTask: { en: 'Prepare final presentation', ar: 'إعداد العرض النهائي' },
  practiceProblemsTask: { en: 'Complete practice problems 1-20', ar: 'إكمال مسائل الممارسة 1-20' },
  conceptReviewTask: { en: 'Review calculus concepts', ar: 'مراجعة مفاهيم التفاضل والتكامل' },
  taskAdded: { en: 'Task Added', ar: 'تمت إضافة المهمة' },
  newTaskAddedToGroup: { en: 'New task has been added to the group', ar: 'تمت إضافة مهمة جديدة إلى المجموعة' },
  requestSent: { en: 'Request Sent', ar: 'تم إرسال الطلب' },
  joinRequestSent: { en: 'Your request to join the group has been sent', ar: 'تم إرسال طلبك للانضمام إلى المجموعة' },

  // Guide tooltips translations
  calendarGuide: { 
    en: 'View and manage your schedule, courses, and exams', 
    ar: 'عرض وإدارة جدولك والمواد والامتحانات' 
  },
  teachersGuide: { 
    en: 'Connect with teachers and view their profiles', 
    ar: 'تواصل مع المعلمين وعرض ملفاتهم الشخصية' 
  },
  studentsGuide: { 
    en: 'Access student information and academic progress', 
    ar: 'الوصول إلى معلومات الطلاب والتقدم الأكاديمي' 
  },
  parentsGuide: { 
    en: 'Parent portal for monitoring student progress', 
    ar: 'بوابة أولياء الأمور لمتابعة تقدم الطلاب' 
  },
  chatGuide: { 
    en: 'Chat with teachers and other students', 
    ar: 'الدردشة مع المعلمين والطلاب الآخرين' 
  },
  coursesGuide: { 
    en: 'Browse and manage your courses', 
    ar: 'تصفح وإدارة موادك الدراسية' 
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: (key: string) => string;
  isRtl: boolean;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const isRtl = language === 'ar';

  // Function to get translation
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    console.warn(`Translation missing for key: ${key}`);
    return key;
  };

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.classList.toggle('rtl', language === 'ar');
    document.body.classList.toggle('ltr', language === 'en');
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
