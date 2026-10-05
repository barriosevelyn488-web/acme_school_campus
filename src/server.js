require('dotenv').config();

const express = require('express');
const path = require('node:path');
const { createPool } = require('./config/database');
const { ReportRepository } = require('./repositories/ReportRepository');
const { ReportService } = require('./services/ReportService');
const { ReportController } = require('./controllers/ReportController');
const { createReportRoutes } = require('./routes/reportRoutes');

const app = express();
const port = Number(process.env.PORT) || 3000;
const repository = new ReportRepository(createPool());
const service = new ReportService(repository);
const controller = new ReportController(service);

app.use(express.json());
app.use('/api/reports', createReportRoutes(controller));
app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((error, _request, response, _next) => {
  console.error(error);
  const status = error.status || 500;
  const message = status === 500
    ? 'No se pudo completar la consulta. Revisa MySQL y el archivo .env.'
    : error.message;
  response.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`School Management System disponible en http://localhost:${port}`);
});
