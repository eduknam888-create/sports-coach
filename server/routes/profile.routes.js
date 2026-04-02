const express = require('express');
const { getDb, save } = require('../db/init');
const { authenticate } = require('../middleware/auth');
const { validateSport } = require('../middleware/validate');

const router = express.Router();

// User profile
router.get('/profile', authenticate, (req, res) => {
  res.json({ name: req.user.name, email: req.user.email });
});

router.put('/profile', authenticate, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const db = getDb();
  db.run('UPDATE users SET name = ?, updated_at = datetime("now") WHERE id = ?', [name, req.user.id]);
  save();
  res.json({ name, email: req.user.email });
});

// Sport profile
router.get('/sports/:sport/profile', authenticate, validateSport, (req, res) => {
  const db = getDb();
  const result = db.exec('SELECT role, level FROM sport_profiles WHERE user_id = ? AND sport = ?', [req.user.id, req.params.sport]);
  if (!result.length || !result[0].values.length) {
    return res.json({ role: '', level: 'beginner' });
  }
  const [role, level] = result[0].values[0];
  res.json({ role: role || '', level: level || 'beginner' });
});

router.put('/sports/:sport/profile', authenticate, validateSport, (req, res) => {
  const { role, level } = req.body;
  const db = getDb();
  const existing = db.exec('SELECT id FROM sport_profiles WHERE user_id = ? AND sport = ?', [req.user.id, req.params.sport]);
  if (existing.length && existing[0].values.length) {
    db.run('UPDATE sport_profiles SET role = ?, level = ?, updated_at = datetime("now") WHERE user_id = ? AND sport = ?',
      [role || '', level || 'beginner', req.user.id, req.params.sport]);
  } else {
    db.run('INSERT INTO sport_profiles (user_id, sport, role, level) VALUES (?, ?, ?, ?)',
      [req.user.id, req.params.sport, role || '', level || 'beginner']);
  }
  save();
  res.json({ role: role || '', level: level || 'beginner' });
});

module.exports = router;
