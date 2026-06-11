const express = require('express');
const router = express.Router();
const { quizes } = require('../data');

router.get('/', (req, res) => {
  res.json(Array.isArray(quizes) ? quizes : []);
});

module.exports = router;