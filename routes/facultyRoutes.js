const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

// GET all event permissions
router.get('/event-permissions', facultyController.getAllEventPermissions);

module.exports = router;
