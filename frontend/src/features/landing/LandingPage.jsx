import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  BookOpen,
  CalendarCheck,
  Award,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  LogIn,
  Sparkles,
  TrendingUp,
  Brain,
  Zap,
  CheckCircle2,
  Lock,
  Layers,
  Search,
  Printer,
  ChevronRight,
  Shield,
  FileText,
  MousePointer,
  ScrollText,
  Cpu
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { School3DHeroCanvas } from '../../components/ui/School3DHeroCanvas';

// Interactive 3D Mouse Hover Card Component
const FeatureCard3D = ({ icon: Icon, title, description, badge, color, borderGlow }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 10,
      y: (x / (rect.width / 2)) * 10,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'scale(1.03) translateY(-6px)' : 'scale(1) translateY(0px)'}`,
        transition: 'transform 0.15s ease-out, border-color 0.3s ease, shadow 0.3s ease',
      }}
      className={`relative p-6 rounded-3xl border bg-slate-900/80 backdrop-blur-md text-left space-y-4 cursor-pointer overflow-hidden group select-none shadow-xl ${
        isHovered
          ? `${borderGlow} shadow-2xl shadow-brand-500/20 border-brand-500/80`
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Background Animated Gradient Mesh on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-brand-600/10 via-indigo-600/5 to-transparent transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Top Badge & Icon Row */}
      <div className="flex items-center justify-between relative z-10">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/80 group-hover:border-brand-500/40 group-hover:text-brand-300 transition-colors">
          {badge}
        </span>
      </div>

      {/* Title & Description */}
      <div className="space-y-2 relative z-10">
        <h3 className="text-lg font-extrabold text-white tracking-tight group-hover:text-brand-300 transition-colors flex items-center justify-between">
          {title}
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
          {description}
        </p>
      </div>

      {/* Bottom Glowing Bar */}
      <div className={`h-1 w-full rounded-full transition-all duration-300 ${
        isHovered ? 'bg-gradient-to-r from-brand-500 to-indigo-500 scale-x-100' : 'bg-slate-800 scale-x-50'
      }`} />
    </div>
  );
};

export const LandingPage = () => {
  const navigate = useNavigate();
  const [activeRoleTab, setActiveRoleTab] = useState('admin');

  // Mouse 3D tilt state for Copilot Box
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMoveTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handleMouseLeaveTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  const featureCardsData = [
    {
      icon: Brain,
      title: '3D Performance Forecasting',
      description: 'Predictive algorithms analyze individual student scores across terms to forecast examination outcomes and alert teachers early.',
      badge: 'Predictive',
      color: 'bg-gradient-to-tr from-brand-600 to-indigo-600',
      borderGlow: 'border-brand-500/80',
    },
    {
      icon: CalendarCheck,
      title: 'Attendance Tracking & Alerts',
      description: 'Real-time daily register marking with automated anomaly detection, guardian notifications, and monthly percentage reports.',
      badge: 'Real-Time',
      color: 'bg-gradient-to-tr from-emerald-600 to-teal-600',
      borderGlow: 'border-emerald-500/80',
    },
    {
      icon: FileText,
      title: 'Official Report Card Generator',
      description: 'Generate official, printable student term report cards complete with auto-calculated GPA thresholds and principal seals.',
      badge: 'Printable',
      color: 'bg-gradient-to-tr from-purple-600 to-pink-600',
      borderGlow: 'border-purple-500/80',
    },
    {
      icon: Layers,
      title: 'Smart Timetable Optimization',
      description: 'Conflict-free period schedule generator that automatically balances teacher subject allocations and classroom capacities.',
      badge: 'Conflict-Free',
      color: 'bg-gradient-to-tr from-blue-600 to-cyan-600',
      borderGlow: 'border-blue-500/80',
    },
    {
      icon: BarChart3,
      title: 'Recharts Executive Intelligence',
      description: 'Interactive visualizations for enrollment trends, grade distributions, and daily attendance statistics powered by Recharts.',
      badge: 'Analytics',
      color: 'bg-gradient-to-tr from-amber-600 to-orange-600',
      borderGlow: 'border-amber-500/80',
    },
    {
      icon: ShieldCheck,
      title: '256-bit AES Multi-Tenant Security',
      description: 'Role-based security matrix, real-time audit logging, and encrypted workspace isolation for maximum institution privacy.',
      badge: 'Encrypted',
      color: 'bg-gradient-to-tr from-slate-700 to-slate-900',
      borderGlow: 'border-slate-500/80',
    },
  ];

  return (
    <div className="space-y-24 pb-20 bg-slate-950 text-slate-100 text-left selection:bg-brand-500 selection:text-white overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-tr from-brand-600/20 via-indigo-600/20 to-purple-600/20 blur-3xl pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold shadow-inner backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
            <span>EduSphere v3.0 • Animated 3D School Campus Experience</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Run your entire institution with{' '}
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              3D School Campus Intelligence.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Watch students walk across campus in 3D as EduSphere automates student administration, grade analytics, attendance registers, and report cards.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold shadow-xl shadow-brand-600/30 scale-105"
            >
              Launch School Workspace
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Try Role Demo Accounts
            </Button>
          </div>

          {/* Interactive Instructions Bar */}
          <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 backdrop-blur-md">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" /> 3D Animated School Campus Ground
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-brand-400 font-bold">
              <MousePointer className="w-3.5 h-3.5" /> Move Mouse to Shift Camera View
            </span>
          </div>

          {/* 3D Animated School Campus Scene & Intelligence Box */}
          <div className="pt-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left: 3D School Campus Scene Canvas with Walking Students */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-md overflow-hidden relative">
              <School3DHeroCanvas />
            </div>

            {/* Right: 3D Parallax Tilt Intelligence Card */}
            <div
              onMouseMove={handleMouseMoveTilt}
              onMouseLeave={handleMouseLeaveTilt}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-5 text-left space-y-4 backdrop-blur-md hover:border-brand-500/50 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="font-bold text-white text-xs ml-2">Greenfield College (GIC001)</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <Cpu className="w-3 h-3" /> Live Campus Engine
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="font-mono text-slate-400">EduSphere:</span>
                <span className="font-semibold text-white truncate">"Forecast Grade 10 Term 1 Mathematics pass rate"</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-0.5 hover:border-brand-500/40 transition-colors">
                  <span className="text-[10px] text-slate-400 font-medium">Total Students</span>
                  <div className="text-xl font-bold text-white">2,842</div>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +4.2% Growth
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-0.5 hover:border-brand-500/40 transition-colors">
                  <span className="text-[10px] text-slate-400 font-medium">Attendance Rate</span>
                  <div className="text-xl font-bold text-emerald-400">94.8%</div>
                  <span className="text-[10px] text-slate-400">2,694 Present Today</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-0.5 hover:border-brand-500/40 transition-colors">
                  <span className="text-[10px] text-slate-400 font-medium">Projected Pass Rate</span>
                  <div className="text-xl font-bold text-brand-400">94.2%</div>
                  <span className="text-[10px] text-brand-300">+5.1% vs 2025</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-0.5 hover:border-brand-500/40 transition-colors">
                  <span className="text-[10px] text-slate-400 font-medium">Report Cards Ready</span>
                  <div className="text-xl font-bold text-purple-400">145 Cards</div>
                  <span className="text-[10px] text-slate-400">Auto-Graded A+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Workspace Interactive Preview Section */}
      <section id="dashboards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="brand">Tailored Workspaces</Badge>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Dedicated interfaces for every school role.</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            EduSphere dynamically adapts its dashboard, navigation sidebar, and permissions based on whether you log in as Administrator, Teacher, or Student.
          </p>
        </div>

        {/* Role Tabs Selector */}
        <div className="flex justify-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 max-w-md mx-auto">
          <button
            onClick={() => setActiveRoleTab('admin')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeRoleTab === 'admin'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" /> Admin
          </button>

          <button
            onClick={() => setActiveRoleTab('teacher')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeRoleTab === 'teacher'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Teacher
          </button>

          <button
            onClick={() => setActiveRoleTab('student')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeRoleTab === 'student'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Student
          </button>
        </div>

        {/* Role Workspace Content Box */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          {activeRoleTab === 'admin' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Administrator Executive View (`ROLE-ADMIN`)</h3>
                  <p className="text-xs text-slate-400">Full administrative authority over student records, teachers, academics, and system permissions.</p>
                </div>
                <Button size="xs" variant="primary" onClick={() => navigate('/login')}>Login as Admin</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <strong className="text-brand-400 block">Executive Analytics</strong>
                  <span className="text-slate-400">Recharts monthly attendance area chart & grade distribution.</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <strong className="text-brand-400 block">User Registry & Roles</strong>
                  <span className="text-slate-400">Add, edit, or delete students, teachers, and security roles.</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <strong className="text-brand-400 block">Audit & SaaS Controls</strong>
                  <span className="text-slate-400">256-bit AES log history and multi-tenant subscription.</span>
                </div>
              </div>
            </div>
          )}

          {activeRoleTab === 'teacher' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Teacher Faculty Workspace (`ROLE-TEACHER`)</h3>
                  <p className="text-xs text-slate-400">Tailored tools for class teachers to mark attendance registers and record exam marks.</p>
                </div>
                <Button size="xs" variant="primary" onClick={() => navigate('/login')}>Login as Teacher</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <strong className="text-emerald-400 block">Daily Class Timetable</strong>
                  <span className="text-slate-400">Period schedule with subject and classroom allocations.</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <strong className="text-emerald-400 block">Attendance Marker</strong>
                  <span className="text-slate-400">Quick 1-click register marking for assigned class students.</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <strong className="text-emerald-400 block">Marks Grid Entry</strong>
                  <span className="text-slate-400">Record exam scores (0-100) with automatic grade calculation.</span>
                </div>
              </div>
            </div>
          )}

          {activeRoleTab === 'student' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Student & Parent Portal (`ROLE-STUDENT`)</h3>
                  <p className="text-xs text-slate-400">Student-focused view to track grades, attendance, weekly timetable, and print official report cards.</p>
                </div>
                <Button size="xs" variant="primary" onClick={() => navigate('/login')}>Login as Student</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <strong className="text-purple-400 block">Term Exam Results</strong>
                  <span className="text-slate-400">Official subject marks with grade badges (A+, A, B, C, S, F).</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <strong className="text-purple-400 block">Printable Report Card</strong>
                  <span className="text-slate-400">Official term report card with principal signature seal.</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <strong className="text-purple-400 block">Attendance & Schedule</strong>
                  <span className="text-slate-400">Personal attendance percentage (96.4%) and weekly timetable.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Upgraded 3D Interactive Feature Cards Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        <div className="space-y-3">
          <Badge variant="brand">Interactive 3D Feature Suite</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Powered by 3D Academic Intelligence.
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Hover cursor over any card below to experience 3D parallax tilt, glowing borders, and live feature highlights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCardsData.map((card, idx) => (
            <FeatureCard3D
              key={idx}
              icon={card.icon}
              title={card.title}
              description={card.description}
              badge={card.badge}
              color={card.color}
              borderGlow={card.borderGlow}
            />
          ))}
        </div>
      </section>

      {/* High-Converting CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-900 to-purple-950 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl border border-brand-500/30">
          <Badge variant="brand">Ready For Deployment</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Empower Your Institution With EduSphere Today.</h2>
          <p className="text-sm sm:text-base text-brand-200 max-w-xl mx-auto">
            Experience the future of school SaaS administration with role-based dashboards for Administrators, Teachers, and Students.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-base shadow-2xl transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              <LogIn className="w-5 h-5 text-brand-600" />
              <span>Sign In to EduSphere Workspace</span>
              <ArrowRight className="w-5 h-5 text-brand-600" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
