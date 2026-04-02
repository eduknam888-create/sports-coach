const express = require('express');
const { getDb, save } = require('../db/init');
const { authenticate } = require('../middleware/auth');
const { validateSport } = require('../middleware/validate');

const router = express.Router();

router.get('/sports/:sport/analyses', authenticate, validateSport, (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 200, 200);
  const offset = parseInt(req.query.offset) || 0;
  const db = getDb();
  const result = db.exec(
    'SELECT id, analysis_type, overall_score, feedback_json, drills_json, video_path, date FROM analyses WHERE user_id = ? AND sport = ? ORDER BY date DESC LIMIT ? OFFSET ?',
    [req.user.id, req.params.sport, limit, offset]
  );
  if (!result.length) return res.json([]);
  const analyses = result[0].values.map(([id, analysisType, overallScore, feedbackJson, drillsJson, videoPath, date]) => ({
    id, analysisType, overallScore,
    feedback: feedbackJson ? JSON.parse(feedbackJson) : [],
    drills: drillsJson ? JSON.parse(drillsJson) : [],
    videoPath, date,
  }));
  res.json(analyses);
});

router.post('/sports/:sport/analyses', authenticate, validateSport, (req, res) => {
  const { analysisType, overallScore, feedback, drills, videoPath } = req.body;
  if (!analysisType || overallScore === undefined) {
    return res.status(400).json({ error: 'analysisType and overallScore are required' });
  }
  const db = getDb();
  db.run(
    'INSERT INTO analyses (user_id, sport, analysis_type, overall_score, feedback_json, drills_json, video_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [req.user.id, req.params.sport, analysisType, overallScore, JSON.stringify(feedback || []), JSON.stringify(drills || []), videoPath || null]
  );
  save();

  res.status(201).json({ id: Date.now(), analysisType, overallScore, feedback, drills, videoPath, date: new Date().toISOString() });
});

module.exports = router;
