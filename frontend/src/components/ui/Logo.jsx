import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

export const Logo = ({ size = 'md', variant = 'light', showSubtitle = true, className = '' }) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-9 h-9 text-lg',
    lg: 'w-11 h-11 text-xl',
  };

  const capSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D Modern Logo Emblem Mark */}
      <div className={`relative ${iconSizes[size]} rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-600/30 shrink-0 border border-white/20`}>
        {/* Glow ambient background ring */}
        <div className="absolute inset-0 rounded-2xl bg-brand-500/20 blur-sm pointer-events-none" />

        {/* Logo Emblem Icon */}
        <GraduationCap className={`${capSizes[size]} text-white relative z-10`} />
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col text-left">
        <span className={`font-extrabold tracking-tight leading-none ${
          size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-lg'
        } ${isDark ? 'text-slate-900' : 'text-white'}`}>
          EduSphere
        </span>
        {showSubtitle && (
          <span className={`text-[10px] font-medium leading-tight mt-0.5 ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Smart School Platform
          </span>
        )}
      </div>
    </div>
  );
};
