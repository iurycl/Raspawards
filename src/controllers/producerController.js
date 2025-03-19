const producerService = require('../services/producerService');

exports.getIntervals = async (req, res) => {
  try {
    const result = await producerService.calculateIntervals();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};