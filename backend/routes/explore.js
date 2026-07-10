const express = require('express');
const router = express.Router();
const { quizes } = require('../data');

router.post('/', (req, res) => {
  // Accept either a raw string body (e.g. JSON.stringify('all')) or an object { filter: '...' }
  const rawBody = req.body;
  const filter =
    typeof rawBody === 'string'
      ? rawBody
      : rawBody && typeof rawBody === 'object' && 'filter' in rawBody
      ? rawBody.filter
      : '';

  const filterValue = String(filter || '').trim();

  // If no filter provided or filter is 'all', return all quizzes
  if (!filterValue || filterValue.toLowerCase() === 'all') {
    return res.json(Array.isArray(quizes) ? quizes : []);
  }

  const result = quizes.filter((q) => String(q.quizType) === filterValue);
  return res.json(Array.isArray(result) ? result : []);
});

module.exports = router;