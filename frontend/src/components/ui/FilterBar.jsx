import React from 'react';
import { Search, Download, Filter, RotateCcw } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search records...',
  filters = [], // [{ label, value, onChange, options: [{ label, value }] }]
  onResetFilters,
  onExport,
  extraActions,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 mb-4 shadow-subtle flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      {/* Left Search & Filters */}
      <div className="flex flex-1 flex-wrap items-center gap-3">
        {onSearchChange !== undefined && (
          <div className="w-full sm:w-64">
            <Input
              icon={Search}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        {filters.map((f, idx) => (
          <select
            key={idx}
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          >
            <option value="">{f.label}</option>
            {f.options.map((opt) => (
              <option key={opt.value || opt} value={opt.value || opt}>
                {opt.label || opt}
              </option>
            ))}
          </select>
        ))}

        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors py-1.5 px-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Right Export & Extra Actions */}
      <div className="flex items-center gap-2">
        {extraActions}
        {onExport && (
          <Button variant="outline" size="sm" icon={Download} onClick={onExport}>
            Export
          </Button>
        )}
      </div>
    </div>
  );
};
