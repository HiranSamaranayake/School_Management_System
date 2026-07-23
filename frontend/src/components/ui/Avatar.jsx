import React, { useState } from 'react';

export const Avatar = ({
  src,
  name = '',
  size = 'md',
  status,
  className = '',
}) => {
  const [error, setError] = useState(false);

  const getInitials = (n) => {
    if (!n) return 'U';
    const parts = n.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return n.slice(0, 2).toUpperCase();
  };

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {src && !error ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          className={`${sizes[size]} rounded-full object-cover ring-2 ring-white shadow-sm`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-brand-100 text-brand-700 font-semibold flex items-center justify-center ring-2 ring-white shadow-sm`}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
            status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
          }`}
        />
      )}
    </div>
  );
};
