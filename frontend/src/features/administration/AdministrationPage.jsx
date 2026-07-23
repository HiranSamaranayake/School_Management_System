import React, { useState, useEffect } from 'react';
import { Settings, Users, ShieldCheck, History, School, Palette, CreditCard, Save, CheckCircle2, RotateCcw, Lock, UserPlus } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Switch } from '../../components/ui/Switch';
import { Table } from '../../components/ui/Table';
import { userService } from '../../services/userService';
import { useAuth } from '../../app/context/AuthContext';
import { useToast } from '../../app/context/ToastContext';
import { RegisterUserModal } from '../../components/modals/RegisterUserModal';
import { formatDate } from '../../utils/formatters';

export const AdministrationPage = () => {
  const { school, setSchool } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('users');

  const [users, setUsers] = useState([]);
  const [permissionsMatrix, setPermissionsMatrix] = useState({});
  const [auditLogs, setAuditLogs] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register User Modal
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // School Settings form
  const [schoolForm, setSchoolForm] = useState({
    name: school?.name || 'Greenfield International College',
    code: school?.code || 'GIC001',
    email: school?.email || 'contact@greenfield.edu.lk',
    phone: school?.phone || '+94 11 258 9641',
    address: school?.address || '148 Havelock Road, Colombo 05, Sri Lanka',
    website: school?.website || 'https://greenfield.edu.lk',
    primary_color: school?.primary_color || '#4f46e5',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [uRes, pRes, aRes, subRes] = await Promise.all([
        userService.getUsers(),
        userService.getRolesPermissions(),
        userService.getAuditLogs(),
        userService.getSubscription(),
      ]);
      setUsers(uRes);
      setPermissionsMatrix(pRes.matrix);
      setAuditLogs(aRes);
      setSubscription(subRes);
    } catch (e) {
      addToast('Error', 'Failed to load system settings', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePermissionToggle = (roleId, permKey) => {
    setPermissionsMatrix(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permKey]: !prev[roleId]?.[permKey]
      }
    }));
  };

  const handleSavePermissions = async () => {
    try {
      await userService.updateRolesPermissions(permissionsMatrix);
      addToast('Permissions Updated', 'Saved new security role authorization matrix', 'success');
    } catch (e) {
      addToast('Error', e.message, 'danger');
    }
  };

  const handleSaveSchoolSettings = async () => {
    try {
      const updated = await userService.updateSchoolSettings(schoolForm);
      setSchool(updated);
      addToast('Settings Saved', 'Updated Greenfield International College workspace profile', 'success');
    } catch (e) {
      addToast('Error', e.message, 'danger');
    }
  };

  const tabs = [
    { id: 'users', label: 'User Directory', icon: Users },
    { id: 'permissions', label: 'Roles & Permissions', icon: ShieldCheck },
    { id: 'logs', label: 'Audit Logs', icon: History },
    { id: 'settings', label: 'School Settings', icon: School },
    { id: 'branding', label: 'Theme & Branding', icon: Palette },
    { id: 'subscription', label: 'Subscription Plan', icon: CreditCard },
  ];

  const permissionKeys = [
    { key: 'students.view', label: 'View Students' },
    { key: 'students.create', label: 'Create Students' },
    { key: 'students.update', label: 'Update Students' },
    { key: 'students.delete', label: 'Delete Students' },
    { key: 'teachers.view', label: 'View Teachers' },
    { key: 'teachers.manage', label: 'Manage Teachers' },
    { key: 'attendance.manage', label: 'Manage Attendance' },
    { key: 'examinations.manage', label: 'Manage Exams & Marks' },
    { key: 'reports.view', label: 'View Analytics Reports' },
    { key: 'settings.manage', label: 'System Administration' },
  ];

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Administration & Settings"
        subtitle="Manage system users, security permissions matrix, audit history, and tenant subscription"
        actions={
          activeTab === 'users' ? (
            <Button
              variant="primary"
              size="md"
              icon={UserPlus}
              onClick={() => setIsRegisterModalOpen(true)}
            >
              Register New User
            </Button>
          ) : null
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Users */}
      {activeTab === 'users' && (
        <Card
          title="System Administrator & Faculty Users"
          subtitle="Authorized workspace user accounts"
          actions={
            <Button
              variant="primary"
              size="sm"
              icon={UserPlus}
              onClick={() => setIsRegisterModalOpen(true)}
            >
              + Register User
            </Button>
          }
        >
          <Table
            columns={[
              { header: 'User', key: 'name', cell: (r) => <span className="font-bold text-slate-900">{r.name}</span> },
              { header: 'Email Address', key: 'email' },
              { header: 'Assigned Role', key: 'role', cell: (r) => <Badge variant="brand">{r.role}</Badge> },
              { header: 'Status', key: 'status', cell: (r) => <Badge variant={r.status === 'Active' ? 'success' : 'danger'} dot>{r.status}</Badge> },
              { header: 'Last Login', key: 'last_login' },
            ]}
            data={users}
            isLoading={loading}
          />
        </Card>
      )}

      {/* Tab 2: Roles & Permissions */}
      {activeTab === 'permissions' && (
        <Card title="Roles & Access Control Matrix" subtitle="Configure fine-grained system capabilities per user role">
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-slate-500">
                <tr>
                  <th className="p-4">Permission Module</th>
                  <th className="p-4 text-center">School Admin</th>
                  <th className="p-4 text-center">Teacher</th>
                  <th className="p-4 text-center">Student</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {permissionKeys.map((perm) => (
                  <tr key={perm.key} className="hover:bg-slate-50/60">
                    <td className="p-4 font-semibold text-slate-900">{perm.label} ({perm.key})</td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={permissionsMatrix['ROLE-ADMIN']?.[perm.key] ?? true}
                        onChange={() => handlePermissionToggle('ROLE-ADMIN', perm.key)}
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={permissionsMatrix['ROLE-TEACHER']?.[perm.key] ?? false}
                        onChange={() => handlePermissionToggle('ROLE-TEACHER', perm.key)}
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={permissionsMatrix['ROLE-STUDENT']?.[perm.key] ?? false}
                        onChange={() => handlePermissionToggle('ROLE-STUDENT', perm.key)}
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="primary" size="md" icon={Save} onClick={handleSavePermissions}>
              Save Permission Matrix
            </Button>
          </div>
        </Card>
      )}

      {/* Tab 3: Audit Logs */}
      {activeTab === 'logs' && (
        <Card title="Security Audit Logs" subtitle="Immutably recorded administrative actions">
          <Table
            columns={[
              { header: 'Timestamp', key: 'timestamp', cell: (r) => <span className="font-mono text-slate-500">{r.timestamp}</span> },
              { header: 'User', key: 'user', cell: (r) => <span className="font-bold text-slate-900">{r.user}</span> },
              { header: 'Module', key: 'module', cell: (r) => <Badge variant="neutral">{r.module}</Badge> },
              { header: 'Action', key: 'action', cell: (r) => <span className="font-semibold text-slate-800">{r.action}</span> },
              { header: 'Description', key: 'description' },
              { header: 'IP Address', key: 'ip_address', cell: (r) => <span className="font-mono text-slate-400">{r.ip_address}</span> },
            ]}
            data={auditLogs}
            isLoading={loading}
          />
        </Card>
      )}

      {/* Tab 4: School Settings */}
      {activeTab === 'settings' && (
        <Card title="School Workspace Details" subtitle="Primary institution identity & settings">
          <form onSubmit={(e) => { e.preventDefault(); handleSaveSchoolSettings(); }} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="School Name" value={schoolForm.name} onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })} required />
              <Input label="School Code" value={schoolForm.code} onChange={(e) => setSchoolForm({ ...schoolForm, code: e.target.value })} required />
              <Input label="Official Email" type="email" value={schoolForm.email} onChange={(e) => setSchoolForm({ ...schoolForm, email: e.target.value })} required />
              <Input label="Phone Number" value={schoolForm.phone} onChange={(e) => setSchoolForm({ ...schoolForm, phone: e.target.value })} required />
              <div className="sm:col-span-2">
                <Input label="Address" value={schoolForm.address} onChange={(e) => setSchoolForm({ ...schoolForm, address: e.target.value })} />
              </div>
              <Input label="Website" value={schoolForm.website} onChange={(e) => setSchoolForm({ ...schoolForm, website: e.target.value })} />
            </div>
            <Button variant="primary" size="md" icon={Save} type="submit">
              Save School Settings
            </Button>
          </form>
        </Card>
      )}

      {/* Tab 5: Branding */}
      {activeTab === 'branding' && (
        <Card title="White-Label Custom Branding" subtitle="Customize workspace primary brand colors and logo">
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">Primary Brand Theme Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={schoolForm.primary_color}
                  onChange={(e) => setSchoolForm({ ...schoolForm, primary_color: e.target.value })}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-slate-300"
                />
                <Input
                  value={schoolForm.primary_color}
                  onChange={(e) => setSchoolForm({ ...schoolForm, primary_color: e.target.value })}
                  className="font-mono"
                />
              </div>
            </div>

            {/* Live Branding Preview Box */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Live Header Preview</h4>
              <div className="p-3 rounded-xl shadow-md text-white flex items-center justify-between" style={{ backgroundColor: schoolForm.primary_color }}>
                <span className="font-bold text-sm">{schoolForm.name}</span>
                <Badge variant="neutral">Active Tenant</Badge>
              </div>
            </div>

            <Button variant="primary" size="md" icon={Save} onClick={handleSaveSchoolSettings}>
              Apply Branding Theme
            </Button>
          </div>
        </Card>
      )}

      {/* Tab 6: Subscription */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          <Card title="EduSphere Cloud Plan Overview" subtitle="Current SaaS Subscription Tier">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <Badge variant="brand" size="lg">Professional Plan</Badge>
                <h3 className="text-2xl font-extrabold mt-2">Greenfield International College</h3>
                <p className="text-xs text-brand-200 mt-1">Renews on December 31, 2026 • Annual Billing ($1,499/year)</p>
              </div>
              <Button variant="secondary" size="md">Upgrade Subscription Tier</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500">Students Usage</span>
                <div className="text-xl font-bold text-slate-900 mt-1">2,842 / 5,000</div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-brand-600 h-1.5 rounded-full" style={{ width: `${(2842/5000)*100}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500">Teacher Accounts</span>
                <div className="text-xl font-bold text-slate-900 mt-1">146 / 200</div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(146/200)*100}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500">Cloud Storage</span>
                <div className="text-xl font-bold text-slate-900 mt-1">45.2 GB / 100 GB</div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(45.2/100)*100}%` }} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Register User Modal */}
      <RegisterUserModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={fetchData}
      />
    </div>
  );
};
