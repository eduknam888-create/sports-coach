const express = require('express');
const { getDb, save } = require('../db/init');
const { authenticate } = require('../middleware/auth');
const { VALID_SPORTS } = require('../middleware/validate');

const router = express.Router();

router.get('/export', authenticate, (req, res) => {
  const db = getDb();
  const data = { sports: {} };

  // User profile
  data.userProfile = { name: req.user.name, email: req.user.email };

  VALID_SPORTS.forEach(sport => {
    const sportData = {};

    // Profile
    const profile = db.exec('SELECT role, level FROM sport_profiles WHERE user_id = ? AND sport = ?', [req.user.id, sport]);
    sportData.profile = profile.length && profile[0].values.length ? { role: profile[0].values[0][0], level: profile[0].values[0][1] } : {};

    // Schedule
    const schedule = db.exec('SELECT schedule_json FROM schedules WHERE user_id = ? AND sport = ?', [req.user.id, sport]);
    sportData.schedule = schedule.length && schedule[0].values.length ? JSON.parse(schedule[0].values[0][0]) : {};

    // Analyses
    const analyses = db.exec('SELECT analysis_type, overall_score, feedback_json, drills_json, date FROM analyses WHERE user_id = ? AND sport = ? ORDER BY date DESC', [req.user.id, sport]);
    sportData.analyses = analyses.length ? analyses[0].values.map(([at, os, fj, dj, d]) => ({
      analysisType: at, overallScore: os, feedback: JSON.parse(fj || '[]'), drills: JSON.parse(dj || '[]'), date: d,
    })) : [];

    // Sessions
    const sessions = db.exec('SELECT session_key FROM completed_sessions WHERE user_id = ? AND sport = ?', [req.user.id, sport]);
    sportData.completedSessions = sessions.length ? sessions[0].values.map(r => r[0]) : [];

    // Progress
    const progress = db.exec('SELECT type, score, date FROM progress_entries WHERE user_id = ? AND sport = ? ORDER BY date ASC', [req.user.id, sport]);
    const grouped = {};
    if (progress.length) {
      progress[0].values.forEach(([type, score, date]) => {
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push({ score, date });
      });
    }
    sportData.progress = grouped;

    data.sports[sport] = sportData;
  });

  res.json(data);
});

router.post('/import', authenticate, (req, res) => {
  try {
    const db = getDb();
    const data = req.body;
    if (!data || !data.sports) return res.status(400).json({ error: 'Invalid data format' });

    // Clear existing data for this user
    db.run('DELETE FROM sport_profiles WHERE user_id = ?', [req.user.id]);
    db.run('DELETE FROM schedules WHERE user_id = ?', [req.user.id]);
    db.run('DELETE FROM analyses WHERE user_id = ?', [req.user.id]);
    db.run('DELETE FROM completed_sessions WHERE user_id = ?', [req.user.id]);
    db.run('DELETE FROM progress_entries WHERE user_id = ?', [req.user.id]);

    Object.entries(data.sports).forEach(([sport, sportData]) => {
      if (sportData.profile && (sportData.profile.role || sportData.profile.level)) {
        db.run('INSERT INTO sport_profiles (user_id, sport, role, level) VALUES (?, ?, ?, ?)',
          [req.user.id, sport, sportData.profile.role || '', sportData.profile.level || 'beginner']);
      }
      if (sportData.schedule && Object.keys(sportData.schedule).length) {
        db.run('INSERT INTO schedules (user_id, sport, schedule_json) VALUES (?, ?, ?)',
          [req.user.id, sport, JSON.stringify(sportData.schedule)]);
      }
      if (sportData.analyses) {
        sportData.analyses.forEach(a => {
          db.run('INSERT INTO analyses (user_id, sport, analysis_type, overall_score, feedback_json, drills_json, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, sport, a.analysisType, a.overallScore, JSON.stringify(a.feedback || []), JSON.stringify(a.drills || []), a.date || new Date().toISOString()]);
        });
      }
      if (sportData.completedSessions) {
        sportData.completedSessions.forEach(key => {
          db.run('INSERT INTO completed_sessions (user_id, sport, session_key) VALUES (?, ?, ?)', [req.user.id, sport, key]);
        });
      }
      if (sportData.progress) {
        Object.entries(sportData.progress).forEach(([type, entries]) => {
          entries.forEach(e => {
            db.run('INSERT INTO progress_entries (user_id, sport, type, score, date) VALUES (?, ?, ?, ?, ?)',
              [req.user.id, sport, type, e.score, e.date || new Date().toISOString()]);
          });
        });
      }
    });

    save();
    res.json({ message: 'Data imported successfully' });
  } catch (err) {
    console.error('Import error:', err);
    res.status(500).json({ error: 'Import failed' });
  }
});

module.exports = router;
