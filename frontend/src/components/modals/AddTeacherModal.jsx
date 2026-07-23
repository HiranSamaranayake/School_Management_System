import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { teacherService } from '../../services/teacherService';
import { useToast } from '../../app/context/ToastContext';
import { validateName, validateEmail, validatePhone, validateNIC } from '../../utils/validators';

export const AddTeacherModal = ({ isOpen, onClose, onSuccess, initialData = null }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    teacher_reg_no: initialData?.teacher_reg_no || `TR-2026-${Math.floor(100 + Math.random() * 900)}`,
    nic_no: initialData?.nic_no || '',
    gender: initialData?.gender || 'Female',
    date_of_birth: initialData?.date_of_birth || '1988-06-12',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    qualification: initialData?.qualification || 'B.Sc. Education (Hons)',
    joining_date: initialData?.joining_date || '2026-01-10',
    status: initialData?.status || 'Active',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};
    const fnErr = validateName(formData.first_name, "First name");
    if (fnErr) newErrors.first_name = fnErr;

    const lnErr = validateName(formData.last_name, "Last name");
    if (lnErr) newErrors.last_name = lnErr;

    if (!formData.teacher_reg_no.trim()) newErrors.teacher_reg_no = "Teacher registration number is required.";

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const nicErr = validateNIC(formData.nic_no);
    if (nicErr) newErrors.nic_no = nicErr;

    if (!formData.qualification.trim()) newErrors.qualification = "Qualifications are required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (initialData?.teacher_id) {
        await teacherService.updateTeacher(initialData.teacher_id, formData);
        addToast('Teacher Updated', `Updated record for ${formData.first_name} ${formData.last_name}`, 'success');
      } else {
        await teacherService.createTeacher(formData);
        addToast('Teacher Registered', `Registered new teacher ${formData.first_name} ${formData.last_name}`, 'success');
      }
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      addToast('Error', err.message || 'Failed to save teacher record', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Teacher Profile" : "Register New Teacher"}
      subtitle="Enter academic qualifications, contact detail, and registration number"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} isDisabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} isLoading={loading}>
            {initialData ? "Save Changes" : "Register Teacher"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="First Name"
            required
            value={formData.first_name}
            onChange={(e) => handleChange('first_name', e.target.value)}
            error={errors.first_name}
            placeholder="Aruni"
          />
          <Input
            label="Last Name"
            required
            value={formData.last_name}
            onChange={(e) => handleChange('last_name', e.target.value)}
            error={errors.last_name}
            placeholder="Jayasinghe"
          />
          <Input
            label="Teacher Reg. No"
            required
            value={formData.teacher_reg_no}
            onChange={(e) => handleChange('teacher_reg_no', e.target.value)}
            error={errors.teacher_reg_no}
          />
          <Input
            label="NIC Number"
            value={formData.nic_no}
            onChange={(e) => handleChange('nic_no', e.target.value)}
            error={errors.nic_no}
            placeholder="847291038V"
          />
          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            placeholder="aruni.j@greenfield.edu.lk"
          />
          <Input
            label="Phone Number"
            required
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
            placeholder="+94 77 123 4567"
          />
          <Select
            label="Gender"
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            options={['Female', 'Male']}
          />
          <Input
            label="Joining Date"
            type="date"
            value={formData.joining_date}
            onChange={(e) => handleChange('joining_date', e.target.value)}
          />
          <div className="sm:col-span-2">
            <Input
              label="Qualifications"
              required
              value={formData.qualification}
              onChange={(e) => handleChange('qualification', e.target.value)}
              error={errors.qualification}
              placeholder="e.g. M.Sc. Education, B.Sc. Mathematics"
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label="Residential Address"
              required
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              error={errors.address}
              placeholder="24/B, Flower Road, Colombo 07"
            />
          </div>
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            options={['Active', 'On Leave', 'Inactive']}
          />
        </div>
      </form>
    </Modal>
  );
};
