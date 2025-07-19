const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/year/:year', authenticateToken, studentController.getStudentsByYear);

module.exports = router;
