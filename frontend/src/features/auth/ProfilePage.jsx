import React, { useState, useRef } from 'react';
import { useAuth } from '../../app/context/AuthContext';
import { useToast } from '../../app/context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Upload,
  Trash2,
  Save,
  ShieldCheck,
  GraduationCap,
  Calendar,
  Heart
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateUser, school } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || 'Hiran',
    last_name: user?.last_name || 'Samaranayake',
    email: user?.email || 'student@greenfield.edu.lk',
    phone: user?.phone || '0771234567',
    date_of_birth: user?.date_of_birth || '2010-04-12',
    gender: user?.gender || 'Male',
    medium: user?.medium || 'English',
    address: user?.address || '45/A, High Level Road, Nugegoda',
    guardian_name: user?.guardian_name || 'K. Samaranayake',
    guardian_relationship: user?.guardian_relationship || 'Father',
    guardian_phone: user?.guardian_phone || '0779998877',
    guardian_email: user?.guardian_email || 'hiran.samaranayake@gmail.com',
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Invalid File', 'Please select a valid image file (JPG, PNG, WebP)', 'danger');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target.result;
      if (updateUser) {
        updateUser({ avatar: base64Url });
      }
      addToast('Profile Photo Updated', 'Your profile photo has been updated successfully', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarRemove = () => {
    if (updateUser) {
      updateUser({ avatar: '' });
    }
    addToast('Profile Photo Removed', 'Your profile photo has been removed', 'info');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      if (updateUser) {
        updateUser({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          address: formData.address,
          guardian_name: formData.guardian_name,
          guardian_phone: formData.guardian_phone,
          guardian_email: formData.guardian_email,
        });
      }
      setSaving(false);
      addToast('Profile Updated', 'Your personal details have been saved successfully', 'success');
    }, 400);
  };

  const roleName = user?.role || 'Student';
  const isStudent = String(user?.role_id || user?.role || '').toLowerCase().includes('student');

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal details, guardian contact information, and profile photo"
      />

      {/* Top Profile Card Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 p-6 rounded-2xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative group shrink-0">
            <Avatar
              src={user?.avatar}
              name={`${formData.first_name} ${formData.last_name}`}
              size="xl"
              className="ring-4 ring-white/20 shadow-lg"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-slate-900/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity text-[10px] font-bold gap-0.5"
              title="Upload profile photo"
            >
              <Camera className="w-5 h-5" />
              <span>Change</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold tracking-tight">{formData.first_name} {formData.last_name}</h2>
              <Badge variant="brand">{roleName}</Badge>
            </div>
            <p className="text-xs text-brand-200 mt-1">
              {school?.name || 'Greenfield International College'} • {isStudent ? `Admission No: ${user?.admission_no || 'GIC-2024-001'}` : `ID: ${user?.user_id || 'USR-001'}`}
            </p>
            <div className="mt-2 flex items-center justify-center sm:justify-start gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 text-xs text-brand-300 hover:text-white font-medium underline cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{user?.avatar ? 'Change Photo' : 'Upload Photo'}</span>
              </button>
              {user?.avatar && (
                <button
                  type="button"
                  onClick={handleAvatarRemove}
                  className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-100 font-medium underline cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Photo</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col gap-3 text-right text-xs">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
            <span className="text-brand-300 block text-[10px] uppercase font-bold">Academic Section</span>
            <span className="font-bold text-white text-sm">Grade 10 - Science</span>
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 columns: Personal & Guardian Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Personal Information" subtitle="Update basic identity and contact details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="First Name"
                value={formData.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)}
                required
              />
              <Input
                label="Last Name"
                value={formData.last_name}
                onChange={(e) => handleChange('last_name', e.target.value)}
                required
              />
              <Input
                label="Date of Birth"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => handleChange('date_of_birth', e.target.value)}
              />
              <Select
                label="Gender"
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                options={['Male', 'Female', 'Other']}
              />
              <Select
                label="Instruction Medium"
                value={formData.medium}
                onChange={(e) => handleChange('medium', e.target.value)}
                options={['English', 'Sinhala', 'Tamil']}
              />
              <Input
                label="Contact Phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              <div className="sm:col-span-2">
                <Input
                  label="Residential Address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Street address, City, District"
                />
              </div>
            </div>
          </Card>

          {/* Guardian Information Card */}
          <Card title="Guardian & Parent Contact Information" subtitle="Emergency contacts and parent communication">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Guardian Full Name"
                value={formData.guardian_name}
                onChange={(e) => handleChange('guardian_name', e.target.value)}
              />
              <Select
                label="Relationship"
                value={formData.guardian_relationship}
                onChange={(e) => handleChange('guardian_relationship', e.target.value)}
                options={['Father', 'Mother', 'Guardian', 'Other']}
              />
              <Input
                label="Guardian Phone"
                value={formData.guardian_phone}
                onChange={(e) => handleChange('guardian_phone', e.target.value)}
              />
              <Input
                label="Guardian Email"
                type="email"
                value={formData.guardian_email}
                onChange={(e) => handleChange('guardian_email', e.target.value)}
              />
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
              isLoading={saving}
            >
              Save Profile Changes
            </Button>
          </div>
        </div>

        {/* Right 1 column: Account Summary */}
        <div className="space-y-6">
          <Card title="Account Overview" subtitle="System credentials & status">
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 block font-medium">Registered Email</span>
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {formData.email}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 block font-medium">Portal Access Role</span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{roleName}</span>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 block font-medium">School / Campus</span>
                <span className="font-bold text-slate-800">{school?.name || 'Greenfield International College'}</span>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};
