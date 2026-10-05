import { REPORTS } from './config.js';
import { ApiService } from './services/ApiService.js';
import { UIRenderer } from './ui/UIRenderer.js';
import { HtmlExporter } from './ui/HtmlExporter.js';

class SchoolManagementApp {
  constructor(apiService, uiRenderer, htmlExporter) {
    this.apiService = apiService;
    this.uiRenderer = uiRenderer;
    this.htmlExporter = htmlExporter;
    this.activeReport = 'students';
    this.rows = [];
  }

  async start() {
    this.bindEvents();
    const courses = await this.apiService.getCourses();
    this.uiRenderer.renderCourses(courses);
    await this.loadReport(this.activeReport);
  }

  bindEvents() {
    document.querySelectorAll('[data-report]').forEach((item) => {
      item.addEventListener('click', () => this.loadReport(item.dataset.report));
    });
    document.querySelector('#course-filter').addEventListener('change', () => {
      this.loadReport(this.activeReport);
    });
    document.querySelector('#generate').addEventListener('click', () => this.downloadReport());
  }

  async loadReport(type) {
    this.activeReport = type;
    this.uiRenderer.setSelectedReport(type);
    this.uiRenderer.showStatus('Cargando reporte…');

    const report = REPORTS[type];
    const courseId = report.filterByCourse
      ? this.uiRenderer.courseFilter.value
      : '';
    this.rows = await this.apiService.getReport(type, courseId);
    this.uiRenderer.renderReport(report, this.rows);
  }

  downloadReport() {
    const report = REPORTS[this.activeReport];
    this.htmlExporter.download(
      report.title,
      this.rows,
      report.columns,
      (field, row) => this.uiRenderer.getValue(field, row)
    );
  }
}

const application = new SchoolManagementApp(
  new ApiService(),
  new UIRenderer(),
  new HtmlExporter()
);

application.start();
