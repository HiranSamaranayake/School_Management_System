import { apiClient, isMockMode, mockHandlers } from './apiClient';

export const academicService = {
  getAcademicYears: async () => {
    if (isMockMode()) return await mockHandlers.getAcademicYears();
    try {
      const res = await apiClient.get('/academic-years');
      return Array.isArray(res.data) ? res.data : await mockHandlers.getAcademicYears();
    } catch (e) {
      return await mockHandlers.getAcademicYears();
    }
  },

  getClasses: async () => {
    if (isMockMode()) return await mockHandlers.getClasses();
    try {
      const res = await apiClient.get('/classes');
      return Array.isArray(res.data) ? res.data : await mockHandlers.getClasses();
    } catch (e) {
      return await mockHandlers.getClasses();
    }
  },

  saveClass: async (data) => {
    if (isMockMode()) return await mockHandlers.saveClass(data);
    try {
      const res = await apiClient.post('/classes', data);
      return res.data;
    } catch (e) {
      return await mockHandlers.saveClass(data);
    }
  },

  getSubjects: async () => {
    if (isMockMode()) return await mockHandlers.getSubjects();
    try {
      const res = await apiClient.get('/subjects');
      return Array.isArray(res.data) ? res.data : await mockHandlers.getSubjects();
    } catch (e) {
      return await mockHandlers.getSubjects();
    }
  },

  saveSubject: async (data) => {
    if (isMockMode()) return await mockHandlers.saveSubject(data);
    try {
      const res = await apiClient.post('/subjects', data);
      return res.data;
    } catch (e) {
      return await mockHandlers.saveSubject(data);
    }
  },

  getTeacherAllocations: async () => {
    if (isMockMode()) return await mockHandlers.getTeacherAllocations();
    try {
      const res = await apiClient.get('/teacher-allocations');
      return Array.isArray(res.data) ? res.data : await mockHandlers.getTeacherAllocations();
    } catch (e) {
      return await mockHandlers.getTeacherAllocations();
    }
  }
};
