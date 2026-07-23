import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  CalendarCheck,
  Award,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '../../app/context/AuthContext';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const TeacherDashboard = () => {
  const { user, school } = useAuth();
  const navigate = useNavigate();

  const todaySchedule = [
    { period: 'Period 1', time: '08:00 AM - 08:40 AM', subject: 'Mathematics (MAT001)', class: 'Grade 10 - Science', room: 'Lab 2B', status: 'Completed' },
    { period: 'Period 3', time: '09:30 AM - 10:10 AM', subject: 'Mathematics (MAT001)', class: 'Grade 11 - Science', room: 'Room 14', status: 'Ongoing' },
    { period: 'Period 6', time: '11:50 AM - 12:30 PM', subject: 'Practical Math', class: 'Grade 10 - Science', room: 'Computer Lab 1', status: 'Upcoming' },
  ];

  const assignedClasses = [
    { id: 'CLS-10SCI', name: 'Grade 10 - Science', subject: 'Mathematics (MAT001)', studentsCount: 42, attendanceRate: '96.2%', status: 'Active' },
    { id: 'CLS-11SCI', name: 'Grade 11 - Science', subject: 'Mathematics (MAT001)', studentsCount: 38, attendanceRate: '94.8%', status: 'Active' },
  ];

  const recentAnnouncements = [
    { id: 1, title: 'Term 1 Exam Marks Due', date: 'Jul 28, 2026', sender: 'Academic Office', text: 'All faculty must upload First Term exam grades before 5:00 PM on Friday.' },
    { id: 2, title: 'Staff Meeting Scheduled', date: 'Aug 02, 2026', sender: 'Principal Office', text: 'Monthly staff review meeting in auditorium at 2:00 PM.' }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Teacher Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Welcome back, {user?.first_name || 'Faculty Member'}!
            </h1>
            <Badge variant="success">Teacher Portal</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Department of Mathematics & Science • {school?.name || 'Greenfield International College'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={CalendarCheck} onClick={() => navigate('/attendance')}>
            Mark Attendance
          </Button>
          <Button variant="primary" size="sm" icon={Award} onClick={() => navigate('/examinations')}>
            Record Marks
          </Button>
        </div>
      </div>

      {/* Faculty KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Students"
          value="80"
          icon={Users}
          iconBg="bg-brand-50 text-brand-600"
          description="Across 2 allocated class sections"
        />
        <StatCard
          title="Today's Classes"
          value="3 Sessions"
          icon={Clock}
          iconBg="bg-blue-50 text-blue-600"
          description="Period 1, 3 and 6 today"
        />
        <StatCard
          title="Class Attendance Avg"
          value="95.5%"
          change="+1.2%"
          changeType="positive"
          icon={CalendarCheck}
          iconBg="bg-emerald-50 text-emerald-600"
          description="High engagement rate"
        />
        <StatCard
          title="Subject Average"
          value="82.4 / 100"
          icon={Award}
          iconBg="bg-purple-50 text-purple-600"
          description="First Term Mathematics"
        />
      </div>

      {/* Grid: Schedule & Assigned Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Teaching Schedule */}
        <Card title="Today's Teaching Schedule" subtitle="Your timetable for today" className="lg:col-span-2">
          <div className="space-y-3 pt-1">
            {todaySchedule.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.subject}</span>
                    <Badge variant={item.status === 'Completed' ? 'neutral' : (item.status === 'Ongoing' ? 'brand' : 'info')}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">{item.class} • {item.room}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200">
                    {item.time}
                  </span>
                  <Button variant="outline" size="xs" onClick={() => navigate('/attendance')}>
                    Attendance Register
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Allocated Classes */}
        <Card title="My Allocated Classes" subtitle="Classes assigned for 2026">
          <div className="space-y-3 pt-1">
            {assignedClasses.map((cls) => (
              <div key={cls.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{cls.name}</h4>
                  <Badge variant="brand">{cls.studentsCount} Students</Badge>
                </div>
                <p className="text-xs text-slate-500">Subject: {cls.subject}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 font-semibold">Attendance: {cls.attendanceRate}</span>
                  <Button variant="outline" size="xs" onClick={() => navigate('/students')}>
                    View Students
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Staff Announcements */}
      <Card title="Faculty Announcements & Bulletins" subtitle="Notices from principal and academic head">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentAnnouncements.map((anc) => (
            <div key={anc.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{anc.title}</h4>
                <span className="text-[10px] text-slate-400">{anc.date}</span>
              </div>
              <p className="text-xs text-slate-600">{anc.text}</p>
              <div className="pt-1 text-[10px] text-brand-600 font-semibold">From: {anc.sender}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
