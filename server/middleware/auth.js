const { verifyAccess } = require('../utils/token');
const { getDb } = require('../db/init');

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = verifyAccess(header.slice(7));
    const db = getDb();
    const row = db.exec('SELECT id, uid, email, name FROM users WHERE uid = ?', [decoded.uid]);
    if (!row.length || !row[0].values.length) {
      return res.status(401).json({ error: 'User not found' });
    }
    const [id, uid, email, name] = row[0].values[0];
    req.user = { id, uid, email, name };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { authenticate };
