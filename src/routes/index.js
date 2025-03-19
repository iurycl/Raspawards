const express = require('express');
const router = express.Router();

const producerController = require('../controllers/producerController');

router.get('/producers/intervals', producerController.getIntervals);

module.exports = router;