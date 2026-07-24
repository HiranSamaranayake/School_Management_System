import React, { useState } from 'react';
import { useQuickCreate } from '../../app/context/QuickCreateContext';
import { AddStudentModal } from './AddStudentModal';
import { AddTeacherModal } from './AddTeacherModal';
import { CreateExamModal } from './CreateExamModal';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { academicService } from '../../services/academicService';
import { useToast } from '../../app/context/ToastContext';

export const QuickCreateModal = () => {
  const { isOpen, activeType, closeQuickCreate } = useQuickCreate();
  const { addToast } = useToast();

  const [className, setClassName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Grade 10');
  const [medium, setMedium] = useState('English');
  const [capacity, setCapacity] = useState(40);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  if (activeType === 'student') {
    return <AddStudentModal isOpen={isOpen} onClose={closeQuickCreate} onSuccess={() => closeQuickCreate()} />;
  }

  if (activeType === 'teacher') {
    return <AddTeacherModal isOpen={isOpen} onClose={closeQuickCreate} onSuccess={() => closeQuickCreate()} />;
  }

  if (activeType === 'exam') {
    return <CreateExamModal isOpen={isOpen} onClose={closeQuickCreate} onSuccess={() => closeQuickCreate()} />;
  }

  const handleCreateClass = async (e) => {
    e.preventDefault();
    if (!className.trim()) return;
    setSubmitting(true);
    try {
      await academicService.saveClass({
        class_name: className,
        grade_level: gradeLevel,
        medium,
        capacity: Number(capacity),
        section: 'A'
      });
      addToast('Class Created', `Successfully created ${className}`, 'success');
      closeQuickCreate();
    } catch (err) {
      addToast('Error', err.message, 'danger');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeQuickCreate}
      title={`Quick Create: ${activeType ? activeType.toUpperCase() : 'ACTION'}`}
      subtitle="Rapidly add new entity to Greenfield International College workspace"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={closeQuickCreate} isDisabled={submitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleCreateClass} isLoading={submitting}>
            Create Entity
          </Button>
        </>
      }
    >
      {activeType === 'class' && (
        <form onSubmit={handleCreateClass} className="space-y-3 text-left">
          <Input label="Class Name" required value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g. Grade 10 - Science B" />
          <Select label="Grade Level" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} options={['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Grade 13']} />
          <Select label="Medium" value={medium} onChange={(e) => setMedium(e.target.value)} options={['English', 'Sinhala', 'Tamil']} />
          <Input label="Student Capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </form>
      )}

      {activeType !== 'class' && (
        <div className="p-4 text-center text-xs text-slate-500">
          Form initialized for {activeType}. Fill required parameters to register.
        </div>
      )}
    </Modal>
  );
};
