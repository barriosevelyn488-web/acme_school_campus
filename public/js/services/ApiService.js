import { API_BASE_URL } from '../config.js';
import { mockCourses, mockReports } from '../mockData.js';
import { Course } from '../models/Course.js';
import { Student } from '../models/Student.js';
import { Teacher } from '../models/Teacher.js';

export class ApiService {
  async getCourses() {
    const courses = await this.get('/api/reports/courses', mockCourses);
    return courses.map((course) => new Course(course));
  }

  async getReport(type, courseId = '') {
    const query = courseId ? `?courseId=${encodeURIComponent(courseId)}` : '';
    const mockRows = mockReports[type] || [];
    const rows = await this.get(`/api/reports/${type}${query}`, mockRows);

    const filteredRows = courseId
      ? rows.filter((row) => !row.courseId || String(row.courseId) === String(courseId))
      : rows;

    if (type === 'students') return filteredRows.map((row) => new Student(row));
    if (type === 'teachers') return filteredRows.map((row) => new Teacher(row));
    return filteredRows;
  }

  async get(path, fallback) {
    try {
      const response = await fetch(`${API_BASE_URL}${path}`);
      if (!response.ok) throw new Error('API no disponible');
      return await response.json();
    } catch (_error) {
      return fallback;
    }
  }
}
