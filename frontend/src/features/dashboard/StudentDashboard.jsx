import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  CalendarCheck,
  Printer,
  BookOpen,
  User,
  CheckCircle2,
  FileText,
  Clock
} from 'lucide-react';
import { useAuth } from '../../app/context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { PrintableReportCardModal } from '../../components/modals/PrintableReportCardModal';

export const StudentDashboard = () => {
  const { user, school } = useAuth();
  const navigate = useNavigate();
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);

  const studentProfile = {
    first_name: user?.first_name || 'Nimal',
    last_name: user?.last_name || 'Perera',
    admission_no: 'GIC-2024-001',
    grade_level: 'Grade 10',
    class_name: 'Grade 10 - Science',
    medium: 'English',
    guardian_name: 'Sunil Perera',
    guardian_phone: '0771234567',
  };

  const myResults = [
    { subject: 'Mathematics', mark: 92, grade: 'A+', teacher: 'Mrs. Aruni Jayasinghe' },
    { subject: 'Science', mark: 85, grade: 'A+', teacher: 'Mr. Bandula Gunawardena' },
    { subject: 'English Language', mark: 88, grade: 'A+', teacher: 'Ms. Sarah Williams' },
    { subject: 'Information Technology (ICT)', mark: 95, grade: 'A+', teacher: 'Mr. K. Samarasinghe' },
    { subject: 'History', mark: 78, grade: 'A', teacher: 'Mrs. D. Ranasinghe' },
    { subject: 'Sinhala Language', mark: 84, grade: 'A', teacher: 'Mr. W. Wickramasinghe' },
  ];

  const weeklySchedule = [
    { day: 'Monday', period1: 'Maths (08:00 AM)', period2: 'Science (09:30 AM)', period3: 'English (11:15 AM)' },
    { day: 'Tuesday', period1: 'ICT (08:00 AM)', period2: 'Maths (09:30 AM)', period3: 'History (11:15 AM)' },
    { day: 'Wednesday', period1: 'Science (08:00 AM)', period2: 'Sinhala (09:30 AM)', period3: 'Maths (11:15 AM)' },
    { day: 'Thursday', period1: 'English (08:00 AM)', period2: 'ICT (09:30 AM)', period3: 'Science (11:15 AM)' },
    { day: 'Friday', period1: 'History (08:00 AM)', period2: 'Maths (09:30 AM)', period3: 'Sinhala (11:15 AM)' },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-brand-900 via-indigo-900 to-purple-950 p-6 rounded-2xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">Student Portal: {studentProfile.first_name} {studentProfile.last_name}</h1>
            <Badge variant="brand">Student View</Badge>
          </div>
          <p className="text-xs text-brand-200 mt-1">
            {school?.name || 'Greenfield International College'} • Admission No: <strong className="text-white">{studentProfile.admission_no}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={Printer}
            onClick={() => setIsReportCardOpen(true)}
            className="bg-white text-brand-900 hover:bg-slate-100 font-bold"
          >
            Official Report Card
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">My Attendance</span>
            <h3 className="text-xl font-bold text-emerald-700">96.4%</h3>
            <span className="text-[10px] text-slate-400">108 Present • 4 Absent</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Term Average</span>
            <h3 className="text-xl font-bold text-slate-900">87.0%</h3>
            <span className="text-[10px] text-brand-600 font-bold">Grade A+ Overall</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Enrolled Section</span>
            <h3 className="text-xl font-bold text-slate-900">{studentProfile.class_name}</h3>
            <span className="text-[10px] text-slate-400">{studentProfile.medium} Medium</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Term Marks Table */}
        <Card title="My First Term Examination Results (2026)" subtitle="Official academic transcript" className="lg:col-span-2">
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Instructor</th>
                  <th className="p-3">Score (100)</th>
                  <th className="p-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myResults.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{r.subject}</td>
                    <td className="p-3 text-slate-600">{r.teacher}</td>
                    <td className="p-3 font-bold text-slate-900">{r.mark}%</td>
                    <td className="p-3">
                      <Badge variant={['A+', 'A'].includes(r.grade) ? 'success' : 'info'}>
                        {r.grade}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="sm" icon={Printer} onClick={() => setIsReportCardOpen(true)}>
              Print Report Card
            </Button>
          </div>
        </Card>

        {/* Weekly Timetable */}
        <Card title="Class Timetable" subtitle="Weekly schedule overview">
          <div className="space-y-2.5 pt-2">
            {weeklySchedule.map((s, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 space-y-1">
                <span className="text-xs font-bold text-brand-600 block">{s.day}</span>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <p>• {s.period1}</p>
                  <p>• {s.period2}</p>
                  <p>• {s.period3}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Printable Report Card Modal */}
      <PrintableReportCardModal
        isOpen={isReportCardOpen}
        onClose={() => setIsReportCardOpen(false)}
        student={studentProfile}
      />
    </div>
  );
};
