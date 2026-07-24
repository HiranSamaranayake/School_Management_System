import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialRolesPermissions } from '../../mocks/mockDatabase';
import { authService } from '../../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('edusphere_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [school, setSchool] = useState(() => {
    try {
      const saved = localStorage.getItem('edusphere_school');
      return saved ? JSON.parse(saved) : {
        school_id: 1,
        code: 'GIC001',
        name: 'Greenfield International College',
        current_academic_year: '2026',
        primary_color: '#4f46e5'
      };
    } catch {
      return {
        school_id: 1,
        code: 'GIC001',
        name: 'Greenfield International College',
        current_academic_year: '2026',
        primary_color: '#4f46e5'
      };
    }
  });

  const [academicYear, setAcademicYear] = useState("2026");
  const [permissions, setPermissions] = useState(initialRolesPermissions.matrix["ROLE-ADMIN"]);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('edusphere_token');
    const savedUser = localStorage.getItem('edusphere_user');
    return !!token && !!savedUser;
  });

  useEffect(() => {
    if (user && user.role_id) {
      setPermissions(initialRolesPermissions.matrix[user.role_id] || initialRolesPermissions.matrix["ROLE-ADMIN"]);
    }
  }, [user]);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    setUser(res.user);
    if (res.school) {
      setSchool(res.school);
      localStorage.setItem('edusphere_school', JSON.stringify(res.school));
    }
    setIsAuthenticated(true);
    localStorage.setItem('edusphere_token', res.token);
    localStorage.setItem('edusphere_user', JSON.stringify(res.user));
    return res;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {}
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('edusphere_token');
    localStorage.removeItem('edusphere_user');
  };

  const hasPermission = (permissionKey) => {
    if (!user) return false;
    const roleId = user.role_id || user.role;
    if (roleId === 'ROLE-ADMIN' || String(roleId).toLowerCase().includes('admin')) return true;
    return !!permissions[permissionKey];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        school,
        setSchool,
        academicYear,
        setAcademicYear,
        isAuthenticated,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
