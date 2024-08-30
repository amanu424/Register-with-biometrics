const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', dashboardController.getDashboard);
router.post('/delete', dashboardController.deleteUser);

module.exports = router;