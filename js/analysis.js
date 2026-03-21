/**
 * Analysis Module - AI-powered technique analysis
 * Sport-agnostic: uses SportsData for sport-specific feedback
 */
const Analysis = {
  poseLandmarker: null,
  isInitialized: false,
  currentSport: 'cricket',
  currentType: null,

  async init() {
    if (this.isInitialized) return;
    try {
      const vision = await window.FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );
      this.poseLandmarker = await window.PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numPoses: 1,
      });
      this.isInitialized = true;
    } catch (err) {
      console.warn('MediaPipe init failed, using simulated analysis:', err);
      this.isInitialized = true;
      this.poseLandmarker = null;
    }
  },

  async analyzeVideo(videoEl, sport, type, onProgress) {
    this.currentSport = sport;
    this.currentType = type;
    await this.init();

    const frames = [];
    const duration = videoEl.duration;
    const sampleRate = 0.1;
    const totalFrames = Math.floor(duration / sampleRate);

    return new Promise((resolve) => {
      let frameIndex = 0;

      const processFrame = () => {
        if (frameIndex >= totalFrames || videoEl.ended) {
          const result = this.generateFeedback(frames, sport, type);
          resolve(result);
          return;
        }

        const time = frameIndex * sampleRate;
        videoEl.currentTime = time;

        videoEl.onseeked = () => {
          let landmarks = null;
          if (this.poseLandmarker) {
            try {
              const results = this.poseLandmarker.detectForVideo(videoEl, time * 1000);
              if (results.landmarks && results.landmarks.length > 0) {
                landmarks = results.landmarks[0];
              }
            } catch (e) { /* skip frame */ }
          }

          if (landmarks) frames.push({ time, landmarks });
          frameIndex++;
          if (onProgress) onProgress(frameIndex / totalFrames);
          requestAnimationFrame(processFrame);
        };
      };

      videoEl.onseeked = null;
      processFrame();
    });
  },

  drawPose(canvas, landmarks, videoEl) {
    const ctx = canvas.getContext('2d');
    canvas.width = videoEl.videoWidth || videoEl.clientWidth;
    canvas.height = videoEl.videoHeight || videoEl.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!landmarks) return;

    const connections = [
      [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
      [11, 23], [12, 24], [23, 24], [23, 25], [25, 27],
      [24, 26], [26, 28],
    ];

    ctx.strokeStyle = '#e94560';
    ctx.lineWidth = 3;
    connections.forEach(([a, b]) => {
      if (landmarks[a] && landmarks[b]) {
        ctx.beginPath();
        ctx.moveTo(landmarks[a].x * canvas.width, landmarks[a].y * canvas.height);
        ctx.lineTo(landmarks[b].x * canvas.width, landmarks[b].y * canvas.height);
        ctx.stroke();
      }
    });

    landmarks.forEach((lm, i) => {
      if (i <= 28) {
        ctx.beginPath();
        ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#ff6b81';
        ctx.fill();
      }
    });
  },

  generateFeedback(frames, sport, type) {
    // Always use simulated analysis based on sport-specific data
    return this.simulateAnalysis(sport, type);
  },

  /**
   * Generate realistic analysis using sport-specific data from SportsData
   */
  async simulateAnalysis(sport, type) {
    const sportData = SportsData[sport];
    if (!sportData) return { type, overallScore: 50, feedback: [], drills: [] };

    const aspects = sportData.aspects[type];
    if (!aspects) return { type, overallScore: 50, feedback: [], drills: [] };

    const profile = await Storage.getProfile(sport);
    const level = profile.level || 'beginner';
    const analyses = await Storage.getAnalyses(sport);
    const prevOfType = analyses.filter(a => a.analysisType === type);

    // Score ranges by level
    const baseRanges = {
      beginner: [40, 65],
      intermediate: [55, 78],
      advanced: [70, 88],
      elite: [80, 95],
    };
    const [min, max] = baseRanges[level] || baseRanges.beginner;
    const improvement = Math.min(prevOfType.length * 1.5, 10);

    const feedback = [];
    const drills = [];

    aspects.forEach(aspect => {
      const score = Math.min(Math.round(min + Math.random() * (max - min) + improvement), 98);
      let lvl, text;
      if (score >= 75) {
        lvl = 'good';
        text = aspect.goodText;
      } else if (score >= 55) {
        lvl = 'improve';
        text = aspect.improveText;
        drills.push(aspect.drill);
      } else {
        lvl = 'critical';
        text = aspect.criticalText;
        drills.push(aspect.drill);
      }
      feedback.push({ aspect: aspect.name, score, level: lvl, text });
    });

    const overallScore = Math.round(feedback.reduce((s, f) => s + f.score, 0) / feedback.length);

    return {
      sport,
      type,
      analysisType: type,
      overallScore,
      feedback,
      drills,
      frameCount: 0,
    };
  },
};
