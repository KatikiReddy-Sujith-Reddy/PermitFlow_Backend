const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const eventPermissionController = require('../controllers/eventPermissionController');

router.post('/grant', authenticateToken, eventPermissionController.grantEventPermissions);

module.exports = router;
