class ReportController {
  constructor(reportService) {
    this.reportService = reportService;
  }

  async list(request, response, next) {
    try {
      const { type } = request.params;
      const { courseId } = request.query;
      const report = await this.reportService.getReport(type, courseId);
      response.json(report);
    } catch (error) {
      next(error);
    }
  }

  async courses(_request, response, next) {
    try {
      response.json(await this.reportService.getCourses());
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ReportController };
