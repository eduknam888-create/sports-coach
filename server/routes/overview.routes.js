const express = require('express');
const { getDb } = require('../db/init');
const { authenticate } = require('../middleware/auth');
const { VALID_SPORTS } = require('../middleware/validate');

const router = express.Router();

router.get('/overview', authenticate, (req, res) => {
  const db = getDb();
  const overview = {};

  VALID_SPORTS.forEach(sport => {
    const countResult = db.exec(
      'SELECT COUNT(*), AVG(overall_score) FROM analyses WHERE user_id = ? AND sport = ?',
      [req.user.id, sport]
    );
    const count = countResult.length ? countResult[0].values[0][0] : 0;
    const avg = countResult.length ? countResult[0].values[0][1] : null;

    const recentResult = db.exec(
      'SELECT analysis_type, overall_score, date FROM analyses WHERE user_id = ? AND sport = ? ORDER BY date DESC LIMIT 1',
      [req.user.id, sport]
    );
    const recent = recentResult.length && recentResult[0].values.length
      ? { analysisType: recentResult[0].values[0][0], overallScore: recentResult[0].values[0][1], date: recentResult[0].values[0][2] }
      : null;

    overview[sport] = {
      analysisCount: count,
      avgScore: avg ? Math.round(avg) : null,
      latestScore: recent ? recent.overallScore : null,
      recentAnalysis: recent,
    };
  });

  res.json(overview);
});

module.exports = router;
