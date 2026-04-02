const express = require('express');
const { getDb, save } = require('../db/init');
const { authenticate } = require('../middleware/auth');
const { validateSport } = require('../middleware/validate');

const router = express.Router();

router.get('/sports/:sport/schedule', authenticate, validateSport, (req, res) => {
  const db = getDb();
  const result = db.exec('SELECT schedule_json FROM schedules WHERE user_id = ? AND sport = ?', [req.user.id, req.params.sport]);
  if (!result.length || !result[0].values.length) return res.json({});
  res.json(JSON.parse(result[0].values[0][0]));
});

router.put('/sports/:sport/schedule', authenticate, validateSport, (req, res) => {
  const db = getDb();
  const json = JSON.stringify(req.body);
  const existing = db.exec('SELECT id FROM schedules WHERE user_id = ? AND sport = ?', [req.user.id, req.params.sport]);
  if (existing.length && existing[0].values.length) {
    db.run('UPDATE schedules SET schedule_json = ?, updated_at = datetime("now") WHERE user_id = ? AND sport = ?',
      [json, req.user.id, req.params.sport]);
  } else {
    db.run('INSERT INTO schedules (user_id, sport, schedule_json) VALUES (?, ?, ?)',
      [req.user.id, req.params.sport, json]);
  }
  save();
  res.json(req.body);
});

module.exports = router;
