const REPORT_METHODS = Object.freeze({
  students: 'getStudents',
  teachers: 'getTeachers',
  schedules: 'getSchedules',
  enrollments: 'getEnrollments',
  topics: 'getTopics'
});

class ReportService {
  constructor(reportRepository) {
    this.reportRepository = reportRepository;
  }

  async getReport(type, courseId) {
    const method = REPORT_METHODS[type];
    if (!method) {
      const error = new Error('El tipo de reporte solicitado no existe.');
      error.status = 404;
      throw error;
    }
    return this.reportRepository[method](courseId || null);
  }

  getCourses() {
    return this.reportRepository.getCourses();
  }
}

module.exports = { ReportService };
