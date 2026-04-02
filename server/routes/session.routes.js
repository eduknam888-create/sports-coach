const express = require('express');
const { getDb, save } = require('../db/init');
const { authenticate } = require('../middleware/auth');
const { validateSport } = require('../middleware/validate');

const router = express.Router();

router.get('/sports/:sport/sessions', authenticate, validateSport, (req, res) => {
  const db = getDb();
  const result = db.exec('SELECT session_key FROM completed_sessions WHERE user_id = ? AND sport = ?', [req.user.id, req.params.sport]);
  if (!result.length) return res.json([]);
  res.json(result[0].values.map(r => r[0]));
});

router.post('/sports/:sport/sessions/toggle', authenticate, validateSport, (req, res) => {
  const { sessionKey } = req.body;
  if (!sessionKey) return res.status(400).json({ error: 'sessionKey is required' });

  const db = getDb();
  const existing = db.exec('SELECT id FROM completed_sessions WHERE user_id = ? AND sport = ? AND session_key = ?',
    [req.user.id, req.params.sport, sessionKey]);

  if (existing.length && existing[0].values.length) {
    db.run('DELETE FROM completed_sessions WHERE user_id = ? AND sport = ? AND session_key = ?',
      [req.user.id, req.params.sport, sessionKey]);
  } else {
    db.run('INSERT INTO completed_sessions (user_id, sport, session_key) VALUES (?, ?, ?)',
      [req.user.id, req.params.sport, sessionKey]);
  }
  save();

  const result = db.exec('SELECT session_key FROM completed_sessions WHERE user_id = ? AND sport = ?', [req.user.id, req.params.sport]);
  const sessions = result.length ? result[0].values.map(r => r[0]) : [];
  res.json({ sessions, toggled: sessionKey });
});

module.exports = router;
