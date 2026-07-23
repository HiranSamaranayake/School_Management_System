import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const PublicLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-600/20">
              E
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-900 tracking-tight leading-tight">EduSphere</span>
              <span className="text-[10px] text-slate-500 font-medium">Cloud School SaaS</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-brand-600 transition-colors">Features</a>
            <a href="#analytics" className="hover:text-brand-600 transition-colors">Analytics</a>
            <a href="#security" className="hover:text-brand-600 transition-colors">Security</a>
            <a href="#pricing" className="hover:text-brand-600 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
              Start Free Trial
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand-600 text-white font-bold flex items-center justify-center">E</div>
              <span className="font-bold text-white text-base">EduSphere</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-4">
              Modern School Management, Simplified. Empowering education institutions with smart multi-tenant SaaS tools.
            </p>
            <p className="text-slate-500 text-[11px]">© 2026 EduSphere Inc. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white">Student Management</a></li>
              <li><a href="#features" className="hover:text-white">Academic Planning</a></li>
              <li><a href="#features" className="hover:text-white">Examinations</a></li>
              <li><a href="#features" className="hover:text-white">Attendance Register</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white">About Us</a></li>
              <li><a href="/" className="hover:text-white">Careers</a></li>
              <li><a href="/" className="hover:text-white">Security & Trust</a></li>
              <li><a href="/" className="hover:text-white">Contact Sales</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/" className="hover:text-white">Terms of Service</a></li>
              <li><a href="/" className="hover:text-white">FERPA / GDPR Compliance</a></li>
              <li><a href="/" className="hover:text-white">SLA Guarantee</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
