import {
  initialSchool,
  initialSubscription,
  initialCurrentUser,
  initialAcademicYears,
  initialTeachers,
  initialClasses,
  initialSubjects,
  initialStudents,
  initialTeacherAllocations,
  initialAttendanceRecords,
  initialExams,
  initialExamResults,
  initialGradingScale,
  initialUsers,
  initialRolesPermissions,
  initialAuditLogs,
  initialNotifications,
} from './mockDatabase';

const delay = (ms = 50) => new Promise(resolve => setTimeout(resolve, ms));

class LocalStore {
  constructor() {
    this.school = this.load('school', initialSchool);
    this.subscription = this.load('subscription', initialSubscription);
    this.currentUser = this.load('currentUser', initialCurrentUser);
    this.academicYears = this.load('academicYears', initialAcademicYears);
    this.teachers = this.load('teachers', initialTeachers);
    this.classes = this.load('classes', initialClasses);
    this.subjects = this.load('subjects', initialSubjects);
    this.students = this.load('students', initialStudents);
    this.teacherAllocations = this.load('teacherAllocations', initialTeacherAllocations);
    this.attendanceRecords = this.load('attendanceRecords', initialAttendanceRecords);
    this.exams = this.load('exams', initialExams);
    this.examResults = this.load('examResults', initialExamResults);
    this.gradingScale = this.load('gradingScale', initialGradingScale);
    this.users = this.load('users', initialUsers);
    this.rolesPermissions = this.load('rolesPermissions', initialRolesPermissions);
    this.auditLogs = this.load('auditLogs', initialAuditLogs);
    this.notifications = this.load('notifications', initialNotifications);
  }

  load(key, defaultValue) {
    try {
      const stored = sessionStorage.getItem(`edusphere_${key}`);
      if (stored) {
        let text = stored;
        if (text.includes('Nimal')) {
          text = text.replaceAll('Nimal Perera', 'Hiran Samaranayake').replaceAll('Nimal', 'Hiran').replaceAll('Perera', 'Samaranayake');
        }
        if (key === 'students') {
          // Strip unsplash sample avatar URLs for students
          text = text.replace(/"avatar"\s*:\s*"https:\/\/images\.unsplash\.com\/[^"]+"/g, '"avatar": ""');
        }
        if (text !== stored) {
          sessionStorage.setItem(`edusphere_${key}`, text);
        }
        return JSON.parse(text);
      }
      return defaultValue;
    } catch {
      return defaultValue;
    }
  }

  save(key, data) {
    try {
      sessionStorage.setItem(`edusphere_${key}`, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage warning:", e);
    }
  }
}

const store = new LocalStore();

export const mockHandlers = {
  // Auth with Multi-Role Support
  login: async (email, password) => {
    await delay(50);
    if (!email || !password) {
      throw new Error("Please enter both email and password.");
    }
    const validPasswords = ['demo1234', 'admin123', 'demo', 'password123', 'admin', 'password'];
    if (!validPasswords.includes(password) && !password.startsWith('pass')) {
      throw new Error("Invalid email address or password.");
    }

    let userRole = 'School Administrator';
    let roleId = 'ROLE-ADMIN';
    let firstName = 'James';
    let lastName = 'Fernando';

    if (email.toLowerCase().includes('teacher')) {
      userRole = 'Teacher';
      roleId = 'ROLE-TEACHER';
      firstName = 'Aruni';
      lastName = 'Jayasinghe';
    } else if (email.toLowerCase().includes('student') || email.toLowerCase().includes('hiran') || email.toLowerCase().includes('std')) {
      userRole = 'Student';
      roleId = 'ROLE-STUDENT';
      firstName = 'Hiran';
      lastName = 'Samaranayake';
    }

    const isStudentRole = roleId === 'ROLE-STUDENT';

    const loggedUser = {
      user_id: isStudentRole ? 'USR-004' : `USR-${Date.now().toString().slice(-4)}`,
      first_name: firstName,
      last_name: lastName,
      email: email,
      role: userRole,
      role_id: roleId,
      student_id: isStudentRole ? 'STD-001' : undefined,
      admission_no: isStudentRole ? 'GIC-2024-001' : undefined,
      avatar: isStudentRole ? '' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    };

    return {
      token: "demo-jwt-token-edusphere-2026",
      user: loggedUser,
      school: store.school,
    };
  },

  registerUser: async (userData) => {
    await delay(50);
    if (!userData.email || !userData.first_name || !userData.last_name || !userData.password) {
      throw new Error("Please fill in all required fields.");
    }

    const newUser = {
      user_id: `USR-${Date.now().toString().slice(-4)}`,
      name: `${userData.first_name} ${userData.last_name}`,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      role: userData.role || 'Teacher',
      status: 'Active',
      last_login: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    store.users = [newUser, ...store.users];
    store.save('users', store.users);

    mockHandlers.addAuditLog('Auth', 'User Registered', `New user account registered for ${newUser.name} (${newUser.email})`);
    return {
      success: true,
      user: newUser,
      message: 'Account registered successfully!'
    };
  },

  // Students
  getStudents: async (params = {}) => {
    await delay(50);
    let list = [...store.students];

    if (params.search) {
      const term = params.search.toLowerCase();
      list = list.filter(
        s =>
          s.first_name.toLowerCase().includes(term) ||
          s.last_name.toLowerCase().includes(term) ||
          s.admission_no.toLowerCase().includes(term) ||
          s.grade_level.toLowerCase().includes(term)
      );
    }

    if (params.grade) {
      list = list.filter(s => s.grade_level === params.grade);
    }

    if (params.status) {
      list = list.filter(s => s.status.toLowerCase() === params.status.toLowerCase());
    }

    if (params.medium) {
      list = list.filter(s => s.medium.toLowerCase() === params.medium.toLowerCase());
    }

    return {
      data: list,
      total: list.length,
    };
  },

  createStudent: async (studentData) => {
    await delay(50);
    const firstName = studentData.first_name || (studentData.name ? studentData.name.split(' ')[0] : 'Test');
    const lastName = studentData.last_name || (studentData.name ? studentData.name.split(' ').slice(1).join(' ') : 'Student');

    const newStudent = {
      ...studentData,
      student_id: `STD-${Date.now().toString().slice(-4)}`,
      first_name: firstName,
      last_name: lastName,
      name: `${firstName} ${lastName}`,
      admission_no: studentData.admission_no || `GIC-2026-${Math.floor(100 + Math.random() * 900)}`,
      grade_level: studentData.grade_level || 'Grade 10',
      class_name: studentData.class_name || 'Grade 10 - Science',
      medium: studentData.medium || 'English',
      guardian_name: studentData.guardian_name || 'Guardian',
      guardian_phone: studentData.phone || studentData.guardian_phone || '0771234567',
      status: studentData.status || 'Active',
      avatar: studentData.avatar || ''
    };
    store.students = [newStudent, ...store.students];
    store.save('students', store.students);

    mockHandlers.addAuditLog('Students', 'Student Created', `Created student profile for ${firstName} ${lastName}`);
    return newStudent;
  },

  updateStudent: async (id, studentData) => {
    await delay(50);
    store.students = store.students.map(s => s.student_id === id ? { ...s, ...studentData } : s);
    store.save('students', store.students);
    return store.students.find(s => s.student_id === id);
  },

  deleteStudent: async (id) => {
    await delay(50);
    const target = store.students.find(s => s.student_id === id);
    store.students = store.students.filter(s => s.student_id !== id);
    store.save('students', store.students);
    return { success: true };
  },

  // Teachers
  getTeachers: async (params = {}) => {
    await delay(50);
    let list = [...store.teachers];
    if (params.search) {
      const term = params.search.toLowerCase();
      list = list.filter(
        t =>
          t.first_name.toLowerCase().includes(term) ||
          t.last_name.toLowerCase().includes(term) ||
          t.teacher_reg_no.toLowerCase().includes(term)
      );
    }
    if (params.status) {
      list = list.filter(t => t.status.toLowerCase() === params.status.toLowerCase());
    }
    return { data: list, total: list.length };
  },

  createTeacher: async (teacherData) => {
    await delay(50);
    const newTeacher = {
      ...teacherData,
      teacher_id: `TCH-${Date.now().toString().slice(-4)}`,
      teacher_reg_no: teacherData.teacher_reg_no || `TR-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: teacherData.status || 'Active',
      assigned_subjects: teacherData.assigned_subjects || [],
      assigned_classes: teacherData.assigned_classes || [],
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    };
    store.teachers = [newTeacher, ...store.teachers];
    store.save('teachers', store.teachers);
    return newTeacher;
  },

  updateTeacher: async (id, teacherData) => {
    await delay(50);
    store.teachers = store.teachers.map(t => t.teacher_id === id ? { ...t, ...teacherData } : t);
    store.save('teachers', store.teachers);
    return store.teachers.find(t => t.teacher_id === id);
  },

  deleteTeacher: async (id) => {
    await delay(50);
    store.teachers = store.teachers.filter(t => t.teacher_id !== id);
    store.save('teachers', store.teachers);
    return { success: true };
  },

  // Academics
  getAcademicYears: async () => store.academicYears,
  getClasses: async () => store.classes,
  getSubjects: async () => store.subjects,
  getTeacherAllocations: async () => store.teacherAllocations,
  saveClass: async (c) => { store.classes.push(c); return true; },
  saveSubject: async (s) => { store.subjects.push(s); return true; },

  // Attendance
  getAttendance: async () => store.attendanceRecords,
  saveAttendanceBatch: async () => ({ success: true }),

  // Exams
  getExams: async () => store.exams,
  createExam: async (examData) => {
    await delay(50);
    const newExam = {
      ...examData,
      exam_id: `EXM-2026-T${store.exams.length + 1}`,
      classes: examData.classes || ['Grade 10 - Science', 'Grade 11 - Science'],
      status: examData.status || 'Upcoming'
    };
    store.exams = [newExam, ...store.exams];
    store.save('exams', store.exams);
    mockHandlers.addAuditLog('Examinations', 'Exam Created', `Created examination ${newExam.exam_name}`);
    return newExam;
  },
  deleteExam: async (id) => {
    await delay(50);
    store.exams = store.exams.filter(e => e.exam_id !== id);
    store.save('exams', store.exams);
    return { success: true };
  },
  getExamResults: async () => store.examResults,
  saveExamResults: async () => ({ success: true }),
  getGradingScale: async () => store.gradingScale,
  updateGradingScale: async (s) => s,

  // Admin
  getUsers: async () => store.users,
  getRolesPermissions: async () => store.rolesPermissions,
  updateRolesPermissions: async (m) => ({ matrix: m }),
  getAuditLogs: async () => store.auditLogs,
  addAuditLog: () => {},
  getSchool: async () => store.school,
  updateSchool: async (s) => s,
  getSubscription: async () => store.subscription,
  getNotifications: async () => store.notifications,
  markAllNotificationsRead: async () => store.notifications,

  // Global Search Filter Handler
  searchGlobal: async (query = '') => {
    await delay(30);
    const term = (query || '').toLowerCase().trim();
    if (!term) {
      return { students: [], teachers: [], classes: [], subjects: [] };
    }

    const students = (store.students || []).filter(s =>
      (s.first_name && s.first_name.toLowerCase().includes(term)) ||
      (s.last_name && s.last_name.toLowerCase().includes(term)) ||
      (s.name && s.name.toLowerCase().includes(term)) ||
      (s.admission_no && s.admission_no.toLowerCase().includes(term)) ||
      (s.grade_level && s.grade_level.toLowerCase().includes(term)) ||
      (s.class_name && s.class_name.toLowerCase().includes(term))
    ).slice(0, 5);

    const teachers = (store.teachers || []).filter(t =>
      (t.first_name && t.first_name.toLowerCase().includes(term)) ||
      (t.last_name && t.last_name.toLowerCase().includes(term)) ||
      (t.teacher_reg_no && t.teacher_reg_no.toLowerCase().includes(term)) ||
      (t.assigned_subjects && Array.isArray(t.assigned_subjects) && t.assigned_subjects.some(sub => sub.toLowerCase().includes(term)))
    ).slice(0, 5);

    const classes = (store.classes || []).filter(c =>
      (c.class_name && c.class_name.toLowerCase().includes(term)) ||
      (c.grade_level && c.grade_level.toLowerCase().includes(term)) ||
      (c.medium && c.medium.toLowerCase().includes(term))
    ).slice(0, 5);

    const subjects = (store.subjects || []).filter(sub =>
      (sub.subject_name && sub.subject_name.toLowerCase().includes(term)) ||
      (sub.subject_code && sub.subject_code.toLowerCase().includes(term)) ||
      (sub.category && sub.category.toLowerCase().includes(term))
    ).slice(0, 5);

    return { students, teachers, classes, subjects };
  }
};
