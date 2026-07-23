import React from 'react';

export const Checkbox = React.forwardRef(({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500 transition duration-150"
        {...props}
      />
      {label && <span className="text-sm font-medium text-slate-700 select-none">{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
