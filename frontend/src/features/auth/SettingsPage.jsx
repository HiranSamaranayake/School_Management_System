import React, { useState } from 'react';
import { useAuth } from '../../app/context/AuthContext';
import { useToast } from '../../app/context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Switch } from '../../components/ui/Switch';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Lock,
  Bell,
  Globe,
  Shield,
  Key,
  Save,
  LogOut,
  Smartphone,
  Mail,
  CheckCircle2
} from 'lucide-react';

export const SettingsPage = () => {
  const { user, logout, academicYear, setAcademicYear } = useAuth();
  const { addToast } = useToast();

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Notification state
  const [notifications, setNotifications] = useState({
    email_results: true,
    email_attendance: true,
    sms_alerts: false,
    sound_effects: true,
  });

  // System preference state
  const [language, setLanguage] = useState('English');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!passwordForm.current_password) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (passwordForm.new_password.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setPasswordLoading(true);
    setTimeout(() => {
      setPasswordLoading(false);
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
      addToast('Password Changed', 'Your password has been updated successfully', 'success');
    }, 500);
  };

  const handleSaveNotifications = () => {
    addToast('Preferences Saved', 'Your notification settings have been updated', 'success');
  };

  const handleSavePreferences = () => {
    addToast('Preferences Saved', `Language set to ${language} and Academic Year to ${academicYear}`, 'success');
  };

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Account Settings"
        subtitle="Manage security options, password settings, notification alerts, and regional preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 columns: Security & Notifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Security & Password */}
          <Card title="Security & Password" subtitle="Update account password and login authentication">
            <form onSubmit={handlePasswordChange} className="space-y-4 pt-2">
              {passwordError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                  {passwordError}
                </div>
              )}

              <Input
                label="Current Password"
                type="password"
                value={passwordForm.current_password}
                onChange={(e) => setPasswordForm(p => ({ ...p, current_password: e.target.value }))}
                placeholder="••••••••"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="New Password"
                  type="password"
                  value={passwordForm.new_password}
                  onChange={(e) => setPasswordForm(p => ({ ...p, new_password: e.target.value }))}
                  placeholder="At least 6 characters"
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordForm.confirm_password}
                  onChange={(e) => setPasswordForm(p => ({ ...p, confirm_password: e.target.value }))}
                  placeholder="Repeat new password"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={Key}
                  isLoading={passwordLoading}
                >
                  Update Password
                </Button>
              </div>
            </form>
          </Card>

          {/* Notification Preferences */}
          <Card title="Notification & Communication Preferences" subtitle="Choose how you receive alerts and progress notifications">
            <div className="space-y-4 pt-2 text-xs">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-brand-600" /> Exam Results & Academic Transcripts
                  </span>
                  <p className="text-slate-500">Receive email notification whenever new exam results are published</p>
                </div>
                <Switch
                  checked={notifications.email_results}
                  onChange={(val) => setNotifications(p => ({ ...p, email_results: val }))}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-brand-600" /> Daily Attendance Summaries
                  </span>
                  <p className="text-slate-500">Receive email alerts for unexcused absences or tardiness</p>
                </div>
                <Switch
                  checked={notifications.email_attendance}
                  onChange={(val) => setNotifications(p => ({ ...p, email_attendance: val }))}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-brand-600" /> Urgent School SMS Alerts
                  </span>
                  <p className="text-slate-500">Receive emergency broadcasts and holiday closures via SMS</p>
                </div>
                <Switch
                  checked={notifications.sms_alerts}
                  onChange={(val) => setNotifications(p => ({ ...p, sms_alerts: val }))}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={Save}
                  onClick={handleSaveNotifications}
                >
                  Save Notification Settings
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1 column: Display & Regional */}
        <div className="space-y-6">
          <Card title="Regional & Language Settings" subtitle="Localization options">
            <div className="space-y-4 pt-2">
              <Select
                label="Interface Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                options={['English', 'Sinhala', 'Tamil']}
              />

              <Select
                label="Academic Year Session"
                value={academicYear || '2026'}
                onChange={(e) => setAcademicYear && setAcademicYear(e.target.value)}
                options={['2026', '2025', '2024']}
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={Globe}
                onClick={handleSavePreferences}
                className="w-full justify-center"
              >
                Apply Preferences
              </Button>
            </div>
          </Card>

          <Card title="Account Security Summary" subtitle="Device session info">
            <div className="space-y-3 pt-1 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                <span className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Session Active
                </span>
                <Badge variant="success">Current Device</Badge>
              </div>

              <Button
                type="button"
                variant="danger"
                size="sm"
                icon={LogOut}
                onClick={() => logout && logout()}
                className="w-full justify-center"
              >
                Sign Out of Portal
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
