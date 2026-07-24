import { apiClient, isMockMode, mockHandlers } from './apiClient';

export const examinationService = {
  getExams: async () => {
    if (isMockMode()) return await mockHandlers.getExams();
    try {
      const res = await apiClient.get('/exams');
      return Array.isArray(res.data) ? res.data : await mockHandlers.getExams();
    } catch (e) {
      return await mockHandlers.getExams();
    }
  },

  createExam: async (examData) => {
    if (isMockMode()) return await mockHandlers.createExam(examData);
    try {
      const res = await apiClient.post('/exams', examData);
      return res.data;
    } catch (e) {
      return await mockHandlers.createExam(examData);
    }
  },

  deleteExam: async (id) => {
    if (isMockMode()) return await mockHandlers.deleteExam(id);
    try {
      const res = await apiClient.delete(`/exams/${id}`);
      return res.data;
    } catch (e) {
      return await mockHandlers.deleteExam(id);
    }
  },

  getExamResults: async (examId, classId, studentId) => {
    if (isMockMode()) return await mockHandlers.getExamResults(examId, classId, studentId);
    try {
      const res = await apiClient.get('/exam-results', { params: { examId, classId, studentId } });
      return Array.isArray(res.data) ? res.data : await mockHandlers.getExamResults(examId, classId, studentId);
    } catch (e) {
      return await mockHandlers.getExamResults(examId, classId, studentId);
    }
  },

  saveExamResults: async (results) => {
    if (isMockMode()) return await mockHandlers.saveExamResults(results);
    try {
      const res = await apiClient.post('/exam-results/batch', { results });
      return res.data;
    } catch (e) {
      return await mockHandlers.saveExamResults(results);
    }
  },

  getGradingScale: async () => {
    if (isMockMode()) return await mockHandlers.getGradingScale();
    try {
      const res = await apiClient.get('/grading-scale');
      return Array.isArray(res.data) ? res.data : await mockHandlers.getGradingScale();
    } catch (e) {
      return await mockHandlers.getGradingScale();
    }
  },

  updateGradingScale: async (scale) => {
    if (isMockMode()) return await mockHandlers.updateGradingScale(scale);
    try {
      const res = await apiClient.put('/grading-scale', { scale });
      return res.data;
    } catch (e) {
      return await mockHandlers.updateGradingScale(scale);
    }
  }
};
