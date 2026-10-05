export class UIRenderer {
  constructor() {
    this.tableHead = document.querySelector('#table-head');
    this.tableBody = document.querySelector('#table-body');
    this.status = document.querySelector('#message');
    this.rowCount = document.querySelector('#row-count');
    this.title = document.querySelector('#report-title');
    this.courseFilter = document.querySelector('#course-filter');
    this.courseFilterWrap = document.querySelector('#course-filter-wrap');
  }

  renderCourses(courses) {
    courses.forEach((course) => {
      const option = document.createElement('option');
      option.value = course.id;
      option.textContent = `${course.code} · ${course.description}`;
      this.courseFilter.append(option);
    });
  }

  renderReport(report, rows) {
    this.title.textContent = report.title;
    this.courseFilterWrap.classList.toggle('hidden', !report.filterByCourse);
    this.tableHead.replaceChildren();
    this.tableBody.replaceChildren();

    const header = document.createElement('tr');
    report.columns.forEach(({ label }) => {
      const cell = document.createElement('th');
      cell.textContent = label;
      header.append(cell);
    });
    this.tableHead.append(header);

    if (rows.length === 0) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = report.columns.length;
      cell.className = 'empty';
      cell.textContent = 'No hay registros para mostrar.';
      row.append(cell);
      this.tableBody.append(row);
    }

    rows.forEach((data) => {
      const row = document.createElement('tr');
      report.columns.forEach((column) => {
        const cell = document.createElement('td');
        cell.textContent = this.getValue(column.field, data) || '—';
        row.append(cell);
      });
      this.tableBody.append(row);
    });

    this.rowCount.textContent = `${rows.length} ${rows.length === 1 ? 'registro' : 'registros'}`;
    this.showStatus('Datos cargados correctamente.', 'success');
  }

  showStatus(message, state = 'info') {
    this.status.textContent = message;
    this.status.className = `message ${state}`;
  }

  setSelectedReport(type) {
    document.querySelectorAll('.report-card').forEach((card) => {
      card.classList.toggle('selected', card.dataset.report === type);
    });
  }

  getValue(field, row) {
    return typeof field === 'function' ? field(row) : row[field];
  }
}
