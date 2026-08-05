import React, { useState, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Camera, Upload, Trash2 } from 'lucide-react';
import { studentService } from '../../services/studentService';
import { useToast } from '../../app/context/ToastContext';
import { validateName, validatePhone, validateEmail } from '../../utils/validators';

export const AddStudentModal = ({ isOpen, onClose, onSuccess, initialData = null }) => {
  const { addToast } = useToast();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    avatar: initialData?.avatar || '',
    date_of_birth: initialData?.date_of_birth || '2012-05-15',
    gender: initialData?.gender || 'Male',
    admission_no: initialData?.admission_no || `GIC-2026-${Math.floor(100 + Math.random() * 900)}`,
    admission_date: initialData?.admission_date || '2026-01-08',
    grade_level: initialData?.grade_level || 'Grade 10',
    class_name: initialData?.class_name || 'Grade 10 - A',
    medium: initialData?.medium || 'English',
    address: initialData?.address || '',
    phone: initialData?.phone || '',
    guardian_name: initialData?.guardian_name || '',
    guardian_relationship: initialData?.guardian_relationship || 'Father',
    guardian_phone: initialData?.guardian_phone || '',
    guardian_email: initialData?.guardian_email || '',
    portal_account: initialData?.portal_account ?? true,
    status: initialData?.status || 'Active',
  });

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Invalid File', 'Please select a valid image file (JPG, PNG, WebP)', 'danger');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      handleChange('avatar', event.target.result);
      addToast('Photo Uploaded', 'Student profile photo loaded', 'info');
    };
    reader.readAsDataURL(file);
  };

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const fnErr = validateName(formData.first_name, "First name");
    if (fnErr) newErrors.first_name = fnErr;

    if (!formData.admission_no.trim()) newErrors.admission_no = "Admission number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (initialData?.student_id) {
        await studentService.updateStudent(initialData.student_id, formData);
        addToast('Student Updated', `Successfully updated profile for ${formData.first_name} ${formData.last_name}`, 'success');
      } else {
        await studentService.createStudent(formData);
        addToast('Student Enrolled', `Successfully enrolled ${formData.first_name} ${formData.last_name}`, 'success');
      }
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      addToast('Error', err.message || 'Failed to save student record', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Student Profile" : "Add New Student"}
      subtitle="Register student profile, academic enrollment, and guardian contact info"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} isDisabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} isLoading={loading}>
            {initialData ? "Save Changes" : "Save Student"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate>
        {/* Section 1: Personal Information */}
        <div>
          <h4 className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-3">
            1. Personal Information & Profile Photo
          </h4>
          
          {/* Profile Photo Uploader */}
          <div className="flex items-center gap-4 mb-4 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <Avatar
              src={formData.avatar}
              name={`${formData.first_name || 'Student'} ${formData.last_name}`}
              size="lg"
            />
            <div>
              <span className="text-xs font-bold text-slate-800 block">Student Profile Photo</span>
              <p className="text-[10px] text-slate-500 mb-1.5">Upload a picture for student ID card & profile badge</p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  icon={Upload}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {formData.avatar ? 'Change Photo' : 'Upload Photo'}
                </Button>
                {formData.avatar && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    icon={Trash2}
                    onClick={() => handleChange('avatar', '')}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                id="modal-student-avatar-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Student Name"
              required
              aria-label="Student Name"
              value={formData.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
              error={errors.first_name}
              placeholder="e.g. Test Student"
            />
            <Input
              label="Last Name"
              value={formData.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
              placeholder="e.g. Perera"
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
              options={['Male', 'Female']}
            />
          </div>
        </div>

        {/* Section 2: Enrollment Details */}
        <div>
          <h4 className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-3">
            2. Enrollment Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Admission Number"
              required
              value={formData.admission_no}
              onChange={(e) => handleChange('admission_no', e.target.value)}
              error={errors.admission_no}
            />
            <Input
              label="Admission Date"
              type="date"
              value={formData.admission_date}
              onChange={(e) => handleChange('admission_date', e.target.value)}
            />
            <Select
              label="Grade Level"
              value={formData.grade_level}
              onChange={(e) => handleChange('grade_level', e.target.value)}
              options={['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Grade 13']}
            />
            <Select
              label="Class Name"
              value={formData.class_name}
              onChange={(e) => handleChange('class_name', e.target.value)}
              options={['Grade 6 - A', 'Grade 6 - B', 'Grade 7 - A', 'Grade 8 - A', 'Grade 9 - A', 'Grade 10 - A', 'Grade 10 - B', 'Grade 11 - A', 'Grade 11 - B', 'Grade 12 - Bio']}
            />
          </div>
        </div>

        {/* Section 3: Contact Details */}
        <div>
          <h4 className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-3">
            3. Contact & Guardian Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Email"
              type="email"
              aria-label="Email"
              value={formData.guardian_email}
              onChange={(e) => handleChange('guardian_email', e.target.value)}
              placeholder="teststudent@example.com"
            />
            <Input
              label="Phone"
              aria-label="Phone"
              value={formData.phone || formData.guardian_phone}
              onChange={(e) => { handleChange('phone', e.target.value); handleChange('guardian_phone', e.target.value); }}
              placeholder="0771234567"
            />
          </div>
          <div className="mt-3">
            <Input
              label="Address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="148 Havelock Road, Colombo 05"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
