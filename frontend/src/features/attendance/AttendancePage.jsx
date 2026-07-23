import React, { useState, useEffect } from 'react';
import { CalendarCheck, Save, CheckCircle2, Clock, AlertTriangle, Filter, BarChart2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Table } from '../../components/ui/Table';
import { FilterBar } from '../../components/ui/FilterBar';
import { attendanceService } from '../../services/attendanceService';
import { useToast } from '../../app/context/ToastContext';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

export const AttendancePage = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('register');

  const [date, setDate] = useState('2026-07-24');
  const [selectedClass, setSelectedClass] = useState('CLS-10SCI');
  const [records, setRecords] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchAttendance = async () => {
    try {
      const data = await attendanceService.getAttendance(date, selectedClass);
      setRecords(data);
    } catch (e) {
      addToast('Error', 'Failed to load attendance register', 'danger');
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [date, selectedClass]);

  const handleStatusChange = (studentId, status) => {
    setRecords(prev => prev.map(r => r.student_id === studentId ? { ...r, status } : r));
  };

  const handleRemarksChange = (studentId, remarks) => {
    setRecords(prev => prev.map(r => r.student_id === studentId ? { ...r, remarks } : r));
  };

  const handleMarkAllPresent = () => {
    setRecords(prev => prev.map(r => ({ ...r, status: 'Present' })));
    addToast('Marked Present', 'Set all student statuses to Present', 'info');
  };

  const handleSubmitAttendance = async () => {
    setSubmitting(true);
    try {
      await attendanceService.saveAttendanceBatch(records);
      addToast('Attendance Submitted', `Recorded attendance for Grade 10 - Science (${date})`, 'success');
    } catch (err) {
      addToast('Error', err.message, 'danger');
    } finally {
      setSubmitting(false);
    }
  };

  const presentCount = records.filter(r => r.status === 'Present').length;
  const absentCount = records.filter(r => r.status === 'Absent').length;
  const lateCount = records.filter(r => r.status === 'Late').length;
  const excusedCount = records.filter(r => r.status === 'Excused').length;
  const rate = records.length > 0 ? ((presentCount / records.length) * 100).toFixed(1) : 0;

  const tabs = [
    { id: 'register', label: 'Daily Register', icon: CalendarCheck },
    { id: 'history', label: 'Historical Register', icon: Clock },
    { id: 'analytics', label: 'Attendance Analytics', icon: BarChart2 },
  ];

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Attendance Register"
        subtitle="Record daily student attendance, manage leave excuses, and analyze attendance rates"
        actions={
          activeTab === 'register' ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleMarkAllPresent}>
                Mark All Present
              </Button>
              <Button variant="primary" size="sm" icon={Save} isLoading={submitting} onClick={handleSubmitAttendance}>
                Submit Attendance
              </Button>
            </div>
          ) : null
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'register' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="text-xs font-semibold border border-slate-300 rounded-lg px-3 py-1.5 bg-white text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Class Section</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="text-xs font-semibold border border-slate-300 rounded-lg px-3 py-1.5 bg-white text-slate-800 outline-none"
                >
                  <option value="CLS-10SCI">Grade 10 - Science</option>
                  <option value="CLS-11SCI">Grade 11 - Science</option>
                  <option value="CLS-9A">Grade 9 - A</option>
                  <option value="CLS-6A">Grade 6 - A</option>
                </select>
              </div>
            </div>

            {/* Live Stats */}
            <div className="flex items-center gap-4 text-xs font-medium border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                {presentCount} Present
              </span>
              <span className="text-red-700 font-bold bg-red-50 px-2.5 py-1 rounded-lg">
                {absentCount} Absent
              </span>
              <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-lg">
                {lateCount} Late
              </span>
              <span className="text-brand-700 font-bold bg-brand-50 px-2.5 py-1 rounded-lg">
                {rate}% Rate
              </span>
            </div>
          </div>

          {/* Register Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Admission No</th>
                  <th className="p-4 text-center">Attendance Status</th>
                  <th className="p-4">Remarks / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((row) => (
                  <tr key={row.attendance_id || row.student_id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-bold text-slate-900">
                      {row.student_name || "Nimal Perera"}
                    </td>
                    <td className="p-4 text-slate-600 font-medium">
                      {row.admission_no || "GIC-2024-001"}
                    </td>
                    <td className="p-4">
                      {/* Segmented Radio Control */}
                      <div className="flex items-center justify-center gap-1 bg-slate-100 p-1 rounded-xl max-w-xs mx-auto">
                        {['Present', 'Absent', 'Late', 'Excused'].map((st) => {
                          const isSelected = row.status === st;
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleStatusChange(row.student_id, st)}
                              className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all ${
                                isSelected
                                  ? st === 'Present'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : st === 'Absent'
                                    ? 'bg-red-600 text-white shadow-xs'
                                    : st === 'Late'
                                    ? 'bg-amber-500 text-white shadow-xs'
                                    : 'bg-blue-600 text-white shadow-xs'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        placeholder="Add remarks..."
                        value={row.remarks || ''}
                        onChange={(e) => handleRemarksChange(row.student_id, e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 bg-white focus:ring-1 focus:ring-brand-500 outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <Card title="Historical Attendance Register" subtitle="Filter past student attendance logs">
          <FilterBar
            searchPlaceholder="Search student name or admission..."
            filters={[
              { label: 'Class', options: ['Grade 10 - Science', 'Grade 9 - A'] },
              { label: 'Status', options: ['Present', 'Absent', 'Late', 'Excused'] }
            ]}
          />
          <Table
            columns={[
              { header: 'Date', key: 'attendance_date' },
              { header: 'Student Name', key: 'student_name' },
              { header: 'Class', key: 'class_id' },
              { header: 'Status', key: 'status', cell: (r) => <Badge variant={r.status === 'Present' ? 'success' : 'danger'}>{r.status}</Badge> },
              { header: 'Remarks', key: 'remarks' }
            ]}
            data={records}
          />
        </Card>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Attendance Rates Across Classes" subtitle="Grade 6 to 13 comparison">
            <div className="h-64 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { class: 'G-6A', rate: 96.5 },
                  { class: 'G-7A', rate: 94.2 },
                  { class: 'G-8A', rate: 92.8 },
                  { class: 'G-9A', rate: 95.1 },
                  { class: 'G-10Sci', rate: 96.8 },
                  { class: 'G-11Sci', rate: 93.4 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="class" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                  <YAxis domain={[80, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="rate" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Low Attendance Risk Flag (< 85%)" subtitle="Students requiring academic counseling">
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-red-900">Ishara Gunawardena</h4>
                  <span className="text-[11px] text-red-700">Grade 8 - A • 78.4% Rate</span>
                </div>
                <Badge variant="danger">High Risk</Badge>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-900">Kasun Bandara</h4>
                  <span className="text-[11px] text-amber-700">Grade 12 - Bio • 83.1% Rate</span>
                </div>
                <Badge variant="warning">Warning</Badge>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
