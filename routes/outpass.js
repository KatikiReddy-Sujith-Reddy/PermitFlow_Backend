const express = require('express');
const router = express.Router();
const outpassController = require('../controllers/outpassController');
const authenticateToken = require('../middleware/authenticateToken');  // your JWT auth middleware

router.post('/grant', authenticateToken, outpassController.grantOutpassPermission);

module.exports = router;
