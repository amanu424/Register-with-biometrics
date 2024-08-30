const express = require('express');
const router = express.Router();
const getDefaultController = require('../controllers/defaultController.js');

router.get('/', getDefaultController.getDefault);

module.exports = router;