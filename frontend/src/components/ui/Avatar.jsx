import React, { useState } from 'react';

export const Avatar = ({
  src,
  name = '',
  size = 'md',
  status,
  className = '',
}) => {
  const [error, setError] = useState(false);

  // Ignore sample unsplash image URLs across the application
  const isSampleUrl = typeof src === 'string' && (src.includes('unsplash.com') || src.includes('placeholder'));
  const effectiveSrc = isSampleUrl ? '' : src;

  const getInitials = (n) => {
    if (!n || typeof n !== 'string') return 'S';
    const clean = n.replace(/undefined/gi, '').replaceAll('null', '').trim();
    if (!clean) return 'S';
    const parts = clean.split(' ').filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0] ? parts[0].slice(0, 2).toUpperCase() : 'S';
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
      {effectiveSrc && !error ? (
        <img
          src={effectiveSrc}
          alt={name}
          onError={() => setError(true)}
          className={`${sizes[size]} rounded-full object-cover ring-2 ring-white shadow-sm`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-brand-100 text-brand-700 font-semibold flex items-center justify-center ring-2 ring-white shadow-sm overflow-hidden select-none`}
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
