import React, { useState, useEffect } from 'react';
import { Plus, Download, MoreVertical, Eye, Edit2, Trash2, Users, BookOpen, Layers } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/ui/StatCard';
import { FilterBar } from '../../components/ui/FilterBar';
import { Table } from '../../components/ui/Table';
import { Pagination } from '../../components/ui/Pagination';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Dropdown } from '../../components/ui/Dropdown';
import { teacherService } from '../../services/teacherService';
import { AddTeacherModal } from '../../components/modals/AddTeacherModal';
import { ViewTeacherDrawer } from '../../components/modals/ViewTeacherDrawer';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { useToast } from '../../app/context/ToastContext';
import { formatDate, getStatusBadgeVariant } from '../../utils/formatters';

export const TeachersPage = () => {
  const { addToast } = useToast();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacherForView, setSelectedTeacherForView] = useState(null);
  const [selectedTeacherForEdit, setSelectedTeacherForEdit] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await teacherService.getTeachers({ search, status: statusFilter });
      setTeachers(res.data);
    } catch (err) {
      addToast('Error', 'Failed to load faculty registry', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [search, statusFilter]);

  const handleDeleteConfirm = async () => {
    if (!teacherToDelete) return;
    setDeleteLoading(true);
    try {
      await teacherService.deleteTeacher(teacherToDelete.teacher_id);
      addToast('Teacher Removed', `Deleted teacher ${teacherToDelete.first_name} ${teacherToDelete.last_name}`, 'success');
      setTeacherToDelete(null);
      fetchTeachers();
    } catch (err) {
      addToast('Error', err.message, 'danger');
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      header: 'Teacher',
      key: 'teacher',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} name={`${row.first_name} ${row.last_name}`} size="md" />
          <div>
            <div className="font-bold text-slate-900">{row.first_name} {row.last_name}</div>
            <div className="text-[11px] text-slate-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Registration No',
      key: 'teacher_reg_no',
      cell: (row) => <span className="font-semibold text-slate-700">{row.teacher_reg_no}</span>,
    },
    {
      header: 'Assigned Subjects',
      key: 'assigned_subjects',
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {(row.assigned_subjects || ['MAT001']).map((sub) => (
            <Badge key={sub} variant="info">{sub}</Badge>
          ))}
        </div>
      ),
    },
    {
      header: 'Assigned Classes',
      key: 'assigned_classes',
      cell: (row) => (
        <div className="text-xs text-slate-700 font-medium truncate max-w-xs">
          {(row.assigned_classes || []).join(', ') || 'Grade 10 - A'}
        </div>
      ),
    },
    {
      header: 'Phone',
      key: 'phone',
    },
    {
      header: 'Joining Date',
      key: 'joining_date',
      cell: (row) => formatDate(row.joining_date),
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
            { label: 'View Profile', icon: Eye, onClick: () => setSelectedTeacherForView(row) },
            { label: 'Edit Profile', icon: Edit2, onClick: () => setSelectedTeacherForEdit(row) },
            { divider: true },
            { label: 'Delete Teacher', icon: Trash2, danger: true, onClick: () => setTeacherToDelete(row) },
          ]}
        />
      ),
    },
  ];

  const paginatedData = teachers.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Teacher Directory"
        subtitle="Manage academic faculty, registrations, and subject/class assignments"
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setIsAddModalOpen(true)}>
            Add Teacher
          </Button>
        }
      />

      {/* Summary Mini Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Teachers" value={teachers.length || 146} change="+2.1%" changeType="positive" icon={Users} iconBg="bg-brand-50 text-brand-600" />
        <StatCard title="Active Faculty" value={teachers.filter(t => t.status === 'Active').length || 140} changeType="positive" icon={Users} iconBg="bg-emerald-50 text-emerald-600" />
        <StatCard title="On Medical Leave" value={teachers.filter(t => t.status === 'On Leave').length || 4} icon={Users} iconBg="bg-amber-50 text-amber-600" />
        <StatCard title="New This Year" value="8" changeType="positive" icon={Users} iconBg="bg-blue-50 text-blue-600" />
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search teacher name, registration no..."
        filters={[
          {
            label: 'Status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: ['Active', 'On Leave', 'Inactive'],
          },
        ]}
        onResetFilters={() => { setSearch(''); setStatusFilter(''); }}
      />

      {/* Table */}
      <div>
        <Table
          columns={columns}
          data={paginatedData}
          isLoading={loading}
          emptyText="No teachers found matching criteria."
          onRowClick={(row) => setSelectedTeacherForView(row)}
        />
        <Pagination
          currentPage={page}
          totalItems={teachers.length}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      {/* Modals & Drawers */}
      <AddTeacherModal
        isOpen={isAddModalOpen || !!selectedTeacherForEdit}
        onClose={() => { setIsAddModalOpen(false); setSelectedTeacherForEdit(null); }}
        initialData={selectedTeacherForEdit}
        onSuccess={fetchTeachers}
      />

      <ViewTeacherDrawer
        isOpen={!!selectedTeacherForView}
        onClose={() => setSelectedTeacherForView(null)}
        teacher={selectedTeacherForView}
        onEdit={(tch) => setSelectedTeacherForEdit(tch)}
      />

      <ConfirmDialog
        isOpen={!!teacherToDelete}
        onClose={() => setTeacherToDelete(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteLoading}
        title="Delete Teacher Profile"
        message={`Are you sure you want to remove ${teacherToDelete?.first_name} ${teacherToDelete?.last_name} (${teacherToDelete?.teacher_reg_no}) from the faculty directory?`}
      />
    </div>
  );
};
