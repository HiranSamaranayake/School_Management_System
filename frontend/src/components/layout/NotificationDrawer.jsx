import React, { useState } from 'react';
import { Bell, CheckCheck, Clock, Layers, Users, BookOpen, ShieldCheck } from 'lucide-react';
import { Drawer } from '../ui/Drawer';
import { useNotifications } from '../../app/context/NotificationContext';
import { Badge } from '../ui/Badge';

export const NotificationDrawer = () => {
  const { notifications, isOpen, setIsOpen, unreadCount, markAllAsRead } = useNotifications();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Attendance', 'Academics', 'System', 'Users'];

  const filtered = filter === 'All'
    ? notifications
    : notifications.filter(n => n.category.toLowerCase() === filter.toLowerCase());

  const getCategoryIcon = (cat) => {
    switch (cat.toLowerCase()) {
      case 'attendance': return <Clock className="w-4 h-4 text-emerald-600" />;
      case 'academics': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'users': return <Users className="w-4 h-4 text-brand-600" />;
      default: return <ShieldCheck className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand-600" />
          <span>Notifications</span>
          {unreadCount > 0 && <Badge variant="brand">{unreadCount} New</Badge>}
        </div>
      }
      subtitle="Stay updated with school activity and logs"
      footer={
        <button
          onClick={markAllAsRead}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark all as read</span>
        </button>
      }
    >
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 border-b border-slate-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === cat
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">No notifications found.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all ${
                item.unread
                  ? 'bg-brand-50/40 border-brand-200/80 shadow-xs'
                  : 'bg-white border-slate-200/80'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-100 shadow-xs shrink-0">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-slate-900">{item.title}</h4>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Drawer>
  );
};
