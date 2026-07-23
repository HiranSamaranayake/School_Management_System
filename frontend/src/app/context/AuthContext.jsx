import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCurrentUser, initialSchool, initialRolesPermissions } from '../../mocks/mockDatabase';
import { authService } from '../../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('edusphere_user');
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  const [school, setSchool] = useState(() => {
    const saved = localStorage.getItem('edusphere_school');
    return saved ? JSON.parse(saved) : initialSchool;
  });

  const [academicYear, setAcademicYear] = useState("2026");
  const [permissions, setPermissions] = useState(initialRolesPermissions.matrix["ROLE-ADMIN"]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('edusphere_token') || true; // Demo mode authenticated by default
  });

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    setUser(res.user);
    setSchool(res.school);
    setIsAuthenticated(true);
    localStorage.setItem('edusphere_token', res.token);
    localStorage.setItem('edusphere_user', JSON.stringify(res.user));
    localStorage.setItem('edusphere_school', JSON.stringify(res.school));
    return res;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('edusphere_token');
    localStorage.removeItem('edusphere_user');
  };

  const hasPermission = (permissionKey) => {
    if (!user) return false;
    if (user.role_id === 'ROLE-ADMIN') return true;
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
