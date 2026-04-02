/**
 * Storage Module - Backend API with localStorage fallback
 */
const Storage = {
  _cache: {},
  _uid: null,
  _useApi: false,

  setUser(uid) {
    this._uid = uid;
    this._cache = {};
    this._useApi = API.isLoggedIn();
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
    const cacheKey = `${sport}/profile`;
    if (this._cache[cacheKey]) return this._cache[cacheKey];
    try {
      if (this._useApi) {
        const data = await API.get(`/sports/${sport}/profile`);
        this._cache[cacheKey] = data;
        return data;
      }
    } catch (e) { /* fallback */ }
    return this._localGet(cacheKey, { role: null, level: 'beginner' });
  },

  async saveProfile(sport, profile) {
    const cacheKey = `${sport}/profile`;
    this._cache[cacheKey] = profile;
    try {
      if (this._useApi) { await API.put(`/sports/${sport}/profile`, profile); return; }
    } catch (e) { /* fallback */ }
    this._localSet(cacheKey, profile);
  },

  async getUserProfile() {
    if (this._cache.userProfile) return this._cache.userProfile;
    try {
      if (this._useApi) {
        const data = await API.get('/profile');
        this._cache.userProfile = data;
        return data;
      }
    } catch (e) { /* fallback */ }
    return this._localGet('userProfile', { name: 'Player', createdAt: null });
  },

  async saveUserProfile(profile) {
    this._cache.userProfile = profile;
    try {
      if (this._useApi) { await API.put('/profile', profile); return; }
    } catch (e) { /* fallback */ }
    this._localSet('userProfile', profile);
  },

  // ==================== SCHEDULE ====================
  _defaultSchedule() {
    return {
      monday: { active: false, start: '17:00', end: '19:00' },
      tuesday: { active: false, start: '17:00', end: '19:00' },
      wednesday: { active: false, start: '17:00', end: '19:00' },
      thursday: { active: false, start: '17:00', end: '19:00' },
      friday: { active: false, start: '17:00', end: '19:00' },
      saturday: { active: false, start: '09:00', end: '12:00' },
      sunday: { active: false, start: '09:00', end: '12:00' },
    };
  },

  async getSchedule(sport) {
    const cacheKey = `${sport}/schedule`;
    if (this._cache[cacheKey]) return this._cache[cacheKey];
    try {
      if (this._useApi) {
        const data = await API.get(`/sports/${sport}/schedule`);
        const result = Object.keys(data).length ? data : this._defaultSchedule();
        this._cache[cacheKey] = result;
        return result;
      }
    } catch (e) { /* fallback */ }
    return this._localGet(cacheKey, this._defaultSchedule());
  },

  async saveSchedule(sport, schedule) {
    const cacheKey = `${sport}/schedule`;
    this._cache[cacheKey] = schedule;
    try {
      if (this._useApi) { await API.put(`/sports/${sport}/schedule`, schedule); return; }
    } catch (e) { /* fallback */ }
    this._localSet(cacheKey, schedule);
  },

  // ==================== ANALYSES ====================
  async getAnalyses(sport) {
    const cacheKey = `${sport}/analyses`;
    if (this._cache[cacheKey]) return this._cache[cacheKey];
    try {
      if (this._useApi) {
        const data = await API.get(`/sports/${sport}/analyses`);
        this._cache[cacheKey] = data;
        return data;
      }
    } catch (e) { /* fallback */ }
    return this._localGet(cacheKey, []);
  },

  async saveAnalysis(sport, analysis) {
    const cacheKey = `${sport}/analyses`;
    delete this._cache[cacheKey]; // invalidate cache
    try {
      if (this._useApi) {
        const saved = await API.post(`/sports/${sport}/analyses`, analysis);
        return saved;
      }
    } catch (e) { /* fallback */ }
    // Local fallback
    const analyses = this._localGet(cacheKey, []);
    analysis.id = Date.now();
    analysis.date = new Date().toISOString();
    analyses.unshift(analysis);
    if (analyses.length > 200) analyses.pop();
    this._localSet(cacheKey, analyses);
    return analysis;
  },

  // ==================== COMPLETED SESSIONS ====================
  async getCompletedSessions(sport) {
    const cacheKey = `${sport}/sessions`;
    if (this._cache[cacheKey]) return this._cache[cacheKey];
    try {
      if (this._useApi) {
        const data = await API.get(`/sports/${sport}/sessions`);
        this._cache[cacheKey] = data;
        return data;
      }
    } catch (e) { /* fallback */ }
    return this._localGet(cacheKey, []);
  },

  async toggleSession(sport, dateKey, sessionIndex) {
    const cacheKey = `${sport}/sessions`;
    const key = `${dateKey}_${sessionIndex}`;
    try {
      if (this._useApi) {
        const result = await API.post(`/sports/${sport}/sessions/toggle`, { sessionKey: key });
        this._cache[cacheKey] = result.sessions;
        return result.sessions;
      }
    } catch (e) { /* fallback */ }
    const sessions = this._localGet(cacheKey, []);
    const idx = sessions.indexOf(key);
    if (idx >= 0) sessions.splice(idx, 1);
    else sessions.push(key);
    this._localSet(cacheKey, sessions);
    this._cache[cacheKey] = sessions;
    return sessions;
  },

  async isSessionCompleted(sport, dateKey, sessionIndex) {
    const sessions = await this.getCompletedSessions(sport);
    return sessions.includes(`${dateKey}_${sessionIndex}`);
  },

  // ==================== PROGRESS ====================
  async getProgress(sport) {
    const cacheKey = `${sport}/progress`;
    if (this._cache[cacheKey]) return this._cache[cacheKey];
    try {
      if (this._useApi) {
        const data = await API.get(`/sports/${sport}/progress`);
        this._cache[cacheKey] = data;
        return data;
      }
    } catch (e) { /* fallback */ }
    return this._localGet(cacheKey, {});
  },

  async addProgressEntry(sport, type, score, details = {}) {
    const cacheKey = `${sport}/progress`;
    delete this._cache[cacheKey]; // invalidate
    try {
      if (this._useApi) {
        await API.post(`/sports/${sport}/progress`, { type, score });
        return;
      }
    } catch (e) { /* fallback */ }
    const progress = this._localGet(cacheKey, {});
    if (!progress[type]) progress[type] = [];
    progress[type].push({ date: new Date().toISOString(), score, ...details });
    this._localSet(cacheKey, progress);
  },

  // ==================== OVERVIEW DATA ====================
  async getOverviewData() {
    try {
      if (this._useApi) return await API.get('/overview');
    } catch (e) { /* fallback */ }
    const sports = ['cricket', 'football', 'tennis', 'basketball', 'hockey', 'volleyball'];
    const overview = {};
    for (const sport of sports) {
      const analyses = await this.getAnalyses(sport);
      const progress = await this.getProgress(sport);
      const allScores = Object.values(progress).flat();
      const latestScore = allScores.length > 0 ? allScores[allScores.length - 1].score : null;
      overview[sport] = { analysisCount: analyses.length, latestScore, recentAnalysis: analyses[0] || null };
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
      if (sorted.includes(dateStr)) streak++;
      else if (i > 0) break;
      checkDate.setDate(checkDate.getDate() - 1);
    }
    return streak;
  },

  // ==================== EXPORT/IMPORT ====================
  async exportAll() {
    try {
      if (this._useApi) return await API.get('/export');
    } catch (e) { /* fallback */ }
    const sports = ['cricket', 'football', 'tennis', 'basketball', 'hockey', 'volleyball'];
    const data = { userProfile: await this.getUserProfile(), sports: {} };
    for (const sport of sports) {
      data.sports[sport] = {
        profile: await this.getProfile(sport),
        schedule: await this.getSchedule(sport),
        analyses: await this.getAnalyses(sport),
        completedSessions: await this.getCompletedSessions(sport),
        progress: await this.getProgress(sport),
      };
    }
    return data;
  },

  async importAll(data) {
    try {
      if (this._useApi) { await API.post('/import', data); this._cache = {}; return; }
    } catch (e) { /* fallback */ }
    if (data.userProfile) await this.saveUserProfile(data.userProfile);
    const sportData = data.sports || data; // support old format
    const sports = ['cricket', 'football', 'tennis', 'basketball', 'hockey', 'volleyball'];
    for (const sport of sports) {
      const sd = sportData[sport];
      if (sd) {
        if (sd.profile) await this.saveProfile(sport, sd.profile);
        if (sd.schedule) await this.saveSchedule(sport, sd.schedule);
        if (sd.analyses) this._localSet(`${sport}/analyses`, sd.analyses);
        if (sd.completedSessions || sd.sessions) this._localSet(`${sport}/sessions`, sd.completedSessions || sd.sessions);
        if (sd.progress) this._localSet(`${sport}/progress`, sd.progress);
      }
    }
  },

  clearCache() {
    this._cache = {};
  },
};
