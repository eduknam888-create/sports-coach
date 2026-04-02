require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { initDatabase } = require('./db/init');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limit auth routes
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { error: 'Too many requests, try again later' } });

// Routes
app.use('/api/auth', authLimiter, require('./routes/auth.routes'));
app.use('/api', require('./routes/profile.routes'));
app.use('/api', require('./routes/schedule.routes'));
app.use('/api', require('./routes/analysis.routes'));
app.use('/api', require('./routes/session.routes'));
app.use('/api', require('./routes/progress.routes'));
app.use('/api', require('./routes/overview.routes'));
app.use('/api', require('./routes/video.routes'));
app.use('/api', require('./routes/export.routes'));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start
async function start() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`ProCoach AI server running on http://localhost:${PORT}`);
  });
}

start().catch(err => { console.error('Failed to start:', err); process.exit(1); });
