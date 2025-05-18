const express = require('express');
const router  = express.Router();
const chrono  = require('chrono-node');

// Configure o parser para Português (casual)
chrono.pt.casual.parsers.forEach(p => chrono.casual.refiner(p));

router.post('/parse-date', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Texto é obrigatório' });

  const results = chrono.pt.parse(text, new Date(), { forwardDate: true });
  if (!results.length) return res.json({ date: '', weekday: '' });

  const dateObj = results[0].start.date();
  const isoDate = dateObj.toISOString().slice(0, 10);
  const weekdays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  const weekday  = weekdays[dateObj.getDay()];

  return res.json({ date: isoDate, weekday });
});

module.exports = router;
