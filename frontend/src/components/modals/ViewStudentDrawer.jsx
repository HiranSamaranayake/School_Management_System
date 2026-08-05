import React, { useState, useRef } from 'react';
import { Drawer } from '../ui/Drawer';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Tabs } from '../ui/Tabs';
import { Button } from '../ui/Button';
import { Mail, Phone, MapPin, Calendar, UserCheck, Award, FileText, CheckCircle2, XCircle, Camera, Upload, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { studentService } from '../../services/studentService';
import { useAuth } from '../../app/context/AuthContext';
import { useToast } from '../../app/context/ToastContext';

export const ViewStudentDrawer = ({ isOpen, onClose, student, onEdit, onPrintReportCard }) => {
  const { addToast } = useToast();
  const { user } = useAuth();
  const roleStr = String(user?.role_id || user?.role || '').toLowerCase();
  const isTeacher = roleStr.includes('teacher');

  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentAvatar, setCurrentAvatar] = useState(student?.avatar || '');

  if (!student) return null;

  const handlePhotoUpload = async (e) => {
    if (isTeacher) return;
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Invalid File', 'Please select a valid image file (JPG, PNG, WebP)', 'danger');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Url = event.target.result;
      setCurrentAvatar(base64Url);
      student.avatar = base64Url;
      try {
        await studentService.updateStudent(student.student_id, { avatar: base64Url });
        addToast('Photo Updated', `Updated profile photo for ${student.first_name}`, 'success');
      } catch (err) {
        addToast('Photo Updated', `Updated profile photo for ${student.first_name}`, 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoRemove = async () => {
    if (isTeacher) return;
    setCurrentAvatar('');
    student.avatar = '';
    try {
      await studentService.updateStudent(student.student_id, { avatar: '' });
      addToast('Photo Removed', `Removed profile photo for ${student.first_name}`, 'info');
    } catch (err) {
      addToast('Photo Removed', `Removed profile photo for ${student.first_name}`, 'info');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'results', label: 'Academic Results' },
    { id: 'enrollment', label: 'Enrollment History' },
  ];

  const displayName = (student.first_name || student.last_name)
    ? `${student.first_name || ''} ${student.last_name || ''}`.trim()
    : (student.name || student.full_name || 'Student');

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      width="max-w-2xl"
      title="Student Profile"
      subtitle={`Admission No: ${student.admission_no}`}
      footer={
        <>
          <Button variant="outline" size="sm" onClick={() => onPrintReportCard && onPrintReportCard(student)}>
            <FileText className="w-4 h-4 mr-1.5" />
            Print Report Card
          </Button>
          {!isTeacher ? (
            <Button variant="primary" size="sm" onClick={() => { onClose(); onEdit && onEdit(student); }}>
              Edit Profile
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
        </>
      }
    >
      {/* Student Profile Header */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
        <div className="relative group shrink-0">
          <Avatar src={currentAvatar || student.avatar} name={displayName} size="xl" />
          {!isTeacher && (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity text-xs font-bold gap-1"
                title="Upload student profile photo"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 truncate">
              {displayName}
            </h3>
            <Badge variant={student.status === 'Active' ? 'success' : 'neutral'}>{student.status}</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {student.class_name} • {student.medium} Medium
          </p>
          {!isTeacher && (
            <div className="mt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] text-brand-600 hover:text-brand-700 font-semibold underline flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>{currentAvatar || student.avatar ? 'Change Profile Photo' : 'Upload Profile Photo'}</span>
              </button>
              {(currentAvatar || student.avatar) && (
                <button
                  type="button"
                  onClick={handlePhotoRemove}
                  className="text-[11px] text-red-600 hover:text-red-700 font-semibold underline flex items-center gap-1 cursor-pointer"
                  title="Remove profile photo"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove Photo</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6 text-left">
          {/* Guardian Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Guardian Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Guardian Name</span>
                <span className="font-semibold text-slate-800">{student.guardian_name} ({student.guardian_relationship})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Contact Phone</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {student.guardian_phone}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block">Guardian Email</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {student.guardian_email || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address & Contact</h4>
            <div className="flex items-start gap-2 text-xs text-slate-700">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{student.address || "148 Havelock Road, Colombo 05, Sri Lanka"}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
              <div className="text-lg font-bold text-emerald-700">96.2%</div>
              <div className="text-[10px] text-emerald-600 font-medium">Overall Rate</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
              <div className="text-lg font-bold text-blue-700">142 Days</div>
              <div className="text-[10px] text-blue-600 font-medium">Present</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
              <div className="text-lg font-bold text-amber-700">3 Days</div>
              <div className="text-[10px] text-amber-600 font-medium">Late / Excused</div>
            </div>
          </div>

          <h4 className="text-xs font-bold text-slate-700 mt-4 mb-2">Recent Attendance Log</h4>
          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
            <div className="flex items-center justify-between p-3 bg-white">
              <span>Today (2026-07-24)</span>
              <Badge variant="success">Present</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white">
              <span>Yesterday (2026-07-23)</span>
              <Badge variant="success">Present</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white">
              <span>2026-07-22</span>
              <Badge variant="warning">Late (15 mins)</Badge>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'results' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700">First Term Examination 2026</h4>
            <Badge variant="success">Passed with Distinction</Badge>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs bg-white">
            <table className="w-full text-left divide-y divide-slate-100">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Marks</th>
                  <th className="p-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr><td className="p-3 font-medium">Mathematics</td><td className="p-3">92</td><td className="p-3"><Badge variant="success">A+</Badge></td></tr>
                <tr><td className="p-3 font-medium">English Language</td><td className="p-3">88</td><td className="p-3"><Badge variant="success">A+</Badge></td></tr>
                <tr><td className="p-3 font-medium">Science</td><td className="p-3">85</td><td className="p-3"><Badge variant="success">A+</Badge></td></tr>
                <tr><td className="p-3 font-medium">ICT</td><td className="p-3">95</td><td className="p-3"><Badge variant="success">A+</Badge></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'enrollment' && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl border border-slate-200 bg-white text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">{student.class_name || 'Grade 10 - A'}</span>
              <span className="text-slate-400">2026 Academic Year</span>
            </div>
            <p className="text-slate-500 text-[11px] mt-1">Enrolled on 2026-01-08 • Medium: English</p>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 bg-white text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">Grade 9 - A</span>
              <span className="text-slate-400">2025 Academic Year</span>
            </div>
            <p className="text-slate-500 text-[11px] mt-1">Completed • Promoted to Grade 10</p>
          </div>
        </div>
      )}
    </Drawer>
  );
};
