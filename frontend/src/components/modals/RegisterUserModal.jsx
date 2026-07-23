import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { authService } from '../../services/authService';
import { useToast } from '../../app/context/ToastContext';
import { validateName, validateEmail, validatePassword } from '../../utils/validators';

export const RegisterUserModal = ({ isOpen, onClose, onSuccess }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    school_code: 'GIC001',
    role: 'Teacher',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};
    const firstNameErr = validateName(formData.first_name, "First name");
    if (firstNameErr) newErrors.first_name = firstNameErr;

    const lastNameErr = validateName(formData.last_name, "Last name");
    if (lastNameErr) newErrors.last_name = lastNameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    if (!formData.school_code.trim()) newErrors.school_code = "School workspace code is required (e.g. GIC001).";

    const passErr = validatePassword(formData.password);
    if (passErr) newErrors.password = passErr;

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await authService.register(formData);
      addToast('User Registered Successfully!', `Registered user account for ${formData.first_name} ${formData.last_name}`, 'success');
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      addToast('Registration Error', err.message || 'Failed to register new user', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register New User Account"
      subtitle="Create a new administrative, teacher, or student access account for EduSphere workspace"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} isDisabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} isLoading={loading}>
            Register Account
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3 text-left" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="First Name"
            required
            value={formData.first_name}
            onChange={(e) => handleChange('first_name', e.target.value)}
            error={errors.first_name}
            placeholder="e.g. Kasun"
          />
          <Input
            label="Last Name"
            required
            value={formData.last_name}
            onChange={(e) => handleChange('last_name', e.target.value)}
            error={errors.last_name}
            placeholder="e.g. Bandara"
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          required
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          placeholder="kasun.b@greenfield.edu.lk"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="School Workspace Code"
            required
            value={formData.school_code}
            onChange={(e) => handleChange('school_code', e.target.value)}
            error={errors.school_code}
          />
          <Select
            label="Account Role"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            options={['School Admin', 'Teacher', 'Student']}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
            placeholder="••••••••"
          />
          <Input
            label="Confirm Password"
            type="password"
            required
            value={formData.confirm_password}
            onChange={(e) => handleChange('confirm_password', e.target.value)}
            error={errors.confirm_password}
            placeholder="••••••••"
          />
        </div>
      </form>
    </Modal>
  );
};
