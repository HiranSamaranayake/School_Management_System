import React, { useState } from 'react';
import { BarChart3, Download, FileSpreadsheet, FileText, Calendar } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../app/context/ToastContext';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export const ReportsPage = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('academic');

  const handleExportPDF = () => {
    addToast('Generating PDF Report', 'Formatting charts and statistical tables...', 'info');
    setTimeout(() => {
      addToast('PDF Downloaded', 'Saved EduSphere_Executive_Report_2026.pdf', 'success');
    }, 1200);
  };

  const handleExportCSV = () => {
    addToast('Exporting Data CSV', 'Exporting aggregated metric records...', 'info');
    setTimeout(() => {
      addToast('CSV Downloaded', 'Saved EduSphere_Analytics_Data_2026.csv', 'success');
    }, 1000);
  };

  const academicData = [
    { class: 'Grade 6', math: 84, english: 88, science: 81 },
    { class: 'Grade 7', math: 80, english: 86, science: 83 },
    { class: 'Grade 8', math: 78, english: 84, science: 79 },
    { class: 'Grade 9', math: 82, english: 89, science: 85 },
    { class: 'Grade 10', math: 85, english: 90, science: 86 },
    { class: 'Grade 11', math: 88, english: 91, science: 89 },
  ];

  const attendanceComparisonData = [
    { class: 'Grade 6', rate: 96.2 },
    { class: 'Grade 7', rate: 94.8 },
    { class: 'Grade 8', rate: 93.1 },
    { class: 'Grade 9', rate: 95.4 },
    { class: 'Grade 10', rate: 96.8 },
    { class: 'Grade 11', rate: 94.0 },
    { class: 'Grade 12', rate: 92.5 },
    { class: 'Grade 13', rate: 91.8 },
  ];

  const tabs = [
    { id: 'academic', label: 'Academic Performance', icon: BarChart3 },
    { id: 'attendance', label: 'Attendance Reports', icon: Calendar },
    { id: 'enrollment', label: 'Enrollment Trends', icon: FileText },
  ];

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Executive visualizations, cross-sectional academic trends, and exportable data reports"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={FileSpreadsheet} onClick={handleExportCSV}>
              Export CSV
            </Button>
            <Button variant="primary" size="sm" icon={Download} onClick={handleExportPDF}>
              Export PDF Report
            </Button>
          </div>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Analytics Content */}
      {activeTab === 'academic' && (
        <div className="space-y-6">
          <Card title="Subject Performance Comparison Across Grades" subtitle="First Term Assessment 2026 averages">
            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={academicData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="class" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <YAxis domain={[50, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                  <Legend />
                  <Bar dataKey="math" name="Mathematics" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="english" name="English" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="science" name="Science" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'attendance' && (
        <Card title="Class Attendance Comparison" subtitle="Average attendance rate % per grade">
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceComparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="class" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis domain={[80, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="rate" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {activeTab === 'enrollment' && (
        <Card title="5-Year Student Enrollment Progression" subtitle="Growth trajectory 2022 - 2026">
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { year: '2022', total: 2150 },
                { year: '2023', total: 2380 },
                { year: '2024', total: 2540 },
                { year: '2025', total: 2720 },
                { year: '2026', total: 2842 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis domain={[1500, 3000]} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="total" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
};
