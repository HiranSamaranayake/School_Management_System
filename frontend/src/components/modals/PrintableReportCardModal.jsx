import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Printer, ShieldCheck, Award } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const PrintableReportCardModal = ({ isOpen, onClose, student, results = [] }) => {
  if (!student || !isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const demoResults = results.length > 0 ? results : [
    { subject_name: "Mathematics", marks: 92, grade: "A+", remarks: "Outstanding problem solving" },
    { subject_name: "English Language & Literature", marks: 88, grade: "A+", remarks: "Excellent essay composition" },
    { subject_name: "General Science", marks: 85, grade: "A+", remarks: "Strong practical experimentation" },
    { subject_name: "Information Technology", marks: 95, grade: "A+", remarks: "Highest score in class" },
    { subject_name: "History & Social Studies", marks: 79, grade: "A", remarks: "Very good analytical skills" },
    { subject_name: "Sinhala Language", marks: 82, grade: "A", remarks: "Great vocabulary and grammar" },
  ];

  const totalMarks = demoResults.reduce((acc, curr) => acc + (curr.marks || 0), 0);
  const averageMarks = (totalMarks / demoResults.length).toFixed(1);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-3xl"
      title="Student Official Progress Report Card"
      subtitle="First Term Examination 2026 • Greenfield International College"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" icon={Printer} onClick={handlePrint}>
            Print Report Card
          </Button>
        </>
      }
    >
      <div id="printable-report-card" className="p-6 bg-white text-slate-900 border border-slate-200 rounded-2xl space-y-6 text-left">
        {/* Header Branding */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-700 text-white font-bold text-2xl flex items-center justify-center">
              E
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">Greenfield International College</h2>
              <p className="text-xs text-slate-600">148 Havelock Road, Colombo 05, Sri Lanka • School Code: GIC001</p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="brand" size="lg">Official Academic Transcript</Badge>
            <p className="text-xs text-slate-500 mt-1">2026 Academic Year</p>
          </div>
        </div>

        {/* Student Metadata Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block">Student Name:</span>
            <span className="font-bold text-slate-900 text-sm">{student.first_name} {student.last_name}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Admission Number:</span>
            <span className="font-semibold text-slate-800">{student.admission_no}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Grade / Class:</span>
            <span className="font-semibold text-slate-800">{student.class_name}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Medium:</span>
            <span className="font-semibold text-slate-800">{student.medium}</span>
          </div>
        </div>

        {/* Examination Marks Table */}
        <div>
          <table className="w-full text-xs text-left border border-slate-300 divide-y divide-slate-300">
            <thead className="bg-slate-100 font-bold text-slate-800 uppercase">
              <tr>
                <th className="p-3 border-r border-slate-300">Subject</th>
                <th className="p-3 border-r border-slate-300 text-center">Marks (100)</th>
                <th className="p-3 border-r border-slate-300 text-center">Grade</th>
                <th className="p-3">Teacher Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {demoResults.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-semibold text-slate-900 border-r border-slate-200">{item.subject_name}</td>
                  <td className="p-3 text-center font-bold text-slate-800 border-r border-slate-200">{item.marks}</td>
                  <td className="p-3 text-center border-r border-slate-200">
                    <Badge variant={['A+', 'A'].includes(item.grade) ? 'success' : 'info'}>{item.grade}</Badge>
                  </td>
                  <td className="p-3 text-slate-600 italic">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Performance Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-emerald-900 text-sm">Overall Result: PASSED WITH DISTINCTION</span>
              <p className="text-emerald-700 text-[11px]">Ranked #2 out of 42 students in Class Grade 10 - Science</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div>
              <span className="text-slate-500 block">Total Marks:</span>
              <span className="font-bold text-slate-900 text-base">{totalMarks} / 600</span>
            </div>
            <div>
              <span className="text-slate-500 block">Average Score:</span>
              <span className="font-extrabold text-brand-700 text-lg">{averageMarks}%</span>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-8 grid grid-cols-2 gap-12 text-center text-xs text-slate-600">
          <div>
            <div className="border-b border-slate-400 mb-2 h-8" />
            <span>Class Teacher Signature</span>
          </div>
          <div>
            <div className="border-b border-slate-400 mb-2 h-8" />
            <span>Principal / Head of School Signature</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
