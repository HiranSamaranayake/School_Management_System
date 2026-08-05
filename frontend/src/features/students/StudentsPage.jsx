import React, { useState, useEffect } from 'react';
import { Plus, Download, MoreVertical, Eye, Edit2, Trash2, GraduationCap, FileText, BookOpen } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/ui/StatCard';
import { FilterBar } from '../../components/ui/FilterBar';
import { Table } from '../../components/ui/Table';
import { Pagination } from '../../components/ui/Pagination';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Dropdown } from '../../components/ui/Dropdown';
import { studentService } from '../../services/studentService';
import { AddStudentModal } from '../../components/modals/AddStudentModal';
import { ViewStudentDrawer } from '../../components/modals/ViewStudentDrawer';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { PrintableReportCardModal } from '../../components/modals/PrintableReportCardModal';
import { useAuth } from '../../app/context/AuthContext';
import { useToast } from '../../app/context/ToastContext';
import { getStatusBadgeVariant } from '../../utils/formatters';

export const StudentsPage = () => {
  const { addToast } = useToast();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [mediumFilter, setMediumFilter] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudentForView, setSelectedStudentForView] = useState(null);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [reportCardStudent, setReportCardStudent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await studentService.getStudents({
        search,
        grade: gradeFilter,
        status: statusFilter,
        medium: mediumFilter,
      });
      setStudents(res.data);
    } catch (err) {
      addToast('Error', 'Failed to fetch student directory', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search, gradeFilter, statusFilter, mediumFilter]);

  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return;
    setDeleteLoading(true);
    try {
      await studentService.deleteStudent(studentToDelete.student_id);
      addToast('Student Removed', `Successfully deleted student record (${studentToDelete.admission_no})`, 'success');
      setStudentToDelete(null);
      fetchStudents();
    } catch (err) {
      addToast('Error', err.message, 'danger');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleExportCSV = () => {
    const listToExport = visibleStudents && visibleStudents.length > 0 ? visibleStudents : students;
    if (!listToExport || listToExport.length === 0) {
      addToast('Export Warning', 'No student records available to export', 'warning');
      return;
    }

    const headers = ['Student ID', 'Admission No', 'Student Name', 'Grade / Class', 'Medium', 'Gender', 'Guardian Name', 'Guardian Phone', 'Status'];
    
    const rows = listToExport.map(s => {
      const sName = getStudentDisplayName(s);
      const cName = (isTeacher && teacherSubject === 'Mathematics')
        ? (s.grade_level === 'Grade 10' || s.class_name?.includes('10') ? 'Grade 10 - Mathematics' : 'Grade 11 - Mathematics')
        : (s.class_name || s.grade_level || 'Grade 10');

      return [
        `"${s.student_id || ''}"`,
        `"${s.admission_no || ''}"`,
        `"${sName.replace(/"/g, '""')}"`,
        `"${cName.replace(/"/g, '""')}"`,
        `"${s.medium || 'English'}"`,
        `"${s.gender || ''}"`,
        `"${(s.guardian_name || '').replace(/"/g, '""')}"`,
        `"${s.guardian_phone || ''}"`,
        `"${s.status || 'Active'}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const filename = isTeacher ? 'my_class_roster_2026.csv' : 'student_directory_2026.csv';
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Export Completed', `Successfully downloaded ${filename}`, 'success');
  };

  const getStudentDisplayName = (row) => {
    if (!row) return 'Student';

    const knownNames = {
      'GIC-2024-001': 'Hiran Samaranayake',
      'STD-001': 'Hiran Samaranayake',
      'GIC-2024-042': 'Kavindi Fernando',
      'STD-002': 'Kavindi Fernando',
      'GIC-2023-118': 'Sahan Silva',
      'STD-003': 'Sahan Silva',
      'GIC-2024-089': 'Dinithi Jayawardena',
      'STD-004': 'Dinithi Jayawardena',
      'GIC-2022-015': 'Kasun Bandara',
      'STD-005': 'Kasun Bandara',
      'GIC-2025-002': 'Tharushi Perera',
      'STD-006': 'Tharushi Perera',
      'GIC-2025-019': 'Chamod Fernando',
      'STD-007': 'Chamod Fernando',
      'GIC-2024-104': 'Ishara Gunawardena',
      'STD-008': 'Ishara Gunawardena',
      'GIC-2026-724': 'Hashen Perera',
    };

    if (row.admission_no && knownNames[row.admission_no]) {
      return knownNames[row.admission_no];
    }
    if (row.student_id && knownNames[row.student_id]) {
      return knownNames[row.student_id];
    }

    const fName = row.first_name && row.first_name !== 'undefined' && row.first_name !== 'null' ? String(row.first_name).trim() : '';
    const lName = row.last_name && row.last_name !== 'undefined' && row.last_name !== 'null' ? String(row.last_name).trim() : '';
    const fullName = `${fName} ${lName}`.trim();
    if (fullName) return fullName;

    if (row.name && row.name !== 'undefined' && row.name !== 'null') {
      return String(row.name).trim();
    }
    if (row.full_name && row.full_name !== 'undefined' && row.full_name !== 'null') {
      return String(row.full_name).trim();
    }
    if (row.student_name && row.student_name !== 'undefined' && row.student_name !== 'null') {
      return String(row.student_name).trim();
    }

    return 'Student';
  };

  // Table Columns
  const columns = [
    {
      header: 'Student',
      key: 'student',
      cell: (row) => {
        const studentName = getStudentDisplayName(row);
        return (
          <div className="flex items-center gap-3 min-w-[200px]">
            <Avatar src={row.avatar} name={studentName} size="md" />
            <div>
              <div className="font-bold text-slate-900">{studentName}</div>
              <div className="text-[11px] text-slate-400">{row.medium || 'English'} Medium</div>
            </div>
          </div>
        );
      },
    },
    {
      header: 'Admission No',
      key: 'admission_no',
      cell: (row) => <span className="font-semibold text-slate-700">{row.admission_no}</span>,
    },
    {
      header: 'Grade / Class',
      key: 'class_name',
      cell: (row) => {
        const classNameStr = (isTeacher && teacherSubject === 'Mathematics')
          ? (row.grade_level === 'Grade 10' || row.class_name?.includes('10') ? 'Grade 10 - Mathematics' : 'Grade 11 - Mathematics')
          : (row.class_name || row.grade_level || 'Grade 10');
        return <Badge variant="neutral">{classNameStr}</Badge>;
      },
    },
    {
      header: 'Gender',
      key: 'gender',
    },
    {
      header: 'Guardian',
      key: 'guardian_name',
      cell: (row) => (
        <div>
          <div className="font-semibold text-slate-800">{row.guardian_name}</div>
          <div className="text-[10px] text-slate-400">{row.guardian_phone}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      cell: (row) => <Badge variant={getStatusBadgeVariant(row.status)} dot>{row.status}</Badge>,
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right',
      cell: (row) => {
        const actionItems = [
          {
            label: 'View Profile',
            icon: Eye,
            onClick: () => setSelectedStudentForView(row),
          },
          {
            label: 'Print Report Card',
            icon: FileText,
            onClick: () => setReportCardStudent(row),
          },
        ];

        if (!isTeacher) {
          actionItems.push(
            {
              label: 'Edit Student',
              icon: Edit2,
              onClick: () => setSelectedStudentForEdit(row),
            },
            { divider: true },
            {
              label: 'Delete Student',
              icon: Trash2,
              danger: true,
              onClick: () => setStudentToDelete(row),
            }
          );
        }

        return (
          <Dropdown
            align="right"
            trigger={
              <button className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            }
            items={actionItems}
          />
        );
      },
    },
  ];

  const { user } = useAuth();
  const roleStr = String(user?.role_id || user?.role || '').toLowerCase();
  const isTeacher = roleStr.includes('teacher');

  const teacherClasses = user?.assigned_classes || ['Grade 10 - A', 'Grade 11 - A'];
  const teacherSubject = user?.assigned_subjects?.[0] || 'Mathematics';

  const visibleStudents = isTeacher
    ? students.filter(s => {
        return teacherClasses.some(tc => 
          s.class_name === tc || 
          s.grade_level === tc ||
          (tc.includes('10') && (s.grade_level === 'Grade 10' || s.class_id === 'CLS-10A' || s.class_id === 'CLS-10SCI')) ||
          (tc.includes('11') && (s.grade_level === 'Grade 11' || s.class_id === 'CLS-11A' || s.class_id === 'CLS-11SCI')) ||
          (tc.includes('9') && (s.grade_level === 'Grade 9' || s.class_id === 'CLS-9A'))
        );
      })
    : students;

  const paginatedData = visibleStudents.slice((page - 1) * pageSize, page * pageSize);
  const gradeOptions = isTeacher
    ? ['Grade 10', 'Grade 11']
    : ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title={isTeacher ? "My Class Roster" : "Student Directory"}
        subtitle={
          isTeacher
            ? `View student profiles and records for your assigned ${teacherSubject} classes (${teacherClasses.join(', ')})`
            : "Manage student profiles, enrollment details, and academic transcripts"
        }
        actions={
          isTeacher ? (
            <Badge variant="brand" className="py-1.5 px-3 text-xs font-semibold">
              <BookOpen className="w-4 h-4 mr-1.5 inline text-brand-400" /> {teacherSubject} Faculty Roster
            </Badge>
          ) : (
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Student
            </Button>
          )
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={isTeacher ? "Assigned Roster" : "Total Students"}
          value={visibleStudents.length}
          change="+4.2%"
          changeType="positive"
          icon={GraduationCap}
          iconBg="bg-brand-50 text-brand-600"
        />
        <StatCard
          title="Active Enrolled"
          value={visibleStudents.filter(s => s.status === 'Active').length}
          changeType="positive"
          icon={GraduationCap}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title={isTeacher ? "Assigned Classes" : "New Admissions"}
          value={isTeacher ? teacherClasses.length : "84"}
          changeType="positive"
          icon={GraduationCap}
          iconBg="bg-blue-50 text-blue-600"
        />
        <StatCard
          title={isTeacher ? "Subject" : "Graduating Cohort"}
          value={isTeacher ? teacherSubject : "112"}
          icon={GraduationCap}
          iconBg="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search student name, admission no..."
        filters={[
          {
            label: 'Grade Level',
            value: gradeFilter,
            onChange: setGradeFilter,
            options: gradeOptions,
          },
          {
            label: 'Medium',
            value: mediumFilter,
            onChange: setMediumFilter,
            options: ['English', 'Sinhala', 'Tamil'],
          },
          {
            label: 'Status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: ['Active', 'Inactive'],
          },
        ]}
        onResetFilters={() => { setSearch(''); setGradeFilter(''); setStatusFilter(''); setMediumFilter(''); }}
        onExport={handleExportCSV}
      />

      {/* Table */}
      <div>
        <Table
          columns={columns}
          data={paginatedData}
          isLoading={loading}
          emptyText="No students found matching current filter."
          onRowClick={(row) => setSelectedStudentForView(row)}
        />
        <Pagination
          currentPage={page}
          totalItems={students.length}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      {/* Modals & Drawers */}
      <AddStudentModal
        isOpen={isAddModalOpen || !!selectedStudentForEdit}
        onClose={() => { setIsAddModalOpen(false); setSelectedStudentForEdit(null); }}
        initialData={selectedStudentForEdit}
        onSuccess={fetchStudents}
      />

      <ViewStudentDrawer
        isOpen={!!selectedStudentForView}
        onClose={() => setSelectedStudentForView(null)}
        student={selectedStudentForView}
        onEdit={(st) => setSelectedStudentForEdit(st)}
        onPrintReportCard={(st) => setReportCardStudent(st)}
      />

      <PrintableReportCardModal
        isOpen={!!reportCardStudent}
        onClose={() => setReportCardStudent(null)}
        student={reportCardStudent}
      />

      <ConfirmDialog
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteLoading}
        title="Delete Student Profile"
        message={`Are you sure you want to permanently delete ${studentToDelete?.first_name} ${studentToDelete?.last_name} (${studentToDelete?.admission_no})? All attendance and examination records for this student will be archived.`}
      />
    </div>
  );
};
