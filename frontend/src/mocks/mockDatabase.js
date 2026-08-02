/**
 * EduSphere Mock Database
 * Contains production-grade, realistic Sri Lankan demo school data.
 */

export const initialSchool = {
  school_id: "SCH-001",
  code: "GIC001",
  name: "Greenfield International College",
  tagline: "Excellence in Holistic Education",
  email: "contact@greenfield.edu.lk",
  phone: "+94 11 258 9641",
  address: "148 Havelock Road, Colombo 05, Sri Lanka",
  website: "https://greenfield.edu.lk",
  current_academic_year: "2026",
  timezone: "Asia/Colombo",
  country: "Sri Lanka",
  primary_color: "#4f46e5",
  secondary_color: "#3730a3",
  logo_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80",
};

export const initialSubscription = {
  plan_name: "Professional Plan",
  status: "Active",
  renewal_date: "2026-12-31",
  students_limit: 5000,
  students_count: 2842,
  teachers_limit: 200,
  teachers_count: 146,
  storage_limit_gb: 100,
  storage_used_gb: 45.2,
  billing_cycle: "Annual",
  amount_usd: 1499,
};

export const initialCurrentUser = {
  user_id: "USR-001",
  first_name: "James",
  last_name: "Fernando",
  email: "admin@greenfield.edu.lk",
  role: "School Administrator",
  role_id: "ROLE-ADMIN",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  last_login: "2026-07-24T08:30:00",
  school_id: "SCH-001",
};

export const initialAcademicYears = [
  { academic_year_id: "AY-2026", year_name: "2026 Academic Year", start_date: "2026-01-05", end_date: "2026-12-15", status: "Active", is_current: true },
  { academic_year_id: "AY-2025", year_name: "2025 Academic Year", start_date: "2025-01-06", end_date: "2025-12-12", status: "Archived", is_current: false },
  { academic_year_id: "AY-2027", year_name: "2027 Academic Year", start_date: "2027-01-04", end_date: "2027-12-17", status: "Draft", is_current: false },
];

export const initialTeachers = [
  {
    teacher_id: "TCH-001",
    teacher_reg_no: "TR-2021-089",
    nic_no: "847291038V",
    first_name: "Aruni",
    last_name: "Jayasinghe",
    email: "aruni.j@greenfield.edu.lk",
    phone: "+94 77 123 4567",
    gender: "Female",
    date_of_birth: "1984-05-14",
    qualification: "M.Sc. Education, B.Sc. Mathematics (University of Colombo)",
    joining_date: "2021-01-10",
    address: "24/B, Flower Road, Colombo 07",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    assigned_subjects: ["MAT001"],
    assigned_classes: ["Grade 10 - Science", "Grade 11 - Science"]
  },
  {
    teacher_id: "TCH-002",
    teacher_reg_no: "TR-2018-042",
    nic_no: "791823910V",
    first_name: "Bandula",
    last_name: "Gunawardena",
    email: "bandula.g@greenfield.edu.lk",
    phone: "+94 71 987 6543",
    gender: "Male",
    date_of_birth: "1979-11-22",
    qualification: "B.Sc. Physics (Hons), Dip. in Pedagogy",
    joining_date: "2018-05-15",
    address: "105, Station Road, Nugegoda",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    assigned_subjects: ["SCI001", "PHY001"],
    assigned_classes: ["Grade 9 - A", "Grade 12 - Bio"]
  },
  {
    teacher_id: "TCH-003",
    teacher_reg_no: "TR-2022-115",
    nic_no: "916301928V",
    first_name: "Champa",
    last_name: "Ranasinghe",
    email: "champa.r@greenfield.edu.lk",
    phone: "+94 75 444 3322",
    gender: "Female",
    date_of_birth: "1991-03-08",
    qualification: "B.A. English Literature (University of Peradeniya), CELTA",
    joining_date: "2022-09-01",
    address: "42, Temple Road, Maharagama",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580894732468-058401e14295?w=150&auto=format&fit=crop&q=80",
    assigned_subjects: ["ENG001"],
    assigned_classes: ["Grade 6 - A", "Grade 7 - A", "Grade 8 - A"]
  },
  {
    teacher_id: "TCH-004",
    teacher_reg_no: "TR-2020-077",
    nic_no: "882391049V",
    first_name: "Dinesh",
    last_name: "Weerasinghe",
    email: "dinesh.w@greenfield.edu.lk",
    phone: "+94 70 888 1122",
    gender: "Male",
    date_of_birth: "1988-08-30",
    qualification: "B.Sc. Computer Science (Moratuwa), M.Sc. IT",
    joining_date: "2020-02-01",
    address: "88/1, Kandy Road, Kiribathgoda",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    assigned_subjects: ["ICT001"],
    assigned_classes: ["Grade 9 - A", "Grade 10 - Science", "Grade 11 - Science"]
  },
  {
    teacher_id: "TCH-005",
    teacher_reg_no: "TR-2023-140",
    nic_no: "948291044V",
    first_name: "Dilhani",
    last_name: "Rajapakse",
    email: "dilhani.r@greenfield.edu.lk",
    phone: "+94 77 333 9988",
    gender: "Female",
    date_of_birth: "1994-12-05",
    qualification: "B.Sc. Chemistry (University of Kelaniya)",
    joining_date: "2023-01-15",
    address: "15, Galle Road, Dehiwala",
    status: "On Leave",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    assigned_subjects: ["CHE001"],
    assigned_classes: ["Grade 12 - Bio"]
  }
];

export const initialClasses = [
  { class_id: "CLS-6A", grade_level: "Grade 6", section: "A", class_name: "Grade 6 - A", medium: "English", capacity: 40, enrolled_count: 36, class_teacher_id: "TCH-003", status: "Active" },
  { class_id: "CLS-6B", grade_level: "Grade 6", section: "B", class_name: "Grade 6 - B", medium: "Sinhala", capacity: 40, enrolled_count: 38, class_teacher_id: "TCH-001", status: "Active" },
  { class_id: "CLS-7A", grade_level: "Grade 7", section: "A", class_name: "Grade 7 - A", medium: "English", capacity: 40, enrolled_count: 35, class_teacher_id: "TCH-003", status: "Active" },
  { class_id: "CLS-8A", grade_level: "Grade 8", section: "A", class_name: "Grade 8 - A", medium: "English", capacity: 40, enrolled_count: 37, class_teacher_id: "TCH-002", status: "Active" },
  { class_id: "CLS-9A", grade_level: "Grade 9", section: "A", class_name: "Grade 9 - A", medium: "English", capacity: 42, enrolled_count: 40, class_teacher_id: "TCH-004", status: "Active" },
  { class_id: "CLS-10SCI", grade_level: "Grade 10", section: "Science", class_name: "Grade 10 - Science", medium: "English", capacity: 45, enrolled_count: 42, class_teacher_id: "TCH-001", status: "Active" },
  { class_id: "CLS-10COM", grade_level: "Grade 10", section: "Commerce", class_name: "Grade 10 - Commerce", medium: "Sinhala", capacity: 45, enrolled_count: 39, class_teacher_id: "TCH-005", status: "Active" },
  { class_id: "CLS-11SCI", grade_level: "Grade 11", section: "Science", class_name: "Grade 11 - Science", medium: "English", capacity: 45, enrolled_count: 44, class_teacher_id: "TCH-004", status: "Active" },
  { class_id: "CLS-12BIO", grade_level: "Grade 12", section: "Biological Science", class_name: "Grade 12 - Bio", medium: "English", capacity: 35, enrolled_count: 31, class_teacher_id: "TCH-002", status: "Active" },
];

export const initialSubjects = [
  { subject_id: "SUB-001", subject_code: "MAT001", subject_name: "Mathematics", category: "Core", assigned_teachers_count: 4, assigned_classes_count: 8, status: "Active" },
  { subject_id: "SUB-002", subject_code: "ENG001", subject_name: "English Language & Literature", category: "Languages", assigned_teachers_count: 3, assigned_classes_count: 9, status: "Active" },
  { subject_id: "SUB-003", subject_code: "SCI001", subject_name: "General Science", category: "Science", assigned_teachers_count: 3, assigned_classes_count: 6, status: "Active" },
  { subject_id: "SUB-004", subject_code: "ICT001", subject_name: "Information & Communication Technology", category: "Technology", assigned_teachers_count: 2, assigned_classes_count: 7, status: "Active" },
  { subject_id: "SUB-005", subject_code: "HIS001", subject_name: "History & Social Studies", category: "Humanities", assigned_teachers_count: 2, assigned_classes_count: 5, status: "Active" },
  { subject_id: "SUB-006", subject_code: "SIN001", subject_name: "Sinhala Language", category: "Languages", assigned_teachers_count: 3, assigned_classes_count: 8, status: "Active" },
  { subject_id: "SUB-007", subject_code: "PHY001", subject_name: "Advanced Physics", category: "Science", assigned_teachers_count: 2, assigned_classes_count: 3, status: "Active" },
  { subject_id: "SUB-008", subject_code: "CHE001", subject_name: "Advanced Chemistry", category: "Science", assigned_teachers_count: 2, assigned_classes_count: 3, status: "Active" },
];

export const initialStudents = [
  {
    student_id: "STD-001",
    admission_no: "GIC-2024-001",
    first_name: "Hiran",
    last_name: "Samaranayake",
    date_of_birth: "2010-04-12",
    gender: "Male",
    medium: "English",
    admission_date: "2024-01-10",
    grade_level: "Grade 10",
    class_name: "Grade 10 - Science",
    class_id: "CLS-10SCI",
    address: "45/A, High Level Road, Nugegoda",
    phone: "+94 77 234 5678",
    guardian_name: "K. Samaranayake",
    guardian_relationship: "Father",
    guardian_phone: "+94 77 999 8877",
    guardian_email: "hiran.samaranayake@gmail.com",
    status: "Active",
    portal_account: true,
    avatar: ""
  },
  {
    student_id: "STD-002",
    admission_no: "GIC-2024-042",
    first_name: "Kavindi",
    last_name: "Fernando",
    date_of_birth: "2010-09-25",
    gender: "Female",
    medium: "English",
    admission_date: "2024-01-12",
    grade_level: "Grade 10",
    class_name: "Grade 10 - Science",
    class_id: "CLS-10SCI",
    address: "12, Baseline Road, Kirulapone",
    phone: "+94 71 888 2211",
    guardian_name: "Rohan Fernando",
    guardian_relationship: "Father",
    guardian_phone: "+94 71 333 4455",
    guardian_email: "rohan.f@hotmail.com",
    status: "Active",
    portal_account: true,
    avatar: ""
  },
  {
    student_id: "STD-003",
    admission_no: "GIC-2023-118",
    first_name: "Sahan",
    last_name: "Silva",
    date_of_birth: "2009-02-18",
    gender: "Male",
    medium: "English",
    admission_date: "2023-01-08",
    grade_level: "Grade 11",
    class_name: "Grade 11 - Science",
    class_id: "CLS-11SCI",
    address: "88, Marine Drive, Bambalapitiya",
    phone: "+94 75 111 0022",
    guardian_name: "Anusha Silva",
    guardian_relationship: "Mother",
    guardian_phone: "+94 75 222 3344",
    guardian_email: "anusha.silva@yahoo.com",
    status: "Active",
    portal_account: true,
    avatar: ""
  },
  {
    student_id: "STD-004",
    admission_no: "GIC-2024-089",
    first_name: "Dinithi",
    last_name: "Jayawardena",
    date_of_birth: "2011-06-30",
    gender: "Female",
    medium: "English",
    admission_date: "2024-01-15",
    grade_level: "Grade 9",
    class_name: "Grade 9 - A",
    class_id: "CLS-9A",
    address: "302, Havelock Gardens, Colombo 06",
    phone: "+94 70 555 4433",
    guardian_name: "Mahesh Jayawardena",
    guardian_relationship: "Father",
    guardian_phone: "+94 70 999 1122",
    guardian_email: "mahesh.j@gmail.com",
    status: "Active",
    portal_account: true,
    avatar: ""
  },
  {
    student_id: "STD-005",
    admission_no: "GIC-2022-015",
    first_name: "Kasun",
    last_name: "Bandara",
    date_of_birth: "2008-11-05",
    gender: "Male",
    medium: "Sinhala",
    admission_date: "2022-01-10",
    grade_level: "Grade 12",
    class_name: "Grade 12 - Bio",
    class_id: "CLS-12BIO",
    address: "14/2, Lake Road, Battaramulla",
    phone: "+94 77 666 5544",
    guardian_name: "Dhammika Bandara",
    guardian_relationship: "Father",
    guardian_phone: "+94 77 111 2233",
    guardian_email: "bandara.d@gmail.com",
    status: "Active",
    portal_account: true,
    avatar: ""
  },
  {
    student_id: "STD-006",
    admission_no: "GIC-2025-002",
    first_name: "Tharushi",
    last_name: "Perera",
    date_of_birth: "2014-01-20",
    gender: "Female",
    medium: "English",
    admission_date: "2025-01-08",
    grade_level: "Grade 6",
    class_name: "Grade 6 - A",
    class_id: "CLS-6A",
    address: "77/1, Old Kottawa Road, Mirihana",
    phone: "+94 71 444 7788",
    guardian_name: "Pradeep Perera",
    guardian_relationship: "Father",
    guardian_phone: "+94 71 888 9900",
    guardian_email: "pradeep.p@gmail.com",
    status: "Active",
    portal_account: false,
    avatar: ""
  },
  {
    student_id: "STD-007",
    admission_no: "GIC-2025-019",
    first_name: "Chamod",
    last_name: "Fernando",
    date_of_birth: "2014-08-14",
    gender: "Male",
    medium: "Sinhala",
    admission_date: "2025-01-10",
    grade_level: "Grade 6",
    class_name: "Grade 6 - B",
    class_id: "CLS-6B",
    address: "99, Nawala Road, Rajagiriya",
    phone: "+94 76 222 1133",
    guardian_name: "Priyanthi Fernando",
    guardian_relationship: "Mother",
    guardian_phone: "+94 76 777 8899",
    guardian_email: "priyanthi.f@gmail.com",
    status: "Active",
    portal_account: false,
    avatar: ""
  },
  {
    student_id: "STD-008",
    admission_no: "GIC-2024-104",
    first_name: "Ishara",
    last_name: "Gunawardena",
    date_of_birth: "2012-03-09",
    gender: "Female",
    medium: "English",
    admission_date: "2024-01-16",
    grade_level: "Grade 8",
    class_name: "Grade 8 - A",
    class_id: "CLS-8A",
    address: "21, Park Road, Colombo 05",
    phone: "+94 77 900 1122",
    guardian_name: "Kamal Gunawardena",
    guardian_relationship: "Father",
    guardian_phone: "+94 77 444 1122",
    guardian_email: "kamal.guna@gmail.com",
    status: "Inactive",
    portal_account: false,
    avatar: ""
  }
];

export const initialTeacherAllocations = [
  { allocation_id: "ALLOC-01", teacher_id: "TCH-001", teacher_name: "Aruni Jayasinghe", class_id: "CLS-10SCI", class_name: "Grade 10 - Science", subject_id: "SUB-001", subject_code: "MAT001", subject_name: "Mathematics", academic_year: "2026" },
  { allocation_id: "ALLOC-02", teacher_id: "TCH-002", teacher_name: "Bandula Gunawardena", class_id: "CLS-10SCI", class_name: "Grade 10 - Science", subject_id: "SUB-003", subject_code: "SCI001", subject_name: "General Science", academic_year: "2026" },
  { allocation_id: "ALLOC-03", teacher_id: "TCH-003", teacher_name: "Champa Ranasinghe", class_id: "CLS-10SCI", class_name: "Grade 10 - Science", subject_id: "SUB-002", subject_code: "ENG001", subject_name: "English Language & Literature", academic_year: "2026" },
  { allocation_id: "ALLOC-04", teacher_id: "TCH-004", teacher_name: "Dinesh Weerasinghe", class_id: "CLS-10SCI", class_name: "Grade 10 - Science", subject_id: "SUB-004", subject_code: "ICT001", subject_name: "Information & Communication Technology", academic_year: "2026" },
];

export const initialAttendanceRecords = [
  { attendance_id: "ATT-1001", student_id: "STD-001", student_name: "Hiran Samaranayake", admission_no: "GIC-2024-001", class_id: "CLS-10SCI", attendance_date: "2026-07-24", status: "Present", remarks: "" },
  { attendance_id: "ATT-1002", student_id: "STD-002", student_name: "Kavindi Fernando", admission_no: "GIC-2024-042", class_id: "CLS-10SCI", attendance_date: "2026-07-24", status: "Present", remarks: "" },
  { attendance_id: "ATT-1003", student_id: "STD-003", student_name: "Sahan Silva", admission_no: "GIC-2023-118", class_id: "CLS-11SCI", attendance_date: "2026-07-24", status: "Present", remarks: "" },
  { attendance_id: "ATT-1004", student_id: "STD-004", student_name: "Dinithi Jayawardena", admission_no: "GIC-2024-089", class_id: "CLS-9A", attendance_date: "2026-07-24", status: "Late", remarks: "Traffic delay at Nugegoda" },
  { attendance_id: "ATT-1005", student_id: "STD-005", student_name: "Kasun Bandara", admission_no: "GIC-2022-015", class_id: "CLS-12BIO", attendance_date: "2026-07-24", status: "Absent", remarks: "Sick leave - Doctor note submitted" },
  { attendance_id: "ATT-1006", student_id: "STD-006", student_name: "Tharushi Perera", admission_no: "GIC-2025-002", class_id: "CLS-6A", attendance_date: "2026-07-24", status: "Present", remarks: "" },
  { attendance_id: "ATT-1007", student_id: "STD-007", student_name: "Chamod Fernando", admission_no: "GIC-2025-019", class_id: "CLS-6B", attendance_date: "2026-07-24", status: "Excused", remarks: "Sports Competition" },
  { attendance_id: "ATT-1008", student_id: "STD-001", student_name: "Hiran Samaranayake", admission_no: "GIC-2024-001", class_id: "CLS-10SCI", attendance_date: "2026-07-23", status: "Present", remarks: "" },
  { attendance_id: "ATT-1009", student_id: "STD-001", student_name: "Hiran Samaranayake", admission_no: "GIC-2024-001", class_id: "CLS-10SCI", attendance_date: "2026-07-22", status: "Present", remarks: "" },
  { attendance_id: "ATT-1010", student_id: "STD-001", student_name: "Hiran Samaranayake", admission_no: "GIC-2024-001", class_id: "CLS-10SCI", attendance_date: "2026-07-21", status: "Late", remarks: "Bus delay" },
  { attendance_id: "ATT-1011", student_id: "STD-001", student_name: "Hiran Samaranayake", admission_no: "GIC-2024-001", class_id: "CLS-10SCI", attendance_date: "2026-07-20", status: "Present", remarks: "" },
  { attendance_id: "ATT-1012", student_id: "STD-001", student_name: "Hiran Samaranayake", admission_no: "GIC-2024-001", class_id: "CLS-10SCI", attendance_date: "2026-07-17", status: "Absent", remarks: "Medical leave" },
  { attendance_id: "ATT-1013", student_id: "STD-001", student_name: "Hiran Samaranayake", admission_no: "GIC-2024-001", class_id: "CLS-10SCI", attendance_date: "2026-07-16", status: "Present", remarks: "" },
];


export const initialExams = [
  { exam_id: "EXM-2026-T1", exam_name: "First Term Examination 2026", term: "First Term", academic_year: "2026", start_date: "2026-03-15", end_date: "2026-03-25", classes: ["Grade 10 - Science", "Grade 11 - Science", "Grade 9 - A"], status: "Published" },
  { exam_id: "EXM-2026-MID", exam_name: "Mid-Term Evaluation 2026", term: "Second Term", academic_year: "2026", start_date: "2026-06-20", end_date: "2026-06-28", classes: ["Grade 10 - Science", "Grade 6 - A", "Grade 8 - A"], status: "Ongoing" },
  { exam_id: "EXM-2026-T2", exam_name: "Second Term Assessment 2026", term: "Second Term", academic_year: "2026", start_date: "2026-09-10", end_date: "2026-09-20", classes: ["Grade 10 - Science", "Grade 11 - Science"], status: "Scheduled" },
];

export const initialExamResults = [
  { result_id: "RES-001", exam_id: "EXM-2026-T1", student_id: "STD-001", student_name: "Hiran Samaranayake", admission_no: "GIC-2024-001", class_name: "Grade 10 - Science", subject_id: "SUB-001", subject_name: "Mathematics", marks: 92, grade: "A+", remarks: "Outstanding performance" },
  { result_id: "RES-002", exam_id: "EXM-2026-T1", student_id: "STD-001", student_name: "Hiran Samaranayake", admission_no: "GIC-2024-001", class_name: "Grade 10 - Science", subject_id: "SUB-002", subject_name: "English", marks: 88, grade: "A+", remarks: "Excellent essay writing" },
  { result_id: "RES-003", exam_id: "EXM-2026-T1", student_id: "STD-001", student_name: "Hiran Samaranayake", admission_no: "GIC-2024-001", class_name: "Grade 10 - Science", subject_id: "SUB-003", subject_name: "General Science", marks: 85, grade: "A+", remarks: "Strong practical score" },
  { result_id: "RES-004", exam_id: "EXM-2026-T1", student_id: "STD-001", student_name: "Hiran Samaranayake", admission_no: "GIC-2024-001", class_name: "Grade 10 - Science", subject_id: "SUB-004", subject_name: "ICT", marks: 95, grade: "A+", remarks: "Top in class" },

  { result_id: "RES-005", exam_id: "EXM-2026-T1", student_id: "STD-002", student_name: "Kavindi Fernando", admission_no: "GIC-2024-042", class_name: "Grade 10 - Science", subject_id: "SUB-001", subject_name: "Mathematics", marks: 78, grade: "A", remarks: "Very good" },
  { result_id: "RES-006", exam_id: "EXM-2026-T1", student_id: "STD-002", student_name: "Kavindi Fernando", admission_no: "GIC-2024-042", class_name: "Grade 10 - Science", subject_id: "SUB-002", subject_name: "English", marks: 91, grade: "A+", remarks: "Top score in literature" },
  { result_id: "RES-007", exam_id: "EXM-2026-T1", student_id: "STD-002", student_name: "Kavindi Fernando", admission_no: "GIC-2024-042", class_name: "Grade 10 - Science", subject_id: "SUB-003", subject_name: "General Science", marks: 72, grade: "B", remarks: "Good effort" },
  { result_id: "RES-008", exam_id: "EXM-2026-T1", student_id: "STD-002", student_name: "Kavindi Fernando", admission_no: "GIC-2024-042", class_name: "Grade 10 - Science", subject_id: "SUB-004", subject_name: "ICT", marks: 84, grade: "A", remarks: "Consistently good" },
];

export const initialGradingScale = [
  { grade: "A+", min_mark: 85, max_mark: 100, gpa: 4.0, description: "Distinction" },
  { grade: "A", min_mark: 75, max_mark: 84, gpa: 3.7, description: "Excellent" },
  { grade: "B", min_mark: 65, max_mark: 74, gpa: 3.0, description: "Very Good" },
  { grade: "C", min_mark: 55, max_mark: 64, gpa: 2.0, description: "Credit Pass" },
  { grade: "S", min_mark: 35, max_mark: 54, gpa: 1.0, description: "Ordinary Pass" },
  { grade: "F", min_mark: 0, max_mark: 34, gpa: 0.0, description: "Fail" },
];

export const initialUsers = [
  { user_id: "USR-001", name: "James Fernando", email: "admin@greenfield.edu.lk", role: "School Admin", status: "Active", last_login: "2026-07-24 08:30" },
  { user_id: "USR-002", name: "Aruni Jayasinghe", email: "aruni.j@greenfield.edu.lk", role: "Teacher", status: "Active", last_login: "2026-07-23 16:45" },
  { user_id: "USR-003", name: "Bandula Gunawardena", email: "bandula.g@greenfield.edu.lk", role: "Teacher", status: "Active", last_login: "2026-07-24 07:15" },
  { user_id: "USR-004", name: "Hiran Samaranayake", email: "hiran.samaranayake@greenfield.edu.lk", role: "Student", status: "Active", last_login: "2026-07-22 19:10" },
  { user_id: "USR-005", name: "Dinesh Weerasinghe", email: "dinesh.w@greenfield.edu.lk", role: "Teacher", status: "Disabled", last_login: "2026-06-12 11:20" },
];

export const initialRolesPermissions = {
  roles: [
    { role_id: "ROLE-ADMIN", role_name: "School Admin", description: "Full administrative access across all school modules" },
    { role_id: "ROLE-TEACHER", role_name: "Teacher", description: "Access to assigned classes, marks entry, and attendance" },
    { role_id: "ROLE-STUDENT", role_name: "Student", description: "Read-only access to personal results, schedule, and attendance" },
  ],
  matrix: {
    "ROLE-ADMIN": {
      "students.view": true, "students.create": true, "students.update": true, "students.delete": true,
      "teachers.view": true, "teachers.create": true, "teachers.update": true, "teachers.delete": true,
      "academics.manage": true, "attendance.view": true, "attendance.manage": true,
      "examinations.view": true, "examinations.manage": true, "reports.view": true, "settings.manage": true
    },
    "ROLE-TEACHER": {
      "students.view": true, "students.create": false, "students.update": false, "students.delete": false,
      "teachers.view": true, "teachers.create": false, "teachers.update": false, "teachers.delete": false,
      "academics.manage": false, "attendance.view": true, "attendance.manage": true,
      "examinations.view": true, "examinations.manage": true, "reports.view": true, "settings.manage": false
    },
    "ROLE-STUDENT": {
      "students.view": true, "students.create": false, "students.update": false, "students.delete": false,
      "teachers.view": true, "teachers.create": false, "teachers.update": false, "teachers.delete": false,
      "academics.manage": false, "attendance.view": true, "attendance.manage": false,
      "examinations.view": true, "examinations.manage": false, "reports.view": false, "settings.manage": false
    }
  }
};

export const initialAuditLogs = [
  { log_id: "LOG-901", timestamp: "2026-07-24 08:30:12", user: "James Fernando", module: "Auth", action: "User Login", description: "Successfully authenticated from browser session", ip_address: "192.168.1.45" },
  { log_id: "LOG-902", timestamp: "2026-07-23 16:45:00", user: "Aruni Jayasinghe", module: "Attendance", action: "Attendance Submitted", description: "Recorded attendance for Grade 10 - Science (36 Present)", ip_address: "192.168.1.88" },
  { log_id: "LOG-903", timestamp: "2026-07-23 14:12:33", user: "James Fernando", module: "Students", action: "Student Enrolled", description: "Enrolled new student Tharushi Perera (GIC-2025-002)", ip_address: "192.168.1.45" },
  { log_id: "LOG-904", timestamp: "2026-07-22 11:05:19", user: "James Fernando", module: "Examinations", action: "Result Published", description: "Published official results for First Term Examination 2026", ip_address: "192.168.1.45" },
  { log_id: "LOG-905", timestamp: "2026-07-21 09:15:40", user: "James Fernando", module: "Administration", action: "Role Permissions Updated", description: "Updated permissions matrix for Teacher role", ip_address: "192.168.1.45" },
];

export const initialNotifications = [
  { id: "NT-001", title: "Attendance Submitted", message: "Attendance for Grade 10 - Science has been submitted by Mrs. Aruni Jayasinghe.", category: "Attendance", time: "10 minutes ago", unread: true },
  { id: "NT-002", title: "New Student Admission", message: "Tharushi Perera has been enrolled into Grade 6 - A.", category: "Users", time: "1 hour ago", unread: true },
  { id: "NT-003", title: "Exam Results Ready", message: "First Term Examination results have been uploaded for review.", category: "Academics", time: "3 hours ago", unread: false },
  { id: "NT-004", title: "Teacher Allocation Updated", message: "Mr. Bandula Gunawardena assigned to Grade 12 - Bio Chemistry.", category: "System", time: "Yesterday", unread: false },
];
