import { apiClient, isMockMode, mockHandlers } from './apiClient';

export const attendanceService = {
  getAttendance: async (date, classId) => {
    if (isMockMode()) return await mockHandlers.getAttendance(date, classId);
    try {
      const res = await apiClient.get('/attendance', { params: { date, classId } });
      return Array.isArray(res.data) ? res.data : await mockHandlers.getAttendance(date, classId);
    } catch (e) {
      return await mockHandlers.getAttendance(date, classId);
    }
  },

  saveAttendanceBatch: async (records) => {
    if (isMockMode()) return await mockHandlers.saveAttendanceBatch(records);
    try {
      const res = await apiClient.post('/attendance/batch', { records });
      return res.data;
    } catch (e) {
      return await mockHandlers.saveAttendanceBatch(records);
    }
  }
};
