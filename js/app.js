/**
 * Main Application Controller - ProCoach AI
 * Multi-sport coaching platform
 */
const App = {
  currentSport: null,
  currentSection: 'dashboard',
  weekOffset: 0,
  charts: {},
  cameraStream: null,
  mediaRecorder: null,
  recordedChunks: [],
  lastAnalysisResult: null,

  // ==================== INITIALIZATION ====================
  init() {
    Auth.init();
    this.bindSportTabs();
    this.bindSportNav();
    this.bindAccount();
  },

  async onUserReady(user) {
    Storage.setUser(user.uid);
    // Save basic user profile
    const profile = await Storage.getUserProfile();
    if (!profile.createdAt) {
      await Storage.saveUserProfile({
        name: user.displayName || 'Player',
        createdAt: new Date().toISOString(),
      });
    }
    this.showOverview();
  },

  // ==================== TOAST ====================
  toast(msg, type = '') {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = `toast ${type}`;
    setTimeout(() => el.classList.add('hidden'), 3000);
  },

  // ==================== SPORT TABS ====================
  bindSportTabs() {
    document.querySelectorAll('.sport-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const sport = tab.dataset.sport;
        if (sport === 'overview') {
          this.showOverview();
        } else {
          this.selectSport(sport);
        }
      });
    });
    // Sport cards on overview page
    document.querySelectorAll('.sport-card .start-training').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sport = btn.closest('.sport-card')?.dataset.sport;
        if (sport) this.selectSport(sport);
      });
    });
    document.querySelectorAll('.sport-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.start-training')) return;
        const sport = card.dataset.sport;
        if (sport) this.selectSport(sport);
      });
    });
  },

  updateActiveTab(sport) {
    document.querySelectorAll('.sport-tab').forEach(t => t.classList.remove('active'));
    const target = sport || 'overview';
    document.querySelector(`.sport-tab[data-sport="${target}"]`)?.classList.add('active');
  },

  // ==================== OVERVIEW ====================
  async showOverview() {
    this.currentSport = null;
    this.updateActiveTab(null);
    document.getElementById('page-overview').classList.remove('hidden');
    document.getElementById('page-sport').classList.add('hidden');
    await this.loadOverview();
  },

  async loadOverview() {
    const data = await Storage.getOverviewData();
    const sports = ['cricket', 'football', 'tennis', 'basketball', 'hockey', 'volleyball'];

    sports.forEach(sport => {
      const sportInfo = SportsData[sport];
      const d = data[sport];
      const card = document.querySelector(`.sport-card[data-sport="${sport}"]`);
      if (!card) return;

      const scoreEl = card.querySelector('.sport-score');
      const analysesEl = card.querySelector('.sport-analyses');
      if (scoreEl) scoreEl.textContent = d.latestScore !== null ? `${d.latestScore}/100` : '--';
      if (analysesEl) analysesEl.textContent = `${d.analysisCount} analyses`;
    });

    // Overview chart
    this.renderOverviewChart(data);
  },

  renderOverviewChart(data) {
    const canvas = document.getElementById('overview-chart');
    if (!canvas) return;
    if (this.charts.overview) this.charts.overview.destroy();

    const sports = ['cricket', 'football', 'tennis', 'basketball', 'hockey', 'volleyball'];
    const labels = sports.map(s => SportsData[s]?.name || s);
    const scores = sports.map(s => data[s]?.latestScore || 0);
    const colors = sports.map(s => {
      const c = SportsData[s]?.color || '#999';
      return c;
    });

    this.charts.overview = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Latest Score',
          data: scores,
          backgroundColor: colors.map(c => c + '80'),
          borderColor: colors,
          borderWidth: 2,
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: { y: { min: 0, max: 100 } },
        plugins: { legend: { display: false } },
      },
    });
  },

  // ==================== SPORT PAGE ====================
  async selectSport(sport) {
    this.currentSport = sport;
    this.weekOffset = 0;
    this.updateActiveTab(sport);

    const sportData = SportsData[sport];
    if (!sportData) return;

    // Update sport page title
    const titleEl = document.getElementById('sport-page-title');
    const iconEl = document.getElementById('sport-page-icon');
    if (titleEl) titleEl.textContent = sportData.name;
    if (iconEl) iconEl.textContent = sportData.icon;

    // Set sport color
    document.documentElement.style.setProperty('--current-sport-color', sportData.color);

    // Show sport page
    document.getElementById('page-overview').classList.add('hidden');
    document.getElementById('page-sport').classList.remove('hidden');

    // Build dynamic analysis type buttons
    this.buildAnalysisTypes(sport);

    // Build sport profile options
    this.buildSportProfile(sport);

    // Show dashboard by default
    this.showSection('dashboard');
  },

  // ==================== SPORT NAVIGATION ====================
  bindSportNav() {
    document.querySelectorAll('.sport-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.showSection(link.dataset.section);
      });
    });

    // Bind all interactive elements
    this.bindAnalysis();
    this.bindRegimen();
    this.bindProgress();
    this.bindProfile();
  },

  showSection(section) {
    this.currentSection = section;
    document.querySelectorAll('.sport-nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`.sport-nav-link[data-section="${section}"]`)?.classList.add('active');

    document.querySelectorAll('.sport-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`sport-${section}`)?.classList.add('active');

    // Load section data
    if (section === 'dashboard') this.loadSportDashboard();
    if (section === 'regimen') this.loadRegimen();
    if (section === 'progress') this.loadProgress();
    if (section === 'profile') requestAnimationFrame(() => this.loadSportProfile());
  },

  // ==================== SPORT DASHBOARD ====================
  async loadSportDashboard() {
    const sport = this.currentSport;
    if (!sport) return;

    const analyses = await Storage.getAnalyses(sport);
    const sessions = await Storage.getCompletedSessions(sport);
    const streak = await Storage.getStreak(sport);

    document.getElementById('sport-stat-analyses').textContent = analyses.length;
    document.getElementById('sport-stat-sessions').textContent = sessions.length;
    document.getElementById('sport-stat-streak').textContent = streak;

    if (analyses.length > 0) {
      const recent = analyses.slice(0, 5);
      const avgScore = Math.round(recent.reduce((s, a) => s + (a.overallScore || 0), 0) / recent.length);
      document.getElementById('sport-stat-score').textContent = avgScore + '/100';
    } else {
      document.getElementById('sport-stat-score').textContent = '--';
    }

    // Today's focus
    const focus = await Regimen.getTodayFocus(sport);
    const focusEl = document.getElementById('sport-today-focus');
    if (focus.isRest) {
      focusEl.innerHTML = `<div class="focus-item"><div class="focus-desc"><h4>Rest Day</h4><p>Recovery is key. Stay hydrated and get good sleep.</p></div></div>`;
    } else if (focus.sessions) {
      focusEl.innerHTML = focus.sessions.map(s => `
        <div class="focus-item">
          <div class="focus-time">${s.duration}m</div>
          <div class="focus-desc"><h4>${s.title}</h4><p>${s.exercises.slice(0, 2).join(', ')}</p></div>
        </div>
      `).join('');
    } else {
      focusEl.innerHTML = '<p class="placeholder">Set up your training schedule to see today\'s plan.</p>';
    }

    // Recent analyses
    const recentEl = document.getElementById('sport-recent-analysis');
    if (analyses.length > 0) {
      const sportData = SportsData[sport];
      recentEl.innerHTML = analyses.slice(0, 5).map(a => {
        const typeInfo = sportData.analysisTypes.find(t => t.id === a.analysisType);
        return `<div class="recent-item">
          <div><span class="recent-type">${typeInfo?.icon || ''} ${typeInfo?.name || a.analysisType}</span>
          <span class="recent-date">${new Date(a.date).toLocaleDateString()}</span></div>
          <span class="recent-score">${a.overallScore}/100</span>
        </div>`;
      }).join('');
    } else {
      recentEl.innerHTML = '<p class="placeholder">No analyses yet. Start by uploading a video!</p>';
    }

    // Dashboard chart
    this.renderSportDashboardChart(sport);
  },

  async renderSportDashboardChart(sport) {
    const canvas = document.getElementById('sport-dashboard-chart');
    if (!canvas) return;
    if (this.charts.sportDashboard) this.charts.sportDashboard.destroy();

    const progress = await Storage.getProgress(sport);
    const sportData = SportsData[sport];
    const colors = ['#4CAF50', '#FF6F00', '#2196F3', '#9C27B0', '#F44336'];

    const datasets = [];
    let i = 0;
    for (const [type, entries] of Object.entries(progress)) {
      if (entries.length > 0 && type !== 'overall') {
        const typeInfo = sportData?.analysisTypes?.find(t => t.id === type);
        datasets.push({
          label: typeInfo?.name || type,
          data: entries.map(e => ({ x: new Date(e.date), y: e.score })),
          borderColor: colors[i % colors.length],
          tension: 0.3,
          fill: false,
        });
        i++;
      }
    }

    this.charts.sportDashboard = new Chart(canvas, {
      type: 'line',
      data: { datasets: datasets.length > 0 ? datasets : [{ label: 'No data', data: [] }] },
      options: {
        responsive: true, maintainAspectRatio: false, animation: false,
        scales: {
          x: { type: 'time', time: { unit: 'day' } },
          y: { min: 0, max: 100 },
        },
        plugins: { legend: { position: 'top' } },
      },
    });
  },

  // ==================== ANALYSIS ====================
  buildAnalysisTypes(sport) {
    const sportData = SportsData[sport];
    if (!sportData) return;

    // Populate analysis types
    const container = document.getElementById('analysis-type-selector');
    if (!container) return;

    container.innerHTML = sportData.analysisTypes.map((t, i) =>
      `<button class="type-btn ${i === 0 ? 'active' : ''}" data-type="${t.id}">${t.icon} ${t.name}</button>`
    ).join('');

    // Set default analysis type
    Analysis.currentType = sportData.analysisTypes[0]?.id;

    // Bind clicks
    container.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        Analysis.currentType = btn.dataset.type;
      });
    });

    // Reset upload zone when switching sports
    const uploadZone = document.getElementById('analysis-upload-zone');
    const uploadedVideo = document.getElementById('uploaded-video');
    if (uploadZone) uploadZone.style.display = '';
    if (uploadedVideo) { uploadedVideo.style.display = 'none'; uploadedVideo.src = ''; }
    const startBtn = document.getElementById('start-analysis');
    if (startBtn) startBtn.disabled = true;
  },

  bindAnalysis() {
    // Source toggle
    document.querySelectorAll('.src-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.src-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.video-source').forEach(s => s.classList.remove('active'));
        document.getElementById(`${btn.dataset.source}-source`)?.classList.add('active');
        if (btn.dataset.source === 'camera') this.startCamera();
        else this.stopCamera();
      });
    });

    // Upload zone
    this.setupUploadZone('analysis-upload-zone', 'analysis-video-upload', (files) => {
      if (files[0]) {
        const video = document.getElementById('uploaded-video');
        video.src = URL.createObjectURL(files[0]);
        video.style.display = 'block';
        document.getElementById('analysis-upload-zone').style.display = 'none';
        document.getElementById('start-analysis').disabled = false;
      }
    });

    // Camera
    document.getElementById('camera-start')?.addEventListener('click', () => this.toggleRecording());
    document.getElementById('camera-stop')?.addEventListener('click', () => this.stopRecording());

    // Analyze button
    document.getElementById('start-analysis')?.addEventListener('click', () => this.runAnalysis());
    document.getElementById('save-analysis')?.addEventListener('click', () => this.saveCurrentAnalysis());
  },

  setupUploadZone(zoneId, inputId, onFiles) {
    const zone = document.getElementById(zoneId);
    const input = document.getElementById(inputId);
    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('dragover'); onFiles(e.dataTransfer.files); });
    input.addEventListener('change', () => { if (input.files.length) onFiles(input.files); });
  },

  async startCamera() {
    try {
      this.cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'environment' },
        audio: false,
      });
      document.getElementById('camera-video').srcObject = this.cameraStream;
      document.getElementById('start-analysis').disabled = false;
    } catch (err) {
      this.toast('Camera access denied.', 'error');
    }
  },

  stopCamera() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(t => t.stop());
      this.cameraStream = null;
    }
  },

  toggleRecording() {
    if (!this.cameraStream) return;
    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(this.cameraStream, { mimeType: 'video/webm' });
    this.mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) this.recordedChunks.push(e.data); };
    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const video = document.getElementById('uploaded-video');
      video.src = URL.createObjectURL(blob);
      video.style.display = 'block';
      document.querySelectorAll('.src-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('[data-source="upload"]')?.classList.add('active');
      document.querySelectorAll('.video-source').forEach(s => s.classList.remove('active'));
      document.getElementById('upload-source')?.classList.add('active');
      document.getElementById('analysis-upload-zone').style.display = 'none';
    };
    this.mediaRecorder.start();
    document.getElementById('camera-start')?.classList.add('hidden');
    document.getElementById('camera-stop')?.classList.remove('hidden');
    this.toast('Recording...', 'success');
  },

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') this.mediaRecorder.stop();
    document.getElementById('camera-start')?.classList.remove('hidden');
    document.getElementById('camera-stop')?.classList.add('hidden');
    this.toast('Recording saved!', 'success');
  },

  async runAnalysis() {
    const sport = this.currentSport;
    const type = Analysis.currentType;
    if (!sport || !type) return;

    const video = document.getElementById('uploaded-video');
    const progressBar = document.getElementById('analysis-progress');
    const progressFill = progressBar?.querySelector('.progress-bar-fill');
    const progressText = progressBar?.querySelector('.progress-label');
    const btn = document.getElementById('start-analysis');

    btn.disabled = true;
    progressBar?.classList.remove('hidden');

    let result;
    if (video?.src && video.readyState >= 2 && video.duration > 0) {
      if (progressText) progressText.textContent = 'Initializing AI...';
      if (progressFill) progressFill.style.width = '10%';
      try {
        result = await Analysis.analyzeVideo(video, sport, type, (p) => {
          if (progressFill) progressFill.style.width = (10 + Math.round(p * 80)) + '%';
          if (progressText) progressText.textContent = `Analyzing... ${Math.round(p * 100)}%`;
        });
      } catch (err) {
        result = await Analysis.simulateAnalysis(sport, type);
      }
    } else {
      for (let i = 0; i <= 100; i += 5) {
        if (progressFill) progressFill.style.width = i + '%';
        if (progressText) progressText.textContent = i < 30 ? 'Detecting pose...' : i < 70 ? 'Analyzing technique...' : 'Generating feedback...';
        await new Promise(r => setTimeout(r, 60));
      }
      result = await Analysis.simulateAnalysis(sport, type);
    }

    if (progressFill) progressFill.style.width = '100%';
    if (progressText) progressText.textContent = 'Complete!';
    this.lastAnalysisResult = result;
    this.displayFeedback(result);
    btn.disabled = false;
    setTimeout(() => progressBar?.classList.add('hidden'), 2000);
  },

  displayFeedback(result) {
    document.getElementById('feedback-placeholder')?.classList.add('hidden');
    const resultsEl = document.getElementById('feedback-results');
    resultsEl?.classList.remove('hidden');

    const score = result.overallScore;
    const scoreNum = document.getElementById('overall-score');
    if (scoreNum) scoreNum.textContent = score;

    const circle = document.getElementById('score-circle-fill');
    if (circle) {
      circle.style.strokeDashoffset = 283 - (283 * score / 100);
      circle.style.stroke = score >= 75 ? '#16A34A' : score >= 55 ? '#F59E0B' : '#DC2626';
    }

    const detailsEl = document.getElementById('feedback-details');
    if (detailsEl) {
      detailsEl.innerHTML = result.feedback.map(fb => `
        <div class="feedback-item ${fb.level}">
          <span class="fb-score">${fb.score}</span>
          <h4>${fb.aspect}</h4>
          <p>${fb.text}</p>
        </div>
      `).join('');
    }

    const drillsEl = document.getElementById('feedback-drills');
    if (drillsEl) {
      drillsEl.innerHTML = result.drills.length > 0 ?
        result.drills.map((d, i) => `
          <div class="drill-item">
            <div class="drill-num">${i + 1}</div>
            <div class="drill-text">${typeof d === 'string' ? d : d.name || d}</div>
          </div>
        `).join('')
      : '<p>Great technique! Keep it up.</p>';
    }
  },

  async saveCurrentAnalysis() {
    if (!this.lastAnalysisResult || !this.currentSport) return;
    const r = this.lastAnalysisResult;
    await Storage.saveAnalysis(this.currentSport, {
      analysisType: r.analysisType || r.type,
      overallScore: r.overallScore,
      feedback: r.feedback,
      drills: r.drills,
    });
    await Storage.addProgressEntry(this.currentSport, r.analysisType || r.type, r.overallScore);
    await Storage.addProgressEntry(this.currentSport, 'overall', r.overallScore);
    this.toast('Analysis saved!', 'success');
  },

  // ==================== REGIMEN ====================
  bindRegimen() {
    document.getElementById('prev-week')?.addEventListener('click', () => { this.weekOffset--; this.loadRegimen(); });
    document.getElementById('next-week')?.addEventListener('click', () => { this.weekOffset++; this.loadRegimen(); });
    document.getElementById('edit-schedule-btn')?.addEventListener('click', () => this.openScheduleEditor());
    document.getElementById('cancel-schedule')?.addEventListener('click', () => document.getElementById('schedule-modal')?.classList.remove('active'));
    document.getElementById('save-schedule')?.addEventListener('click', () => this.saveScheduleFromEditor());
  },

  async loadRegimen() {
    const sport = this.currentSport;
    if (!sport) return;

    const plan = await Regimen.generateWeekPlan(sport, this.weekOffset);
    const label = document.getElementById('week-label');
    if (label) {
      if (this.weekOffset === 0) label.textContent = 'This Week';
      else if (this.weekOffset === 1) label.textContent = 'Next Week';
      else if (this.weekOffset === -1) label.textContent = 'Last Week';
      else { const s = new Date(plan[0].date); label.textContent = `Week of ${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`; }
    }

    const container = document.getElementById('weekly-plan');
    if (!container) return;

    container.innerHTML = plan.map(day => {
      const dayName = day.day.charAt(0).toUpperCase() + day.day.slice(1);
      const dateF = new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      if (day.isRest) {
        return `<div class="day-card rest ${day.isToday ? 'today' : ''}">
          <div class="day-header"><span>${dayName}</span><span class="day-date">${dateF}</span></div>
          <div class="day-content"><div class="rest-message">Rest Day</div></div></div>`;
      }
      return `<div class="day-card ${day.isToday ? 'today' : ''}">
        <div class="day-header"><span>${dayName} ${day.start}-${day.end}</span><span class="day-date">${dateF}</span></div>
        <div class="day-content">${day.sessions.map((s, si) => `
          <div class="session-block">
            <div class="session-title">${s.title}<span class="session-duration">${s.duration} min</span></div>
            <ul class="session-exercises">${s.exercises.map(ex => `<li>${ex}</li>`).join('')}</ul>
            <label class="session-check">
              <input type="checkbox" onchange="App.toggleSession('${day.date}', ${si})" ${false ? 'checked' : ''}>
              <span>Mark Complete</span>
            </label>
          </div>
        `).join('')}</div></div>`;
    }).join('');

    // Check completed sessions
    for (const day of plan) {
      if (!day.isRest && day.sessions) {
        for (let si = 0; si < day.sessions.length; si++) {
          const completed = await Storage.isSessionCompleted(sport, day.date, si);
          if (completed) {
            const cb = container.querySelector(`input[onchange*="'${day.date}', ${si}"]`);
            if (cb) cb.checked = true;
          }
        }
      }
    }
  },

  async toggleSession(dateKey, sessionIndex) {
    if (this.currentSport) await Storage.toggleSession(this.currentSport, dateKey, sessionIndex);
  },

  async openScheduleEditor() {
    const sport = this.currentSport;
    if (!sport) return;
    const schedule = await Storage.getSchedule(sport);
    const grid = document.getElementById('schedule-grid');
    if (!grid) return;

    grid.querySelectorAll('.day-row').forEach(row => {
      const day = row.dataset.day;
      const d = schedule[day];
      if (d) {
        row.querySelector('input[type="checkbox"]').checked = d.active;
        const times = row.querySelectorAll('input[type="time"]');
        times[0].value = d.start;
        times[1].value = d.end;
      }
    });
    document.getElementById('schedule-modal')?.classList.add('active');
  },

  async saveScheduleFromEditor() {
    const sport = this.currentSport;
    if (!sport) return;
    const schedule = {};
    document.querySelectorAll('#schedule-grid .day-row').forEach(row => {
      const day = row.dataset.day;
      schedule[day] = {
        active: row.querySelector('input[type="checkbox"]').checked,
        start: row.querySelectorAll('input[type="time"]')[0].value,
        end: row.querySelectorAll('input[type="time"]')[1].value,
      };
    });
    await Storage.saveSchedule(sport, schedule);
    document.getElementById('schedule-modal')?.classList.remove('active');
    this.loadRegimen();
    this.toast('Schedule updated!', 'success');
  },

  // ==================== PROGRESS ====================
  bindProgress() {
    document.querySelectorAll('.progress-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.progress-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.loadProgressTab(btn.dataset.tab);
      });
    });
  },

  async loadProgress() {
    // Build dynamic tabs based on sport
    const sport = this.currentSport;
    if (!sport) return;
    const sportData = SportsData[sport];

    const tabContainer = document.querySelector('.progress-tabs');
    if (tabContainer) {
      tabContainer.innerHTML = `
        <button class="progress-tab active" data-tab="overview">Overview</button>
        ${sportData.analysisTypes.map(t => `<button class="progress-tab" data-tab="${t.id}">${t.name}</button>`).join('')}
        <button class="progress-tab" data-tab="history">History</button>
      `;
      // Rebind
      tabContainer.querySelectorAll('.progress-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          tabContainer.querySelectorAll('.progress-tab').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.loadProgressTab(btn.dataset.tab);
        });
      });
    }

    this.loadProgressTab('overview');
  },

  async loadProgressTab(tab) {
    const sport = this.currentSport;
    if (!sport) return;

    const progress = await Storage.getProgress(sport);
    const analyses = await Storage.getAnalyses(sport);
    const content = document.getElementById('progress-content');
    if (!content) return;

    if (tab === 'overview') {
      content.innerHTML = `
        <div class="charts-grid">
          <div class="card"><h3>Overall Progress</h3><div class="chart-container"><canvas id="prog-line"></canvas></div></div>
          <div class="card"><h3>Skill Breakdown</h3><div class="chart-container"><canvas id="prog-radar"></canvas></div></div>
        </div>
        <div class="card"><h3>Milestones</h3><div id="milestones-list" class="milestones-list"></div></div>
      `;
      this.renderProgressCharts(sport, progress);
      this.renderMilestones(analyses);
    } else if (tab === 'history') {
      content.innerHTML = `<div class="card"><h3>Analysis History</h3><div id="history-list" class="history-list"></div></div>`;
      this.renderHistory(sport, analyses);
    } else {
      const entries = progress[tab] || [];
      content.innerHTML = `
        <div class="card"><h3>${tab.charAt(0).toUpperCase() + tab.slice(1)} Progress</h3><div class="chart-container"><canvas id="type-chart"></canvas></div></div>
        <div class="card"><h3>Key Metrics</h3><div id="type-metrics" class="metrics-grid"></div></div>
      `;
      this.renderTypeChart(tab, entries);
      this.renderTypeMetrics(entries);
    }
  },

  renderProgressCharts(sport, progress) {
    const sportData = SportsData[sport];
    const colors = ['#4CAF50', '#FF6F00', '#2196F3', '#9C27B0', '#F44336'];

    // Line chart
    const lineCanvas = document.getElementById('prog-line');
    if (lineCanvas) {
      if (this.charts.progLine) this.charts.progLine.destroy();
      const datasets = [];
      let i = 0;
      for (const [type, entries] of Object.entries(progress)) {
        if (entries.length > 0 && type !== 'overall') {
          const info = sportData?.analysisTypes?.find(t => t.id === type);
          datasets.push({
            label: info?.name || type,
            data: entries.map(e => ({ x: new Date(e.date), y: e.score })),
            borderColor: colors[i % colors.length],
            tension: 0.3, fill: false,
          });
          i++;
        }
      }
      this.charts.progLine = new Chart(lineCanvas, {
        type: 'line',
        data: { datasets: datasets.length > 0 ? datasets : [{ label: 'No data', data: [] }] },
        options: { responsive: true, maintainAspectRatio: false, animation: false,
          scales: { x: { type: 'time', time: { unit: 'day' } }, y: { min: 0, max: 100 } },
        },
      });
    }

    // Radar chart
    const radarCanvas = document.getElementById('prog-radar');
    if (radarCanvas) {
      if (this.charts.progRadar) this.charts.progRadar.destroy();
      const labels = [];
      const data = [];
      sportData?.analysisTypes?.forEach(t => {
        labels.push(t.name);
        const entries = progress[t.id] || [];
        data.push(entries.length > 0 ? entries[entries.length - 1].score : 0);
      });
      this.charts.progRadar = new Chart(radarCanvas, {
        type: 'radar',
        data: { labels, datasets: [{ label: 'Current', data, backgroundColor: sportData.color + '30', borderColor: sportData.color, borderWidth: 2 }] },
        options: { responsive: true, maintainAspectRatio: false, animation: false, scales: { r: { min: 0, max: 100 } } },
      });
    }
  },

  renderMilestones(analyses) {
    const el = document.getElementById('milestones-list');
    if (!el) return;
    const milestones = [
      { title: 'First Analysis', desc: 'Complete your first analysis', check: analyses.length >= 1 },
      { title: 'Getting Serious', desc: 'Complete 5 analyses', check: analyses.length >= 5 },
      { title: 'Dedicated Player', desc: 'Complete 10 analyses', check: analyses.length >= 10 },
      { title: 'Master Practitioner', desc: 'Complete 50 analyses', check: analyses.length >= 50 },
    ];
    el.innerHTML = milestones.map(m => `
      <div class="milestone ${m.check ? 'achieved' : ''}">
        <div class="milestone-icon">${m.check ? '&#9989;' : '&#128274;'}</div>
        <div class="milestone-info"><h4>${m.title}</h4><p>${m.desc}</p></div>
      </div>
    `).join('');
  },

  renderHistory(sport, analyses) {
    const el = document.getElementById('history-list');
    if (!el) return;
    const sportData = SportsData[sport];
    if (analyses.length === 0) { el.innerHTML = '<p class="placeholder">No analyses yet.</p>'; return; }
    el.innerHTML = analyses.map(a => {
      const info = sportData?.analysisTypes?.find(t => t.id === a.analysisType);
      return `<div class="history-item">
        <span class="history-type-icon">${info?.icon || ''}</span>
        <div class="history-info"><h4>${info?.name || a.analysisType}</h4><p>${new Date(a.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p></div>
        <span class="history-score">${a.overallScore}</span>
      </div>`;
    }).join('');
  },

  renderTypeChart(type, entries) {
    const canvas = document.getElementById('type-chart');
    if (!canvas) return;
    if (this.charts.typeChart) this.charts.typeChart.destroy();
    if (entries.length === 0) return;
    this.charts.typeChart = new Chart(canvas, {
      type: 'line',
      data: { datasets: [{ label: 'Score', data: entries.map(e => ({ x: new Date(e.date), y: e.score })), borderColor: getComputedStyle(document.documentElement).getPropertyValue('--current-sport-color').trim() || '#4CAF50', fill: true, backgroundColor: 'rgba(0,0,0,0.05)', tension: 0.3 }] },
      options: { responsive: true, maintainAspectRatio: false, animation: false, scales: { x: { type: 'time', time: { unit: 'day' } }, y: { min: 0, max: 100 } } },
    });
  },

  renderTypeMetrics(entries) {
    const el = document.getElementById('type-metrics');
    if (!el || entries.length === 0) { if (el) el.innerHTML = '<p class="placeholder">No data yet.</p>'; return; }
    const latest = entries[entries.length - 1].score;
    const first = entries[0].score;
    const best = Math.max(...entries.map(e => e.score));
    const avg = Math.round(entries.reduce((s, e) => s + e.score, 0) / entries.length);
    const change = latest - first;
    el.innerHTML = `
      <div class="metric-card"><span class="metric-value">${latest}</span><span class="metric-label">Latest</span></div>
      <div class="metric-card"><span class="metric-value">${best}</span><span class="metric-label">Best</span></div>
      <div class="metric-card"><span class="metric-value">${avg}</span><span class="metric-label">Average</span></div>
      <div class="metric-card"><span class="metric-value">${change >= 0 ? '+' : ''}${change}</span><span class="metric-label">Change</span>
        <span class="metric-change ${change >= 0 ? 'up' : 'down'}">${change >= 0 ? 'Improving' : 'Declining'}</span></div>
    `;
  },

  // ==================== SPORT PROFILE ====================
  buildSportProfile(sport) {
    const sportData = SportsData[sport];
    if (!sportData) return;

    const roleSelect = document.getElementById('sport-role');
    if (roleSelect) {
      roleSelect.innerHTML = sportData.roles.map(r => `<option value="${r.id}">${r.name}</option>`).join('');
    }
  },

  bindProfile() {
    document.getElementById('save-sport-profile')?.addEventListener('click', () => this.saveSportProfile());
  },

  async loadSportProfile() {
    const sport = this.currentSport;
    if (!sport) return;

    const profile = await Storage.getProfile(sport);
    const roleEl = document.getElementById('sport-role');
    const levelEl = document.getElementById('sport-level');
    if (roleEl && profile.role) roleEl.value = profile.role;
    if (levelEl) levelEl.value = profile.level || 'beginner';

    // Load schedule
    const schedule = await Storage.getSchedule(sport);
    document.querySelectorAll('#sport-profile-schedule .day-row').forEach(row => {
      const day = row.dataset.day;
      const d = schedule[day];
      if (d) {
        row.querySelector('input[type="checkbox"]').checked = d.active;
        const times = row.querySelectorAll('input[type="time"]');
        times[0].value = d.start;
        times[1].value = d.end;
      }
    });
  },

  async saveSportProfile() {
    const sport = this.currentSport;
    if (!sport) return;

    await Storage.saveProfile(sport, {
      role: document.getElementById('sport-role')?.value,
      level: document.getElementById('sport-level')?.value || 'beginner',
    });

    // Save schedule
    const schedule = {};
    document.querySelectorAll('#sport-profile-schedule .day-row').forEach(row => {
      const day = row.dataset.day;
      schedule[day] = {
        active: row.querySelector('input[type="checkbox"]').checked,
        start: row.querySelectorAll('input[type="time"]')[0].value,
        end: row.querySelectorAll('input[type="time"]')[1].value,
      };
    });
    await Storage.saveSchedule(sport, schedule);

    this.toast('Profile & schedule saved!', 'success');
  },

  // ==================== ACCOUNT ====================
  bindAccount() {
    // User menu dropdown toggle
    const trigger = document.getElementById('user-menu-trigger');
    const dropdown = document.getElementById('user-dropdown');
    if (trigger && dropdown) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', () => dropdown.classList.remove('open'));
      dropdown.addEventListener('click', (e) => e.stopPropagation());
    }

    // Open account settings
    document.getElementById('open-account-btn')?.addEventListener('click', () => {
      dropdown?.classList.remove('open');
      this.openAccountSettings();
    });

    // Export data
    document.getElementById('export-data-btn')?.addEventListener('click', async () => {
      dropdown?.classList.remove('open');
      const data = await Storage.exportAll();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `procoach-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.toast('Data exported!', 'success');
    });

    // Account modal buttons
    document.getElementById('save-account-btn')?.addEventListener('click', () => this.saveAccountSettings());
    document.getElementById('close-account-btn')?.addEventListener('click', () => {
      document.getElementById('account-modal')?.classList.remove('open');
    });
    document.getElementById('clear-data-btn')?.addEventListener('click', () => this.clearAllData());

    // Close modal on overlay click
    document.getElementById('account-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'account-modal') e.target.classList.remove('open');
    });
  },

  async openAccountSettings() {
    const profile = await Storage.getUserProfile();
    const nameInput = document.getElementById('account-name');
    const sinceInput = document.getElementById('account-since');
    const typeInput = document.getElementById('account-type');

    if (nameInput) nameInput.value = profile.name || '';
    if (sinceInput) sinceInput.value = profile.createdAt
      ? new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : 'Just now';
    if (typeInput) typeInput.value = firebaseReady ? 'Google Account (Cloud Sync)' : 'Guest (Local Storage)';

    document.getElementById('account-modal')?.classList.add('open');
  },

  async saveAccountSettings() {
    const name = document.getElementById('account-name')?.value.trim();
    if (!name) { this.toast('Please enter a name.', 'error'); return; }

    const profile = await Storage.getUserProfile();
    profile.name = name;
    await Storage.saveUserProfile(profile);

    // Update UI everywhere
    document.getElementById('user-name').textContent = name;
    document.getElementById('welcome-user-name').textContent = name;
    if (!firebaseReady) localStorage.setItem('pc_guest_name', name);

    document.getElementById('account-modal')?.classList.remove('open');
    this.toast('Account updated!', 'success');
  },

  async clearAllData() {
    if (!confirm('Are you sure? This will permanently delete ALL your data across all sports. This cannot be undone.')) return;

    const sports = ['cricket', 'football', 'tennis', 'basketball', 'hockey', 'volleyball'];
    for (const sport of sports) {
      await Storage.set(`${sport}/analyses`, []);
      await Storage.set(`${sport}/sessions`, []);
      await Storage.set(`${sport}/progress`, {});
      await Storage.set(`${sport}/profile`, { role: null, level: 'beginner' });
      await Storage.set(`${sport}/schedule`, {
        monday: { active: false, start: '17:00', end: '19:00' },
        tuesday: { active: false, start: '17:00', end: '19:00' },
        wednesday: { active: false, start: '17:00', end: '19:00' },
        thursday: { active: false, start: '17:00', end: '19:00' },
        friday: { active: false, start: '17:00', end: '19:00' },
        saturday: { active: false, start: '09:00', end: '12:00' },
        sunday: { active: false, start: '09:00', end: '12:00' },
      });
    }
    Storage.clearCache();
    document.getElementById('account-modal')?.classList.remove('open');
    this.toast('All data cleared.', 'success');
    this.showOverview();
  },

  // ==================== HELPERS ====================
  capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  },
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
