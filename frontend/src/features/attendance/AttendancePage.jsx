import React, { useState, useEffect } from 'react';
import { CalendarCheck, Save, CheckCircle2, Clock, AlertTriangle, Filter, BarChart2, ShieldCheck, UserCheck, Calendar, XCircle } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { FilterBar } from '../../components/ui/FilterBar';
import { attendanceService } from '../../services/attendanceService';
import { useAuth } from '../../app/context/AuthContext';
import { useToast } from '../../app/context/ToastContext';
import { Avatar } from '../../components/ui/Avatar';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

export const AttendancePage = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const roleStr = String(user?.role_id || user?.role || '').toLowerCase();
  const isStudent = roleStr.includes('student');

  const currentStudentId = user?.student_id || 'STD-001';
  const currentAdmissionNo = user?.admission_no || 'GIC-2024-001';
  const currentStudentName = `${user?.first_name || 'Hiran'} ${user?.last_name || 'Samaranayake'}`;

  const [activeTab, setActiveTab] = useState('register');
  const [date, setDate] = useState('2026-07-24');
  const [selectedClass, setSelectedClass] = useState('CLS-10A');
  const [selectedMonth, setSelectedMonth] = useState('2026-07');
  const [records, setRecords] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const monthOptions = [
    { value: '2026-07', label: 'July 2026' },
    { value: '2026-06', label: 'June 2026' },
    { value: '2026-05', label: 'May 2026' },
    { value: '2026-04', label: 'April 2026' },
    { value: '2026-03', label: 'March 2026' },
    { value: '2026-02', label: 'February 2026' },
    { value: '2026-01', label: 'January 2026' },
    { value: 'ALL', label: 'All Months (2026 YTD)' },
  ];

  const monthStats = {
    '2026-07': { monthName: 'July 2026', totalDays: 22, attendedDays: 21, absentDays: 1, lateDays: 0, rate: '95.5%' },
    '2026-06': { monthName: 'June 2026', totalDays: 20, attendedDays: 19, absentDays: 1, lateDays: 0, rate: '95.0%' },
    '2026-05': { monthName: 'May 2026', totalDays: 21, attendedDays: 20, absentDays: 1, lateDays: 0, rate: '95.2%' },
    '2026-04': { monthName: 'April 2026', totalDays: 18, attendedDays: 18, absentDays: 0, lateDays: 0, rate: '100.0%' },
    '2026-03': { monthName: 'March 2026', totalDays: 22, attendedDays: 21, absentDays: 1, lateDays: 0, rate: '95.5%' },
    '2026-02': { monthName: 'February 2026', totalDays: 20, attendedDays: 19, absentDays: 1, lateDays: 0, rate: '95.0%' },
    '2026-01': { monthName: 'January 2026', totalDays: 20, attendedDays: 20, absentDays: 0, lateDays: 0, rate: '100.0%' },
    'ALL': { monthName: '2026 Academic Year To Date', totalDays: 143, attendedDays: 138, absentDays: 5, lateDays: 0, rate: '96.5%' },
  };

  const currentMonthData = monthStats[selectedMonth] || monthStats['2026-07'];

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
    if (isStudent) return; // Read-only for students
    setRecords(prev => prev.map(r => r.student_id === studentId ? { ...r, status } : r));
  };

  const handleRemarksChange = (studentId, remarks) => {
    if (isStudent) return; // Read-only for students
    setRecords(prev => prev.map(r => r.student_id === studentId ? { ...r, remarks } : r));
  };

  const handleMarkAllPresent = () => {
    if (isStudent) return;
    setRecords(prev => prev.map(r => ({ ...r, status: 'Present' })));
    addToast('Marked Present', 'Set all student statuses to Present', 'info');
  };

  const handleSubmitAttendance = async () => {
    if (isStudent) {
      addToast('Access Denied', 'Students cannot submit or modify attendance records', 'danger');
      return;
    }
    setSubmitting(true);
    try {
      await attendanceService.saveAttendanceBatch(records);
      addToast('Attendance Submitted', `Recorded attendance for Grade 10 - A (${date})`, 'success');
    } catch (err) {
      addToast('Error', err.message, 'danger');
    } finally {
      setSubmitting(false);
    }
  };

  const resolveStudentName = (r) => {
    if (!r) return 'Student';
    const knownNames = {
      'GIC-2024-001': 'Hiran Samaranayake',
      'STD-001': 'Hiran Samaranayake',
      '1': 'Hiran Samaranayake',
      'GIC-2024-042': 'Kavindi Fernando',
      'STD-002': 'Kavindi Fernando',
      '2': 'Kavindi Fernando',
      'GIC-2023-118': 'Sahan Silva',
      'STD-003': 'Sahan Silva',
      '3': 'Sahan Silva',
      'GIC-2024-089': 'Dinithi Jayawardena',
      'STD-004': 'Dinithi Jayawardena',
      '4': 'Dinithi Jayawardena',
      'GIC-2022-015': 'Kasun Bandara',
      'STD-005': 'Kasun Bandara',
      '5': 'Kasun Bandara',
      'GIC-2025-002': 'Tharushi Perera',
      'STD-006': 'Tharushi Perera',
      '6': 'Tharushi Perera',
      'GIC-2025-019': 'Chamod Fernando',
      'STD-007': 'Chamod Fernando',
      '7': 'Chamod Fernando',
      'GIC-2024-104': 'Ishara Gunawardena',
      'STD-008': 'Ishara Gunawardena',
      '8': 'Ishara Gunawardena',
      'GIC-2026-724': 'Hashen Perera',
      'STD-011': 'Hashen Perera',
      '11': 'Hashen Perera',
    };

    // 1. Check knownNames mapping by admission_no or student_id FIRST!
    if (r.admission_no && knownNames[r.admission_no]) {
      return knownNames[r.admission_no];
    }
    if (r.student_id && knownNames[String(r.student_id)]) {
      return knownNames[String(r.student_id)];
    }

    // 2. Check if first_name / last_name exist and are valid person names
    const fName = r.first_name && !r.first_name.startsWith('GIC-') && !r.first_name.startsWith('STD-') && r.first_name !== 'undefined' ? String(r.first_name).trim() : '';
    const lName = r.last_name && !r.last_name.startsWith('GIC-') && !r.last_name.startsWith('STD-') && r.last_name !== 'undefined' ? String(r.last_name).trim() : '';
    const fullName = `${fName} ${lName}`.trim();
    if (fullName) return fullName;

    // 3. Check student_name / name IF NOT A CODE STRING!
    const candidateNames = [r.student_name, r.name, r.full_name];
    for (const cn of candidateNames) {
      if (
        cn &&
        typeof cn === 'string' &&
        cn !== 'Nimal Perera' &&
        cn !== 'undefined' &&
        cn !== 'null' &&
        !cn.startsWith('GIC-') &&
        !cn.startsWith('STD-') &&
        !cn.startsWith('ATT-')
      ) {
        return cn.trim();
      }
    }

    return isStudent ? currentStudentName : 'Student';
  };

  // Filter and sanitize records based on role
  const sanitizeRecord = (r) => ({
    ...r,
    student_name: isStudent ? currentStudentName : resolveStudentName(r)
  });

  const studentFilter = (r) => 
    r.student_id === currentStudentId || 
    r.admission_no === currentAdmissionNo || 
    r.student_id === 'STD-001' || 
    r.student_name === 'Nimal Perera' || 
    r.student_name === currentStudentName;

  const classFilter = (r) => {
    if (!selectedClass || selectedClass === 'ALL') return true;

    // Check direct class_id or class_name match
    if (r.class_id === selectedClass || r.class_name === selectedClass) return true;

    // Check mapping by selected class section code
    if (selectedClass === 'CLS-10A' || selectedClass === 'CLS-10SCI') {
      return r.class_id === 'CLS-10A' || r.class_id === 'CLS-10SCI' || r.grade_level === 'Grade 10' || ['GIC-2024-001', 'GIC-2024-042', 'GIC-2026-724', 'GIC-2024-055', 'STD-001', 'STD-002', 'STD-011', 'STD-012'].includes(r.admission_no || r.student_id);
    }
    if (selectedClass === 'CLS-11A' || selectedClass === 'CLS-11SCI') {
      return r.class_id === 'CLS-11A' || r.class_id === 'CLS-11SCI' || r.grade_level === 'Grade 11' || ['GIC-2023-118', 'GIC-2023-145', 'GIC-2023-162', 'STD-003', 'STD-013', 'STD-014'].includes(r.admission_no || r.student_id);
    }
    if (selectedClass === 'CLS-9A') {
      return r.class_id === 'CLS-9A' || r.grade_level === 'Grade 9' || ['GIC-2024-089', 'GIC-2024-092', 'GIC-2024-098', 'STD-004', 'STD-015', 'STD-016'].includes(r.admission_no || r.student_id);
    }
    if (selectedClass === 'CLS-6A') {
      return r.class_id === 'CLS-6A' || ['GIC-2025-002', 'GIC-2025-008', 'STD-006', 'STD-017'].includes(r.admission_no || r.student_id);
    }
    if (selectedClass === 'CLS-6B') {
      return r.class_id === 'CLS-6B' || ['GIC-2025-019', 'GIC-2025-025', 'STD-007', 'STD-018'].includes(r.admission_no || r.student_id);
    }
    if (selectedClass === 'CLS-8A') {
      return r.class_id === 'CLS-8A' || r.grade_level === 'Grade 8' || ['GIC-2024-104', 'GIC-2024-112', 'STD-008', 'STD-019'].includes(r.admission_no || r.student_id);
    }
    if (selectedClass === 'CLS-12BIO') {
      return r.class_id === 'CLS-12BIO' || r.grade_level === 'Grade 12' || ['GIC-2022-015', 'GIC-2022-022', 'STD-005', 'STD-020'].includes(r.admission_no || r.student_id);
    }

    return false;
  };

  const displayedRecords = (isStudent ? records.filter(studentFilter) : records.filter(classFilter)).map(sanitizeRecord);

  const historyRecords = (isStudent ? records.filter(studentFilter) : records.filter(classFilter)).map(sanitizeRecord);

  const presentCount = displayedRecords.filter(r => r.status === 'Present').length;
  const absentCount = displayedRecords.filter(r => r.status === 'Absent').length;
  const lateCount = displayedRecords.filter(r => r.status === 'Late').length;
  const excusedCount = displayedRecords.filter(r => r.status === 'Excused').length;
  const rate = displayedRecords.length > 0 ? ((presentCount / displayedRecords.length) * 100).toFixed(1) : (isStudent ? '96.4' : '0');

  const tabs = [
    { id: 'register', label: isStudent ? 'Daily Record' : 'Daily Register', icon: CalendarCheck },
    { id: 'history', label: isStudent ? 'My Attendance History' : 'Historical Register', icon: Clock },
    { id: 'analytics', label: isStudent ? 'My Attendance Stats' : 'Attendance Analytics', icon: BarChart2 },
  ];

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title={isStudent ? "My Attendance Register" : "Attendance Register"}
        subtitle={
          isStudent
            ? "View your daily attendance logs and personal attendance statistics (Read-Only)"
            : "Record daily student attendance, manage leave excuses, and analyze attendance rates"
        }
        actions={
          !isStudent && activeTab === 'register' ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleMarkAllPresent}>
                Mark All Present
              </Button>
              <Button variant="primary" size="sm" icon={Save} isLoading={submitting} onClick={handleSubmitAttendance}>
                Submit Attendance
              </Button>
            </div>
          ) : isStudent ? (
            <Badge variant="brand" className="py-1 px-3 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 inline" /> Read-Only Student Access
            </Badge>
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
                {!isStudent ? (
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="text-xs font-semibold border border-slate-300 rounded-lg px-3 py-1.5 bg-white text-slate-800 outline-none"
                  >
                    <option value="CLS-10A">Grade 10 - A</option>
                    <option value="CLS-11A">Grade 11 - A</option>
                    <option value="CLS-9A">Grade 9 - A</option>
                    <option value="CLS-6A">Grade 6 - A</option>
                    <option value="CLS-6B">Grade 6 - B</option>
                    <option value="CLS-8A">Grade 8 - A</option>
                    <option value="CLS-12BIO">Grade 12 - Bio</option>
                    <option value="ALL">All Classes</option>
                  </select>
                ) : (
                  <div className="text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 inline-block">
                    Grade 10 - A
                  </div>
                )}
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
            {displayedRecords.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No attendance record registered for {isStudent ? 'you' : 'this class'} on {date}.
              </div>
            ) : (
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
                  {displayedRecords.map((row) => (
                    <tr key={row.attendance_id || row.student_id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-bold text-slate-900">
                        <div className="flex items-center gap-3">
                          <Avatar src={row.avatar} name={row.student_name} size="md" />
                          <div>
                            <div className="font-bold text-slate-900">{row.student_name}</div>
                            <div className="text-[11px] text-slate-400 font-normal">{row.admission_no || currentAdmissionNo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {row.admission_no || currentAdmissionNo}
                      </td>
                      <td className="p-4">
                        {!isStudent ? (
                          /* Teacher / Admin Segmented Radio Control */
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
                        ) : (
                          /* Student Read-Only Badge */
                          <div className="flex justify-center">
                            <Badge
                              variant={
                                row.status === 'Present'
                                  ? 'success'
                                  : row.status === 'Absent'
                                  ? 'danger'
                                  : row.status === 'Late'
                                  ? 'warning'
                                  : row.status === 'Excused'
                                  ? 'info'
                                  : 'secondary'
                              }
                              className="px-3 py-1 text-xs"
                            >
                              {row.status || 'Not Marked'}
                            </Badge>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        {!isStudent ? (
                          <input
                            type="text"
                            placeholder="Add remarks..."
                            value={row.remarks || ''}
                            onChange={(e) => handleRemarksChange(row.student_id, e.target.value)}
                            className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 bg-white focus:ring-1 focus:ring-brand-500 outline-none"
                          />
                        ) : (
                          <span className="text-slate-700 font-medium">
                            {row.remarks ? row.remarks : <span className="text-slate-400 italic">No notes</span>}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <Card
          title={isStudent ? "My Attendance History" : "Historical Attendance Register"}
          subtitle={isStudent ? "Past daily attendance records for your account" : "Filter past student attendance logs"}
        >
          {!isStudent && (
            <FilterBar
              searchPlaceholder="Search student name or admission..."
              filters={[
                { label: 'Class', options: ['Grade 10 - A', 'Grade 9 - A'] },
                { label: 'Status', options: ['Present', 'Absent', 'Late', 'Excused'] }
              ]}
            />
          )}
          <Table
            columns={[
              { header: 'Date', key: 'attendance_date' },
              ...(!isStudent ? [{ header: 'Student Name', key: 'student_name' }] : []),
              { header: 'Class', key: 'class_id' },
              {
                header: 'Status',
                key: 'status',
                cell: (r) => (
                  <Badge
                    variant={
                      r.status === 'Present'
                        ? 'success'
                        : r.status === 'Absent'
                        ? 'danger'
                        : r.status === 'Late'
                        ? 'warning'
                        : 'info'
                    }
                  >
                    {r.status}
                  </Badge>
                )
              },
              { header: 'Remarks', key: 'remarks', cell: (r) => r.remarks || <span className="text-slate-400 italic">—</span> }
            ]}
            data={historyRecords}
          />
        </Card>
      )}

      {activeTab === 'analytics' && (
        <div>
          {!isStudent ? (
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
          ) : (
            /* Student Analytics View */
            <div className="space-y-6">
              {/* Month Selection Control Header */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-600" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Month-Wise Attendance Days Summary</h3>
                    <p className="text-xs text-slate-500">Select a month to view days attended vs days absent</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-700">Select Month:</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="text-xs font-bold border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 shadow-2xs cursor-pointer"
                  >
                    {monthOptions.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Month Stat Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
                  <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
                    <CalendarCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Total School Days</span>
                    <h3 className="text-2xl font-extrabold text-slate-900">{currentMonthData.totalDays} Days</h3>
                    <span className="text-[10px] text-slate-400">{currentMonthData.monthName}</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Days Attended (Present)</span>
                    <h3 className="text-2xl font-extrabold text-emerald-600">{currentMonthData.attendedDays} Days</h3>
                    <span className="text-[10px] text-emerald-700 font-semibold">Attended school</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Days Not Attended (Absent)</span>
                    <h3 className="text-2xl font-extrabold text-red-600">{currentMonthData.absentDays} Day{currentMonthData.absentDays !== 1 ? 's' : ''}</h3>
                    <span className="text-[10px] text-red-700 font-semibold">Absences recorded</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <BarChart2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Monthly Attendance Rate</span>
                    <h3 className="text-2xl font-extrabold text-indigo-600">{currentMonthData.rate}</h3>
                    <span className="text-[10px] text-indigo-700 font-semibold">Requirement: 80.0%</span>
                  </div>
                </div>
              </div>

              {/* Main Charts & Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Personal Standing" subtitle={`Standing for ${currentMonthData.monthName}`} className="md:col-span-1">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-28 h-28 rounded-full bg-emerald-50 border-4 border-emerald-500 flex items-center justify-center mb-3">
                      <span className="text-2xl font-extrabold text-emerald-700">{currentMonthData.rate}</span>
                    </div>
                    <Badge variant="success">Excellent Standing</Badge>
                    <p className="text-xs text-slate-500 mt-3">
                      Attended {currentMonthData.attendedDays} out of {currentMonthData.totalDays} academic days in {currentMonthData.monthName}.
                    </p>
                  </div>
                </Card>

                <Card title="Monthly Presence Rate Trend" subtitle="2026 Academic Year Comparison" className="md:col-span-2">
                  <div className="h-64 pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { month: 'Jan', rate: 100.0 },
                        { month: 'Feb', rate: 95.0 },
                        { month: 'Mar', rate: 95.5 },
                        { month: 'Apr', rate: 100.0 },
                        { month: 'May', rate: 95.2 },
                        { month: 'Jun', rate: 95.0 },
                        { month: 'Jul', rate: 95.5 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                        <YAxis domain={[80, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="rate" fill="#10b981" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
