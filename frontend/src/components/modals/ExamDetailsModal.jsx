import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Trash2, Calendar, Award, Layers } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { examinationService } from '../../services/examinationService';
import { useToast } from '../../app/context/ToastContext';
import { useAuth } from '../../app/context/AuthContext';

export const ExamDetailsModal = ({ isOpen, onClose, exam, onDeleteSuccess }) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [deleting, setDeleting] = useState(false);

  const roleStr = String(user?.role_id || user?.role || '').toLowerCase();
  const isStudent = roleStr.includes('student');

  if (!isOpen || !exam) return null;

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${exam.exam_name}"? This action cannot be undone.`)) return;

    setDeleting(true);
    try {
      await examinationService.deleteExam(exam.exam_id);
      addToast('Exam Deleted', `Successfully deleted ${exam.exam_name}`, 'success');
      onDeleteSuccess && onDeleteSuccess(exam.exam_id);
      onClose();
    } catch (err) {
      addToast('Error', err.message || 'Failed to delete examination', 'danger');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Examination Details: ${exam.exam_name}`}
      subtitle={`Exam Identifier: ${exam.exam_id}`}
      footer={
        <div className="flex items-center justify-between w-full">
          {!isStudent ? (
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={handleDelete}
              isLoading={deleting}
            >
              Delete Examination
            </Button>
          ) : (
            <div />
          )}
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-4 text-left">
        <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <div>
            <span className="text-xs text-slate-500 block">Status</span>
            <Badge variant={exam.status === 'Published' ? 'success' : 'info'} size="md">
              {exam.status || 'Upcoming'}
            </Badge>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Academic Term</span>
            <span className="text-xs font-bold text-slate-800">{exam.term}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-700 block">Start Date</span>
              <span className="text-slate-900 font-bold">{formatDate(exam.start_date)}</span>
            </div>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-700 block">End Date</span>
              <span className="text-slate-900 font-bold">{formatDate(exam.end_date)}</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-600" /> Eligible Classes
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(exam.classes || ['Grade 10 - Science', 'Grade 11 - Science']).map((cls, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-purple-50 border border-purple-200 text-purple-700 font-semibold rounded-lg text-xs">
                {cls}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
