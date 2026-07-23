import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

export const PageHeader = ({
  title,
  subtitle,
  actions,
  badge,
  className = '',
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="mb-2">
        <Breadcrumbs />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
            {badge && <div>{badge}</div>}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>

        {actions && <div className="flex items-center gap-2.5">{actions}</div>}
      </div>
    </div>
  );
};
