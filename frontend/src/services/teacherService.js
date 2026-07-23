import { apiClient, isMockMode, mockHandlers } from './apiClient';

export const teacherService = {
  getTeachers: async (params) => {
    if (isMockMode()) {
      return await mockHandlers.getTeachers(params);
    }
    try {
      const res = await apiClient.get('/teachers', { params });
      if (res.data && Array.isArray(res.data.data)) {
        return res.data;
      }
      if (Array.isArray(res.data)) {
        return { data: res.data, total: res.data.length };
      }
      return { data: [], total: 0 };
    } catch (e) {
      return await mockHandlers.getTeachers(params);
    }
  },

  createTeacher: async (data) => {
    if (isMockMode()) {
      return await mockHandlers.createTeacher(data);
    }
    try {
      const res = await apiClient.post('/teachers', data);
      return res.data;
    } catch (e) {
      return await mockHandlers.createTeacher(data);
    }
  },

  updateTeacher: async (id, data) => {
    if (isMockMode()) {
      return await mockHandlers.updateTeacher(id, data);
    }
    try {
      const cleanId = String(id).replace('TCH-', '');
      const res = await apiClient.put(`/teachers/${cleanId}`, data);
      return res.data;
    } catch (e) {
      return await mockHandlers.updateTeacher(id, data);
    }
  },

  deleteTeacher: async (id) => {
    if (isMockMode()) {
      return await mockHandlers.deleteTeacher(id);
    }
    try {
      const cleanId = String(id).replace('TCH-', '');
      const res = await apiClient.delete(`/teachers/${cleanId}`);
      return res.data;
    } catch (e) {
      return await mockHandlers.deleteTeacher(id);
    }
  }
};
