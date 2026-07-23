import { apiClient, isMockMode, mockHandlers } from './apiClient';

export const studentService = {
  getStudents: async (params) => {
    if (isMockMode()) {
      return await mockHandlers.getStudents(params);
    }
    try {
      const res = await apiClient.get('/students', { params });
      if (res.data && Array.isArray(res.data.data)) {
        return res.data;
      }
      if (Array.isArray(res.data)) {
        return { data: res.data, total: res.data.length };
      }
      return { data: [], total: 0 };
    } catch (e) {
      return await mockHandlers.getStudents(params);
    }
  },

  createStudent: async (data) => {
    if (isMockMode()) {
      return await mockHandlers.createStudent(data);
    }
    try {
      const res = await apiClient.post('/students', data);
      return res.data;
    } catch (e) {
      return await mockHandlers.createStudent(data);
    }
  },

  updateStudent: async (id, data) => {
    if (isMockMode()) {
      return await mockHandlers.updateStudent(id, data);
    }
    try {
      const cleanId = String(id).replace('STD-', '');
      const res = await apiClient.put(`/students/${cleanId}`, data);
      return res.data;
    } catch (e) {
      return await mockHandlers.updateStudent(id, data);
    }
  },

  deleteStudent: async (id) => {
    if (isMockMode()) {
      return await mockHandlers.deleteStudent(id);
    }
    try {
      const cleanId = String(id).replace('STD-', '');
      const res = await apiClient.delete(`/students/${cleanId}`);
      return res.data;
    } catch (e) {
      return await mockHandlers.deleteStudent(id);
    }
  }
};
