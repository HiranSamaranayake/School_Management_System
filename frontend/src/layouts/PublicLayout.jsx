import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';
import { Sparkles, LogIn, ArrowRight } from 'lucide-react';

export const PublicLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/">
            <Logo size="md" variant="light" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-brand-400 transition-colors">Core Features</a>
            <a href="#dashboards" className="hover:text-brand-400 transition-colors">Role Workspaces</a>
            <a href="#security" className="hover:text-brand-400 transition-colors">Security & Trust</a>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={LogIn}
              onClick={() => navigate('/login')}
              className="border-brand-500/40 text-brand-300 hover:bg-brand-500/10 hover:border-brand-400 hover:text-white font-semibold transition-all shadow-sm"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-brand-600/25"
            >
              Launch Portal
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2">
            <div className="mb-3">
              <Logo size="md" variant="light" />
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-4">
              The next-generation multi-tenant school SaaS platform. Automate administrative workflows, predict student outcomes, and streamline institution governance.
            </p>
            <p className="text-slate-500 text-[11px]">© 2026 EduSphere Inc. Greenfield International College Edition.</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#features" className="hover:text-white">Academic Intelligence</a></li>
              <li><a href="#features" className="hover:text-white">Student Predictive Analytics</a></li>
              <li><a href="#features" className="hover:text-white">Smart Timetable Generator</a></li>
              <li><a href="#features" className="hover:text-white">Automated Report Cards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Role Portals</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/login" className="hover:text-white">Administrator Executive View</Link></li>
              <li><Link to="/login" className="hover:text-white">Teacher Faculty Portal</Link></li>
              <li><Link to="/login" className="hover:text-white">Student & Parent Portal</Link></li>
              <li><Link to="/login" className="hover:text-white">1-Click Role Selector</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Security & Trust</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#security" className="hover:text-white">256-bit AES Data Encryption</a></li>
              <li><a href="#security" className="hover:text-white">Multi-Tenant Isolation</a></li>
              <li><a href="#security" className="hover:text-white">Role-Based Security Matrix</a></li>
              <li><a href="#security" className="hover:text-white">FERPA / GDPR Compliance</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
