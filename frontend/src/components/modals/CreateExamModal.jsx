import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { examinationService } from '../../services/examinationService';
import { useToast } from '../../app/context/ToastContext';

export const CreateExamModal = ({ isOpen, onClose, onSuccess }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    exam_name: '',
    term: 'Term 1',
    start_date: new Date().toISOString().substring(0, 10),
    end_date: new Date(Date.now() + 14 * 86400000).toISOString().substring(0, 10),
    classes: ['Grade 10 - Science', 'Grade 11 - Science'],
    status: 'Upcoming'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.exam_name.trim()) newErrors.exam_name = "Examination title is required.";
    if (!formData.start_date) newErrors.start_date = "Start date is required.";
    if (!formData.end_date) newErrors.end_date = "End date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await examinationService.createExam(formData);
      addToast('Exam Scheduled', `Successfully created ${formData.exam_name}`, 'success');
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      addToast('Error', err.message || 'Failed to create examination', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule / Create New Examination"
      subtitle="Define examination term, schedule dates, and target class levels"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} isDisabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} isLoading={loading}>
            Create Examination
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
        <Input
          label="Examination Title"
          required
          value={formData.exam_name}
          onChange={(e) => handleChange('exam_name', e.target.value)}
          error={errors.exam_name}
          placeholder="e.g. Second Term Assessment 2026"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Academic Term"
            value={formData.term}
            onChange={(e) => handleChange('term', e.target.value)}
            options={['Term 1', 'Term 2', 'Term 3', 'Mid-Term Evaluation', 'Final Exam']}
          />

          <Select
            label="Examination Status"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            options={['Upcoming', 'Scheduled', 'Active', 'Published']}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Start Date"
            type="date"
            required
            value={formData.start_date}
            onChange={(e) => handleChange('start_date', e.target.value)}
            error={errors.start_date}
          />

          <Input
            label="End Date"
            type="date"
            required
            value={formData.end_date}
            onChange={(e) => handleChange('end_date', e.target.value)}
            error={errors.end_date}
          />
        </div>
      </form>
    </Modal>
  );
};
