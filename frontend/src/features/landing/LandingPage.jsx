import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  BookOpen,
  CalendarCheck,
  Award,
  BarChart3,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  School,
  Lock,
  Globe
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>EduSphere SaaS v2.4 • Multi-Tenant Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Run your entire school from one <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">intelligent workspace.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Manage students, teachers, attendance, academics, examinations and school operations with one modern platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto shadow-lg shadow-brand-600/30"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto"
            >
              View Live Demo
            </Button>
          </div>

          {/* Interactive SaaS Dashboard Mockup Preview */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="relative rounded-2xl border border-slate-200/90 bg-white shadow-2xl p-4 md:p-6 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="font-bold text-slate-700 ml-2">Greenfield International College (GIC001)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <span>2026 Academic Year</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-semibold">Active</span>
                </div>
              </div>

              {/* Preview Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500 font-medium">Total Students</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">2,842</div>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +4.2% this year
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500 font-medium">Teachers</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">146</div>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +2.1% this year
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500 font-medium">Today's Attendance</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-1">94.8%</div>
                  <span className="text-[11px] text-slate-500 mt-1 block">2,694 Present Today</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500 font-medium">Active Classes</div>
                  <div className="text-2xl font-bold text-brand-600 mt-1">68</div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Grades 6 – 13</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        <div>
          <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">Core Capabilities</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">Everything your institution needs to excel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-subtle hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Student Management</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete student registry with guardian linkages, medical history, academic enrollment, and printable report cards.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-subtle hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Teacher Allocations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manage faculty credentials, assign subject-class matrix allocations, and track teacher attendance and schedule.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-subtle hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Attendance Register</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time daily attendance marking with segmented status (Present, Absent, Late, Excused) and analytics.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-subtle hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Examinations & Marks Entry</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Term assessment scheduling, 0-100 mark entry validation, automatic GPA calculation, and custom grade thresholds.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-subtle hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Analytics & Visual Reports</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Executive dashboard visualizations using Recharts for enrollment trends, subject performance, and class rankings.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-subtle hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Roles & Security Matrix</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fine-grained permission controls, real-time audit logs, and secure multi-tenant cloud workspace isolation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-brand-700 to-indigo-800 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to transform your school operations?</h2>
          <p className="text-sm sm:text-base text-brand-100 max-w-xl mx-auto">
            Join hundreds of forward-thinking institutions using EduSphere for modern, effortless school management.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/login')}
            className="shadow-lg font-bold"
          >
            Launch EduSphere Workspace
          </Button>
        </div>
      </section>
    </div>
  );
};
