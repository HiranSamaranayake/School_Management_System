import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  CalendarCheck,
  Layers,
  Plus,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useAuth } from '../../app/context/AuthContext';
import { useQuickCreate } from '../../app/context/QuickCreateContext';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const AdminDashboard = () => {
  const { user, school, academicYear, setAcademicYear } = useAuth();
  const { openQuickCreate } = useQuickCreate();
  const navigate = useNavigate();

  const attendanceTrendData = [
    { month: 'Jan', rate: 93.2 },
    { month: 'Feb', rate: 94.1 },
    { month: 'Mar', rate: 92.8 },
    { month: 'Apr', rate: 95.4 },
    { month: 'May', rate: 93.9 },
    { month: 'Jun', rate: 96.1 },
    { month: 'Jul', rate: 94.8 },
  ];

  const gradeDistributionData = [
    { grade: 'Grade 6', count: 420 },
    { grade: 'Grade 7', count: 390 },
    { grade: 'Grade 8', count: 410 },
    { grade: 'Grade 9', count: 440 },
    { grade: 'Grade 10', count: 460 },
    { grade: 'Grade 11', count: 430 },
    { grade: 'Grade 12', count: 180 },
    { grade: 'Grade 13', count: 112 },
  ];

  const subjectAveragesData = [
    { subject: 'Maths', avg: 82.4 },
    { subject: 'English', avg: 88.1 },
    { subject: 'Science', avg: 79.6 },
    { subject: 'ICT', avg: 91.2 },
    { subject: 'History', avg: 76.8 },
    { subject: 'Sinhala', avg: 84.5 },
  ];

  const recentActivity = [
    { id: 1, title: 'Attendance Submitted', time: '10 minutes ago', desc: 'Grade 10 - A recorded by Mrs. Aruni Jayasinghe', type: 'attendance' },
    { id: 2, title: 'New Student Enrolled', time: '1 hour ago', desc: 'Tharushi Perera enrolled in Grade 6 - A', type: 'student' },
    { id: 3, title: 'Exam Results Published', time: '3 hours ago', desc: 'First Term 2026 Mathematics results published', type: 'exam' },
    { id: 4, title: 'Teacher Assigned', time: 'Yesterday', desc: 'Mr. Bandula Gunawardena assigned to Grade 12 - Bio', type: 'teacher' },
  ];

  const upcomingEvents = [
    { date: 'Jul 28', title: 'Second Term Assessment 2026', time: '08:30 AM', location: 'Main Examination Hall' },
    { date: 'Aug 02', title: 'Monthly Staff & Faculty Meeting', time: '02:00 PM', location: 'Auditorium' },
    { date: 'Aug 08', title: 'Parent-Teacher Consultations', time: '09:00 AM', location: 'Classrooms' },
    { date: 'Aug 15', title: 'Annual Inter-House Sports Meet', time: '08:00 AM', location: 'School Grounds' },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Good morning, {user?.first_name || 'James'}</h1>
            <Badge variant="brand">Admin Dashboard</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Here's what's happening at {school?.name || 'Greenfield International College'} today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-800 font-semibold focus:ring-2 focus:ring-brand-500 outline-none"
          >
            <option value="2026">2026 Academic Year</option>
            <option value="2025">2025 Academic Year</option>
            <option value="2027">2027 Academic Year</option>
          </select>

          <Button variant="primary" size="sm" icon={Plus} onClick={() => openQuickCreate('student')}>
            Add Student
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value="2,842"
          change="+4.2%"
          changeType="positive"
          icon={GraduationCap}
          iconBg="bg-brand-50 text-brand-600"
          description="Across 8 grade levels & 68 classes"
        />
        <StatCard
          title="Total Teachers"
          value="146"
          change="+2.1%"
          changeType="positive"
          icon={Users}
          iconBg="bg-emerald-50 text-emerald-600"
          description="140 Active • 6 On Leave"
        />
        <StatCard
          title="Today's Attendance"
          value="94.8%"
          change="+1.3%"
          changeType="positive"
          icon={CalendarCheck}
          iconBg="bg-blue-50 text-blue-600"
          description="2,694 Present • 148 Absent / Late"
        />
        <StatCard
          title="Active Classes"
          value="68"
          icon={Layers}
          iconBg="bg-purple-50 text-purple-600"
          description="Full English & Sinhala Medium"
        />
      </div>

      {/* Quick Action Pills */}
      <div className="p-4 bg-gradient-to-r from-brand-900 to-indigo-900 rounded-2xl text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-300" />
          <div>
            <h4 className="text-xs font-bold">Administrative Short Actions</h4>
            <p className="text-[11px] text-brand-200">Rapidly record records or publish exam grades</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="xs" onClick={() => openQuickCreate('student')}>+ Add Student</Button>
          <Button variant="secondary" size="xs" onClick={() => openQuickCreate('teacher')}>+ Add Teacher</Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('/attendance')}>Record Attendance</Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('/examinations')}>Create Exam</Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title="Attendance Overview (2026)"
          subtitle="Monthly average attendance percentage across all grades"
          className="lg:col-span-2"
        >
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrendData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={[90, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Attendance Rate']}
                />
                <Area type="monotone" dataKey="rate" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Attendance Status Today" subtitle="Live daily register breakdown">
          <div className="space-y-4 pt-2">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-900 block">Present</span>
                <span className="text-[11px] text-emerald-700">2,694 Students</span>
              </div>
              <span className="text-lg font-bold text-emerald-700">94.8%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-red-900 block">Absent</span>
                <span className="text-[11px] text-red-700">88 Students</span>
              </div>
              <span className="text-lg font-bold text-red-700">3.1%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-900 block">Late Arrival</span>
                <span className="text-[11px] text-amber-700">42 Students</span>
              </div>
              <span className="text-lg font-bold text-amber-700">1.5%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-900 block">Excused Leave</span>
                <span className="text-[11px] text-blue-700">18 Students</span>
              </div>
              <span className="text-lg font-bold text-blue-700">0.6%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2 Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Student Distribution by Grade" subtitle="Enrolled headcount across Grade 6 through 13" className="lg:col-span-2">
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="grade" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Subject Averages" subtitle="First Term Assessment 2026">
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectAveragesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis dataKey="subject" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} width={60} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="avg" fill="#3b82f6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Activity & Upcoming Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Activity Feed" subtitle="Real-time administrative log events">
          <div className="space-y-4">
            {recentActivity.map((act) => (
              <div key={act.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                <div className="p-2 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{act.title}</h4>
                    <span className="text-[10px] text-slate-400">{act.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Upcoming School Events" subtitle="Academic calendar milestones">
          <div className="space-y-3">
            {upcomingEvents.map((evt, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-12 h-12 rounded-xl bg-brand-600 text-white font-bold flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs leading-none uppercase">{evt.date.split(' ')[0]}</span>
                  <span className="text-base leading-tight">{evt.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{evt.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{evt.time} • {evt.location}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
