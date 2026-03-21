/**
 * Sports Data - Multi-sport AI coaching platform data definitions
 * Contains sport-specific analysis data for cricket, football, tennis, basketball, and hockey
 */

const SportsData = {

  // ============================================================
  // CRICKET
  // ============================================================
  cricket: {
    name: 'Cricket',
    icon: '\u{1F3CF}',
    color: '#4CAF50',
    roles: [
      { id: 'batsman', name: 'Batsman' },
      { id: 'bowler', name: 'Bowler' },
      { id: 'all-rounder', name: 'All-Rounder' },
      { id: 'wicket-keeper', name: 'Wicket-Keeper' },
    ],
    analysisTypes: [
      { id: 'batting', name: 'Batting', icon: '\u{1F3CF}' },
      { id: 'bowling', name: 'Bowling', icon: '\u26BE' },
      { id: 'fielding', name: 'Fielding', icon: '\u{1F9E4}' },
    ],
    levels: [
      { id: 'beginner', name: 'Beginner' },
      { id: 'intermediate', name: 'Intermediate' },
      { id: 'advanced', name: 'Advanced' },
      { id: 'elite', name: 'Elite' },
    ],
    aspects: {
      batting: [
        {
          name: 'Stance & Balance',
          goodText: 'Solid base with weight evenly distributed on the balls of both feet. Head is over the centre of the stance and eyes are level, allowing early judgment of length and line.',
          improveText: 'Your base is reasonable but weight distribution is slightly off. Focus on keeping your head still and centred, with knees slightly flexed and weight on the balls of your feet rather than your heels.',
          criticalText: 'Significant balance issues in your stance. You are either too front-heavy or leaning back, which delays your initial movement. Reset with feet shoulder-width apart, knees soft, and head perfectly still.',
          drill: { name: 'Balance Board Stance', desc: 'Stand on a wobble board in your batting stance. Hold for 30 seconds, then shadow-bat a front foot drive and a back foot punch without stepping off. 4 sets of 8 repetitions each side.' },
        },
        {
          name: 'Backlift',
          goodText: 'Clean, straight backlift with the bat face angled towards second slip. The pickup is smooth and initiated by the top hand, giving you time to adjust to any delivery.',
          improveText: 'Your backlift has a slight loop or goes towards gully. This can cause the bat face to open on contact. Focus on taking the bat straight back towards the stumps with your top hand guiding the movement.',
          criticalText: 'Your backlift is either too low, reducing power, or excessively looped, causing timing issues. The bat needs to come up straight and early, guided by the top hand, with the face angled towards slip.',
          drill: { name: 'Wall Backlift Drill', desc: 'Stand in your stance with your back to a wall, 6 inches away. Lift the bat so it brushes the wall on the way up, ensuring a straight path. Repeat 40 times, then face 20 throwdowns focusing on the same feel.' },
        },
        {
          name: 'Footwork',
          goodText: 'Decisive foot movement with an excellent initial trigger step. You are getting to the pitch of the ball on front foot shots and transferring weight well on the back foot.',
          improveText: 'Your feet are moving but not decisively enough. The front foot stride is short on drives and you are occasionally caught in the crease. Work on a positive first step towards the ball.',
          criticalText: 'Feet are planted or moving too late. This forces you to play with your arms and compromises your balance. You need to move your front foot towards the pitch of the ball early and commit to the movement.',
          drill: { name: 'Cone Footwork Circuit', desc: 'Place 4 cones: front-left, front-right, back-left, back-right. A feeder calls a direction and you stride to that cone and play the appropriate shot. 5 sets of 12 movements with 60 seconds rest.' },
        },
        {
          name: 'Head Position',
          goodText: 'Head is still and leading the shot beautifully. Eyes remain level through contact, giving you the best possible view of the ball from release to bat.',
          improveText: 'Some lateral head movement is pulling your eyes off-level. Your head should lead forward into front foot shots and stay still on back foot play. Focus on watching the ball onto the bat face.',
          criticalText: 'Excessive head movement is making it very difficult to judge length early. Your head is falling away to the off side on drives. Concentrate on leading with your head and keeping eyes level at all times.',
          drill: { name: 'Head-Still Throwdowns', desc: 'Place a coin on top of your helmet. Face 30 throwdowns at medium pace; the coin should not fall off. If it does, reset and focus on minimising head sway. Progress to faster deliveries over 3 sessions.' },
        },
        {
          name: 'Shot Selection',
          goodText: 'Excellent decision-making, leaving well outside off stump and picking the right shot for each delivery. You are reading length early and committing to your strokes with confidence.',
          improveText: 'Occasionally fishing at deliveries outside off stump or playing across the line to straight balls. Work on a clear decision framework: leave, defend, or attack based on length and line.',
          criticalText: 'Poor shot selection is leading to high-risk dismissals. You are attempting aggressive shots to good-length balls and not respecting the conditions. Develop a clear plan for each delivery zone.',
          drill: { name: 'Zone Batting Drill', desc: 'Mark 4 zones on the pitch: leave, defend, push, and drive. A feeder delivers to random zones and you must call the zone before playing. 3 sets of 20 balls, aiming for 85% correct calls.' },
        },
      ],
      bowling: [
        {
          name: 'Run-up & Approach',
          goodText: 'Smooth, rhythmical approach with consistent acceleration into the crease. Your run-up length suits your action and you are hitting the crease in a strong, balanced position.',
          improveText: 'Your run-up has some inconsistency in pace, causing you to stutter or over-stride at the crease. Mark your run-up carefully and focus on a gradual build-up of speed in the last four steps.',
          criticalText: 'Your approach is erratic, with significant speed variation that disrupts your bowling action. You are arriving at the crease off-balance. Shorten your run-up by 2 steps and focus purely on rhythm.',
          drill: { name: 'Marker Run-Up Drill', desc: 'Place flat cones at every 2-stride interval in your run-up. Practice hitting each marker 15 times without bowling. Then bowl 12 balls focusing on the same rhythm. Film and review for consistency.' },
        },
        {
          name: 'Bowling Arm Action',
          goodText: 'High, straight arm coming through close to your ear with excellent wrist behind the ball. This generates good pace or revolutions while keeping the action legal and repeatable.',
          improveText: 'Your arm is slightly low or coming through wide of your body. This reduces accuracy and can cause the ball to spray. Focus on brushing your ear with your bowling arm and keeping the elbow high.',
          criticalText: 'Your arm action has a significant kink or is too round-arm, limiting your control and pace. You need to rebuild with standing-start drills, focusing on a high arm that comes straight over the top.',
          drill: { name: 'Standing Arm Action Drill', desc: 'Stand side-on at the crease. Bowl 30 balls using only your bowling arm action with no run-up. Focus on the arm brushing past your ear and a full extension at release. Film from side-on to check.' },
        },
        {
          name: 'Front Foot Landing',
          goodText: 'Strong, braced front leg at delivery with foot landing in line with the target. Your front foot acts as a solid pivot, allowing you to transfer all momentum into the ball.',
          improveText: 'Your front foot is either too open or landing slightly off-line, which leaks energy sideways. Aim to land with your front foot pointing at the batsman and brace through the front knee firmly.',
          criticalText: 'Your front foot is collapsing on landing, absorbing momentum instead of transferring it. The foot is also landing too wide. This is costing you significant pace and accuracy.',
          drill: { name: 'Target Landing Drill', desc: 'Place a towel on the crease where your front foot should land. Bowl 20 balls aiming to land on the towel each time. Gradually add run-up speed. Track your hit rate and aim for 80%.' },
        },
        {
          name: 'Wrist Position & Seam',
          goodText: 'Wrist is firmly behind the ball at release with the seam upright. This is giving you consistent movement off the pitch and good control of your stock delivery.',
          improveText: 'Your wrist is falling to one side at release, causing the seam to wobble. This reduces movement and makes your length inconsistent. Focus on keeping the seam upright with the wrist directly behind the ball.',
          criticalText: 'The wrist position at release is very inconsistent. The seam is scrambled on most deliveries. Spend dedicated time bowling with a focus purely on seam presentation, ignoring pace entirely.',
          drill: { name: 'Seam-Up Wall Drill', desc: 'Stand 3 metres from a wall. Bowl the ball into the wall focusing only on seam position. The ball should hit and return with the seam still upright. 4 sets of 25 deliveries.' },
        },
        {
          name: 'Follow Through',
          goodText: 'Complete follow-through with your bowling arm sweeping past the opposite hip and momentum carrying you down the pitch. This protects your body from injury and maximises energy transfer.',
          improveText: 'Your follow-through is slightly abbreviated, which puts extra stress on your shoulder and back. Let your arm swing fully across your body and take at least 3-4 steps down the pitch after release.',
          criticalText: 'You are pulling out of your action at release, stopping your follow-through short. This is an injury risk and reduces your effectiveness. You must commit to a full, flowing follow-through.',
          drill: { name: 'Follow-Through Targets', desc: 'Place a cone 4 metres down the pitch from the crease. After every delivery, your momentum should carry you past the cone. Bowl 3 overs focusing entirely on a complete follow-through.' },
        },
      ],
      fielding: [
        {
          name: 'Ready Position',
          goodText: 'Excellent athletic ready position with weight forward on the balls of your feet, hands in front, and eyes locked on the batsman. You are reacting quickly to every ball.',
          improveText: 'Your ready position is a bit upright with weight on your heels. Get lower with knees bent, hands forward and fingers pointing down, weight on the balls of your feet before every delivery.',
          criticalText: 'You are standing too tall and flat-footed, which is delaying your reaction by a critical half-second. Adopt a low, athletic crouch with hands ready before the bowler delivers.',
          drill: { name: 'Ready Position Reaction Drill', desc: 'Crouch in ready position. A partner rolls or throws balls randomly left and right. React and field cleanly. 4 sets of 10 balls each side. Rest 45 seconds between sets.' },
        },
        {
          name: 'Ground Fielding',
          goodText: 'Clean ground fielding with hands together, head over the ball, and body behind the line. Your pick-up and transfer to throwing hand is quick and smooth.',
          improveText: 'You are reaching for the ball rather than getting your body behind it. Move your feet to get in line, bend low with your head over the ball, and use the long barrier when under no time pressure.',
          criticalText: 'Ground fielding errors are occurring because your head is pulling away and your hands are not working together. Focus on the basics: get in line, head over ball, hands together, fingers down.',
          drill: { name: 'Figure-8 Ground Fielding', desc: 'Place 2 cones 5 metres apart. A feeder rolls balls alternately to each side. Sprint, field with correct technique, throw at a single stump, then loop around to the other cone. 3 sets of 16.' },
        },
        {
          name: 'Catching',
          goodText: 'Reliable, soft hands with excellent technique. You are watching the ball right into your hands and giving with the catch. High catches and low catches both look comfortable.',
          improveText: 'You are snatching at catches with hard hands. Focus on watching the ball all the way in, presenting your fingers (up for above chest, down for below), and cushioning the ball on arrival.',
          criticalText: 'Catching is a major concern. Drops are occurring because you are turning your head or grabbing too early. Rebuild from close-range pairs catching and focus purely on watching the ball into your hands.',
          drill: { name: 'Soft Hands Catching Pairs', desc: 'Stand 5 metres apart. Throw catches of increasing difficulty: chest height, low, high, left, right. Catch with relaxed fingers and give with the ball. 3 sets of 20 catches each.' },
        },
        {
          name: 'Throwing Accuracy',
          goodText: 'Strong, accurate throws with a quick release and a flat trajectory to the keeper or bowler end. Your crow-hop generates good power without wasting time.',
          improveText: 'Your throws are reaching the target but not consistently flat or on target. Work on a compact crow-hop and aiming at the top of the stumps every time. Reduce your wind-up.',
          criticalText: 'Throws are consistently off target or lobbing rather than flat. Your arm action on the throw needs work. Focus on a side-on position, high elbow, and snapping the wrist through to the target.',
          drill: { name: 'Stump Hitting Relay', desc: 'Set up a single stump at 20 metres. Field a ground ball rolling towards you, crow-hop, and throw at the stump. Score 1 point per hit. 3 sets of 10 throws. Aim for 6+ hits per set.' },
        },
      ],
    },

    warmup(level) {
      const base = [
        'Light jog (5 min)',
        'Dynamic stretching - arm circles, leg swings',
        'High knees and butt kicks (2 min)',
      ];
      if (level !== 'beginner') {
        base.push('Lateral shuffles and carioca (2 min)');
        base.push('Cricket-specific agility - pick up and throw drill');
      }
      if (level === 'advanced' || level === 'elite') {
        base.push('Resistance band shoulder activation (10 reps each direction)');
      }
      return base;
    },

    sessions: {
      batting(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Shadow batting - 20 front foot drives, 20 back foot punches');
          exercises.push('Tee batting - focus on straight bat, 30 balls');
          exercises.push('Soft ball throwdowns - watch the ball onto the bat, 25 balls');
        } else if (level === 'intermediate') {
          exercises.push('Throwdowns - 20 front foot drives, 15 cuts, 15 pulls');
          exercises.push('Net batting against medium pace - 40 balls');
          exercises.push('Scenario batting: build an innings for 20 balls');
        } else if (level === 'advanced') {
          exercises.push('Quality net session - 50 balls mixed pace and spin');
          exercises.push('Bouncer practice with evasion and hook/pull selection');
          exercises.push('Power hitting: lofted drives and sweeps, 20 balls');
        } else {
          exercises.push('High-intensity nets - 60 balls, mixed match-quality bowling');
          exercises.push('Pressure scenario: last over simulation, 12 to win');
          exercises.push('Spin mastery: read from hand, 25 balls against quality spin');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Targeted weakness drill: ' + weakAreas[0].aspect + ' correction (15 balls)');
        }
        return { title: 'Batting Practice', exercises };
      },
      bowling(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Standing delivery - arm action only, 20 balls at single stump');
          exercises.push('3-step run-up bowling at target zone, 20 balls');
          exercises.push('Full run-up - focus on rhythm, 15 balls');
        } else if (level === 'intermediate') {
          exercises.push('Line and length bowling - target zones marked, 30 balls');
          exercises.push('Variation practice: slower ball or bouncer, 15 balls');
          exercises.push('Bowling to a batsman in nets - plan each over');
        } else if (level === 'advanced') {
          exercises.push('Match-intensity spell: 4 overs with field settings');
          exercises.push('Death bowling: yorker practice at the base of off stump, 20 balls');
          exercises.push('Reverse swing or spin variations, 15 balls');
        } else {
          exercises.push('Extended spell: 6 overs, full match simulation');
          exercises.push('Advanced variation sequences to set up batsmen');
          exercises.push('Video review and correction from previous session');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Targeted weakness drill: ' + weakAreas[0].aspect);
        }
        return { title: 'Bowling Practice', exercises };
      },
      fielding(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Catching pairs - 20 catches each at chest height');
          exercises.push('Ground fielding basics - long barrier, 15 each side');
          exercises.push('Underarm shy at single stump from 10 metres');
        } else if (level === 'intermediate') {
          exercises.push('High catches under the lid - 15 catches');
          exercises.push('Dive and slide practice on both sides, 10 each');
          exercises.push('Quick pick-up and throw relay - 20 reps');
        } else if (level === 'advanced') {
          exercises.push('Slip catching at match speed - 25 catches');
          exercises.push('Direct hit practice from 20, 30, and 40 metres');
          exercises.push('Boundary fielding: slide, pick up, throw in one motion');
        } else {
          exercises.push('High-pressure catching under fatigue');
          exercises.push('Run-out drills from all infield positions');
          exercises.push('Team fielding drill: cut-offs and relays under time pressure');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' specific drills');
        }
        return { title: 'Fielding Practice', exercises };
      },
    },

    fitness(level) {
      if (level === 'beginner') {
        return { title: 'Cricket Fitness', exercises: [
          'Sprint intervals: 5x 20m sprints with walk-back recovery',
          'Core: 3x 30-second planks',
          'Bodyweight squats: 3x 15',
          'Push-ups: 3x 10',
        ]};
      } else if (level === 'intermediate') {
        return { title: 'Cricket Fitness', exercises: [
          'Sprint intervals: 8x 30m sprints',
          'Core circuit: planks, Russian twists, leg raises (3 rounds)',
          'Squats and lunges: 4x 12 each',
          'Medicine ball rotational throws: 3x 10 each side',
        ]};
      } else {
        return { title: 'Cricket Fitness', exercises: [
          'Speed and agility ladder: 10 patterns',
          'Core circuit: 4 exercises x 45 seconds (3 rounds)',
          'Plyometrics: box jumps and broad jumps, 3x 8',
          'Rotational power: cable or band work, 3x 12 each side',
          'Cricket-specific 2km time trial or yo-yo test',
        ]};
      }
    },
  },

  // ============================================================
  // FOOTBALL (SOCCER)
  // ============================================================
  football: {
    name: 'Football',
    icon: '\u26BD',
    color: '#1E88E5',
    roles: [
      { id: 'forward', name: 'Forward' },
      { id: 'midfielder', name: 'Midfielder' },
      { id: 'defender', name: 'Defender' },
      { id: 'goalkeeper', name: 'Goalkeeper' },
    ],
    analysisTypes: [
      { id: 'shooting', name: 'Shooting', icon: '\u{1F945}' },
      { id: 'passing', name: 'Passing', icon: '\u{1F45F}' },
      { id: 'dribbling', name: 'Dribbling', icon: '\u{1F3C3}' },
      { id: 'defending', name: 'Defending', icon: '\u{1F6E1}\uFE0F' },
    ],
    levels: [
      { id: 'beginner', name: 'Beginner' },
      { id: 'intermediate', name: 'Intermediate' },
      { id: 'advanced', name: 'Advanced' },
      { id: 'elite', name: 'Elite' },
    ],
    aspects: {
      shooting: [
        {
          name: 'Body Position',
          goodText: 'Excellent body shape over the ball at the moment of strike. Your chest and hips are square to the target, giving you a stable platform for an accurate, powerful shot.',
          improveText: 'Your upper body is leaning back slightly at the point of contact, which causes shots to rise. Focus on getting your body over the ball with your chest pointing towards the target.',
          criticalText: 'Body position is very open and leaning away from the ball, causing shots to fly high and wide. You need to lean over the ball, keep your head down, and drive through the centre of the ball.',
          drill: { name: 'Cone Gate Shooting', desc: 'Set up two cones as a gate 1 metre wide on the goal line at each corner. From 16 metres, strike low and through the gates. Focus on leaning over the ball. 4 sets of 8 shots, alternating corners.' },
        },
        {
          name: 'Plant Foot',
          goodText: 'Plant foot is placed firmly alongside the ball, pointing at the target. This gives you excellent balance and accuracy, and your standing leg absorbs the rotational force well.',
          improveText: 'Your plant foot is landing either too far behind or too far ahead of the ball. Aim to plant your foot level with the ball, about 15-20cm to the side, pointing at your target.',
          criticalText: 'Plant foot placement is inconsistent and often too far from the ball, forcing you to reach and lose balance. Every shot starts with the plant foot: get it right and accuracy follows.',
          drill: { name: 'Marker Plant Drill', desc: 'Place a flat disc where your plant foot should land relative to a stationary ball. Practice planting on the disc and striking. 30 repetitions with each foot. Remove the disc and repeat from memory.' },
        },
        {
          name: 'Strike Technique',
          goodText: 'Clean contact through the centre of the ball with a locked ankle. Whether using laces or instep, your technique generates power and keeps the ball on target consistently.',
          improveText: 'Contact point is slightly off-centre, causing shots to swerve unintentionally. Lock your ankle firmly, point your toe down for laces strikes, and focus on hitting the midline of the ball.',
          criticalText: 'Inconsistent contact is severely limiting your shooting. You are hitting the ball with different parts of the foot each time. Start with stationary ball striking, focusing on laces contact with a locked ankle.',
          drill: { name: 'Dead Ball Accuracy', desc: 'Place 5 balls on the edge of the box. Strike each at a specific target: bottom-left, bottom-right, top-left, top-right, centre. Repeat 4 rounds. Track your accuracy percentage.' },
        },
        {
          name: 'Follow Through',
          goodText: 'Full, flowing follow-through with your kicking foot swinging towards the target. Your momentum carries you forward naturally, which adds power and ensures clean contact.',
          improveText: 'You are cutting your follow-through short, which reduces power and can cause the ball to bobble. Let your kicking leg swing all the way through, landing on your striking foot.',
          criticalText: 'Virtually no follow-through, which means you are poking at the ball rather than striking through it. Commit to a full swing and let your body follow the ball towards the goal.',
          drill: { name: 'One-Step Power Drill', desc: 'From a standing position one step behind the ball, take one step and strike with full follow-through, landing on your kicking foot. 4 sets of 10. Focus on the follow-through feel, not power.' },
        },
        {
          name: 'Shot Selection',
          goodText: 'Smart decision-making: you are picking the right technique for each situation, whether it is a driven shot, a placed finish, or a chip. You read the goalkeeper position well.',
          improveText: 'You are defaulting to power when placement would be more effective. Assess the keeper position and the angle before shooting. Sometimes a side-foot finish is better than a blast.',
          criticalText: 'Shot selection is poor. You are shooting from bad angles and ignoring better-positioned teammates. Work on your decision framework: can I score? Is there a better option? Then commit fully.',
          drill: { name: 'Situational Finishing', desc: 'A server plays balls into the box from various angles. A mannequin or keeper is in goal. Before each shot, call your technique (driven, placed, chip). 3 sets of 10 with a 30-second decision review after each set.' },
        },
      ],
      passing: [
        {
          name: 'Body Orientation',
          goodText: 'Your body is well-positioned before receiving, already open to the direction of your next pass. This allows quick, accurate distribution and keeps the play moving forward.',
          improveText: 'You are often square to the ball when receiving, which means you need extra touches to reposition before passing. Open your hips to scan the field before the ball arrives.',
          criticalText: 'Closed body shape is forcing you into backwards passes and slowing down transitions. Before the ball arrives, check your shoulders, open your body to the play, and know your next move.',
          drill: { name: 'Rondo with Body Shape', desc: 'Play a 4v2 rondo. Before receiving, you must open your body to show where you will pass. If you pass backwards, you enter the middle. 5-minute rounds, 4 rounds. Focus on body orientation before the ball arrives.' },
        },
        {
          name: 'Weight of Pass',
          goodText: 'Consistently hitting teammates in stride with the perfect pace on the ball. Your passes arrive at the right speed for the situation, whether it is a quick one-two or a through ball.',
          improveText: 'Passes are sometimes too firm or too soft. A good pass should arrive at your teammate at a comfortable pace. Practice varying the weight based on distance and whether the player is moving.',
          criticalText: 'Pass weight is very inconsistent, forcing teammates to break stride or letting defenders intercept. Focus on firm passes to feet on short range, and weighted into space on longer passes.',
          drill: { name: 'Gate Passing Circuit', desc: 'Set up 5 pairs of cones (gates) at 10, 15, 20, 25, and 30 metres. Pass through each gate with the correct weight so the ball stops within 2 metres past the gate. 3 full circuits with each foot.' },
        },
        {
          name: 'First Touch',
          goodText: 'Outstanding first touch that sets the ball perfectly for the next action. You are cushioning the ball into space away from pressure, which gives you time and options.',
          improveText: 'Your first touch is sometimes heavy, pushing the ball too far from your body. Relax your receiving foot, cushion the ball, and direct it into the space where you want to play next.',
          criticalText: 'First touch is letting you down badly, giving the ball away under pressure. The ball is bouncing off your foot. Soften the receiving surface, withdraw your foot on contact, and direct the ball out of your feet.',
          drill: { name: 'Wall Touch Drill', desc: 'Pass against a wall from 5 metres. Control the return with one touch into a marked zone (1m square, left or right). Alternate feet. 4 sets of 20. The ball must stop in the zone on your first touch.' },
        },
        {
          name: 'Vision & Awareness',
          goodText: 'Excellent scanning habits. You check your shoulders before receiving and consistently find the most progressive passing option. Your awareness of teammate and opponent positions is strong.',
          improveText: 'You tend to look down at the ball too much. Develop a habit of scanning left, right, and behind before the ball arrives. This split-second awareness creates better passing decisions.',
          criticalText: 'Very limited awareness of surrounding options. You are passing to the most obvious player rather than the best option. Before receiving, scan at least twice to build a mental picture of the field.',
          drill: { name: 'Scanning Passing Game', desc: 'In a 20x20m grid with 3 teammates, a coach holds up coloured cones behind you. Before each pass, call the colour. Forces you to scan. 5-minute rounds, 4 rounds. Track correct colour calls.' },
        },
      ],
      dribbling: [
        {
          name: 'Close Control',
          goodText: 'Ball stays glued to your feet with small, controlled touches. You can dribble at pace while keeping the ball within playing distance, making you very difficult to dispossess.',
          improveText: 'Your touches are slightly too heavy, pushing the ball 2-3 feet ahead. Use the inside, outside, and sole of your foot to keep the ball within one stride at all times.',
          criticalText: 'The ball is getting away from you regularly while dribbling. Every touch should keep the ball within one stride. Slow down, use more touches, and focus on keeping the ball close before adding speed.',
          drill: { name: 'Tight Space Dribble Box', desc: 'In a 5x5m box with 4 cones inside, dribble around all 4 cones without leaving the box. Use inside, outside, and sole touches. 30 seconds on, 30 seconds rest. 6 sets. Count your cone completions.' },
        },
        {
          name: 'Change of Direction',
          goodText: 'Sharp, decisive changes of direction that wrong-foot defenders. You use body feints effectively and your first touch after cutting is always under control, maintaining your advantage.',
          improveText: 'Your direction changes are telegraphed and not sharp enough. Drop your shoulder more aggressively, plant and push off hard, and accelerate into the new space after the cut.',
          criticalText: 'Direction changes are slow and predictable. Defenders are reading you easily. Work on planting your outside foot hard and exploding in the opposite direction. Your body feint must sell the initial direction.',
          drill: { name: 'Zig-Zag Cone Cuts', desc: 'Set up 8 cones in a zig-zag, 3 metres apart. Dribble to each cone, perform a specific move (step-over, Cruyff turn, drag-back), then accelerate to the next. Time yourself. 6 runs, beat your time each run.' },
        },
        {
          name: 'Use of Both Feet',
          goodText: 'Comfortable using both feet to dribble, which makes you unpredictable and allows you to go either direction equally well. Defenders cannot force you onto your weak side.',
          improveText: 'You favour your dominant foot and defenders are shepherding you that way. Dedicate extra practice to your weaker foot so you can go both directions with confidence.',
          criticalText: 'You are almost exclusively one-footed, making you very predictable. Defenders simply show you onto your weak foot and you lose the ball. Commit to using your weak foot in every training session.',
          drill: { name: 'Weak Foot Dribble Laps', desc: 'Dribble around the pitch using ONLY your weaker foot. Inside, outside, sole, and laces touches. 3 laps, then play a 5-minute small-sided game using only your weak foot. Repeat 3 times per week.' },
        },
        {
          name: 'Speed with Ball',
          goodText: 'You maintain nearly full sprint speed while dribbling. The ball is pushed into space with longer touches at the right moments, and your running mechanics stay efficient with the ball.',
          improveText: 'You slow down significantly when dribbling. Learn to push the ball 2-3 metres ahead into space and sprint to it, rather than taking many small touches at pace.',
          criticalText: 'There is a dramatic speed difference between your running with and without the ball. You need to develop the confidence to push the ball ahead and run. Start with straight-line speed dribbling.',
          drill: { name: 'Speed Dribble Sprints', desc: 'Dribble 40 metres at full speed using 5-6 touches (push and sprint). Time each run. Compare to your 40m sprint time without the ball. Aim to be within 1 second. 8 runs with full recovery between each.' },
        },
      ],
      defending: [
        {
          name: 'Body Position',
          goodText: 'Excellent defensive stance: side-on, low centre of gravity, on your toes, with your body angled to show the attacker one way. You are balanced and ready to react in any direction.',
          improveText: 'You are too upright and square-on to attackers. Get lower, turn side-on to channel the attacker onto your preferred side, and stay on the balls of your feet for quick reactions.',
          criticalText: 'Flat-footed and square, making you very easy to beat. You must adopt a side-on stance, bend your knees, lower your centre of gravity, and stay on your toes at all times when defending.',
          drill: { name: 'Mirror Shadowing', desc: 'Partner dribbles slowly in a 10x10m grid. You mirror their movements without the ball, maintaining a side-on stance and 1.5m distance. 4 sets of 60 seconds. Coach checks body shape throughout.' },
        },
        {
          name: 'Jockeying',
          goodText: 'Patient and controlled jockeying. You delay the attacker effectively, staying goal-side and forcing them wide without diving in. Your footwork is quick and balanced throughout.',
          improveText: 'You are either too passive (giving too much space) or too aggressive (lunging in). Find the right distance: close enough to pressure, far enough to react. Use small, quick shuffle steps.',
          criticalText: 'You are diving in immediately instead of jockeying. This makes you easy to beat. Stay on your feet, shuffle backwards, and force the attacker to make a decision. Be patient.',
          drill: { name: 'Channel Jockey Drill', desc: 'In a 5m wide channel, an attacker tries to dribble past you. Your job is to jockey them to the side without tackling. Score a point if they go out of the channel. 10 attempts, then switch. 3 rounds each.' },
        },
        {
          name: 'Tackling Technique',
          goodText: 'Clean, well-timed tackles winning the ball decisively. You go through the ball with commitment, staying on your feet and recovering quickly to play the ball forward.',
          improveText: 'Your tackles are sometimes mistimed or you are going to ground unnecessarily. Stay on your feet as long as possible and only commit when you are confident of winning the ball.',
          criticalText: 'Tackling technique needs significant work. You are either missing the ball or fouling. Focus on timing your challenge for the moment the attacker takes a heavy touch, and go through the ball firmly.',
          drill: { name: 'Timing Tackle Drill', desc: 'Attacker dribbles towards you from 10 metres. They must take a deliberate heavy touch at a random point. You must time your block tackle for that moment. 3 sets of 10. Track successful clean tackles.' },
        },
        {
          name: 'Positioning & Awareness',
          goodText: 'Outstanding positional sense. You read the play well, maintain a compact defensive line, and cover dangerous spaces before the ball arrives. Your interceptions are well-timed.',
          improveText: 'You sometimes lose track of runners or get drawn out of position by the ball. Keep scanning and maintain awareness of both the ball and nearby attackers. Prioritise the dangerous space.',
          criticalText: 'Positioning is a major weakness. You are ball-watching and losing your marker regularly. Work on scanning, knowing where your runner is, and staying goal-side at all times.',
          drill: { name: 'Shadow Defending Game', desc: 'In an 8v8 game, you cannot tackle but must stay within 1.5m of your assigned attacker at all times. A coach checks your position every 10 seconds. Play 3 x 5-minute periods. Track your position success rate.' },
        },
      ],
    },

    warmup(level) {
      const base = [
        'Light jog with dynamic stretches (5 min)',
        'High knees, butt kicks, side shuffles (2 min)',
        'Passing in pairs while moving (3 min)',
      ];
      if (level !== 'beginner') {
        base.push('Rondo warm-up: 4v1 in tight space (4 min)');
        base.push('Short sprint activations: 4x 15m at 80%');
      }
      if (level === 'advanced' || level === 'elite') {
        base.push('Agility ladder patterns with ball at feet (3 min)');
      }
      return base;
    },

    sessions: {
      shooting(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Stationary ball striking from 12 metres: 20 shots each foot');
          exercises.push('One-touch finishing from a rolled pass: 15 shots');
          exercises.push('Side-foot placement into corners from penalty spot: 15 shots');
        } else if (level === 'intermediate') {
          exercises.push('Driven shots from edge of box after a layoff: 20 shots');
          exercises.push('First-time finishing from crosses: 15 attempts');
          exercises.push('Volleys and half-volleys from 14 metres: 15 shots');
        } else if (level === 'advanced') {
          exercises.push('Shooting under pressure with closing defender: 15 reps');
          exercises.push('Quick combination play and finish: 12 reps');
          exercises.push('Long-range curling efforts: 10 from each side');
        } else {
          exercises.push('Game-speed finishing circuit: 5 stations, 3 shots each');
          exercises.push('1v1 against keeper from various angles: 10 reps');
          exercises.push('Pressure finishing: 2 touches max with a closing defender');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' correction drill');
        }
        return { title: 'Shooting Session', exercises };
      },
      passing(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Short passing in pairs: 50 passes each foot');
          exercises.push('Triangle passing and moving: 10 minutes');
          exercises.push('Wall passing: control and pass with both feet');
        } else if (level === 'intermediate') {
          exercises.push('Rondo: 5v2 in 10x10m grid, 2-touch maximum');
          exercises.push('Long-range passing to targets at 30m: 20 passes');
          exercises.push('Through-ball practice with runners: 15 attempts');
        } else if (level === 'advanced') {
          exercises.push('Possession game: 7v7 with 2-touch in own half, free in opponents');
          exercises.push('Switching play: diagonal balls to opposite wing, 15 passes');
          exercises.push('Third-man passing combinations: 12 sequences');
        } else {
          exercises.push('Full-speed passing patterns with movement: 15 minutes');
          exercises.push('Vision drill: find the free player with timed scans');
          exercises.push('Match-condition possession under high press');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' improvement drill');
        }
        return { title: 'Passing Session', exercises };
      },
      dribbling(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Cone weave: inside and outside of foot, 6 runs each foot');
          exercises.push('Sole rolls and tick-tocks in a 3m square: 3 x 60 seconds');
          exercises.push('Dribble and stop on command: 10 reps');
        } else if (level === 'intermediate') {
          exercises.push('1v1 in a 10x10m grid: beat the defender, 10 goes each');
          exercises.push('Move repertoire: step-over, Cruyff turn, drag-back in sequence');
          exercises.push('Speed dribble relay: 30m with a turn at halfway');
        } else if (level === 'advanced') {
          exercises.push('1v1 into goal from the wing: beat the defender and finish');
          exercises.push('Tight-space dribble game: 3v3 in a 15x10m area');
          exercises.push('Skill move application under match pressure');
        } else {
          exercises.push('2v2 in tight areas with transition to goal');
          exercises.push('Progressive overload: 1v1 then 1v2 on success');
          exercises.push('Full-speed dribble and decision-making circuit');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' targeted work');
        }
        return { title: 'Dribbling Session', exercises };
      },
      defending(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Defensive stance and shuffle drill: 4 x 30 seconds');
          exercises.push('1v1 defending in a channel: 10 reps');
          exercises.push('Block tackle technique against a static ball: 20 reps');
        } else if (level === 'intermediate') {
          exercises.push('2v2 defending: communication and cover, 10 reps');
          exercises.push('Pressing triggers: when to press, when to hold (game scenario)');
          exercises.push('Recovery runs and tracking: sprint back and pick up runner');
        } else if (level === 'advanced') {
          exercises.push('4v4 defending shape: maintain compact lines under possession');
          exercises.push('Pressing as a unit: coordinated press with 3 defenders');
          exercises.push('Transition defending: lose the ball, recover, defend');
        } else {
          exercises.push('Full team defensive shape: 11v11 walk-through');
          exercises.push('High press execution with counter-press on turnover');
          exercises.push('Set-piece defending: corners and free kicks');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' specific work');
        }
        return { title: 'Defending Session', exercises };
      },
    },

    fitness(level) {
      if (level === 'beginner') {
        return { title: 'Football Fitness', exercises: [
          'Interval runs: 6x 50m jog/sprint alternating',
          'Bodyweight squats: 3x 15',
          'Plank holds: 3x 30 seconds',
          'Shuttle runs: 5x 20m',
        ]};
      } else if (level === 'intermediate') {
        return { title: 'Football Fitness', exercises: [
          'Interval training: 8x 100m at 80% with 30s rest',
          'Single-leg squats: 3x 10 each leg',
          'Core circuit: plank, side plank, bicycle crunches (3 rounds)',
          'Agility T-test: 6 runs',
        ]};
      } else {
        return { title: 'Football Fitness', exercises: [
          'High-intensity intervals: 6x 200m at 90% with 45s rest',
          'Plyometric box jumps and lateral bounds: 4x 8',
          'Core and rotational strength circuit: 4 exercises x 45 seconds',
          'Repeated sprint ability: 10x 30m with 20s recovery',
          'Yo-yo intermittent recovery test',
        ]};
      }
    },
  },

  // ============================================================
  // TENNIS
  // ============================================================
  tennis: {
    name: 'Tennis',
    icon: '\u{1F3BE}',
    color: '#C0CA33',
    roles: [
      { id: 'baseline', name: 'Baseline Player' },
      { id: 'serve-volley', name: 'Serve & Volley' },
      { id: 'all-court', name: 'All-Court' },
    ],
    analysisTypes: [
      { id: 'serve', name: 'Serve', icon: '\u{1F3BE}' },
      { id: 'groundstrokes', name: 'Groundstrokes', icon: '\u{1F3C0}' },
      { id: 'volley', name: 'Volley', icon: '\u270B' },
      { id: 'movement', name: 'Movement', icon: '\u{1F3C3}' },
    ],
    levels: [
      { id: 'beginner', name: 'Beginner' },
      { id: 'intermediate', name: 'Intermediate' },
      { id: 'advanced', name: 'Advanced' },
      { id: 'elite', name: 'Elite' },
    ],
    aspects: {
      serve: [
        {
          name: 'Toss Placement',
          goodText: 'Consistent toss placed at 1 o\'clock for a flat serve, slightly left for slice, and behind for kick. The ball reaches the ideal height and you are striking at full extension.',
          improveText: 'Your toss is inconsistent in both location and height. A good toss should land on your head if you let it drop. Practice placing it at 1 o\'clock, releasing from fingertips with a straight arm.',
          criticalText: 'The toss is erratic, forcing you to adjust your swing on every serve. This is the single biggest issue in your service motion. You must develop a reliable, repeatable toss before anything else.',
          drill: { name: 'Toss to Target', desc: 'Place a racket on the ground where the ideal toss should land (just inside the baseline, slightly right for a right-hander). Toss 50 balls aiming to hit the racket face. Track your hit percentage. Aim for 80%+.' },
        },
        {
          name: 'Trophy Position',
          goodText: 'Textbook trophy position with racket behind your back, elbow high, tossing arm extended, and weight loaded on your back leg. This coiled position stores maximum energy for the swing.',
          improveText: 'Your trophy position is rushed with your elbow dropping below shoulder height. Pause at the top: tossing arm pointing up, racket elbow at shoulder height, weight on back foot, knees bent.',
          criticalText: 'You are skipping the trophy position entirely, swinging at the ball with an abbreviated motion. This drastically reduces serve power. Break the motion into stages and hold the trophy position for 2 seconds in practice.',
          drill: { name: 'Freeze Frame Serves', desc: 'Serve in slow motion, pausing at the trophy position for a full 3-second count before swinging. Check: elbow high, racket dropped behind back, weight on back leg, knees bent. 4 sets of 10 serves.' },
        },
        {
          name: 'Pronation',
          goodText: 'Excellent pronation through the ball generating natural pace and spin. Your forearm rotates inward at contact, which is essential for a powerful flat serve and a reliable kick serve.',
          improveText: 'Limited pronation is costing you pace and spin. At contact, your forearm should rotate inward like turning a door handle. This adds 10-15 mph and gives you a natural spin safety margin.',
          criticalText: 'You are pushing the serve with no pronation, resulting in a slow, flat ball with no margin for error. Pronation is non-negotiable for an effective serve. Rebuild your motion focusing on this element.',
          drill: { name: 'Throwing Drill for Pronation', desc: 'Hold a ball in a continental grip hand position. Throw it over the net as if serving, focusing on the forearm turning inward as you release. Throw 30 balls, then serve 20 balls with the same feeling.' },
        },
        {
          name: 'Follow Through',
          goodText: 'Full follow-through with the racket finishing on the opposite side of your body. Your momentum carries you into the court, setting you up for the next shot naturally.',
          improveText: 'Your follow-through is cut short, which reduces spin and control. Let the racket swing through naturally to the opposite hip. Your body should land inside the baseline after the serve.',
          criticalText: 'You are stopping your swing at contact. This is causing arm strain and inconsistent serves. The follow-through should be effortless: let the racket finish across your body and down to your left side.',
          drill: { name: 'Towel Whip Drill', desc: 'Tie a tennis ball to the end of a towel. Perform the serve motion whipping the towel over the net. The towel should snap loudly at the top and wrap around your body on the follow-through. 3 sets of 15.' },
        },
        {
          name: 'Placement',
          goodText: 'Smart serve placement targeting weaknesses: wide to pull opponents off court, into the body to jam them, and down the T for aces. You vary placement well to stay unpredictable.',
          improveText: 'You are serving to the same spot too often. The three key targets are: wide, body, and T. Vary your placement to keep the returner guessing and to open up the court for your next shot.',
          criticalText: 'Serve direction is essentially random. You need to develop intentional placement. Start by aiming exclusively down the T for 20 serves, then wide for 20, then body for 20.',
          drill: { name: 'Target Cone Serving', desc: 'Place cones in 3 locations per service box: wide, body, T. Serve 10 balls to each target. Score 2 points for hitting the cone, 1 for within 1 metre. Track your score across sessions. Aim for 20+ out of 30.' },
        },
      ],
      groundstrokes: [
        {
          name: 'Ready Position',
          goodText: 'Excellent split-step timing and a balanced ready position between shots. Racket is out in front, knees flexed, weight forward, allowing you to move explosively in any direction.',
          improveText: 'Your ready position is too upright with the racket held too low. Keep the racket head up at chest level, knees bent, and perform a split-step as your opponent makes contact.',
          criticalText: 'You are standing flat-footed between shots with no split step. This is the foundation of tennis movement. You must bounce on your toes and split-step before every single shot your opponent hits.',
          drill: { name: 'Split-Step Rally', desc: 'Rally from the baseline. A coach watches for your split step on every ball. If you miss a split step, the point stops. Play sets of 10 rallies, aiming for 10/10 split steps. Do this for 15 minutes.' },
        },
        {
          name: 'Unit Turn',
          goodText: 'Early, compact unit turn initiated by the shoulders with the racket going back as one unit. This preparation gives you time and sets up a consistent swing path every time.',
          improveText: 'Your racket preparation is late, with the backswing starting after the ball bounces. Turn your shoulders as soon as you read the direction. The racket should be fully back before the ball bounces on your side.',
          criticalText: 'No unit turn at all: you are taking the racket back with your arm only, which is slow and disconnected from your body rotation. The shoulders must initiate the backswing as a single turning motion.',
          drill: { name: 'Early Prep Drill', desc: 'A feeder hits easy balls to alternating sides. You must complete your unit turn and say "turn" before the ball bounces on your side. If you say it after the bounce, redo that ball. 3 sets of 20 balls.' },
        },
        {
          name: 'Contact Point',
          goodText: 'Consistent contact out in front of your body with the arm comfortably extended. You are meeting the ball at the ideal height and distance, allowing you to drive through with full power.',
          improveText: 'You are letting the ball get too deep, contacting it beside or behind your body. This robs you of power and control. Step in to take the ball early, making contact in front of your leading hip.',
          criticalText: 'Contact point is wildly inconsistent, sometimes too close to your body, sometimes too far out front. This needs to be your primary focus. Use the drop-hit drill to groove a consistent contact zone.',
          drill: { name: 'Drop-Hit Contact Drill', desc: 'Drop the ball from waist height and strike it after one bounce, focusing on contacting it at exactly arm\'s length in front of your leading hip. Hit 50 forehands and 50 backhands into a target zone on the court.' },
        },
        {
          name: 'Follow Through',
          goodText: 'Full windshield-wiper follow-through on the forehand generating heavy topspin, and a complete extension through the ball on the backhand. Both provide consistency and depth.',
          improveText: 'Your follow-through is abbreviated, particularly on the forehand. Let the racket accelerate through the ball and finish high over your shoulder. On the backhand, extend through the contact point before finishing.',
          criticalText: 'You are decelerating at contact, which is causing short balls and errors. The racket must accelerate through the ball. Think of brushing up the back of the ball and finishing with the racket over your shoulder.',
          drill: { name: 'Finish Position Check', desc: 'After every groundstroke in a rally, freeze your follow-through for 1 second. Forehand: racket should finish over opposite shoulder. Backhand: racket finishes high with full extension. Rally for 15 minutes with this freeze.' },
        },
        {
          name: 'Footwork',
          goodText: 'Quick, efficient footwork getting you into the ideal hitting position every time. You use small adjustment steps before striking and recover to the centre immediately after.',
          improveText: 'Your feet stop too early, meaning you are reaching for balls rather than getting into position. Take small adjustment steps right up until the moment you plant to hit, then recover to centre.',
          criticalText: 'Footwork is severely limiting your game. You are lunging at balls or hitting off-balance. Every shot starts with your feet. Move early, take small steps to adjust, set a stable base, then swing.',
          drill: { name: 'Ladder to Ball Drill', desc: 'Set up an agility ladder at the centre mark. After each ladder pattern, sprint to a fed ball, hit it, then return through the ladder. 3 sets of 10 balls. Focus on quick feet throughout.' },
        },
      ],
      volley: [
        {
          name: 'Split Step',
          goodText: 'Perfectly timed split step as the opponent contacts the ball. You land balanced and ready to push off in either direction, which is the key to effective net play.',
          improveText: 'Your split step timing is slightly late, causing you to be caught moving when the ball comes. Initiate the hop as your opponent starts their forward swing, not after they hit the ball.',
          criticalText: 'No consistent split step at the net. You are either flatfooted or still moving forward when the ball arrives. Without a split step, you cannot change direction quickly enough for effective volleying.',
          drill: { name: 'Rapid-Fire Volley Drill', desc: 'Stand at the net. A feeder hits balls alternately to your forehand and backhand from the service line. Focus on split-stepping before every single volley. 3 sets of 20 volleys. Speed increases each set.' },
        },
        {
          name: 'Racket Preparation',
          goodText: 'Short, compact backswing with the racket staying in front of your body. The racket face is open and firm at contact. You are punching through the ball with excellent control.',
          improveText: 'Your backswing is too long for a volley. The racket should barely go past your shoulder. Think of catching the ball with your racket face: short, firm, and in front. No big swings at the net.',
          criticalText: 'You are taking a full groundstroke swing at volleys. This causes late contact and errors. The volley is a punch, not a swing. Keep the racket head above wrist height and simply redirect the ball.',
          drill: { name: 'Wall Volley Short Swing', desc: 'Stand 2 metres from a wall. Volley the ball continuously against the wall. There is no room for a backswing this close. Focus on firm wrist and a short punch. 3 sets of 50 consecutive volleys.' },
        },
        {
          name: 'Contact Point',
          goodText: 'Contact is well out in front of your body with the racket face slightly open. You are meeting the ball early, which gives you control of the angle and takes time away from your opponent.',
          improveText: 'You are letting the ball get too close to your body before making contact. Step forward into the volley and meet the ball at full arm extension in front of you. This is critical for control.',
          criticalText: 'Contact is happening at your body or even behind you. This makes it impossible to direct volleys. You must step into every volley and contact the ball at arm\'s length in front of your leading shoulder.',
          drill: { name: 'Step and Punch Drill', desc: 'A feeder tosses balls softly to your forehand and backhand. On each volley, take one deliberate step forward with the opposite foot and punch through the ball. No hitting without the step. 4 sets of 15 each side.' },
        },
        {
          name: 'Footwork',
          goodText: 'Active feet at the net with a proper crossover step towards the ball on each volley. You close the net effectively after each shot, putting away balls with authority.',
          improveText: 'Your feet are static at the net. You need to step towards the ball with the opposite foot on every volley: left foot forward for forehand volleys, right foot for backhands (for right-handers).',
          criticalText: 'No forward movement into volleys. You are volleying from a stationary position, which gives you no power or angle. Every volley requires a step forward with the opposite foot. This is fundamental.',
          drill: { name: 'Volley Approach Drill', desc: 'Start at the service line. A feeder hits 4 balls: volley 1 from the service line, step in, volley 2 closer, step in, volley 3, step in, put away volley 4 at the net. 4 sets of 5 sequences.' },
        },
      ],
      movement: [
        {
          name: 'Split Step Timing',
          goodText: 'Consistent split-step timing that allows you to react instantly to every shot. You are reading the opponent\'s racket face early and your first step is always in the right direction.',
          improveText: 'Your split step is present but the timing needs work. You should be in the air and landing as the opponent makes contact. Currently you are split-stepping too early or too late.',
          criticalText: 'Inconsistent or absent split step is the biggest barrier to your court coverage. Without it, you are always a half-step slow. This must become automatic before every single ball.',
          drill: { name: 'Shadow Split-Step Rally', desc: 'Without a ball, a partner simulates hitting shots. You split-step and shadow-swing in the correct direction. Focus on timing the split with their contact. 3 sets of 30 shadow swings with 60 seconds rest.' },
        },
        {
          name: 'Recovery Steps',
          goodText: 'Quick recovery to the centre of the baseline or the optimal court position after every shot. You use efficient cross-steps and shuffle steps to regain your position without wasted movement.',
          improveText: 'Your recovery is slow, leaving you out of position for the next shot. After hitting, immediately push off your outside foot and shuffle back to your base position. Do not admire your shot.',
          criticalText: 'You are watching your shot land instead of recovering. This leaves you stranded on one side of the court. Recovery must be instant and automatic: hit, push off, shuffle back to centre.',
          drill: { name: 'Hit and Recover Drill', desc: 'Rally crosscourt. After every shot, touch the centre mark with your foot before moving to the next ball. This forces immediate recovery. Play 3 sets of 3-minute rallies.' },
        },
        {
          name: 'Court Coverage',
          goodText: 'Outstanding court coverage allowing you to retrieve wide balls and short balls with time to spare. Your anticipation and foot speed combine to make you very difficult to hit past.',
          improveText: 'You are reaching the ball but often off-balance. Improve your first step speed and use a more efficient running pattern: sprint to the area, then use small adjustment steps to fine-tune your position.',
          criticalText: 'Large gaps in your court coverage on both sides. You are not getting to balls that are well within reach. Focus on explosive first steps and reading the opponent\'s body language for early cues.',
          drill: { name: 'Star Drill', desc: 'Place 5 balls at the star points: both corners, both service box corners, and the net. Start at the centre mark, sprint to a ball, pick it up, sprint back. Repeat for all 5. Time yourself. 4 rounds, beat your time.' },
        },
        {
          name: 'Anticipation',
          goodText: 'Excellent ability to read your opponent\'s body position and racket angle to predict shot direction. You are moving before the ball is hit, giving you a significant advantage in court positioning.',
          improveText: 'You are reacting to the ball after it is hit rather than anticipating. Watch your opponent\'s hips, shoulders, and racket face to predict where the ball is going. Start moving on their forward swing.',
          criticalText: 'No anticipation at all, purely reactive. You wait until the ball is in the air before moving. Study your opponent\'s preparation: open racket face means crosscourt, closed means down the line. Use these cues.',
          drill: { name: 'Anticipation Rally Game', desc: 'Rally with a partner. Before they hit, call the direction (left or right). Score a point for correct calls. Play to 21. This forces you to read body cues. Play 3 games per session.' },
        },
      ],
    },

    warmup(level) {
      const base = [
        'Light jog around the court perimeter (3 min)',
        'Dynamic stretches: arm swings, leg swings, hip circles',
        'Mini-tennis from the service line (3 min)',
      ];
      if (level !== 'beginner') {
        base.push('Groundstroke rally building intensity (4 min)');
        base.push('Short court volleys and touch shots (3 min)');
      }
      if (level === 'advanced' || level === 'elite') {
        base.push('Overhead practice and serve warm-up (3 min)');
      }
      return base;
    },

    sessions: {
      serve(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Service toss practice: 30 tosses to target zone');
          exercises.push('Abbreviated serve from service line: 20 serves');
          exercises.push('Full serve motion at 50% power: 20 serves to deuce court');
        } else if (level === 'intermediate') {
          exercises.push('Flat serve to T target: 15 serves each side');
          exercises.push('Slice serve wide: 15 serves each side');
          exercises.push('Second serve with kick: 20 serves focusing on spin');
        } else if (level === 'advanced') {
          exercises.push('Serve and first ball combination play: 15 patterns');
          exercises.push('Pressure serving: serve 2 in a row or restart, aim for 5 consecutive sets');
          exercises.push('Placement variation: 10 wide, 10 body, 10 T each side');
        } else {
          exercises.push('Match-intensity serving: full service games to targets');
          exercises.push('Serve under fatigue: run a sprint between each service game');
          exercises.push('Serve and volley patterns: 15 approach sequences');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' targeted practice');
        }
        return { title: 'Serve Session', exercises };
      },
      groundstrokes(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Drop-hit forehands and backhands: 30 each');
          exercises.push('Rally with a feeder focusing on consistency: 5 min each side');
          exercises.push('Crosscourt rally: aim for 10 consecutive balls');
        } else if (level === 'intermediate') {
          exercises.push('Crosscourt forehand rally: 3 x 3-minute sets');
          exercises.push('Down-the-line backhand drill: 20 targeted balls');
          exercises.push('Approach shot and transition drill: 15 sequences');
        } else if (level === 'advanced') {
          exercises.push('Pattern play: inside-out forehand to open court, 15 reps');
          exercises.push('Defensive rally to offensive transition: 10 sequences');
          exercises.push('Heavy topspin vs flat rally adaptation: 10 min');
        } else {
          exercises.push('Full-speed baseline rally with tactical intent');
          exercises.push('Pressure points: play out points from specific rally patterns');
          exercises.push('Redline hitting: maximum controlled aggression baseline drill');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' correction drills');
        }
        return { title: 'Groundstroke Session', exercises };
      },
      volley(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Catch and throw at the net for feel: 20 reps');
          exercises.push('Forehand volley from hand-fed balls: 20 reps');
          exercises.push('Backhand volley from hand-fed balls: 20 reps');
        } else if (level === 'intermediate') {
          exercises.push('Volley-to-volley rally at the net: 3 x 2-minute sets');
          exercises.push('Approach shot then volley put-away: 15 sequences');
          exercises.push('Low volley and half-volley practice: 20 balls each side');
        } else if (level === 'advanced') {
          exercises.push('Reflex volley drill from close range: 3 x 30 seconds');
          exercises.push('2-on-1 net drill: survive volleys from two feeders');
          exercises.push('Overhead and volley combination: 12 sequences');
        } else {
          exercises.push('Serve and volley points: play out 20 points');
          exercises.push('Pressure volleys: 3 volleys to targets, no errors allowed');
          exercises.push('Net game in match-play tie-break format');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' improvement');
        }
        return { title: 'Volley Session', exercises };
      },
      movement(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Shadow swings with proper footwork: 5 min each side');
          exercises.push('Side-shuffle baseline drill: touch line and recover, 10 reps');
          exercises.push('Short ball approach: run in, split step, volley, 10 reps');
        } else if (level === 'intermediate') {
          exercises.push('Spider drill: touch all 5 court points from centre, 4 rounds');
          exercises.push('Deep ball recovery drill: pushed back, then sprint to drop shot');
          exercises.push('Change of direction rally: crosscourt then down the line');
        } else if (level === 'advanced') {
          exercises.push('Full-court coverage drill: balls fed to all 4 corners sequentially');
          exercises.push('Defensive to offensive transition movement: 12 sequences');
          exercises.push('Slide and recover on clay court movement patterns');
        } else {
          exercises.push('Match-intensity movement drill simulating a 5-set match');
          exercises.push('Anticipation and first-step reaction training');
          exercises.push('Court position optimization during live rallies');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' specific movement work');
        }
        return { title: 'Movement Session', exercises };
      },
    },

    fitness(level) {
      if (level === 'beginner') {
        return { title: 'Tennis Fitness', exercises: [
          'Shuttle runs: 6x sideline to sideline',
          'Bodyweight lunges: 3x 10 each leg',
          'Core: 3x 30-second planks and 15 sit-ups',
          'Skipping rope: 3x 1 minute',
        ]};
      } else if (level === 'intermediate') {
        return { title: 'Tennis Fitness', exercises: [
          'Lateral agility sprints: 8x sideline to sideline',
          'Single-leg balance exercises: 3x 30 seconds each',
          'Rotational medicine ball throws: 3x 10 each side',
          'Court sprints: baseline to net and back, 8 reps',
        ]};
      } else {
        return { title: 'Tennis Fitness', exercises: [
          'High-intensity court sprints: 10x fan drill pattern',
          'Plyometric split lunges and lateral bounds: 4x 8',
          'Rotational power circuit: 4 exercises x 12 reps',
          'Shoulder stability band work: 3x 15 each direction',
          'Repeated sprint test: 20x 20m with 20-second recovery',
        ]};
      }
    },
  },

  // ============================================================
  // BASKETBALL
  // ============================================================
  basketball: {
    name: 'Basketball',
    icon: '\u{1F3C0}',
    color: '#FF6F00',
    roles: [
      { id: 'point-guard', name: 'Point Guard' },
      { id: 'shooting-guard', name: 'Shooting Guard' },
      { id: 'small-forward', name: 'Small Forward' },
      { id: 'power-forward', name: 'Power Forward' },
      { id: 'center', name: 'Center' },
    ],
    analysisTypes: [
      { id: 'shooting', name: 'Shooting', icon: '\u{1F3C0}' },
      { id: 'ball-handling', name: 'Ball Handling', icon: '\u{1F91E}' },
      { id: 'passing', name: 'Passing', icon: '\u{1F91D}' },
      { id: 'defense', name: 'Defense', icon: '\u{1F6E1}\uFE0F' },
    ],
    levels: [
      { id: 'beginner', name: 'Beginner' },
      { id: 'intermediate', name: 'Intermediate' },
      { id: 'advanced', name: 'Advanced' },
      { id: 'elite', name: 'Elite' },
    ],
    aspects: {
      shooting: [
        {
          name: 'Shooting Form',
          goodText: 'Textbook shooting form with the ball starting in your shot pocket, a smooth lift through the set point above your forehead, and a one-motion release. Your elbow is aligned under the ball and your guide hand stays quiet.',
          improveText: 'Your shooting motion has some hitches. The ball should travel in a straight line from your shot pocket to the release point. Check that your elbow is under the ball and not flared out to the side.',
          criticalText: 'Shooting form needs a rebuild from the basics. Your elbow is flared, the ball starts too low, and there is a two-motion hitch in your shot. Start close to the basket and groove a one-motion release before adding range.',
          drill: { name: 'Form Shooting', desc: 'Stand 1 metre from the basket. Shoot with one hand only (shooting hand), focusing on the ball sitting on your fingertips, elbow under the ball, and a clean flick of the wrist. Make 20 with each hand before stepping back.' },
        },
        {
          name: 'Release Point',
          goodText: 'High, consistent release point above your forehead. The ball leaves your hand at the peak of your jump with a clean backspin. This makes your shot very difficult to block and gives optimal arc.',
          improveText: 'Your release is slightly low, around eye level, which makes it easier to contest. Work on releasing the ball at the highest point of your reach, with your arm fully extended at the set point.',
          criticalText: 'Release point is at chest or chin height, making every shot blockable. You are pushing the ball rather than shooting it. The ball must come up to above your forehead before the wrist snaps forward and releases.',
          drill: { name: 'High Release Wall Drill', desc: 'Stand facing a wall at arm\'s length. Go through your shooting motion ensuring the ball releases above a line marked at your fully extended reach. If you hit the wall, your release is too low. 50 reps.' },
        },
        {
          name: 'Follow Through',
          goodText: 'Beautiful follow-through with your wrist snapped down and fingers pointing at the rim, held until the ball hits the net. Consistent backspin and arc on every shot shows excellent touch.',
          improveText: 'Your follow-through is inconsistent: sometimes you pull your hand back or to the side. Hold your follow-through like you are reaching into a cookie jar on a high shelf. Wrist snaps down, fingers point at the target.',
          criticalText: 'No discernible follow-through. Your hand stops at release rather than snapping through. The follow-through is what gives the ball backspin and touch. Hold your shooting hand in the goose-neck position after every shot.',
          drill: { name: 'Goose-Neck Hold', desc: 'After every shot in practice, hold your follow-through position (wrist bent, fingers down, arm extended) until the ball hits the rim. If you drop your hand early, the shot does not count. Shoot 50 shots this way.' },
        },
        {
          name: 'Footwork',
          goodText: 'Consistent base with feet shoulder-width apart, slightly staggered with the shooting foot ahead. Your feet are set before the ball arrives and your legs generate the power for your shot.',
          improveText: 'Inconsistent foot placement is affecting your shot accuracy. Develop a routine: catch, 1-2 step into your shot with the same footwork every time. Your base should be shoulder-width with a slight stagger.',
          criticalText: 'Your feet are in a different position on every shot. This makes repeatable accuracy impossible. Start with catch-and-shoot drills focusing exclusively on getting the same foot placement before each shot.',
          drill: { name: 'Catch and Shoot Footwork', desc: 'A passer feeds you the ball at 5 spots around the arc. On each catch, use a consistent 1-2 step into your shot. Shoot 10 from each spot. Focus entirely on identical footwork, not makes.' },
        },
        {
          name: 'Shot Selection',
          goodText: 'Excellent shot IQ: you take high-percentage shots in rhythm, recognise when you have an advantage, and pass up contested looks for better opportunities. This makes you highly efficient.',
          improveText: 'You are occasionally forcing contested shots or taking low-percentage attempts. A good shot is one where you are balanced, in range, and have a clean look. If any of those are missing, make the extra pass.',
          criticalText: 'Shot selection is hurting your efficiency. You are taking contested long-range shots early in the shot clock and forcing difficult shots when teammates are open. Develop a better sense of what constitutes a good look.',
          drill: { name: 'Decision Shooting Game', desc: 'Play 1-on-1 with a rule: you can only shoot if you have created separation. If a coach calls "contested," you must pass instead of shooting. Play to 11. This builds shot-selection discipline.' },
        },
      ],
      'ball-handling': [
        {
          name: 'Crossover',
          goodText: 'Quick, low crossover that changes direction sharply. The ball stays below knee height during the cross, making it nearly impossible to steal. Your change of pace sells the move effectively.',
          improveText: 'Your crossover is too high, coming up to waist level, which gives defenders time to react. Push the ball hard and low across your body. The lower the dribble, the quicker the change of direction.',
          criticalText: 'The crossover is slow and predictable. The ball is bouncing at thigh height and you are not changing speed. A crossover must be explosive: hard push low across your body combined with a burst of speed in the new direction.',
          drill: { name: 'Low Crossover Cones', desc: 'Set a cone at knee height. Perform stationary crossovers keeping the ball below the cone. 3 sets of 30 seconds. Then add forward movement through 5 cones spaced 3 metres apart, crossing over at each cone. 8 runs.' },
        },
        {
          name: 'Between Legs',
          goodText: 'Smooth between-the-legs dribble used effectively to protect the ball and change direction. The move flows naturally into your dribble combinations and you maintain full speed through it.',
          improveText: 'Your between-the-legs move slows you down because you are leaning back and being cautious. Stay low, push the ball through confidently, and step into the new direction immediately after the move.',
          criticalText: 'The between-the-legs dribble is unreliable: you are losing the ball or the move is so slow it has no effect. Master it stationary first, then at a walk, then at a jog before using it at full speed.',
          drill: { name: 'Stationary Combo Drill', desc: 'Stand in an athletic stance. Perform 20 between-the-legs dribbles right-to-left, then 20 left-to-right. Then alternate for 30 seconds continuously. Progress to walking, then jogging. 3 sets at each speed.' },
        },
        {
          name: 'Hesitation',
          goodText: 'Excellent hesitation move that freezes defenders. You sell the stop with your eyes and shoulders, then explode past. The change of pace is dramatic and you keep the ball on a string throughout.',
          improveText: 'Your hesitation lacks conviction. The stop needs to be more dramatic: straighten up slightly, look at the rim, then explode low past the defender. The contrast between slow and fast is what creates the advantage.',
          criticalText: 'The hesitation has no deceptive element. You are slowing down but not selling the fake stop. Your upper body needs to sell "I am about to shoot" before you burst past. Practice the acting as much as the dribble.',
          drill: { name: 'Hesi Pull-Up Drill', desc: 'Dribble at a cone from half court. At the cone, perform a hesitation: straighten up, look at the rim for a beat, then explode to the basket for a layup. Alternate with actually pulling up for a jumper. 4 sets of 10.' },
        },
        {
          name: 'Speed Dribble',
          goodText: 'Excellent speed dribble with the ball pushed out ahead at hip to waist height. You maintain full sprint speed while keeping the ball under control, making you a threat in transition.',
          improveText: 'You slow down when dribbling at speed because you are keeping the ball too close. Push the ball ahead of you at a 45-degree angle and sprint to it. In the open court, 2-3 dribbles should cover the full length.',
          criticalText: 'There is a major speed difference between dribbling and running. You look down at the ball and shorten your stride. Push the ball ahead aggressively, keep your eyes up, and run naturally.',
          drill: { name: 'Full-Court Speed Dribble', desc: 'Dribble full court in 4 dribbles (or as few as possible). Time yourself and compare to your running time without the ball. Aim to be within 1.5 seconds. 8 reps with full recovery.' },
        },
      ],
      passing: [
        {
          name: 'Chest Pass',
          goodText: 'Crisp, accurate chest passes that arrive at the target\'s chest with snap. Your thumbs turn down on the follow-through, generating backspin and a firm, catchable ball.',
          improveText: 'Chest passes are arriving soft and slightly off-target. Step into the pass, extend your arms fully, and snap your thumbs down and out. The ball should reach your teammate quickly with zip on it.',
          criticalText: 'Chest passes are floating and easy to intercept. You are lobbing rather than zipping the ball. Use a strong step towards the target, full arm extension, and a firm wrist snap. The ball should travel in a straight line.',
          drill: { name: 'Wall Chest Pass', desc: 'Stand 3 metres from a wall with a target marked at chest height. Chest pass into the target 50 times with each hand position. Focus on the ball hitting the centre of the target. Track your accuracy.' },
        },
        {
          name: 'Bounce Pass',
          goodText: 'Well-executed bounce passes that hit the floor two-thirds of the way to the target and arrive at hip height. You use this effectively to pass through traffic and around defenders.',
          improveText: 'Your bounce passes are hitting the floor too close to you, making them arrive too high, or too close to the receiver, making them short-hop. Aim for the ball to bounce roughly two-thirds of the way to the target.',
          criticalText: 'Bounce pass technique is very poor: the ball either bounces too many times or arrives at ankle height. Focus on a firm, downward push aiming at a spot on the floor two-thirds of the way to the receiver.',
          drill: { name: 'Bounce Pass Target', desc: 'Place a flat disc on the floor two-thirds of the way between you and a partner. Bounce pass hitting the disc. 30 passes with right hand emphasis, 30 with left. Partner gives feedback on arrival height.' },
        },
        {
          name: 'Vision',
          goodText: 'Outstanding court vision: you see the entire floor and consistently find the open man, including skip passes and back-door cuts. You manipulate defenders with your eyes before passing.',
          improveText: 'You tend to lock onto one option and miss open teammates. Keep your head up and scan the court before receiving the ball. Use your peripheral vision and look defenders off before delivering the pass.',
          criticalText: 'Very limited vision: you stare at the intended target before passing, making it easy to intercept. A great passer looks one way and passes another. Start by keeping your eyes up at all times while dribbling.',
          drill: { name: 'Numbers Passing Drill', desc: 'A coach holds up numbers behind the receiver while you pass. Call the number before releasing the pass. This forces you to see the floor while executing the pass. 4 sets of 15 passes. Track correct number calls.' },
        },
        {
          name: 'Timing',
          goodText: 'Excellent passing timing: the ball arrives in the receiver\'s hands exactly when they are in the best position to score. You lead cutters perfectly and hit shooters in their shot pocket.',
          improveText: 'Your passes are sometimes early or late, forcing teammates to adjust. Watch the cutter\'s speed and release the ball to where they will be, not where they are. For shooters, pass to their shot pocket side.',
          criticalText: 'Pass timing is poor, resulting in turnovers. You are passing too late to cutters and too early to spotting shooters. Develop a better sense of when to release by studying your teammates\' tendencies.',
          drill: { name: 'Cutter Timing Drill', desc: 'A cutter runs various routes: basket cut, flare, curl. You must deliver the ball so it arrives as they hit their shooting spot. 5 reps per cut type, 3 rounds. Coach rates timing as early, perfect, or late.' },
        },
      ],
      defense: [
        {
          name: 'Stance',
          goodText: 'Low, wide defensive stance with active hands and weight on the balls of your feet. You are balanced and ready to slide in any direction. Your positioning forces the offensive player into uncomfortable spots.',
          improveText: 'Your defensive stance is too high, making you slow to react. Get lower with a wider base, bend your knees, keep your back straight, and place your weight on the balls of your feet. Hands should be active.',
          criticalText: 'You are standing upright with your feet together, which is not a defensive stance at all. Get low, spread your feet wider than shoulder-width, bend your knees deeply, and keep your hands up and active.',
          drill: { name: 'Defensive Slide Wall Sits', desc: 'Sit against a wall in defensive stance position (knees at 90 degrees, feet wide). Hold for 30 seconds while moving your arms to deflect imaginary passes. 4 sets. Then do defensive slides for 30 seconds. 4 sets.' },
        },
        {
          name: 'Lateral Movement',
          goodText: 'Quick, efficient lateral slides keeping you in front of your man. You never cross your feet, maintain a low stance throughout, and mirror the offensive player\'s movements perfectly.',
          improveText: 'You are crossing your feet during slides, which makes you vulnerable to direction changes. Push off with the trailing foot, slide the lead foot, and keep your feet apart. Never bring them together.',
          criticalText: 'Lateral movement is very slow and you are getting beaten off the dribble consistently. Your feet cross, your hips rise, and you lose your balance. Defensive slides need daily practice to build the muscle memory.',
          drill: { name: 'Zigzag Slides', desc: 'Defensive slide in a zigzag pattern across the court: 5 slides left then change, 5 slides right then change. Stay low throughout. 4 full court trips with 30 seconds rest between. Time each trip and try to beat it.' },
        },
        {
          name: 'Help Defense',
          goodText: 'Excellent help-side awareness. You rotate quickly to cut off drives, maintain proper positioning in the help triangle, and recover to your man after helping. Your communication is constant.',
          improveText: 'You are slow to rotate on help defense, arriving after the driver has already scored. Keep one foot in the paint when on help side and always see both your man and the ball. Rotate on the drive, not after.',
          criticalText: 'No help defense awareness: you are glued to your man and not reading the play. Good team defense requires you to help when the ball beats your teammate. Learn the help triangle: ball-you-man always in view.',
          drill: { name: 'Shell Drill Help Rotation', desc: '4-on-4 half court. Offense passes around the perimeter. Defense must rotate on every pass, jumping to the ball. On a drive, help defender steps in and everyone rotates. 5-minute rounds, 4 rounds. Coach checks positioning.' },
        },
        {
          name: 'Closeout',
          goodText: 'Textbook closeouts: you sprint to the ball then chop your feet to a controlled stop with a hand high to contest the shot. You stay balanced and ready to move laterally if they drive.',
          improveText: 'Your closeouts are either too slow (giving an open shot) or too aggressive (flying past the shooter). Sprint two-thirds of the way, then chop your steps to arrive under control with a hand up.',
          criticalText: 'You are either not closing out at all (leaving shooters wide open) or flying past them out of control. The closeout is the most important defensive recovery: sprint, chop, hand up, stay balanced.',
          drill: { name: 'Closeout Drill', desc: 'Start under the basket. On a coach\'s pass to a wing player, sprint out and closeout with choppy steps and a high hand. The offensive player then drives or shoots; you must react. 4 sets of 8 from each wing.' },
        },
      ],
    },

    warmup(level) {
      const base = [
        'Jog and dynamic stretches: high knees, butt kicks, karaoke (4 min)',
        'Layup lines: right hand, left hand, 5 each',
        'Partner passing on the move (3 min)',
      ];
      if (level !== 'beginner') {
        base.push('Ball-handling warm-up: crossovers, between legs, behind back (3 min)');
        base.push('Spot-up shooting from 5 spots: 2 makes each spot');
      }
      if (level === 'advanced' || level === 'elite') {
        base.push('Full-court 2-on-1 and 3-on-2 transition (5 min)');
      }
      return base;
    },

    sessions: {
      shooting(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Form shooting from 1 metre: 30 makes with each hand');
          exercises.push('Free throw shooting: 20 attempts, focus on routine');
          exercises.push('Catch and shoot from elbows: 10 makes from each side');
        } else if (level === 'intermediate') {
          exercises.push('Spot-up shooting: 5 spots, 10 attempts each, track percentage');
          exercises.push('Pull-up jumper off the dribble: 15 from each wing');
          exercises.push('Free throws: 2 sets of 10 with pressure (pushups for misses)');
        } else if (level === 'advanced') {
          exercises.push('Game-speed catch and shoot off screens: 5 spots, 8 attempts each');
          exercises.push('Step-back three-pointers: 10 from each wing');
          exercises.push('Shooting off movement: curl, flare, pin-down, 8 each');
        } else {
          exercises.push('200-shot workout: 40 shots from 5 locations, game speed');
          exercises.push('Contested shooting with a hand in your face: 30 attempts');
          exercises.push('End-of-game free throw simulation: shoot 2 after sprinting');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' specific shooting drill');
        }
        return { title: 'Shooting Session', exercises };
      },
      'ball-handling'(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Stationary ball slaps, wraps, and figure-8s: 2 min each');
          exercises.push('Controlled dribbling: right hand 30 sec, left hand 30 sec, alternating');
          exercises.push('Cone weave dribbling at walking pace: 6 trips');
        } else if (level === 'intermediate') {
          exercises.push('Combo move series: crossover, between legs, behind back, 10 each');
          exercises.push('Two-ball dribbling: same time, alternating, 2 min each');
          exercises.push('Full-court speed dribble with moves at cones: 8 trips');
        } else if (level === 'advanced') {
          exercises.push('Tennis ball reaction dribbling: dribble while catching a tennis ball');
          exercises.push('1-on-1 live dribble moves: attack a defender, 10 reps');
          exercises.push('Two-ball full-court speed drill: 6 trips');
        } else {
          exercises.push('Advanced combo series under fatigue: sprint then execute');
          exercises.push('Live 1-on-1 from half court with moves at each cone');
          exercises.push('Blindfold stationary dribbling for pure feel: 3 x 1 min');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' targeted practice');
        }
        return { title: 'Ball Handling Session', exercises };
      },
      passing(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Chest pass and bounce pass basics: 30 each with a partner');
          exercises.push('Overhead pass to a target: 20 reps');
          exercises.push('Pass and cut: give and go with a partner, 15 reps');
        } else if (level === 'intermediate') {
          exercises.push('Full-court passing drill: 2-man fast break, 8 trips');
          exercises.push('Entry passing into the post: 15 reps each side');
          exercises.push('Skip pass accuracy: cross-court pass to a target, 15 each side');
        } else if (level === 'advanced') {
          exercises.push('Live 3-on-2 passing and decision-making: 10 reps');
          exercises.push('One-hand push pass on the move: 15 reps each hand');
          exercises.push('Pocket pass through traffic: 12 reps against defenders');
        } else {
          exercises.push('Full-speed transition passing: 4-on-3 continuous, 8 min');
          exercises.push('No-look and wraparound pass drill: 10 reps each');
          exercises.push('Read and react passing against live defense');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' passing drill');
        }
        return { title: 'Passing Session', exercises };
      },
      defense(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Defensive stance and slide drill: 4 x 30 seconds');
          exercises.push('1-on-1 closeout and contain: 10 reps');
          exercises.push('Defensive positioning drill: stay between man and basket');
        } else if (level === 'intermediate') {
          exercises.push('Zigzag defensive slide full court: 6 trips');
          exercises.push('2-on-2 help and recover: 10 reps');
          exercises.push('Deny the wing entry pass: 10 reps each side');
        } else if (level === 'advanced') {
          exercises.push('Shell drill: 4-on-4 defensive rotations, 10 min');
          exercises.push('Pick-and-roll defense: hedge, switch, and drop, 5 reps each');
          exercises.push('Transition defense: sprint back and match up, 10 reps');
        } else {
          exercises.push('Full 5-on-5 defensive sets against designed plays');
          exercises.push('Film study: review defensive breakdowns and correct');
          exercises.push('Competitive defensive drills: first to 5 stops');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' defensive drill');
        }
        return { title: 'Defense Session', exercises };
      },
    },

    fitness(level) {
      if (level === 'beginner') {
        return { title: 'Basketball Fitness', exercises: [
          'Suicides (baseline to free throw, half court, far free throw, far baseline): 4 reps',
          'Bodyweight squats and lunges: 3x 12 each',
          'Core: planks and crunches, 3x 30 seconds / 15 reps',
          'Jump rope: 3x 1 minute',
        ]};
      } else if (level === 'intermediate') {
        return { title: 'Basketball Fitness', exercises: [
          'Full-court sprints: 8x with 30-second rest',
          'Lateral bounds: 3x 10 each direction',
          'Core circuit: plank, Russian twists, V-ups (3 rounds)',
          'Vertical jump training: box jumps 4x 8',
        ]};
      } else {
        return { title: 'Basketball Fitness', exercises: [
          '17s drill: sideline to sideline 17 times in 1 minute, 4 sets',
          'Depth jumps and reactive plyometrics: 4x 6',
          'Resisted lateral slides with bands: 4x 30 seconds',
          'Core power: medicine ball slams and rotational throws, 3x 10',
          'Conditioning game: 5-on-5 with sprint penalties for turnovers',
        ]};
      }
    },
  },

  // ============================================================
  // HOCKEY (ICE HOCKEY)
  // ============================================================
  hockey: {
    name: 'Hockey',
    icon: '\u{1F3D2}',
    color: '#0D47A1',
    roles: [
      { id: 'center', name: 'Center' },
      { id: 'wing', name: 'Wing' },
      { id: 'defenseman', name: 'Defenseman' },
      { id: 'goalie', name: 'Goalie' },
    ],
    analysisTypes: [
      { id: 'skating', name: 'Skating', icon: '\u26F8\uFE0F' },
      { id: 'shooting', name: 'Shooting', icon: '\u{1F3D2}' },
      { id: 'passing', name: 'Passing', icon: '\u{1F3D2}' },
      { id: 'checking', name: 'Checking', icon: '\u{1F4AA}' },
    ],
    levels: [
      { id: 'beginner', name: 'Beginner' },
      { id: 'intermediate', name: 'Intermediate' },
      { id: 'advanced', name: 'Advanced' },
      { id: 'elite', name: 'Elite' },
    ],
    aspects: {
      skating: [
        {
          name: 'Stride Technique',
          goodText: 'Powerful, efficient stride with full leg extension on each push. Your knee drive is strong, recovery is quick, and you generate maximum glide from each stride. Upper body stays quiet and balanced.',
          improveText: 'Your stride is choppy with incomplete leg extension. You are not finishing the push, leaving power on the table. Focus on driving each leg to full extension before recovering. Think of pushing the ice away behind you.',
          criticalText: 'Very short, inefficient strides with minimal knee bend and almost no extension. You are running on ice rather than skating. Rebuild from basics: deep knee bend, full extension, glide, recover. Each stride should feel powerful.',
          drill: { name: 'Single-Leg Glide Drill', desc: 'Skate from blue line to blue line using only one push per leg, alternating. Focus on full extension and maximum glide from each push. 8 trips. Time yourself and aim to reduce strokes needed per trip.' },
        },
        {
          name: 'Crossovers',
          goodText: 'Smooth, powerful crossovers in both directions. You generate speed through the turns with each crossover step adding acceleration. Your inside and outside edges are equally strong.',
          improveText: 'Crossovers are functional but lack power, especially in one direction. You are stepping over rather than driving with each cross. Push hard with the outside leg and pull with the inside edge on each step.',
          criticalText: 'Crossovers are very awkward and slow. You are hesitant to fully commit to the crossing step. Start by practising at low speed around the face-off circles, focusing on the mechanics before adding speed.',
          drill: { name: 'Circle Crossover Power', desc: 'Skate around one face-off circle using only crossovers. Complete 10 laps in each direction, focusing on driving with every step. Time your laps and aim to get faster each round. Rest 30 seconds between direction changes.' },
        },
        {
          name: 'Stops & Starts',
          goodText: 'Explosive starts from a standstill and crisp hockey stops on both sides. Your first three steps generate immediate speed and your stops leave you balanced and ready to go in a new direction.',
          improveText: 'Your stops are spraying ice but you are not fully stopping before changing direction. Commit to a full stop by digging both edges in simultaneously. Your starts need more knee bend for a more explosive first step.',
          criticalText: 'Stops are uncontrolled, causing you to slide past your intended stopping point. You are leaning too far back and only using one foot to stop. Practice two-foot stops at progressively higher speeds.',
          drill: { name: 'Red Light Green Light', desc: 'Skate at three-quarter speed. On a whistle, perform a full hockey stop. On a second whistle, explode in the opposite direction. Alternate stop sides. 3 sets of 10 stops. Focus on balance at the stop point.' },
        },
        {
          name: 'Edge Work',
          goodText: 'Outstanding edge control with smooth transitions between inside and outside edges. You are confident on both edges in both directions, which gives you excellent agility and deception at speed.',
          improveText: 'Your inside edges are solid but outside edge control needs work. You avoid outside edges in turns, limiting your agility. Dedicate practice time to outside edge drills and tight turns on your weak side.',
          criticalText: 'Limited edge control is restricting your skating fundamentally. You are skating flat-footed rather than using edges. Start with basic inside and outside edge holds on each foot, gliding the full length of the ice.',
          drill: { name: 'Edge Control Figure-8s', desc: 'Perform figure-8 patterns between the face-off circles using only inside edges, then only outside edges. Stay low with knees bent. 5 figure-8s on inside edges, 5 on outside edges, each direction. 3 sets.' },
        },
      ],
      shooting: [
        {
          name: 'Wrist Shot',
          goodText: 'Quick, accurate wrist shot with the puck starting at the mid-point of the blade, rolling to the toe on release. Your weight transfers from back to front and the follow-through points at the target.',
          improveText: 'Your wrist shot lacks power because you are not loading the stick properly. Pull the puck from behind your back foot, lean into the stick to flex it, then snap the wrist and roll the puck off the toe.',
          criticalText: 'The wrist shot is more of a push than a shot. There is no stick flex and no wrist snap. You need to learn to load the stick against the ice and use the flex to propel the puck. Start with stationary shooting focusing on technique.',
          drill: { name: 'Snap and Release Drill', desc: 'From a stationary position, place the puck at your back foot. Pull it forward, load the stick by pressing down, then snap your wrists and release. Aim at specific corners. 4 sets of 15 shots. Focus on feeling the stick flex.' },
        },
        {
          name: 'Slap Shot',
          goodText: 'Powerful slap shot with a full wind-up, contact behind the puck, and a complete follow-through. The blade strikes the ice 1-2 inches before the puck, flexing the stick for maximum velocity.',
          improveText: 'Your slap shot is topping the puck because you are hitting it directly rather than the ice behind it. Aim to contact the ice 1-2 inches behind the puck. This loads the shaft and propels the puck with power.',
          criticalText: 'The slap shot is not generating power. You are barely winding up and your contact point is wrong. A proper slap shot requires a full backswing to shoulder height, striking the ice behind the puck, and a full follow-through.',
          drill: { name: 'Slap Shot Ice Contact', desc: 'Place a line of tape on the ice 2 inches behind the puck. Practice hitting that line, not the puck. Let the flex do the work. 4 sets of 10 shots. Start slow and build up to full power as technique improves.' },
        },
        {
          name: 'Snap Shot',
          goodText: 'Quick snap shot release that combines wrist shot technique with slap shot power. Your release is deceptively fast and catches goalies off guard. Excellent for shooting in traffic.',
          improveText: 'Your snap shot has a good concept but lacks the quick release that makes it effective. The key is a short backswing with maximum wrist snap. The puck should be released before the goalie can set.',
          criticalText: 'The snap shot is too similar to your wrist shot, offering no advantage. A snap shot requires loading the stick quickly by pressing down and snapping the wrists in one quick motion. It is a short, violent release.',
          drill: { name: 'Quick Release Drill', desc: 'Receive a pass and release a snap shot within 1 second. A passer feeds you from the side; catch and shoot immediately. 4 sets of 10. Time your release and aim to be under 0.8 seconds from catch to release.' },
        },
        {
          name: 'Shot Accuracy',
          goodText: 'Pinpoint accuracy, consistently hitting specific corners of the net. You pick your spot early and commit to the target. Your accuracy under pressure matches your practice accuracy.',
          improveText: 'You are hitting the net but not targeting specific areas. Goalies save shots to the centre of their body. Pick a corner before you shoot: glove side high, stick side low, or the five-hole. Commit to a specific target every shot.',
          criticalText: 'Accuracy is poor with many shots missing the net entirely. You are sacrificing accuracy for power. Reduce your shot power by 20% and focus entirely on hitting a specific corner. Accuracy first, power second.',
          drill: { name: 'Four Corners Drill', desc: 'Hang targets in each corner of the net and one five-hole. Take 10 shots at each target from the slot. Track your hit percentage per target. Aim for 60%+ on each target. 3 rounds from different distances.' },
        },
      ],
      passing: [
        {
          name: 'Tape-to-Tape',
          goodText: 'Consistently accurate passes that arrive flat on the ice, directly onto your teammate\'s tape. Your passing touch adjusts naturally for distance and your receiver barely needs to move their stick.',
          improveText: 'Passes are in the general area but not consistently on the tape. The puck is bouncing or arriving off-target by a foot. Focus on cupping the puck on your blade and rolling it off smoothly towards the target\'s stick.',
          criticalText: 'Passes are regularly off-target, forcing teammates to reach or miss entirely. You are slapping at the puck rather than guiding it. Slow down, cup the puck, and sweep it towards the target. Accuracy over speed.',
          drill: { name: 'Partner Passing Accuracy', desc: 'With a partner 15 feet apart, pass back and forth aiming to hit a target (a puck or glove) placed on the ice next to their stick. 50 passes each. Track hits. Move farther apart as accuracy improves to 80%+.' },
        },
        {
          name: 'Saucer Pass',
          goodText: 'Beautiful saucer passes that lift over sticks and land flat just before your teammate. The puck rotates smoothly, giving it a predictable flight path that is easy to receive.',
          improveText: 'Your saucer passes flip end-over-end rather than rotating flat. Open the blade slightly, scoop under the puck, and spin it off the toe. It should rotate like a frisbee, not tumble like a coin flip.',
          criticalText: 'Saucer passes are not getting airborne or are wildly inaccurate. This is a technique issue. Place the puck at the heel of the blade, roll it to the toe while opening the face, and release with a wrist roll.',
          drill: { name: 'Saucer Over Sticks', desc: 'Lay 3 sticks flat on the ice between you and a partner. Saucer pass over all 3 sticks so the puck lands flat on the other side. 4 sets of 15. Increase the gap between sticks as you improve. Track successful completions.' },
        },
        {
          name: 'One-Touch',
          goodText: 'Excellent one-touch passing that redirects the puck accurately without stopping it. You read the play early and position your blade to redirect passes to the next player instantly.',
          improveText: 'Your one-touch passes lose accuracy because your blade angle is not set early enough. Before the puck arrives, position your stick at the angle needed to redirect to the target. Let the puck do the work.',
          criticalText: 'One-touch passing is very unreliable: the puck either stops on your stick or deflects in the wrong direction. You need to practice receiving and redirecting in one motion. Start with slow feeds.',
          drill: { name: 'Triangle One-Touch', desc: 'Three players form a triangle 15 feet apart. The puck must move around the triangle using only one-touch passes. No stopping the puck. Continue for 2 minutes, then switch direction. 4 rounds each direction.' },
        },
        {
          name: 'Breakout Passing',
          goodText: 'Smart, accurate breakout passes under pressure. You select the right option: up the boards, through the middle, or off the glass, and execute with pace. Your breakout starts effective transitions.',
          improveText: 'Breakout passes are hesitant, giving forecheckers time to close lanes. Make your decision quickly: look up, identify the open lane, and pass with authority. A firm, early pass is better than a perfect late one.',
          criticalText: 'Breakout passing is a liability. You are either icing the puck, turning it over, or holding it too long. Develop a decision framework: first look up the middle, then the strong side boards, then reverse behind the net.',
          drill: { name: 'Breakout Under Pressure', desc: 'A forechecker attacks as you retrieve the puck behind your net. Identify the open breakout pass (boards, middle, or reverse) and execute. A coach assigns the passing lane by positioning a receiver. 3 sets of 10 breakouts.' },
        },
      ],
      checking: [
        {
          name: 'Body Position',
          goodText: 'Excellent body position for contact: low centre of gravity, wide base, knees bent, and core engaged. You absorb and deliver hits effectively without losing balance or puck position.',
          improveText: 'You are too upright when initiating or receiving contact, which allows opponents to knock you off the puck. Get lower, bend your knees more, and widen your base before engaging in any physical play.',
          criticalText: 'Very poor body position for physical play. You are standing tall and getting knocked off the puck easily. Lower your centre of gravity dramatically: deep knee bend, core tight, feet wider than shoulder-width.',
          drill: { name: 'Battle Stance Drill', desc: 'In pairs, face each other in a low stance on the ice. On the whistle, attempt to push the other player out of a 3-metre circle using only body position. No grabbing. 10 rounds of 10 seconds each. Focus on staying low.' },
        },
        {
          name: 'Timing',
          goodText: 'Perfectly timed checks that separate the opponent from the puck at the moment of vulnerability. You read the play and time your contact for maximum effectiveness within the rules.',
          improveText: 'Your checks are slightly early or late, reducing effectiveness or causing penalties. Watch for the moment the puck carrier looks down or commits to a move, then initiate contact at that split second.',
          criticalText: 'Check timing is very poor: you are either arriving too early (interference penalties) or too late (the puck is already gone). Focus on reading the puck carrier\'s body language to predict when they are most vulnerable.',
          drill: { name: 'Read and React Checking', desc: 'An offensive player skates through the neutral zone with the puck. You must time your check for the moment they look down at the puck or commit to a lane. Coach evaluates timing. 3 sets of 8 repetitions.' },
        },
        {
          name: 'Stick Checking',
          goodText: 'Active, disruptive stick that lifts, pokes, and sweeps effectively. You separate players from the puck with your stick without taking penalties. Your stick is always in a passing or shooting lane.',
          improveText: 'Your stick checks are predictable. You default to the poke check when a lift or sweep would be more effective. Vary your stick checking: lift the stick on the forecheck, poke in the neutral zone, and sweep in the defensive zone.',
          criticalText: 'Stick checking is ineffective. You are reaching and slashing rather than using controlled checking motions. A proper poke check is a quick jab at the puck, not a sweeping hack. Keep your stick on the ice in passing lanes.',
          drill: { name: 'Stick Check Gauntlet', desc: 'A puck carrier skates through a 3-metre wide channel. You stand at the edge and attempt to dislodge the puck using only stick checks (poke, lift, sweep). No body contact. 4 sets of 10. Track successful puck separations.' },
        },
        {
          name: 'Gap Control',
          goodText: 'Outstanding gap control, maintaining the perfect distance from the puck carrier to force a play without giving up the blue line. You dictate the tempo by controlling the space between you and the attacker.',
          improveText: 'Your gap is either too tight (easy to beat with speed) or too loose (giving too much time and space). Maintain roughly one stick-length distance, skating backwards at the attacker\'s speed, and close at the blue line.',
          criticalText: 'Gap control is non-existent: you are either standing still at the blue line or backing up into your own zone. You must skate backwards towards the attacker, matching their speed, and tighten the gap at the defensive blue line.',
          drill: { name: 'Gap Control 1-on-1', desc: 'A forward attacks from centre ice. You start at the blue line and must maintain a one-stick-length gap while skating backwards. At the far blue line, close the gap and engage. 3 sets of 8 repetitions. Coach evaluates gap distance.' },
        },
      ],
    },

    warmup(level) {
      const base = [
        'Easy skating laps: 3 laps forward, 2 laps backward',
        'Dynamic stretches on the bench: leg swings, hip circles, arm circles',
        'Puck handling warm-up: easy stickhandling while skating (3 min)',
      ];
      if (level !== 'beginner') {
        base.push('Crossover and edge work around face-off circles (3 min)');
        base.push('Passing in pairs at half speed (3 min)');
      }
      if (level === 'advanced' || level === 'elite') {
        base.push('Quick-feet agility drill through cones (3 min)');
      }
      return base;
    },

    sessions: {
      skating(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Forward skating: focus on knee bend and full extension, 6 laps');
          exercises.push('Snowplow stops on both sides: 10 reps each');
          exercises.push('Two-foot glides and basic crossovers around circles: 10 min');
        } else if (level === 'intermediate') {
          exercises.push('Power skating: full stride with emphasis on extension, 8 laps');
          exercises.push('Hockey stops and crossover starts: 10 reps each side');
          exercises.push('Tight turn agility around cones: 8 runs');
        } else if (level === 'advanced') {
          exercises.push('Sprint skating: 5x blue-line-to-blue-line at 100%');
          exercises.push('Transition skating: forward to backward pivots at speed, 12 reps');
          exercises.push('Lateral agility course with stops, starts, and crossovers');
        } else {
          exercises.push('Overspeed skating with resistance band release: 8 sprints');
          exercises.push('Full-ice agility course simulating game situations');
          exercises.push('Backward skating race-pace drill with pivots: 6 reps');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' correction drill');
        }
        return { title: 'Skating Session', exercises };
      },
      shooting(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Stationary wrist shots from the slot: 30 shots');
          exercises.push('Forehand and backhand shots from close range: 15 each');
          exercises.push('Target shooting: aim at each corner, 10 per corner');
        } else if (level === 'intermediate') {
          exercises.push('Wrist shots in stride from the hash marks: 20 shots');
          exercises.push('Slap shot from the point: 15 shots focusing on technique');
          exercises.push('Snap shot quick release off a pass: 15 reps');
        } else if (level === 'advanced') {
          exercises.push('Shooting off the rush: 3 shots from different angles, 5 sequences');
          exercises.push('One-timer drill from a cross-ice pass: 15 reps');
          exercises.push('Shooting through traffic with a screen: 15 shots');
        } else {
          exercises.push('Game-speed shooting circuit: 5 stations, rapid fire');
          exercises.push('Shooting under pressure with a closing defender');
          exercises.push('Deke and shoot: 1-on-0 with a move and finish, 10 reps');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' correction work');
        }
        return { title: 'Shooting Session', exercises };
      },
      passing(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Partner passing: forehand and backhand, 30 each');
          exercises.push('Pass and receive on the move: skating in a circle, 5 min');
          exercises.push('Target passing: hit a stick or puck on the ice from 15 feet');
        } else if (level === 'intermediate') {
          exercises.push('Saucer pass over sticks: 20 reps');
          exercises.push('One-touch passing in a triangle: 5 min each direction');
          exercises.push('Tape-to-tape passing on the move: 2-on-0 rushes, 8 trips');
        } else if (level === 'advanced') {
          exercises.push('Breakout passing under forechecking pressure: 12 reps');
          exercises.push('Cross-ice pass to a one-timer: 15 reps');
          exercises.push('Bank passes off the boards: 15 reps each side');
        } else {
          exercises.push('Full-speed transition passing: 3-on-2 rush, 10 reps');
          exercises.push('Passing in traffic: maintain possession in 3-on-3 tight area');
          exercises.push('Blind pass and no-look plays: advanced reads, 10 min');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' specific passing drill');
        }
        return { title: 'Passing Session', exercises };
      },
      checking(level, weakAreas) {
        const exercises = [];
        if (level === 'beginner') {
          exercises.push('Angling and body position: guide attacker to the boards, 10 reps');
          exercises.push('Stick checking basics: poke check at a stationary target, 20 reps');
          exercises.push('Puck protection in a small area: 1-on-1 battles, 10 rounds');
        } else if (level === 'intermediate') {
          exercises.push('Controlled body checking technique against pads: 10 reps');
          exercises.push('Gap control drill: maintain distance while skating backward, 10 reps');
          exercises.push('Stick lift and poke check on a moving target: 12 reps');
        } else if (level === 'advanced') {
          exercises.push('Live 1-on-1 checking along the boards: 10 reps');
          exercises.push('Pinching and sealing off forwards: 8 game-situation reps');
          exercises.push('Net-front battle: box out and clear rebounds, 10 reps');
        } else {
          exercises.push('Full-speed open-ice checking with proper angle and timing');
          exercises.push('Board battle dominance: 2-on-2 along the wall, 8 reps');
          exercises.push('Checking under fatigue: physical play after skating sprints');
        }
        if (weakAreas && weakAreas.length > 0) {
          exercises.push('Focus: ' + weakAreas[0].aspect + ' specific checking drill');
        }
        return { title: 'Checking Session', exercises };
      },
    },

    fitness(level) {
      if (level === 'beginner') {
        return { title: 'Hockey Fitness', exercises: [
          'Off-ice skating stride simulation: lateral lunges 3x 10 each side',
          'Core stability: 3x 30-second planks and side planks',
          'Bodyweight squats: 3x 15',
          'Shuttle runs: 6x 20m for anaerobic conditioning',
        ]};
      } else if (level === 'intermediate') {
        return { title: 'Hockey Fitness', exercises: [
          'Lateral bounds: 4x 10 each direction',
          'Single-leg deadlifts: 3x 10 each leg',
          'Core rotational exercises: Russian twists and wood chops, 3x 12',
          'Interval sprints: 8x 30m with 30-second rest',
        ]};
      } else {
        return { title: 'Hockey Fitness', exercises: [
          'Slide board training: 4x 45-second intervals',
          'Heavy squats and deadlifts: 4x 6 at 80% 1RM',
          'Plyometric box jumps and lateral hops: 4x 8',
          'Battle rope and medicine ball circuit: 4 exercises x 30 seconds',
          'Anaerobic capacity test: 10x 40m sprints with 30-second recovery',
        ]};
      }
    },
  },
};
