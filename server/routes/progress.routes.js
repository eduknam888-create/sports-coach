const express = require('express');
const { getDb, save } = require('../db/init');
const { authenticate } = require('../middleware/auth');
const { validateSport } = require('../middleware/validate');

const router = express.Router();

router.get('/sports/:sport/progress', authenticate, validateSport, (req, res) => {
  const db = getDb();
  const result = db.exec(
    'SELECT type, score, date FROM progress_entries WHERE user_id = ? AND sport = ? ORDER BY date ASC',
    [req.user.id, req.params.sport]
  );
  if (!result.length) return res.json({});
  const grouped = {};
  result[0].values.forEach(([type, score, date]) => {
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push({ score, date });
  });
  res.json(grouped);
});

router.post('/sports/:sport/progress', authenticate, validateSport, (req, res) => {
  const { type, score } = req.body;
  if (!type || score === undefined) return res.status(400).json({ error: 'type and score are required' });

  const db = getDb();
  db.run('INSERT INTO progress_entries (user_id, sport, type, score) VALUES (?, ?, ?, ?)',
    [req.user.id, req.params.sport, type, score]);
  save();
  res.status(201).json({ type, score, date: new Date().toISOString() });
});

module.exports = router;
