const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { getDb, save } = require('../db/init');
const { signAccess, signRefresh, verifyRefresh } = require('../utils/token');
const { sendVerificationEmail } = require('../utils/email');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password are required' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const db = getDb();
    const existing = db.exec('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
    if (existing.length && existing[0].values.length) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const uid = uuidv4();
    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    db.run(
      'INSERT INTO users (uid, email, password_hash, name, verification_token, verification_expires) VALUES (?, ?, ?, ?, ?, ?)',
      [uid, email.toLowerCase(), passwordHash, name, verificationToken, expires]
    );
    save();

    await sendVerificationEmail(email, verificationToken);
    res.status(201).json({ message: 'Account created. Please check your email to verify.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const db = getDb();
    const result = db.exec('SELECT id, uid, email, password_hash, name, email_verified FROM users WHERE email = ?', [email.toLowerCase()]);
    if (!result.length || !result[0].values.length) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const [id, uid, userEmail, passwordHash, name, emailVerified] = result[0].values[0];

    const valid = await bcrypt.compare(password, passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    if (!emailVerified) {
      return res.status(403).json({ error: 'Please verify your email before logging in', needsVerification: true });
    }

    const accessToken = signAccess({ uid, email: userEmail, name });
    const refreshToken = signRefresh({ uid });
    const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    db.run('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [id, refreshToken, refreshExpires]);
    save();

    res.json({ accessToken, refreshToken, user: { uid, email: userEmail, name } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/verify/:token', (req, res) => {
  try {
    const db = getDb();
    const result = db.exec(
      'SELECT id, verification_expires FROM users WHERE verification_token = ? AND email_verified = 0',
      [req.params.token]
    );
    if (!result.length || !result[0].values.length) {
      return res.status(400).send('<h2>Invalid or expired verification link.</h2>');
    }
    const [id, expires] = result[0].values[0];
    if (new Date(expires) < new Date()) {
      return res.status(400).send('<h2>Verification link has expired. Please request a new one.</h2>');
    }

    db.run('UPDATE users SET email_verified = 1, verification_token = NULL WHERE id = ?', [id]);
    save();

    res.send(`
      <div style="font-family:sans-serif;max-width:500px;margin:80px auto;text-align:center">
        <h2 style="color:#6e57e0">Email Verified!</h2>
        <p>Your email has been verified. You can now log in to ProCoach AI.</p>
        <a href="/" style="display:inline-block;padding:12px 24px;background:#6e57e0;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;margin-top:16px">Go to App</a>
      </div>
    `);
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).send('<h2>Server error</h2>');
  }
});

router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const db = getDb();
    const result = db.exec('SELECT id, email_verified FROM users WHERE email = ?', [email.toLowerCase()]);
    if (!result.length || !result[0].values.length) {
      return res.json({ message: 'If that email exists, a verification link has been sent.' });
    }
    const [id, verified] = result[0].values[0];
    if (verified) return res.json({ message: 'Email is already verified.' });

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    db.run('UPDATE users SET verification_token = ?, verification_expires = ? WHERE id = ?', [token, expires, id]);
    save();

    await sendVerificationEmail(email, token);
    res.json({ message: 'Verification email sent.' });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

    const decoded = verifyRefresh(refreshToken);
    const db = getDb();

    const result = db.exec('SELECT rt.id, u.id as user_id, u.uid, u.email, u.name FROM refresh_tokens rt JOIN users u ON u.id = rt.user_id WHERE rt.token = ?', [refreshToken]);
    if (!result.length || !result[0].values.length) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
    const [rtId, userId, uid, email, name] = result[0].values[0];

    // Rotate: delete old, create new
    db.run('DELETE FROM refresh_tokens WHERE id = ?', [rtId]);
    const newAccess = signAccess({ uid, email, name });
    const newRefresh = signRefresh({ uid });
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    db.run('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [userId, newRefresh, expires]);
    save();

    res.json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Guest mode - creates a temporary user with no email verification needed
router.post('/guest', (req, res) => {
  try {
    const { name } = req.body;
    const uid = 'guest-' + uuidv4();
    const displayName = name || 'Guest';

    const db = getDb();
    db.run(
      'INSERT INTO users (uid, email, password_hash, name, email_verified) VALUES (?, ?, ?, ?, 1)',
      [uid, `${uid}@guest.local`, 'guest-no-password', displayName]
    );
    save();

    const result = db.exec('SELECT id FROM users WHERE uid = ?', [uid]);
    const accessToken = signAccess({ uid, email: `${uid}@guest.local`, name: displayName });
    const refreshToken = signRefresh({ uid });

    res.json({ accessToken, refreshToken, user: { uid, name: displayName } });
  } catch (err) {
    console.error('Guest error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
