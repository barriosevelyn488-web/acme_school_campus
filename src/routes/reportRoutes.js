const express = require('express');

function createReportRoutes(reportController) {
  const router = express.Router();

  router.get('/courses', (request, response, next) => {
    reportController.courses(request, response, next);
  });
  router.get('/:type', (request, response, next) => {
    reportController.list(request, response, next);
  });

  return router;
}

module.exports = { createReportRoutes };
