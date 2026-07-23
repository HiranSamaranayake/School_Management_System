import { apiClient, isMockMode, mockHandlers } from './apiClient';

export const authService = {
  login: async (email, password) => {
    if (isMockMode()) {
      return await mockHandlers.login(email, password);
    }
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem('edusphere_token', res.data.token);
        return res.data;
      }
      throw new Error(res.data?.message || 'Login failed.');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
      return await mockHandlers.login(email, password);
    }
  },

  register: async (userData) => {
    if (isMockMode()) {
      return await mockHandlers.registerUser(userData);
    }
    try {
      const res = await apiClient.post('/auth/register', userData);
      return res.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
      return await mockHandlers.registerUser(userData);
    }
  },

  getCurrentUser: async () => {
    if (isMockMode()) {
      return mockHandlers.login("admin@greenfield.edu.lk", "demo").then(r => r.user);
    }
    try {
      const res = await apiClient.get('/auth/me');
      return res.data;
    } catch (e) {
      return mockHandlers.login("admin@greenfield.edu.lk", "demo").then(r => r.user);
    }
  },

  logout: async () => {
    localStorage.removeItem('edusphere_token');
    if (isMockMode()) return true;
    try {
      await apiClient.post('/auth/logout');
    } catch (e) {}
    return true;
  }
};
