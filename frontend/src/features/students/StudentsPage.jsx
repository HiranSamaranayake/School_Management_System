import React, { useState, useEffect } from 'react';
import { Plus, Download, MoreVertical, Eye, Edit2, Trash2, GraduationCap, FileText } from 'lucide-react';
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
    addToast('Export Started', 'Exporting student directory as CSV...', 'info');
    setTimeout(() => {
      addToast('Export Completed', 'Downloaded student_directory_2026.csv', 'success');
    }, 1000);
  };

  // Table Columns
  const columns = [
    {
      header: 'Student',
      key: 'student',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} name={`${row.first_name} ${row.last_name}`} size="md" />
          <div>
            <div className="font-bold text-slate-900">{row.first_name} {row.last_name}</div>
            <div className="text-[11px] text-slate-400">{row.medium} Medium</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Admission No',
      key: 'admission_no',
      cell: (row) => <span className="font-semibold text-slate-700">{row.admission_no}</span>,
    },
    {
      header: 'Grade / Class',
      key: 'class_name',
      cell: (row) => <Badge variant="neutral">{row.class_name}</Badge>,
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
      cell: (row) => (
        <Dropdown
          align="right"
          trigger={
            <button className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          }
          items={[
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
            },
          ]}
        />
      ),
    },
  ];

  const paginatedData = students.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Student Directory"
        subtitle="Manage student profiles, enrollment details, and academic transcripts"
        actions={
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Student
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={students.length} change="+4.2%" changeType="positive" icon={GraduationCap} iconBg="bg-brand-50 text-brand-600" />
        <StatCard title="Active Enrolled" value={students.filter(s => s.status === 'Active').length} changeType="positive" icon={GraduationCap} iconBg="bg-emerald-50 text-emerald-600" />
        <StatCard title="New Admissions" value="84" change="+12" changeType="positive" icon={GraduationCap} iconBg="bg-blue-50 text-blue-600" />
        <StatCard title="Graduating Cohort" value="112" icon={GraduationCap} iconBg="bg-purple-50 text-purple-600" />
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
            options: ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Grade 13'],
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
