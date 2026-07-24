import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { Logo } from '../components/ui/Logo';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Left Branding Hero Section */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-slate-900 via-slate-950 to-brand-950 p-12 flex-col justify-between overflow-hidden border-r border-slate-800">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

        {/* Top Header */}
        <div className="relative z-10">
          <Logo size="lg" variant="light" />
        </div>

        {/* Hero Copy & SaaS Preview Graphic */}
        <div className="relative z-10 max-w-lg my-auto space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Tenant Enterprise School Cloud</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Empower your institution with real-time academic intelligence.
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed">
            EduSphere unifies student administration, teacher allocations, attendance registers, examination grading, and executive analytics into a seamless workspace.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-xs">
              <div className="text-2xl font-bold text-white">2,842+</div>
              <div className="text-xs text-slate-400 mt-0.5">Enrolled Demo Students</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-xs">
              <div className="text-2xl font-bold text-emerald-400">94.8%</div>
              <div className="text-xs text-slate-400 mt-0.5">Average Daily Attendance</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 pt-6 border-t border-slate-800/80">
          <span className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 256-bit AES Encrypted SaaS Architecture
          </span>
          <span>Greenfield International College (GIC001)</span>
        </div>
      </div>

      {/* Right Login Container */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-950">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
