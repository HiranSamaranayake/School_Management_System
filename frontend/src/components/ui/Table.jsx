import React from 'react';

export const Table = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyText = "No data records found.",
  onRowClick,
  className = '',
}) => {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-slate-200/80 bg-white ${className}`}>
      <table className="w-full text-left text-xs text-slate-600 border-collapse">
        <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                className={`px-4 py-3 text-xs ${col.headerAlign ? `text-${col.headerAlign}` : 'text-left'} ${col.width || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, rIdx) => (
              <tr key={rIdx} className="animate-pulse">
                {columns.map((_, cIdx) => (
                  <td key={cIdx} className="px-4 py-3.5">
                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400 font-normal">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, rIdx) => (
              <tr
                key={row.id || row.student_id || row.teacher_id || rIdx}
                onClick={() => onRowClick && onRowClick(row)}
                className={`hover:bg-slate-50/70 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col, cIdx) => (
                  <td key={col.key || cIdx} className={`px-4 py-3 text-slate-800 ${col.align ? `text-${col.align}` : ''}`}>
                    {col.cell ? col.cell(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
