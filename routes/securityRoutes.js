const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/outpass-permissions', authenticateToken, securityController.getGrantedOutpassPermissions);

module.exports = router;
