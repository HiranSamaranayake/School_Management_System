import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Tabs } from '../ui/Tabs';
import { Button } from '../ui/Button';
import { Mail, Phone, BookOpen, Layers, Award, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const ViewTeacherDrawer = ({ isOpen, onClose, teacher, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!teacher) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'classes', label: 'Assigned Classes' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'activity', label: 'Activity Log' },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      width="max-w-xl"
      title="Teacher Profile"
      subtitle={`Reg No: ${teacher.teacher_reg_no}`}
      footer={
        <Button variant="primary" size="sm" onClick={() => { onClose(); onEdit && onEdit(teacher); }}>
          Edit Teacher Profile
        </Button>
      }
    >
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
        <Avatar src={teacher.avatar} name={`${teacher.first_name} ${teacher.last_name}`} size="xl" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 truncate">
              {teacher.first_name} {teacher.last_name}
            </h3>
            <Badge variant={teacher.status === 'Active' ? 'success' : 'warning'}>{teacher.status}</Badge>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">{teacher.qualification}</p>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Joined {formatDate(teacher.joining_date)}
          </p>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      {activeTab === 'overview' && (
        <div className="space-y-4 text-left text-xs">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-400 uppercase">Contact Information</h4>
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{teacher.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{teacher.phone}</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-400 uppercase">Personal & NIC</h4>
            <p><strong>NIC Number:</strong> {teacher.nic_no || '847291038V'}</p>
            <p><strong>Gender:</strong> {teacher.gender}</p>
            <p><strong>Date of Birth:</strong> {formatDate(teacher.date_of_birth)}</p>
            <p><strong>Address:</strong> {teacher.address || 'Colombo, Sri Lanka'}</p>
          </div>
        </div>
      )}

      {activeTab === 'classes' && (
        <div className="space-y-2 text-xs">
          {(teacher.assigned_classes || ["Grade 10 - Science", "Grade 11 - Science"]).map((cls, idx) => (
            <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
              <span className="font-semibold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-600" /> {cls}
              </span>
              <Badge variant="brand">Primary Instructor</Badge>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'subjects' && (
        <div className="space-y-2 text-xs">
          {(teacher.assigned_subjects || ["MAT001", "SCI001"]).map((sub, idx) => (
            <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
              <span className="font-semibold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" /> Subject Code: {sub}
              </span>
              <Badge variant="info">Active</Badge>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="text-xs text-slate-500 space-y-2">
          <p>• Submitted attendance for Grade 10 - Science today at 08:45 AM</p>
          <p>• Uploaded term marks for Mathematics on 2026-07-22</p>
        </div>
      )}
    </Drawer>
  );
};
