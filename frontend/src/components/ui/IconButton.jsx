import React from 'react';

export const IconButton = ({
  icon: Icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  title = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50";

  const variants = {
    ghost: "text-slate-500 hover:text-slate-800 hover:bg-slate-100",
    outline: "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    primary: "bg-brand-600 text-white hover:bg-brand-700",
  };

  const sizes = {
    xs: "w-7 h-7 p-1 text-xs",
    sm: "w-8 h-8 p-1.5 text-sm",
    md: "w-9 h-9 p-2 text-base",
    lg: "w-10 h-10 p-2.5 text-lg",
  };

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};
