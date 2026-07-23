import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  CalendarCheck,
  BookOpen,
  Printer,
  CheckCircle2,
  Clock,
  UserCheck,
  FileText
} from 'lucide-react';
import { useAuth } from '../../app/context/AuthContext';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { PrintableReportCardModal } from '../../components/modals/PrintableReportCardModal';

export const StudentDashboard = () => {
  const { user, school } = useAuth();
  const navigate = useNavigate();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const studentProfile = {
    first_name: user?.first_name || 'Nimal',
    last_name: user?.last_name || 'Perera',
    admission_no: 'GIC-2024-001',
    grade_level: 'Grade 10',
    class_name: 'Grade 10 - Science',
    medium: 'English',
    guardian_name: 'Sunil Perera',
    guardian_phone: '+94 77 123 4567',
  };

  const termGrades = [
    { subject: 'Mathematics', code: 'MAT001', marks: 92, grade: 'A+', teacher: 'Mrs. Aruni Jayasinghe', status: 'Passed' },
    { subject: 'General Science', code: 'SCI001', marks: 85, grade: 'A+', teacher: 'Mr. Bandula Gunawardena', status: 'Passed' },
    { subject: 'English Language', code: 'ENG001', marks: 88, grade: 'A+', teacher: 'Mrs. Champa Ranasinghe', status: 'Passed' },
    { subject: 'ICT & Computing', code: 'ICT001', marks: 91, grade: 'A+', teacher: 'Mr. Dinesh Fernando', status: 'Passed' },
  ];

  const weeklyTimetable = [
    { day: 'Monday', period1: 'Mathematics', period2: 'Science', period3: 'English', period4: 'ICT' },
    { day: 'Tuesday', period1: 'Science', period2: 'Mathematics', period3: 'History', period4: 'English' },
    { day: 'Wednesday', period1: 'English', period2: 'ICT', period3: 'Mathematics', period4: 'Science' },
    { day: 'Thursday', period1: 'Mathematics', period2: 'English', period3: 'Science', period4: 'Sinhala' },
    { day: 'Friday', period1: 'ICT Lab', period2: 'Science Lab', period3: 'Mathematics', period4: 'Sports' },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Student Welcome Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            {studentProfile.first_name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Welcome, {studentProfile.first_name} {studentProfile.last_name}!
              </h1>
              <Badge variant="brand">Student Portal</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Admission No: <strong className="text-slate-800">{studentProfile.admission_no}</strong> • Class: <strong className="text-slate-800">{studentProfile.class_name}</strong> • {school?.name || 'Greenfield International College'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" icon={Printer} onClick={() => setIsReportModalOpen(true)}>
            View Term Report Card
          </Button>
        </div>
      </div>

      {/* Student Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance Rate"
          value="96.4%"
          change="+0.8%"
          changeType="positive"
          icon={CalendarCheck}
          iconBg="bg-emerald-50 text-emerald-600"
          description="115 Days Present • 3 Days Absent"
        />
        <StatCard
          title="GPA Score"
          value="4.0 / 4.0"
          icon={Award}
          iconBg="bg-brand-50 text-brand-600"
          description="First Term Assessment 2026"
        />
        <StatCard
          title="Term Position"
          value="1st Place"
          icon={GraduationCap}
          iconBg="bg-purple-50 text-purple-600"
          description="Out of 42 students in class"
        />
        <StatCard
          title="Tuition Fees"
          value="Paid in Full"
          icon={UserCheck}
          iconBg="bg-blue-50 text-blue-600"
          description="2026 Annual Fee Status"
        />
      </div>

      {/* Grid: Term Marks & Timetable */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Term Exam Results */}
        <Card
          title="First Term Examination Results (2026)"
          subtitle="Official verified academic marks"
          className="lg:col-span-2"
          actions={
            <Button variant="outline" size="xs" icon={Printer} onClick={() => setIsReportModalOpen(true)}>
              Print Report Card
            </Button>
          }
        >
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-3.5">Subject</th>
                  <th className="p-3.5">Code</th>
                  <th className="p-3.5">Marks (100)</th>
                  <th className="p-3.5">Grade</th>
                  <th className="p-3.5">Teacher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {termGrades.map((g, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-900">{g.subject}</td>
                    <td className="p-3.5 text-slate-500">{g.code}</td>
                    <td className="p-3.5 font-extrabold text-slate-900">{g.marks}%</td>
                    <td className="p-3.5"><Badge variant="success">{g.grade}</Badge></td>
                    <td className="p-3.5 text-slate-600">{g.teacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Guardian & School Profile Info */}
        <Card title="Student Record Details" subtitle="Guardian contact & school enrollment">
          <div className="space-y-4 pt-1 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Guardian Information</span>
              <p className="font-bold text-slate-900">{studentProfile.guardian_name} (Father)</p>
              <p className="text-slate-600">{studentProfile.guardian_phone}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Class Teacher</span>
              <p className="font-bold text-slate-900">Mrs. Aruni Jayasinghe</p>
              <p className="text-slate-600">aruni.j@greenfield.edu.lk</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <span className="font-bold text-emerald-900">Portal Access Status</span>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly Timetable Grid */}
      <Card title="Weekly Class Timetable" subtitle="Grade 10 - Science Weekly Schedule">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-slate-500">
              <tr>
                <th className="p-3">Day</th>
                <th className="p-3">Period 1 (08:00 AM)</th>
                <th className="p-3">Period 2 (08:45 AM)</th>
                <th className="p-3">Period 3 (09:30 AM)</th>
                <th className="p-3">Period 4 (10:30 AM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {weeklyTimetable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="p-3 font-bold text-slate-900">{row.day}</td>
                  <td className="p-3 text-slate-700 font-medium">{row.period1}</td>
                  <td className="p-3 text-slate-700 font-medium">{row.period2}</td>
                  <td className="p-3 text-slate-700 font-medium">{row.period3}</td>
                  <td className="p-3 text-slate-700 font-medium">{row.period4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <PrintableReportCardModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        student={studentProfile}
      />
    </div>
  );
};
