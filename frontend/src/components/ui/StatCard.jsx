import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  icon: Icon,
  iconBg = 'bg-brand-50 text-brand-600',
  description,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-subtle hover:border-slate-300 transition-all ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>

        {change && (
          <div
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              changeType === 'positive'
                ? 'bg-emerald-50 text-emerald-700'
                : changeType === 'negative'
                ? 'bg-red-50 text-red-700'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {changeType === 'positive' && <TrendingUp className="w-3 h-3 mr-1" />}
            {changeType === 'negative' && <TrendingDown className="w-3 h-3 mr-1" />}
            {change}
          </div>
        )}
      </div>

      {description && <p className="mt-2 text-xs text-slate-500">{description}</p>}
    </div>
  );
};
