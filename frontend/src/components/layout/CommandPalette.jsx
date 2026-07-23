import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, Users, BookOpen, Layers, X, ArrowRight } from 'lucide-react';
import { userService } from '../../services/userService';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ students: [], teachers: [], classes: [], subjects: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ students: [], teachers: [], classes: [], subjects: [] });
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await userService.searchGlobal(query);
        setResults(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  const hasResults =
    results.students.length > 0 ||
    results.teachers.length > 0 ||
    results.classes.length > 0 ||
    results.subjects.length > 0;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center pt-20 px-4 text-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
          onClick={onClose}
        />

        <div className="relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all border border-slate-200 animate-in zoom-in-95">
          {/* Search Input Bar */}
          <div className="relative flex items-center border-b border-slate-100 px-4 py-3.5">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              type="text"
              autoFocus
              placeholder="Search students, teachers, classes, subjects... (Ctrl+K)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder-slate-400 outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results Box */}
          <div className="max-h-96 overflow-y-auto p-3">
            {loading && <p className="p-4 text-center text-xs text-slate-400">Searching workspace...</p>}

            {!loading && !query && (
              <div className="p-6 text-center text-slate-400 text-xs">
                Type a name, admission number, class, or subject to jump directly.
              </div>
            )}

            {!loading && query && !hasResults && (
              <p className="p-6 text-center text-xs text-slate-400">No matching records found for "{query}".</p>
            )}

            {!loading && hasResults && (
              <div className="space-y-3">
                {results.students.length > 0 && (
                  <div>
                    <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
                      Students
                    </h4>
                    {results.students.map((s) => (
                      <div
                        key={s.student_id}
                        onClick={() => handleSelect('/students')}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs transition-colors"
                      >
                        <div>
                          <span className="font-semibold text-slate-900">{s.first_name} {s.last_name}</span>
                          <span className="text-slate-400 ml-2">({s.admission_no})</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">{s.grade_level}</span>
                      </div>
                    ))}
                  </div>
                )}

                {results.teachers.length > 0 && (
                  <div>
                    <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      Teachers
                    </h4>
                    {results.teachers.map((t) => (
                      <div
                        key={t.teacher_id}
                        onClick={() => handleSelect('/teachers')}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs transition-colors"
                      >
                        <div>
                          <span className="font-semibold text-slate-900">{t.first_name} {t.last_name}</span>
                          <span className="text-slate-400 ml-2">({t.teacher_reg_no})</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{t.assigned_subjects?.[0] || 'Teacher'}</span>
                      </div>
                    ))}
                  </div>
                )}

                {results.classes.length > 0 && (
                  <div>
                    <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-600" />
                      Classes
                    </h4>
                    {results.classes.map((c) => (
                      <div
                        key={c.class_id}
                        onClick={() => handleSelect('/academics')}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs transition-colors"
                      >
                        <span className="font-semibold text-slate-900">{c.class_name}</span>
                        <span className="text-[11px] text-slate-500">{c.medium} Medium</span>
                      </div>
                    ))}
                  </div>
                )}

                {results.subjects.length > 0 && (
                  <div>
                    <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      Subjects
                    </h4>
                    {results.subjects.map((sub) => (
                      <div
                        key={sub.subject_id}
                        onClick={() => handleSelect('/academics')}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs transition-colors"
                      >
                        <span className="font-semibold text-slate-900">{sub.subject_code} - {sub.subject_name}</span>
                        <span className="text-[11px] text-slate-500">{sub.category}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border rounded shadow-xs text-slate-600">Esc</kbd> to exit</span>
            <span className="flex items-center gap-1">Jump to route <ArrowRight className="w-3 h-3" /></span>
          </div>
        </div>
      </div>
    </div>
  );
};
