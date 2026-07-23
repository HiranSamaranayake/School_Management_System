import React, { useState, useEffect } from 'react';
import { Plus, BookOpen, Layers, Calendar, UserCheck, CheckCircle2, Archive, Edit2, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { academicService } from '../../services/academicService';
import { useToast } from '../../app/context/ToastContext';
import { formatDate } from '../../utils/formatters';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';

export const AcademicsPage = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('years');

  const [academicYears, setAcademicYears] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const [classForm, setClassForm] = useState({ class_name: '', grade_level: 'Grade 10', section: 'A', medium: 'English', capacity: 40 });
  const [subjectForm, setSubjectForm] = useState({ subject_code: '', subject_name: '', category: 'Core' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [yearsRes, classesRes, subjectsRes, allocRes] = await Promise.all([
        academicService.getAcademicYears(),
        academicService.getClasses(),
        academicService.getSubjects(),
        academicService.getTeacherAllocations(),
      ]);
      setAcademicYears(yearsRes);
      setClasses(classesRes);
      setSubjects(subjectsRes);
      setAllocations(allocRes);
    } catch (e) {
      addToast('Error', 'Failed to fetch academic settings', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveClass = async (e) => {
    e.preventDefault();
    try {
      await academicService.saveClass(classForm);
      addToast('Class Created', `Created class ${classForm.class_name}`, 'success');
      setIsClassModalOpen(false);
      fetchData();
    } catch (err) {
      addToast('Error', err.message, 'danger');
    }
  };

  const handleSaveSubject = async (e) => {
    e.preventDefault();
    try {
      await academicService.saveSubject(subjectForm);
      addToast('Subject Created', `Added ${subjectForm.subject_code} - ${subjectForm.subject_name}`, 'success');
      setIsSubjectModalOpen(false);
      fetchData();
    } catch (err) {
      addToast('Error', err.message, 'danger');
    }
  };

  const tabs = [
    { id: 'years', label: 'Academic Years', icon: Calendar },
    { id: 'classes', label: 'Classes & Sections', icon: Layers },
    { id: 'subjects', label: 'Subjects Catalog', icon: BookOpen },
    { id: 'allocations', label: 'Teacher Allocations', icon: UserCheck },
  ];

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Academic Management"
        subtitle="Manage academic years, classes, subject curriculum, and teacher allocation matrix"
        actions={
          activeTab === 'classes' ? (
            <Button variant="primary" size="md" icon={Plus} onClick={() => setIsClassModalOpen(true)}>Add Class</Button>
          ) : activeTab === 'subjects' ? (
            <Button variant="primary" size="md" icon={Plus} onClick={() => setIsSubjectModalOpen(true)}>Add Subject</Button>
          ) : null
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Academic Years */}
      {activeTab === 'years' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {academicYears.map((year) => (
              <div
                key={year.academic_year_id}
                className={`p-5 rounded-2xl border bg-white shadow-subtle flex flex-col justify-between space-y-4 ${
                  year.is_current ? 'border-brand-500 ring-2 ring-brand-100' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{year.year_name}</h3>
                  {year.is_current ? (
                    <Badge variant="brand" dot>Current Active</Badge>
                  ) : (
                    <Badge variant="neutral">{year.status}</Badge>
                  )}
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>Start Date:</strong> {formatDate(year.start_date)}</p>
                  <p><strong>End Date:</strong> {formatDate(year.end_date)}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">ID: {year.academic_year_id}</span>
                  {!year.is_current && (
                    <Button variant="outline" size="xs">Activate Year</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Classes */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => (
            <div key={cls.class_id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900">{cls.class_name}</h4>
                <Badge variant="neutral">{cls.medium} Medium</Badge>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <p><strong>Grade Level:</strong> {cls.grade_level}</p>
                <p><strong>Capacity:</strong> {cls.enrolled_count || 38} / {cls.capacity} Enrolled</p>
                <p><strong>Class Teacher:</strong> Mrs. Aruni Jayasinghe</p>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mt-2">
                <div
                  className="bg-brand-600 h-2 rounded-full"
                  style={{ width: `${((cls.enrolled_count || 38) / cls.capacity) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Subjects */}
      {activeTab === 'subjects' && (
        <Table
          columns={[
            { header: 'Subject Code', key: 'subject_code', cell: (r) => <span className="font-bold text-slate-900">{r.subject_code}</span> },
            { header: 'Subject Name', key: 'subject_name', cell: (r) => <span className="font-semibold text-slate-800">{r.subject_name}</span> },
            { header: 'Category', key: 'category', cell: (r) => <Badge variant="info">{r.category}</Badge> },
            { header: 'Assigned Faculty', key: 'assigned_teachers_count', cell: (r) => `${r.assigned_teachers_count || 3} Teachers` },
            { header: 'Status', key: 'status', cell: (r) => <Badge variant="success" dot>{r.status}</Badge> },
          ]}
          data={subjects}
          isLoading={loading}
        />
      )}

      {/* Tab 4: Allocations */}
      {activeTab === 'allocations' && (
        <Table
          columns={[
            { header: 'Teacher', key: 'teacher_name', cell: (r) => <span className="font-bold text-slate-900">{r.teacher_name}</span> },
            { header: 'Class', key: 'class_name', cell: (r) => <Badge variant="neutral">{r.class_name}</Badge> },
            { header: 'Subject', key: 'subject_name', cell: (r) => <span className="font-semibold text-slate-800">{r.subject_code} - {r.subject_name}</span> },
            { header: 'Academic Year', key: 'academic_year' },
          ]}
          data={allocations}
          isLoading={loading}
        />
      )}

      {/* Add Class Modal */}
      <Modal isOpen={isClassModalOpen} onClose={() => setIsClassModalOpen(false)} title="Add New Class Section">
        <form onSubmit={handleSaveClass} className="space-y-3">
          <Input label="Class Name" required value={classForm.class_name} onChange={(e) => setClassForm({ ...classForm, class_name: e.target.value })} placeholder="e.g. Grade 10 - Science A" />
          <Select label="Grade Level" value={classForm.grade_level} onChange={(e) => setClassForm({ ...classForm, grade_level: e.target.value })} options={['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']} />
          <Select label="Medium" value={classForm.medium} onChange={(e) => setClassForm({ ...classForm, medium: e.target.value })} options={['English', 'Sinhala', 'Tamil']} />
          <Input label="Capacity" type="number" value={classForm.capacity} onChange={(e) => setClassForm({ ...classForm, capacity: e.target.value })} />
          <Button variant="primary" size="md" type="submit" className="w-full">Create Class</Button>
        </form>
      </Modal>

      {/* Add Subject Modal */}
      <Modal isOpen={isSubjectModalOpen} onClose={() => setIsSubjectModalOpen(false)} title="Add New Subject">
        <form onSubmit={handleSaveSubject} className="space-y-3">
          <Input label="Subject Code" required value={subjectForm.subject_code} onChange={(e) => setSubjectForm({ ...subjectForm, subject_code: e.target.value })} placeholder="e.g. MAT001" />
          <Input label="Subject Name" required value={subjectForm.subject_name} onChange={(e) => setSubjectForm({ ...subjectForm, subject_name: e.target.value })} placeholder="e.g. Mathematics" />
          <Select label="Category" value={subjectForm.category} onChange={(e) => setSubjectForm({ ...subjectForm, category: e.target.value })} options={['Core', 'Languages', 'Science', 'Technology', 'Humanities']} />
          <Button variant="primary" size="md" type="submit" className="w-full">Save Subject</Button>
        </form>
      </Modal>
    </div>
  );
};
