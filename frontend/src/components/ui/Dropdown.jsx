import React, { useState, useRef, useEffect } from 'react';

export const Dropdown = ({
  trigger,
  items = [],
  align = 'right',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-52 rounded-xl bg-white shadow-dropdown border border-slate-200/80 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 ${className}`}
        >
          {items.map((item, index) => {
            if (item.divider) {
              return <div key={`div-${index}`} className="my-1 border-t border-slate-100" />;
            }
            const Icon = item.icon;
            return (
              <button
                key={item.label || index}
                onClick={() => {
                  item.onClick && item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-3.5 py-2 text-xs font-medium transition-colors ${
                  item.danger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 mr-2.5 ${item.danger ? 'text-red-500' : 'text-slate-400'}`} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
