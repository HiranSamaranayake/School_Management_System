import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Plus,
  Bell,
  HelpCircle,
  User,
  Settings,
  LogOut,
  ChevronDown,
  GraduationCap,
  Users,
  Layers,
  Clock,
  FileCheck
} from 'lucide-react';
import { useAuth } from '../../app/context/AuthContext';
import { useNotifications } from '../../app/context/NotificationContext';
import { useQuickCreate } from '../../app/context/QuickCreateContext';
import { Dropdown } from '../ui/Dropdown';
import { CommandPalette } from './CommandPalette';
import { Avatar } from '../ui/Avatar';

export const Header = ({ onOpenMobileMenu }) => {
  const { user, school, logout } = useAuth();
  const { unreadCount, setIsOpen: setIsNotifOpen } = useNotifications();
  const { openQuickCreate } = useQuickCreate();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  const quickCreateItems = [
    { label: 'New Student', icon: GraduationCap, onClick: () => openQuickCreate('student') },
    { label: 'New Teacher', icon: Users, onClick: () => openQuickCreate('teacher') },
    { label: 'New Class', icon: Layers, onClick: () => openQuickCreate('class') },
    { label: 'Record Attendance', icon: Clock, onClick: () => openQuickCreate('attendance') },
    { label: 'Create Exam', icon: FileCheck, onClick: () => openQuickCreate('exam') },
  ];

  const profileMenuItems = [
    { label: 'My Profile', icon: User, onClick: () => navigate('/administration') },
    { label: 'Account Settings', icon: Settings, onClick: () => navigate('/administration') },
    { label: 'Help Center', icon: HelpCircle, onClick: () => window.open('https://edusphere.help', '_blank') },
    { divider: true },
    { label: 'Sign Out', icon: LogOut, danger: true, onClick: handleSignOut },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 md:px-6 backdrop-blur-md">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Command Bar */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 transition-all text-xs w-64 md:w-80"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="flex-1 text-left">Search anything in EduSphere...</span>
            <kbd className="px-1.5 py-0.5 rounded border bg-white border-slate-200 text-[10px] font-semibold text-slate-500 shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search icon mobile */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="sm:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Quick Create Dropdown */}
          <Dropdown
            trigger={
              <button className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
            }
            items={quickCreateItems}
            align="right"
          />

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-white" />
            )}
          </button>

          {/* Help Center */}
          <button
            onClick={() => navigate('/administration')}
            className="hidden md:flex p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Help & Support"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

          {/* Profile Dropdown */}
          <Dropdown
            trigger={
              <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors text-left">
                <Avatar src={user?.avatar} name={`${user?.first_name} ${user?.last_name}`} size="sm" />
                <div className="hidden md:block text-left">
                  <div className="text-xs font-semibold text-slate-900 leading-tight">
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">{user?.role}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
              </button>
            }
            items={profileMenuItems}
            align="right"
          />
        </div>
      </header>

      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
