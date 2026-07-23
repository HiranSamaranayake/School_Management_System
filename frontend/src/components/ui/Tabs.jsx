import React from 'react';

export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  variant = 'line', // 'line' | 'pills'
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${variant === 'line' ? 'border-b border-slate-200' : ''} ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold transition-all duration-150 relative select-none ${
              variant === 'line'
                ? isActive
                  ? 'text-brand-600 border-b-2 border-brand-600 -mb-px'
                  : 'text-slate-500 hover:text-slate-800'
                : isActive
                ? 'bg-brand-600 text-white shadow-sm rounded-lg'
                : 'text-slate-600 hover:bg-slate-100 rounded-lg'
            }`}
          >
            {Icon && <Icon className={`w-4 h-4 ${isActive && variant === 'line' ? 'text-brand-600' : ''}`} />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive
                    ? variant === 'line'
                      ? 'bg-brand-100 text-brand-700'
                      : 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
