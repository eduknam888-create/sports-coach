/**
 * Storage Module - Cloud storage via Firestore
 * All data syncs across devices automatically
 * Falls back to localStorage if Firestore is unavailable
 */
const Storage = {
  _cache: {},
  _uid: null,

  setUser(uid) {
    this._uid = uid;
    this._cache = {};
  },

  // Firestore document reference helpers
  _userDoc() {
    return db ? db.collection('users').doc(this._uid) : null;
  },

  _sportDoc(sport) {
    const userDoc = this._userDoc();
    return userDoc ? userDoc.collection('sports').doc(sport) : null;
  },

  // ==================== GENERIC GET/SET ====================
  async get(path, fallback = null) {
    if (!this._uid) return fallback;

    // Check cache first
    if (this._cache[path] !== undefined) return this._cache[path];

    // Local-only mode
    if (!firebaseReady || !db) {
      return this._localGet(path, fallback);
    }

    try {
      const parts = path.split('/');
      let ref;
      if (parts.length === 1) {
        ref = this._userDoc();
      } else {
        ref = this._sportDoc(parts[0]);
      }
      const doc = await ref.get();
      if (doc.exists) {
        const data = doc.data();
        const key = parts.length === 1 ? parts[0] : parts[1];
        const value = data[key] !== undefined ? data[key] : fallback;
        this._cache[path] = value;
        return value;
      }
      return fallback;
    } catch (err) {
      console.warn('Firestore read error, using localStorage:', err);
      return this._localGet(path, fallback);
    }
  },

  async set(path, value) {
    if (!this._uid) return;
    this._cache[path] = value;

    // Local-only mode
    if (!firebaseReady || !db) {
      this._localSet(path, value);
      return;
    }

    try {
      const parts = path.split('/');
      let ref;
      let key;
      if (parts.length === 1) {
        ref = this._userDoc();
        key = parts[0];
      } else {
        ref = this._sportDoc(parts[0]);
        key = parts[1];
      }
      await ref.set({ [key]: value, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn('Firestore write error, using localStorage:', err);
      this._localSet(path, value);
    }
  },

  // LocalStorage fallback
  _localGet(path, fallback) {
    try {
      const data = localStorage.getItem(`pc_${this._uid}_${path}`);
      return data ? JSON.parse(data) : fallback;
    } catch (e) { return fallback; }
  },

  _localSet(path, value) {
    try {
      localStorage.setItem(`pc_${this._uid}_${path}`, JSON.stringify(value));
    } catch (e) { /* ignore */ }
  },

  // ==================== PROFILE ====================
  async getProfile(sport) {
    return await this.get(`${sport}/profile`, {
      role: null,
      level: 'beginner',
    });
  },

  async saveProfile(sport, profile) {
    await this.set(`${sport}/profile`, profile);
  },

  async getUserProfile() {
    return await this.get('userProfile', {
      name: 'Player',
      createdAt: null,
    });
  },

  async saveUserProfile(profile) {
    await this.set('userProfile', profile);
  },

  // ==================== SCHEDULE ====================
  async getSchedule(sport) {
    return await this.get(`${sport}/schedule`, {
      monday: { active: false, start: '17:00', end: '19:00' },
      tuesday: { active: false, start: '17:00', end: '19:00' },
      wednesday: { active: false, start: '17:00', end: '19:00' },
      thursday: { active: false, start: '17:00', end: '19:00' },
      friday: { active: false, start: '17:00', end: '19:00' },
      saturday: { active: false, start: '09:00', end: '12:00' },
      sunday: { active: false, start: '09:00', end: '12:00' },
    });
  },

  async saveSchedule(sport, schedule) {
    await this.set(`${sport}/schedule`, schedule);
  },

  // ==================== ANALYSES ====================
  async getAnalyses(sport) {
    return await this.get(`${sport}/analyses`, []);
  },

  async saveAnalysis(sport, analysis) {
    const analyses = await this.getAnalyses(sport);
    analysis.id = Date.now();
    analysis.date = new Date().toISOString();
    analyses.unshift(analysis);
    if (analyses.length > 200) analyses.pop();
    await this.set(`${sport}/analyses`, analyses);
    return analysis;
  },

  // ==================== COMPLETED SESSIONS ====================
  async getCompletedSessions(sport) {
    return await this.get(`${sport}/sessions`, []);
  },

  async toggleSession(sport, dateKey, sessionIndex) {
    const sessions = await this.getCompletedSessions(sport);
    const key = `${dateKey}_${sessionIndex}`;
    const idx = sessions.indexOf(key);
    if (idx >= 0) {
      sessions.splice(idx, 1);
    } else {
      sessions.push(key);
    }
    await this.set(`${sport}/sessions`, sessions);
    return sessions;
  },

  async isSessionCompleted(sport, dateKey, sessionIndex) {
    const sessions = await this.getCompletedSessions(sport);
    return sessions.includes(`${dateKey}_${sessionIndex}`);
  },

  // ==================== PROGRESS ====================
  async getProgress(sport) {
    return await this.get(`${sport}/progress`, {});
  },

  async addProgressEntry(sport, type, score, details = {}) {
    const progress = await this.getProgress(sport);
    if (!progress[type]) progress[type] = [];
    progress[type].push({
      date: new Date().toISOString(),
      score,
      ...details,
    });
    await this.set(`${sport}/progress`, progress);
  },

  // ==================== OVERVIEW DATA ====================
  async getOverviewData() {
    const sports = ['cricket', 'football', 'tennis', 'basketball', 'hockey', 'volleyball'];
    const overview = {};
    for (const sport of sports) {
      const analyses = await this.getAnalyses(sport);
      const progress = await this.getProgress(sport);
      const allScores = Object.values(progress).flat();
      const latestScore = allScores.length > 0 ? allScores[allScores.length - 1].score : null;
      overview[sport] = {
        analysisCount: analyses.length,
        latestScore,
        recentAnalysis: analyses[0] || null,
      };
    }
    return overview;
  },

  // ==================== STREAK ====================
  async getStreak(sport) {
    const sessions = await this.getCompletedSessions(sport);
    const analyses = await this.getAnalyses(sport);

    const activityDates = new Set();
    sessions.forEach(s => activityDates.add(s.split('_')[0]));
    analyses.forEach(a => activityDates.add(new Date(a.date).toISOString().split('T')[0]));

    if (activityDates.size === 0) return 0;

    const sorted = Array.from(activityDates).sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    let streak = 0;
    let checkDate = new Date(today);

    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (sorted.includes(dateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }
    return streak;
  },

  // ==================== EXPORT/IMPORT ====================
  async exportAll() {
    const sports = ['cricket', 'football', 'tennis', 'basketball', 'hockey', 'volleyball'];
    const data = { userProfile: await this.getUserProfile() };
    for (const sport of sports) {
      data[sport] = {
        profile: await this.getProfile(sport),
        schedule: await this.getSchedule(sport),
        analyses: await this.getAnalyses(sport),
        sessions: await this.getCompletedSessions(sport),
        progress: await this.getProgress(sport),
      };
    }
    return data;
  },

  async importAll(data) {
    if (data.userProfile) await this.saveUserProfile(data.userProfile);
    const sports = ['cricket', 'football', 'tennis', 'basketball', 'hockey', 'volleyball'];
    for (const sport of sports) {
      if (data[sport]) {
        if (data[sport].profile) await this.saveProfile(sport, data[sport].profile);
        if (data[sport].schedule) await this.saveSchedule(sport, data[sport].schedule);
        if (data[sport].analyses) await this.set(`${sport}/analyses`, data[sport].analyses);
        if (data[sport].sessions) await this.set(`${sport}/sessions`, data[sport].sessions);
        if (data[sport].progress) await this.set(`${sport}/progress`, data[sport].progress);
      }
    }
  },

  // Clear cache when switching contexts
  clearCache() {
    this._cache = {};
  },
};
