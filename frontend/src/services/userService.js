import { apiClient, isMockMode, mockHandlers } from './apiClient';

export const userService = {
  getUsers: async () => {
    if (isMockMode()) return await mockHandlers.getUsers();
    try {
      const res = await apiClient.get('/users');
      return Array.isArray(res.data) ? res.data : await mockHandlers.getUsers();
    } catch (e) {
      return await mockHandlers.getUsers();
    }
  },

  createUser: async (userData) => {
    if (isMockMode()) return await mockHandlers.registerUser(userData);
    try {
      const res = await apiClient.post('/users', userData);
      return res.data;
    } catch (e) {
      return await mockHandlers.registerUser(userData);
    }
  },

  getRolesPermissions: async () => {
    if (isMockMode()) return await mockHandlers.getRolesPermissions();
    try {
      const res = await apiClient.get('/roles-permissions');
      return res.data || await mockHandlers.getRolesPermissions();
    } catch (e) {
      return await mockHandlers.getRolesPermissions();
    }
  },

  updateRolesPermissions: async (matrix) => {
    if (isMockMode()) return await mockHandlers.updateRolesPermissions(matrix);
    try {
      const res = await apiClient.put('/roles-permissions', { matrix });
      return res.data;
    } catch (e) {
      return await mockHandlers.updateRolesPermissions(matrix);
    }
  },

  getAuditLogs: async () => {
    if (isMockMode()) return await mockHandlers.getAuditLogs();
    try {
      const res = await apiClient.get('/audit-logs');
      return Array.isArray(res.data) ? res.data : await mockHandlers.getAuditLogs();
    } catch (e) {
      return await mockHandlers.getAuditLogs();
    }
  },

  getSchoolSettings: async () => {
    if (isMockMode()) return await mockHandlers.getSchool();
    try {
      const res = await apiClient.get('/school-settings');
      return res.data || await mockHandlers.getSchool();
    } catch (e) {
      return await mockHandlers.getSchool();
    }
  },

  updateSchoolSettings: async (data) => {
    if (isMockMode()) return await mockHandlers.updateSchool(data);
    try {
      const res = await apiClient.put('/school-settings', data);
      return res.data;
    } catch (e) {
      return await mockHandlers.updateSchool(data);
    }
  },

  getSubscription: async () => {
    if (isMockMode()) return await mockHandlers.getSubscription();
    try {
      const res = await apiClient.get('/subscription');
      return res.data || await mockHandlers.getSubscription();
    } catch (e) {
      return await mockHandlers.getSubscription();
    }
  },

  getNotifications: async () => {
    if (isMockMode()) return await mockHandlers.getNotifications();
    try {
      const res = await apiClient.get('/notifications');
      return Array.isArray(res.data) ? res.data : await mockHandlers.getNotifications();
    } catch (e) {
      return await mockHandlers.getNotifications();
    }
  },

  markAllNotificationsRead: async () => {
    if (isMockMode()) return await mockHandlers.markAllNotificationsRead();
    try {
      const res = await apiClient.post('/notifications/mark-read');
      return res.data;
    } catch (e) {
      return await mockHandlers.markAllNotificationsRead();
    }
  },

  searchGlobal: async (query) => {
    if (isMockMode()) return await mockHandlers.searchGlobal(query);
    try {
      const res = await apiClient.get('/search', { params: { query } });
      return res.data || await mockHandlers.searchGlobal(query);
    } catch (e) {
      return await mockHandlers.searchGlobal(query);
    }
  }
};
