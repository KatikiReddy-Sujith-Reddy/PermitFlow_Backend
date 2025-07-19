const express = require('express');
const router = express.Router();
const outpassController = require('../controllers/outpassAnalyticsController'); // path to controller

// GET /api/v1/outpass-analytics/hourly
router.get('/hourly', outpassController.getHourlyAnalytics);

module.exports = router;
