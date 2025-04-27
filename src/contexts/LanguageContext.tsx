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
  loginDescription: { en: 'Please enter your credentials to access your account', ar: 'الرجاء إدخال بيانات الاعتماد للوصول إلى حسابك' },
  username: { en: 'Username', ar: 'اسم المستخدم' },
  password: { en: 'Password', ar: 'كلمة المرور' },
  enterUsername: { en: 'Enter your username', ar: 'أدخل اسم المستخدم' },
  enterPassword: { en: 'Enter your password', ar: 'أدخل كلمة المرور' },
  role: { en: 'Role', ar: 'الدور' },
  selectRole: { en: 'Select your role', ar: 'اختر دورك' },
  forgotPassword: { en: 'Forgot Password?', ar: 'نسيت كلمة المرور؟' },
  loginSuccess: { en: 'Login Successful', ar: 'تم تسجيل الدخول بنجاح' },
  welcomeBack: { en: 'Welcome back!', ar: 'مرحباً بعودتك!' },
  loginError: { en: 'Login Error', ar: 'خطأ في تسجيل الدخول' },
  pleaseFillAllFields: { en: 'Please fill in all fields', ar: 'الرجاء ملء جميع الحقول' },
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
  uploadAudio: { en: 'Upload Audio', ar: 'تحميل صوت' },
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
  viewAllCourses: { en: 'View All Courses', ar: 'عرض جميع المواد' },
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
  excellentWork: { en: 'Excellent work, very thorough answers!', ar: 'عمل ممتاز، إجابات شاملة جدًا!' },
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
  collaborateWithOthers: { en: 'Collaborate with other students on projects', ar: 'تعاون مع طلاب آخرين في المشاريع' },
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
  },

  // Home page translations
  welcome: { en: 'Welcome to Our School', ar: 'مرحباً بكم في مدرستنا' },
  intro: { 
    en: 'A place where excellence in education meets innovation and tradition', 
    ar: 'مكان يجتمع فيه التميز في التعليم مع الابتكار والتقاليد' 
  },
  discover: { en: 'Discover More', ar: 'اكتشف المزيد' },
  contact_us: { en: 'Contact Us', ar: 'اتصل بنا' },
  about_us: { en: 'About Us', ar: 'من نحن' },
  about_text: { 
    en: 'Our school is dedicated to providing a world-class education that prepares students for success in an ever-changing world.', 
    ar: 'مدرستنا مكرسة لتقديم تعليم عالمي المستوى يعد الطلاب للنجاح في عالم متغير باستمرار.' 
  },
  vision: { en: 'Our Vision', ar: 'رؤيتنا' },
  vision_text: { 
    en: 'To be a leading educational institution that inspires lifelong learning and global citizenship.', 
    ar: 'أن نكون مؤسسة تعليمية رائدة تلهم التعلم مدى الحياة والمواطنة العالمية.' 
  },
  mission: { en: 'Our Mission', ar: 'مهمتنا' },
  mission_text: { 
    en: 'To provide an exceptional educational experience that nurtures intellectual curiosity, creativity, and character development.', 
    ar: 'تقديم تجربة تعليمية استثنائية تعزز الفضول الفكري والإبداع وتنمية الشخصية.' 
  },
  principal_message: { en: 'Message from the Principal', ar: 'رسالة من المدير' },
  principal_quote: { 
    en: 'At our school, we believe in creating an environment where every student can thrive and reach their full potential.', 
    ar: 'في مدرستنا، نؤمن بخلق بيئة يمكن لكل طالب أن يزدهر فيها ويحقق إمكاناته الكاملة.' 
  },
  principal_name: { en: 'Dr. Sarah Johnson', ar: 'الدكتورة سارة جونسون' },
  principal_title: { en: 'School Principal', ar: 'مديرة المدرسة' },
  news_events: { en: 'News & Events', ar: 'الأخبار والفعاليات' },
  news_events_desc: { 
    en: 'Stay updated with the latest happenings and upcoming events at our school.', 
    ar: 'ابق على اطلاع بأحدث الأحداث والفعاليات القادمة في مدرستنا.' 
  },
  read_more: { en: 'Read More', ar: 'اقرأ المزيد' },
  view_all: { en: 'View All', ar: 'عرض الكل' },

  // New sections translations
  academic_programs: { en: 'Academic Programs', ar: 'البرامج الأكاديمية' },
  academic_programs_desc: { 
    en: 'Explore our comprehensive educational programs designed to meet the needs of every student.', 
    ar: 'اكتشف برامجنا التعليمية الشاملة المصممة لتلبية احتياجات كل طالب.' 
  },
  primary_school: { en: 'Primary School', ar: 'المدرسة الابتدائية' },
  primary_school_desc: { en: 'Grades 1-5', ar: 'الصفوف 1-5' },
  primary_school_feature1: { en: 'Interactive Learning', ar: 'التعلم التفاعلي' },
  primary_school_feature2: { en: 'Basic Skills Development', ar: 'تطوير المهارات الأساسية' },
  primary_school_feature3: { en: 'Creative Activities', ar: 'الأنشطة الإبداعية' },
  middle_school: { en: 'Middle School', ar: 'المدرسة المتوسطة' },
  middle_school_desc: { en: 'Grades 6-8', ar: 'الصفوف 6-8' },
  middle_school_feature1: { en: 'Advanced Curriculum', ar: 'منهج متقدم' },
  middle_school_feature2: { en: 'Critical Thinking', ar: 'التفكير النقدي' },
  middle_school_feature3: { en: 'Project-Based Learning', ar: 'التعلم القائم على المشاريع' },
  high_school: { en: 'High School', ar: 'المدرسة الثانوية' },
  high_school_desc: { en: 'Grades 9-12', ar: 'الصفوف 9-12' },
  high_school_feature1: { en: 'College Preparation', ar: 'التحضير للجامعة' },
  high_school_feature2: { en: 'Specialized Tracks', ar: 'مسارات متخصصة' },
  high_school_feature3: { en: 'Career Guidance', ar: 'الإرشاد المهني' },
  learn_more: { en: 'Learn More', ar: 'اعرف المزيد' },

  facilities: { en: 'Our Facilities', ar: 'مرافقنا' },
  facilities_desc: { 
    en: 'State-of-the-art facilities designed to enhance the learning experience.', 
    ar: 'مرافق متطورة مصممة لتعزيز تجربة التعلم.' 
  },
  library: { en: 'Library', ar: 'المكتبة' },
  library_desc: { 
    en: 'A vast collection of books and digital resources for research and learning.', 
    ar: 'مجموعة كبيرة من الكتب والموارد الرقمية للبحث والتعلم.' 
  },
  sports: { en: 'Sports Complex', ar: 'المجمع الرياضي' },
  sports_desc: { 
    en: 'Modern sports facilities for various athletic activities and competitions.', 
    ar: 'مرافق رياضية حديثة للأنشطة والمسابقات الرياضية المختلفة.' 
  },
  labs: { en: 'Science Labs', ar: 'المختبرات العلمية' },
  labs_desc: { 
    en: 'Fully equipped laboratories for hands-on scientific experiments and research.', 
    ar: 'مختبرات مجهزة بالكامل للتجارب العلمية العملية والبحث.' 
  },
  arts: { en: 'Arts Center', ar: 'مركز الفنون' },
  arts_desc: { 
    en: 'Dedicated spaces for visual and performing arts education and practice.', 
    ar: 'مساحات مخصصة لتعليم الفنون البصرية والأدائية وممارستها.' 
  },

  testimonials: { en: 'Testimonials', ar: 'شهادات' },
  testimonials_desc: { 
    en: 'Hear what our community has to say about their experience at our school.', 
    ar: 'استمع إلى ما يقوله مجتمعنا عن تجربتهم في مدرستنا.' 
  },
  parent_name1: { en: 'Ahmed Hassan', ar: 'أحمد حسن' },
  parent_title1: { en: 'Parent of Grade 4 Student', ar: 'ولي أمر طالب الصف الرابع' },
  parent_testimonial1: { 
    en: 'The school has provided an excellent environment for my child\'s growth and development.', 
    ar: 'وفرت المدرسة بيئة ممتازة لنمو وتطور طفلي.' 
  },
  student_name1: { en: 'Fatima Ali', ar: 'فاطمة علي' },
  student_grade1: { en: 'Grade 10 Student', ar: 'طالبة الصف العاشر' },
  student_testimonial1: { 
    en: 'I love the supportive teachers and the opportunities for extracurricular activities.', 
    ar: 'أحب المعلمين الداعمين والفرص المتاحة للأنشطة اللامنهجية.' 
  },
  alumni_name1: { en: 'Mohammed Ahmed', ar: 'محمد أحمد' },
  alumni_title1: { en: 'Class of 2020', ar: 'دفعة 2020' },
  alumni_testimonial1: { 
    en: 'The education I received here prepared me well for university and my career.', 
    ar: 'التعليم الذي تلقيتُه هنا أعدني جيداً للجامعة ومهنتي.' 
  },

  quick_links: { en: 'Quick Links', ar: 'روابط سريعة' },
  quick_links_desc: { 
    en: 'Access important information and resources with just one click.', 
    ar: 'الوصول إلى المعلومات والموارد المهمة بنقرة واحدة.' 
  },
  admissions: { en: 'Admissions', ar: 'القبول' },
  apply_now: { en: 'Apply Now', ar: 'تقدم الآن' },
  calendar: { en: 'School Calendar', ar: 'التقويم المدرسي' },
  view_calendar: { en: 'View Calendar', ar: 'عرض التقويم' },
  newsletter: { en: 'Newsletter', ar: 'النشرة الإخبارية' },
  subscribe: { en: 'Subscribe', ar: 'اشترك' },
  contact: { en: 'Contact', ar: 'اتصل بنا' },
  get_in_touch: { en: 'Get in Touch', ar: 'تواصل معنا' },
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
