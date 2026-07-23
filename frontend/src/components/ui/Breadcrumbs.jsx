import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const routeNameMap = {
    dashboard: 'Dashboard',
    students: 'Students',
    teachers: 'Teachers',
    academics: 'Academic Management',
    attendance: 'Attendance',
    examinations: 'Examinations & Results',
    reports: 'Reports & Analytics',
    administration: 'Administration & Settings',
  };

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-slate-500">
      <Link to="/dashboard" className="flex items-center hover:text-slate-900 transition-colors">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = routeNameMap[name] || name;

        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            {isLast ? (
              <span className="font-semibold text-slate-900">{displayName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-slate-900 transition-colors">
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
