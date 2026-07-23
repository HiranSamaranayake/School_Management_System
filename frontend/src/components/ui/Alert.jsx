import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

export const Alert = ({
  type = 'info', // 'info' | 'success' | 'warning' | 'danger'
  title,
  children,
  onClose,
  className = '',
}) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800 icon-text-blue-600',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800 icon-text-emerald-600',
    warning: 'bg-amber-50 border-amber-200 text-amber-800 icon-text-amber-600',
    danger: 'bg-red-50 border-red-200 text-red-800 icon-text-red-600',
  };

  const icons = {
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    danger: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
  };

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${styles[type]} ${className}`}>
      {icons[type]}
      <div className="flex-1">
        {title && <h4 className="font-semibold text-sm mb-0.5">{title}</h4>}
        <div className="leading-relaxed">{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="p-0.5 rounded hover:bg-black/5 transition-colors">
          <X className="w-4 h-4 opacity-60" />
        </button>
      )}
    </div>
  );
};
