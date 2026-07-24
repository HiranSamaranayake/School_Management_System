import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  BookOpen,
  CalendarCheck,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useAuth } from '../../app/context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const todaySchedule = [
    { period: 'Period 1', time: '08:00 AM - 08:45 AM', subject: 'Mathematics', class_name: 'Grade 10 - Science', room: 'Lab 2B' },
    { period: 'Period 3', time: '09:30 AM - 10:15 AM', subject: 'Mathematics', class_name: 'Grade 11 - Science', room: 'Room 4A' },
    { period: 'Period 5', time: '11:15 AM - 12:00 PM', subject: 'Advanced Maths', class_name: 'Grade 12 - Bio', room: 'Hall 1' },
    { period: 'Period 7', time: '01:30 PM - 02:15 PM', subject: 'Mathematics', class_name: 'Grade 9 - A', room: 'Room 3C' },
  ];

  const assignedClasses = [
    { name: 'Grade 10 - Science', students: 38, subject: 'Mathematics', attendanceToday: '94.7%' },
    { name: 'Grade 11 - Science', students: 42, subject: 'Mathematics', attendanceToday: '97.6%' },
    { name: 'Grade 12 - Bio', students: 30, subject: 'Advanced Maths', attendanceToday: '90.0%' },
    { name: 'Grade 9 - A', students: 35, subject: 'Mathematics', attendanceToday: '91.4%' },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-2xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">Welcome back, Mrs. {user?.last_name || 'Aruni Jayasinghe'}</h1>
            <Badge variant="success">Teacher Portal</Badge>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Faculty Member • Department of Mathematics & Science
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" icon={CalendarCheck} onClick={() => navigate('/attendance')}>
            Mark Attendance
          </Button>
          <Button variant="secondary" size="sm" icon={Award} onClick={() => navigate('/examinations')}>
            Record Marks
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Assigned Students</span>
            <h3 className="text-xl font-bold text-slate-900">145</h3>
            <span className="text-[10px] text-slate-400">Across 4 class sections</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Active Subjects</span>
            <h3 className="text-xl font-bold text-slate-900">2</h3>
            <span className="text-[10px] text-emerald-600 font-semibold">Maths & Adv Maths</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Today's Periods</span>
            <h3 className="text-xl font-bold text-slate-900">4 Periods</h3>
            <span className="text-[10px] text-slate-400">Next: Period 3 (09:30 AM)</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Timetable */}
        <Card title="My Today's Class Timetable" subtitle="Daily period breakdown" className="lg:col-span-2">
          <div className="space-y-3 pt-2">
            {todaySchedule.map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs shrink-0">
                    {p.period.split(' ')[1]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{p.subject}</h4>
                    <p className="text-[11px] text-slate-500">{p.class_name} • {p.room}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-700 block">{p.time}</span>
                  <Badge variant="info">Scheduled</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Assigned Classes */}
        <Card title="My Assigned Classes" subtitle="Class rosters and daily attendance">
          <div className="space-y-3 pt-2">
            {assignedClasses.map((cls, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{cls.name}</h4>
                  <Badge variant="success">{cls.attendanceToday}</Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{cls.subject}</span>
                  <span>{cls.students} Enrolled</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <Button variant="outline" size="xs" onClick={() => navigate('/students')}>
                    View Students
                  </Button>
                  <Button variant="outline" size="xs" onClick={() => navigate('/attendance')}>
                    Mark Register
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
