/**
 * Regimen Module - Generates personalized weekly training plans
 * Sport-agnostic: uses SportsData for sport-specific sessions
 */
const Regimen = {

  async generateWeekPlan(sport, weekOffset = 0) {
    const profile = await Storage.getProfile(sport);
    const schedule = await Storage.getSchedule(sport);
    const analyses = await Storage.getAnalyses(sport);
    const progress = await Storage.getProgress(sport);

    const weakAreas = this.identifyWeakAreas(analyses, sport);
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + mondayOffset + (weekOffset * 7));

    const plan = [];
    let trainingDayIndex = 0;
    const activeDays = daysOfWeek.filter(d => schedule[d]?.active);
    const totalTrainingDays = activeDays.length;

    daysOfWeek.forEach((day, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = dateStr === today.toISOString().split('T')[0];

      if (schedule[day]?.active) {
        const sessions = this.generateDaySessions(
          sport, profile, weakAreas, trainingDayIndex, totalTrainingDays, schedule[day]
        );
        plan.push({ day, date: dateStr, isToday, isRest: false, start: schedule[day].start, end: schedule[day].end, sessions });
        trainingDayIndex++;
      } else {
        plan.push({ day, date: dateStr, isToday, isRest: true });
      }
    });

    return plan;
  },

  identifyWeakAreas(analyses, sport) {
    const weakAreas = {};
    const sportData = SportsData[sport];
    if (!sportData) return weakAreas;

    sportData.analysisTypes.forEach(at => {
      weakAreas[at.id] = [];
      const typeAnalyses = analyses.filter(a => a.analysisType === at.id).slice(0, 10);
      const aspectScores = {};

      typeAnalyses.forEach(a => {
        if (a.feedback) {
          a.feedback.forEach(fb => {
            if (!aspectScores[fb.aspect]) aspectScores[fb.aspect] = [];
            aspectScores[fb.aspect].push(fb.score);
          });
        }
      });

      Object.entries(aspectScores).forEach(([aspect, scores]) => {
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        if (avg < 70) weakAreas[at.id].push({ aspect, avgScore: avg });
      });

      weakAreas[at.id].sort((a, b) => a.avgScore - b.avgScore);
    });

    return weakAreas;
  },

  generateDaySessions(sport, profile, weakAreas, dayIndex, totalDays, timeSlot) {
    const sportData = SportsData[sport];
    if (!sportData) return [];

    const sessions = [];
    const level = profile.level || 'beginner';

    // Calculate duration
    const start = timeSlot.start.split(':').map(Number);
    const end = timeSlot.end.split(':').map(Number);
    const totalMinutes = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);

    // Warmup
    sessions.push({
      title: 'Warm-up',
      duration: Math.min(15, Math.round(totalMinutes * 0.1)),
      exercises: sportData.warmup(level),
    });

    // Rotate through analysis types based on day index
    const types = sportData.analysisTypes;
    const remainingTime = totalMinutes - 25; // After warmup and cooldown

    // Primary focus: rotate through types
    const primaryType = types[dayIndex % types.length];
    if (sportData.sessions[primaryType.id]) {
      const session = sportData.sessions[primaryType.id](level, weakAreas[primaryType.id] || []);
      session.duration = Math.round(remainingTime * 0.5);
      sessions.push(session);
    }

    // Secondary focus on alternating days
    if (totalDays >= 2 && types.length > 1) {
      const secondaryType = types[(dayIndex + 1) % types.length];
      if (sportData.sessions[secondaryType.id]) {
        const session = sportData.sessions[secondaryType.id](level, weakAreas[secondaryType.id] || []);
        session.duration = Math.round(remainingTime * 0.25);
        sessions.push(session);
      }
    }

    // Fitness on even days
    if (dayIndex % 2 === 0 && sportData.fitness) {
      const fitnessSession = sportData.fitness(level);
      fitnessSession.duration = Math.round(remainingTime * 0.25);
      sessions.push(fitnessSession);
    }

    // Cooldown
    sessions.push({
      title: 'Cool Down & Stretch',
      duration: 10,
      exercises: [
        'Light jog for 3 minutes',
        'Sport-specific stretching routine',
        'Hamstring and quad stretches (30s each)',
        'Upper body stretches',
        'Deep breathing and reflection',
      ],
    });

    return sessions;
  },

  async getTodayFocus(sport) {
    const plan = await this.generateWeekPlan(sport, 0);
    const today = plan.find(d => d.isToday);
    if (!today || today.isRest) {
      return { isRest: true, nextDay: plan.find(d => !d.isRest && new Date(d.date) > new Date()) };
    }
    return { isRest: false, ...today };
  },
};
