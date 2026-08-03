import React, { useState, useEffect } from 'react';
import { Award, FileText, CheckCircle2, Edit2, Save, Printer, Plus, Trash2, Eye } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { examinationService } from '../../services/examinationService';
import { useToast } from '../../app/context/ToastContext';
import { PrintableReportCardModal } from '../../components/modals/PrintableReportCardModal';
import { CreateExamModal } from '../../components/modals/CreateExamModal';
import { ExamDetailsModal } from '../../components/modals/ExamDetailsModal';
import { Select } from '../../components/ui/Select';
import { formatDate } from '../../utils/formatters';
import { useAuth } from '../../app/context/AuthContext';
import { validateMarks } from '../../utils/validators';

export const ExaminationsPage = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('exams');

  const roleStr = String(user?.role_id || user?.role || '').toLowerCase();
  const isStudent = roleStr.includes('student');
  const isTeacher = roleStr.includes('teacher');
  const isAdmin = roleStr.includes('admin') || roleStr.includes('school administrator');

  const currentStudentId = user?.student_id || 'STD-001';
  const currentAdmissionNo = user?.admission_no || 'GIC-2024-001';
  const currentStudentName = `${user?.first_name || 'Hiran'} ${user?.last_name || 'Samaranayake'}`;

  const [exams, setExams] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [gradingScale, setGradingScale] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDetailsExam, setSelectedDetailsExam] = useState(null);

  // Marks Entry State
  const [selectedExam, setSelectedExam] = useState('EXM-2026-T1');
  const [selectedClass, setSelectedClass] = useState('CLS-10SCI');
  const [selectedSubject, setSelectedSubject] = useState('SUB-001');

  // Interactive Marks Grid
  const [marksGrid, setMarksGrid] = useState([
    { student_id: 'STD-001', student_name: 'Hiran Samaranayake', admission_no: 'GIC-2024-001', marks: 92, grade: 'A+', remarks: 'Outstanding problem solving', error: null },
    { student_id: 'STD-002', student_name: 'Kavindi Fernando', admission_no: 'GIC-2024-042', marks: 78, grade: 'A', remarks: 'Very good score', error: null },
    { student_id: 'STD-003', student_name: 'Sahan Silva', admission_no: 'GIC-2023-118', marks: 85, grade: 'A+', remarks: 'Excellent performance', error: null },
    { student_id: 'STD-004', student_name: 'Dinithi Jayawardena', admission_no: 'GIC-2024-089', marks: 68, grade: 'B', remarks: 'Good effort', error: null },
  ]);

  const [reportCardStudent, setReportCardStudent] = useState(null);
  const [submittingMarks, setSubmittingMarks] = useState(false);

  const calculateGrade = (marks) => {
    const num = Number(marks);
    if (isNaN(num)) return 'F';
    if (num >= 85) return 'A+';
    if (num >= 75) return 'A';
    if (num >= 65) return 'B';
    if (num >= 55) return 'C';
    if (num >= 35) return 'S';
    return 'F';
  };

  const handleMarksChange = (id, val) => {
    const err = validateMarks(val);
    const numVal = Math.min(100, Math.max(0, Number(val) || 0));
    setMarksGrid(prev => prev.map(m => m.student_id === id ? {
      ...m,
      marks: val,
      grade: calculateGrade(numVal),
      error: err
    } : m));
  };

  const handlePublishResults = async () => {
    const hasErrors = marksGrid.some(m => validateMarks(m.marks) !== null);
    if (hasErrors) {
      addToast('Validation Error', 'Please ensure all marks are numbers between 0 and 100.', 'danger');
      return;
    }

    setSubmittingMarks(true);
    try {
      await examinationService.saveExamResults(marksGrid);
      addToast('Results Published', 'Published official examination marks for Grade 10 - Science', 'success');
    } catch (e) {
      addToast('Error', e.message, 'danger');
    } finally {
      setSubmittingMarks(false);
    }
  };

  const handleDeleteExamDirect = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await examinationService.deleteExam(id);
      setExams(prev => prev.filter(e => e.exam_id !== id));
      addToast('Exam Deleted', `Successfully deleted ${name}`, 'success');
    } catch (err) {
      addToast('Error', err.message || 'Failed to delete exam', 'danger');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [exRes, resRes, scaleRes] = await Promise.all([
        examinationService.getExams(),
        examinationService.getExamResults(),
        examinationService.getGradingScale(),
      ]);
      setExams(exRes);
      setExamResults(resRes);
      setGradingScale(scaleRes);
    } catch (e) {
      addToast('Error', 'Failed to fetch examination records', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tabs = isStudent
    ? [
        { id: 'exams', label: 'Examinations Schedule', icon: Award },
        { id: 'results', label: 'My Report Cards & Results', icon: FileText },
        { id: 'grading', label: 'Grading Scale', icon: CheckCircle2 },
      ]
    : [
        { id: 'exams', label: 'Examinations Schedule', icon: Award },
        { id: 'marks', label: 'Marks Entry Grid', icon: Edit2 },
        { id: 'results', label: 'Results & Transcripts', icon: FileText },
        { id: 'grading', label: 'Grading Scale', icon: CheckCircle2 },
      ];

  const studentOwnResults = examResults.filter(r =>
    r.student_id === currentStudentId ||
    r.admission_no === currentAdmissionNo ||
    r.student_name === currentStudentName ||
    r.student_name === 'Hiran Samaranayake' ||
    r.admission_no === 'GIC-2024-001' ||
    r.student_id === 'STD-001'
  ).map(r => ({ ...r, student_name: currentStudentName, admission_no: currentAdmissionNo }));

  const studentDisplayData = studentOwnResults.length > 0 ? studentOwnResults : [
    { result_id: 'RES-001', student_name: currentStudentName, admission_no: currentAdmissionNo, subject_name: 'Mathematics', marks: 92, grade: 'A+' },
    { result_id: 'RES-002', student_name: currentStudentName, admission_no: currentAdmissionNo, subject_name: 'English Language & Literature', marks: 88, grade: 'A+' },
    { result_id: 'RES-003', student_name: currentStudentName, admission_no: currentAdmissionNo, subject_name: 'General Science', marks: 85, grade: 'A+' },
    { result_id: 'RES-004', student_name: currentStudentName, admission_no: currentAdmissionNo, subject_name: 'Information Technology', marks: 95, grade: 'A+' },
    { result_id: 'RES-005', student_name: currentStudentName, admission_no: currentAdmissionNo, subject_name: 'History & Social Studies', marks: 79, grade: 'A' },
    { result_id: 'RES-006', student_name: currentStudentName, admission_no: currentAdmissionNo, subject_name: 'Sinhala Language', marks: 82, grade: 'A' },
  ];

  const finalExamResults = isStudent ? studentDisplayData : examResults;

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title={isStudent ? "My Examinations & Results" : "Examinations & Results"}
        subtitle={
          isStudent
            ? "View your scheduled term examinations, published subject results, and official progress report card"
            : "Manage term exams, schedule assessments, record marks with validation, and issue report cards"
        }
        action={
          !isStudent ? (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Examination
            </Button>
          ) : (
            <Badge variant="brand" className="py-1 px-3 text-xs">
              Student Portal Access
            </Badge>
          )
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Examinations List */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              {isStudent ? "My Scheduled Class Examinations" : "Scheduled Institutional Examinations"}
            </h3>
            {!isStudent && (
              <Button
                variant="outline"
                size="xs"
                icon={Plus}
                onClick={() => setIsCreateModalOpen(true)}
              >
                + Create Examination
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exams.map((ex) => (
              <div key={ex.exam_id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-subtle space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{ex.exam_name}</h3>
                  <Badge variant={ex.status === 'Published' ? 'success' : 'info'}>{ex.status}</Badge>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>Term:</strong> {ex.term}</p>
                  <p><strong>Schedule:</strong> {formatDate(ex.start_date)} – {formatDate(ex.end_date)}</p>
                  <p><strong>Eligible Classes:</strong> {(ex.classes || []).join(', ')}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">ID: {ex.exam_id}</span>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="xs"
                      icon={Eye}
                      onClick={() => setSelectedDetailsExam(ex)}
                    >
                      View Details
                    </Button>
                    {!isStudent && (
                      <Button
                        variant="danger"
                        size="xs"
                        icon={Trash2}
                        onClick={() => handleDeleteExamDirect(ex.exam_id, ex.exam_name)}
                        title="Delete Examination"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Marks Entry Grid */}
      {activeTab === 'marks' && !isStudent && (
        <div className="space-y-6">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select label="Select Examination" value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} options={['First Term Examination 2026', 'Mid-Term Evaluation 2026']} />
            <Select label="Select Class" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} options={['Grade 10 - Science', 'Grade 11 - Science', 'Grade 9 - A']} />
            <Select label="Select Subject" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} options={['MAT001 - Mathematics', 'ENG001 - English', 'SCI001 - Science', 'ICT001 - ICT']} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Admission No</th>
                  <th className="p-4">Marks (0 - 100)</th>
                  <th className="p-4">Auto Grade</th>
                  <th className="p-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {marksGrid.map((row) => (
                  <tr key={row.student_id}>
                    <td className="p-4 font-bold text-slate-900">{row.student_name}</td>
                    <td className="p-4 text-slate-600 font-medium">{row.admission_no}</td>
                    <td className="p-4 w-40">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={row.marks}
                        onChange={(e) => handleMarksChange(row.student_id, e.target.value)}
                        className={`w-full text-xs font-bold border rounded-lg px-3 py-1.5 outline-none transition-colors ${
                          row.error ? 'border-red-500 bg-red-50 text-red-900' : 'border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand-500'
                        }`}
                      />
                      {row.error && <p className="text-[10px] text-red-600 font-semibold mt-0.5">{row.error}</p>}
                    </td>
                    <td className="p-4">
                      <Badge variant={['A+', 'A'].includes(row.grade) ? 'success' : 'info'}>{row.grade}</Badge>
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        value={row.remarks}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMarksGrid(prev => prev.map(m => m.student_id === row.student_id ? { ...m, remarks: val } : m));
                        }}
                        className="w-full text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-800 focus:ring-1 focus:ring-brand-500 outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" size="md">Save Draft</Button>
            <Button variant="primary" size="md" icon={Save} isLoading={submittingMarks} onClick={handlePublishResults}>
              Publish Results
            </Button>
          </div>
        </div>
      )}

      {/* Tab 3: Results Transcripts */}
      {activeTab === 'results' && (
        <Card
          title={isStudent ? "My Official Academic Results & Report Card" : "Student Official Results Catalog"}
          subtitle={isStudent ? "View your published subject marks and generate downloadable term report card" : "Generate printable term report cards"}
        >
          <Table
            columns={[
              ...(!isStudent ? [
                { header: 'Student', key: 'student_name', cell: (r) => <span className="font-bold text-slate-900">{r.student_name}</span> },
                { header: 'Admission No', key: 'admission_no' },
              ] : []),
              { header: 'Subject', key: 'subject_name' },
              { header: 'Marks', key: 'marks', cell: (r) => <span className="font-bold text-slate-900">{r.marks}</span> },
              { header: 'Grade', key: 'grade', cell: (r) => <Badge variant="success">{r.grade}</Badge> },
              {
                header: 'Action',
                key: 'action',
                align: 'right',
                cell: (r) => (
                  <Button
                    variant="outline"
                    size="xs"
                    icon={FileText}
                    onClick={() => setReportCardStudent({
                      student_name: isStudent ? currentStudentName : r.student_name,
                      first_name: (isStudent ? currentStudentName : r.student_name)?.split(' ')[0] || '',
                      last_name: (isStudent ? currentStudentName : r.student_name)?.split(' ').slice(1).join(' ') || '',
                      admission_no: isStudent ? currentAdmissionNo : r.admission_no,
                      class_name: 'Grade 10 - Mathematics',
                      medium: 'English'
                    })}
                  >
                    View Report Card
                  </Button>
                )
              }
            ]}
            data={finalExamResults}
          />
        </Card>
      )}

      {/* Tab 4: Grading Scale */}
      {activeTab === 'grading' && (
        <Card title="Institutional Grading Scale Thresholds" subtitle="GIC001 Official Grade Definitions">
          <Table
            columns={[
              { header: 'Grade', key: 'grade', cell: (r) => <Badge variant="brand" size="lg">{r.grade}</Badge> },
              { header: 'Marks Range', key: 'range', cell: (r) => `${r.min_mark} – ${r.max_mark}%` },
              { header: 'GPA Equivalent', key: 'gpa', cell: (r) => r.gpa },
              { header: 'Description', key: 'description' },
            ]}
            data={gradingScale}
          />
        </Card>
      )}

      {/* Modals */}
      <CreateExamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchData}
      />

      <ExamDetailsModal
        isOpen={!!selectedDetailsExam}
        onClose={() => setSelectedDetailsExam(null)}
        exam={selectedDetailsExam}
        onDeleteSuccess={(deletedId) => setExams(prev => prev.filter(e => e.exam_id !== deletedId))}
      />

      <PrintableReportCardModal
        isOpen={!!reportCardStudent}
        onClose={() => setReportCardStudent(null)}
        student={reportCardStudent}
      />
    </div>
  );
};
