/**
 * SportsData - Sport-specific configuration for all 5 sports
 * Each sport defines: name, icon, color, roles, analysisTypes, aspects, warmup, sessions, fitness
 */
const SportsData = {

  // ======================== CRICKET ========================
  cricket: {
    name: 'Cricket',
    icon: '\u{1F3CF}',
    color: '#1B5E20',
    roles: [
      { id: 'batsman', name: 'Batsman' },
      { id: 'bowler', name: 'Bowler' },
      { id: 'allrounder', name: 'All-Rounder' },
      { id: 'wicketkeeper', name: 'Wicket-Keeper' },
    ],
    analysisTypes: [
      { id: 'batting', name: 'Batting', icon: '\u{1F3CF}' },
      { id: 'bowling', name: 'Bowling', icon: '\u26BE' },
      { id: 'fielding', name: 'Fielding', icon: '\u{1F3C3}' },
    ],
    aspects: {
      batting: [
        { name: 'Stance & Guard', goodText: 'Excellent balanced stance with proper weight distribution.', improveText: 'Stance needs adjustment — weight too far forward.', criticalText: 'Stance is unbalanced which limits shot selection.', drill: 'Shadow batting with mirror: 3 sets of 20 reps focusing on stance.' },
        { name: 'Backlift', goodText: 'Clean, high backlift enabling powerful shots.', improveText: 'Backlift slightly late, affecting timing.', criticalText: 'Backlift is too low and slow, severely limiting power.', drill: 'Tennis ball drop drill: partner drops ball, react with backlift and drive.' },
        { name: 'Footwork', goodText: 'Quick, decisive foot movement to the pitch of the ball.', improveText: 'Footwork a bit slow, sometimes caught in the crease.', criticalText: 'Feet are planted — need much more movement.', drill: 'Ladder agility drills + throwdown sessions with varied lengths.' },
        { name: 'Follow Through', goodText: 'Full follow-through completing shots with control.', improveText: 'Follow-through sometimes cut short, losing power.', criticalText: 'No follow-through — shots dying before reaching boundary.', drill: 'Hit 50 drives off a tee focusing on full bat swing completion.' },
        { name: 'Shot Selection', goodText: 'Smart shot selection, playing to strengths.', improveText: 'Occasionally plays risky shots to good deliveries.', criticalText: 'Poor shot selection — chasing wide deliveries.', drill: 'Leave drill: face 30 balls, leave at least 10 outside off stump.' },
      ],
      bowling: [
        { name: 'Run-Up', goodText: 'Smooth, consistent run-up with good rhythm.', improveText: 'Run-up rhythm slightly inconsistent.', criticalText: 'Run-up is erratic, affecting delivery stride.', drill: 'Mark run-up precisely. Bowl 30 balls focusing only on hitting the crease consistently.' },
        { name: 'Delivery Stride', goodText: 'Textbook delivery stride with aligned front foot.', improveText: 'Front foot landing could be more braced.', criticalText: 'Delivery stride too short, losing pace.', drill: 'Place a target mat at ideal landing spot, bowl 40 deliveries.' },
        { name: 'Arm Action', goodText: 'High, smooth arm action generating good pace/spin.', improveText: 'Arm slightly drops at release point.', criticalText: 'Arm action is low and round-arm.', drill: 'Wall drills: stand side-on to wall, practice high arm bowling action 50 times.' },
        { name: 'Follow Through', goodText: 'Balanced follow-through after release.', improveText: 'Follow-through pulling to one side.', criticalText: 'No follow-through, falling away at release.', drill: 'Bowl at single stump from 18 yards with exaggerated follow-through.' },
        { name: 'Line & Length', goodText: 'Hitting good areas consistently.', improveText: 'Line wanders occasionally.', criticalText: 'Inconsistent length makes it easy for batsman.', drill: 'Place targets on good length, bowl 50 balls aiming for the zone.' },
      ],
      fielding: [
        { name: 'Catching', goodText: 'Safe hands — takes catches cleanly.', improveText: 'Drops occasional catches under pressure.', criticalText: 'Catching technique needs fundamental work.', drill: 'High catch drill: 30 catches from varied heights and angles.' },
        { name: 'Ground Fielding', goodText: 'Clean pick-up and quick release.', improveText: 'Sometimes fumbles the pick-up.', criticalText: 'Ground fielding is unreliable.', drill: 'Rapid pick-up drill: 3 sets of 10 ground balls from different angles.' },
        { name: 'Throwing Accuracy', goodText: 'Accurate throws hitting the stumps regularly.', improveText: 'Throws sometimes off target.', criticalText: 'Throwing accuracy is poor.', drill: 'Target practice: 30 throws at a single stump from 30 metres.' },
        { name: 'Agility & Speed', goodText: 'Quick reactions and fast across the ground.', improveText: 'Could be quicker to the ball.', criticalText: 'Slow to react and move to the ball.', drill: 'Shuttle runs with diving catches: 3 sets of 8 reps.' },
      ],
    },
    warmup(level) {
      return ['Light jog for 5 minutes', 'Dynamic stretches: arm circles, leg swings', 'Shadow batting or bowling for 3 minutes', 'Quick catching pairs drill'];
    },
    sessions: {
      batting(level, weakAreas) {
        const exercises = ['Front foot drives off throwdowns', 'Back foot punch through covers', 'Pull shot practice with short balls', 'Sweep and reverse sweep drill'];
        if (weakAreas.length > 0) exercises.push(`Focus drill: ${weakAreas[0].aspect} improvement`);
        return { title: 'Batting Session', exercises };
      },
      bowling(level, weakAreas) {
        const exercises = ['6-ball overs at single stump', 'Yorker practice at the base', 'Variation deliveries (slower ball, bouncer)', 'Match simulation: bowl to a batsman'];
        if (weakAreas.length > 0) exercises.push(`Focus drill: ${weakAreas[0].aspect} improvement`);
        return { title: 'Bowling Session', exercises };
      },
      fielding(level, weakAreas) {
        const exercises = ['High catch repetitions', 'Ground fielding and throwing relay', 'Slip catching cradle', 'Rapid reaction cone drill'];
        if (weakAreas.length > 0) exercises.push(`Focus drill: ${weakAreas[0].aspect} improvement`);
        return { title: 'Fielding Session', exercises };
      },
    },
    fitness(level) {
      return { title: 'Cricket Fitness', exercises: ['Sprint intervals: 6x 30m sprints', 'Core circuit: planks, crunches, Russian twists', 'Shoulder and rotator cuff strengthening', 'Reaction ball catching drill'] };
    },
  },

  // ======================== FOOTBALL ========================
  football: {
    name: 'Football',
    icon: '\u26BD',
    color: '#1565C0',
    roles: [
      { id: 'goalkeeper', name: 'Goalkeeper' },
      { id: 'defender', name: 'Defender' },
      { id: 'midfielder', name: 'Midfielder' },
      { id: 'forward', name: 'Forward' },
    ],
    analysisTypes: [
      { id: 'dribbling', name: 'Dribbling', icon: '\u{1F3C3}' },
      { id: 'shooting', name: 'Shooting', icon: '\u{1F3AF}' },
      { id: 'passing', name: 'Passing', icon: '\u{1F91D}' },
      { id: 'defending', name: 'Defending', icon: '\u{1F6E1}' },
    ],
    aspects: {
      dribbling: [
        { name: 'Close Control', goodText: 'Excellent ball control in tight spaces.', improveText: 'Ball gets away slightly during quick turns.', criticalText: 'Losing the ball too often while dribbling.', drill: 'Cone weave drill: 3 sets through 10 cones with both feet.' },
        { name: 'Change of Direction', goodText: 'Sharp, deceptive changes of direction.', improveText: 'Direction changes could be sharper.', criticalText: 'Predictable movement, easy to read.', drill: 'Figure-8 dribbling around cones, alternate feet, 5 minutes.' },
        { name: 'Speed with Ball', goodText: 'Maintains pace while keeping possession.', improveText: 'Slows down too much when on the ball.', criticalText: 'Very slow dribbling speed.', drill: 'Dribble sprints: push ball 3 touches then sprint, 10 reps x 30m.' },
        { name: 'Body Feints', goodText: 'Effective use of feints to beat defenders.', improveText: 'Feints need more conviction to sell.', criticalText: 'Not using feints — running straight at defenders.', drill: 'Step-over and Cruyff turn practice: 20 reps each side.' },
      ],
      shooting: [
        { name: 'Accuracy', goodText: 'Consistently hitting the target.', improveText: 'Shots sometimes go wide of the post.', criticalText: 'Poor accuracy, missing the target often.', drill: 'Target shooting: aim at corners, 20 shots from edge of box.' },
        { name: 'Power', goodText: 'Powerful strikes that trouble the keeper.', improveText: 'Could generate more power on strikes.', criticalText: 'Shots lack power, easily saved.', drill: 'Dead ball striking: focus on laces contact, 20 reps.' },
        { name: 'Technique', goodText: 'Clean striking technique with good contact.', improveText: 'Sometimes snatching at the shot.', criticalText: 'Poor contact, not hitting the ball cleanly.', drill: 'Stationary ball striking drill focusing on body position, 30 reps.' },
        { name: 'First-Time Finish', goodText: 'Clinical one-touch finishing.', improveText: 'Taking an extra touch when one-touch would score.', criticalText: 'Cannot convert first-time chances.', drill: 'Crossed ball finishing: one-touch shots from crosses, 20 reps.' },
      ],
      passing: [
        { name: 'Short Passing', goodText: 'Crisp, accurate short passes.', improveText: 'Some short passes slightly underhit.', criticalText: 'Short passing is inaccurate.', drill: 'Wall pass drill: 50 passes each foot against a wall at 5m.' },
        { name: 'Long Passing', goodText: 'Excellent range and accuracy on long balls.', improveText: 'Long passes sometimes overhit.', criticalText: 'Cannot find teammates with long passes.', drill: 'Long pass targets: hit cones at 30m and 40m, 20 attempts each.' },
        { name: 'Vision', goodText: 'Sees passes others miss, great awareness.', improveText: 'Sometimes misses a better passing option.', criticalText: 'Limited vision, only plays safe passes.', drill: 'Rondo drills (4v2, 5v2) focusing on quick scanning.' },
        { name: 'Weight of Pass', goodText: 'Perfect weight on passes for teammates.', improveText: 'Passes occasionally too hard or soft.', criticalText: 'Consistently wrong weight on passes.', drill: 'Passing gates: hit ball through small gates at various distances, 30 reps.' },
      ],
      defending: [
        { name: 'Positioning', goodText: 'Always in the right position to cut off attacks.', improveText: 'Positioning sometimes leaves gaps.', criticalText: 'Often out of position.', drill: 'Shadow defending: mirror attacker movements without ball, 10 min.' },
        { name: 'Tackling', goodText: 'Clean, well-timed tackles.', improveText: 'Tackling timing slightly off.', criticalText: 'Committing fouls with mistimed tackles.', drill: '1v1 tackling drill: defender vs attacker in box, 15 reps.' },
        { name: 'Heading', goodText: 'Dominant in the air, winning headers.', improveText: 'Heading could be more assertive.', criticalText: 'Avoids aerial duels.', drill: 'Heading practice from crosses: 20 defensive headers, 20 attacking.' },
        { name: 'Communication', goodText: 'Organizes the defence effectively.', improveText: 'Could be more vocal in defence.', criticalText: 'Not communicating with teammates.', drill: 'Small-sided games focusing on calling and organizing, 15 min.' },
      ],
    },
    warmup(level) {
      return ['Light jog and dynamic stretches for 5 min', 'Ball control: juggling and passing pairs', 'Agility ladder and cone shuffles', 'Rondo warm-up 4v2'];
    },
    sessions: {
      dribbling(level, weakAreas) {
        const exercises = ['Cone weave dribbling both feet', '1v1 dribbling to beat a defender', 'Speed dribble sprints with ball', 'Skill moves practice: step-overs, drag-backs'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Dribbling Session', exercises };
      },
      shooting(level, weakAreas) {
        const exercises = ['Shooting from edge of box', 'One-touch finishing from crosses', 'Volleys and half-volleys', 'Free-kick technique practice'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Shooting Session', exercises };
      },
      passing(level, weakAreas) {
        const exercises = ['Short passing triangles', 'Long diagonal switches of play', 'Through-ball timing drill', 'Possession game 5v5 in small area'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Passing Session', exercises };
      },
      defending(level, weakAreas) {
        const exercises = ['1v1 defending in channel', 'Pressing triggers and recovery runs', 'Heading clearance practice', 'Back four shape and movement drill'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Defending Session', exercises };
      },
    },
    fitness(level) {
      return { title: 'Football Fitness', exercises: ['Interval runs: 10x 100m at 80% with 30s rest', 'Plyometric box jumps: 3 sets of 10', 'Core strength circuit: planks, sit-ups, leg raises', 'Shuttle runs with direction changes'] };
    },
  },

  // ======================== TENNIS ========================
  tennis: {
    name: 'Tennis',
    icon: '\u{1F3BE}',
    color: '#F57F17',
    roles: [
      { id: 'baseline', name: 'Baseline Player' },
      { id: 'servevolley', name: 'Serve & Volley' },
      { id: 'allcourt', name: 'All-Court Player' },
      { id: 'counterpuncher', name: 'Counter-Puncher' },
    ],
    analysisTypes: [
      { id: 'serve', name: 'Serve', icon: '\u{1F3BE}' },
      { id: 'groundstrokes', name: 'Groundstrokes', icon: '\u{1F3AF}' },
      { id: 'netplay', name: 'Net Play', icon: '\u{1F3D0}' },
    ],
    aspects: {
      serve: [
        { name: 'Ball Toss', goodText: 'Consistent, well-placed toss.', improveText: 'Toss placement varies too much.', criticalText: 'Toss is erratic, causing service errors.', drill: 'Toss-only practice: 50 tosses aiming for racquet placed on ground.' },
        { name: 'Trophy Position', goodText: 'Excellent trophy pose with full shoulder turn.', improveText: 'Trophy position needs more shoulder rotation.', criticalText: 'Skipping the trophy position, losing power.', drill: 'Freeze at trophy position: serve 20 balls pausing at trophy each time.' },
        { name: 'Pronation', goodText: 'Strong pronation generating spin and pace.', improveText: 'Pronation could be more aggressive.', criticalText: 'Not pronating — flat, predictable serves.', drill: 'Pronation drill: serve into fence from 3m focusing on wrist snap, 30 reps.' },
        { name: 'Placement', goodText: 'Excellent serve placement hitting targets.', improveText: 'Serves tend to go to the same spot.', criticalText: 'Cannot direct serves to intended locations.', drill: 'Target practice: place cones in serve boxes, aim for each, 10 per target.' },
        { name: 'Second Serve', goodText: 'Reliable second serve with good spin.', improveText: 'Second serve sometimes tentative.', criticalText: 'Double faults are frequent.', drill: 'Kick serve practice: 40 second serves focusing on heavy topspin.' },
      ],
      groundstrokes: [
        { name: 'Forehand Technique', goodText: 'Powerful, consistent forehand with topspin.', improveText: 'Forehand sometimes breaks down under pressure.', criticalText: 'Forehand technique is fundamentally flawed.', drill: 'Forehand rally drill: 100 forehands cross-court focusing on technique.' },
        { name: 'Backhand Technique', goodText: 'Solid backhand, reliable from both sides.', improveText: 'Backhand is the weaker wing.', criticalText: 'Backhand is a significant weakness.', drill: 'Backhand-only rallies: 100 backhands down the line.' },
        { name: 'Footwork', goodText: 'Excellent court coverage and recovery.', improveText: 'Sometimes caught flat-footed.', criticalText: 'Poor footwork limiting shot quality.', drill: 'Lateral shuffle drill: side to side across baseline, 3 sets of 1 min.' },
        { name: 'Shot Depth', goodText: 'Consistently deep balls pushing opponent back.', improveText: 'Some shots land too short.', criticalText: 'Balls frequently land mid-court.', drill: 'Depth targets: rally aiming past service line, 50 balls each side.' },
      ],
      netplay: [
        { name: 'Volleys', goodText: 'Crisp, angled volleys finishing points.', improveText: 'Volleys sometimes float back.', criticalText: 'Volleying technique needs major work.', drill: 'Volley-volley drill: rapid net exchanges, 3 sets of 2 min.' },
        { name: 'Overhead', goodText: 'Dominant overhead smash.', improveText: 'Overhead sometimes mis-hit.', criticalText: 'Overheads are unreliable.', drill: 'Overhead practice from lob feeds: 30 smashes.' },
        { name: 'Approach Shot', goodText: 'Effective approach shots setting up the volley.', improveText: 'Approach shots need more depth.', criticalText: 'Approach shots sit up for easy passing shots.', drill: 'Approach and volley drill: hit approach, close to net, 20 reps.' },
        { name: 'Split Step', goodText: 'Well-timed split step at the net.', improveText: 'Split step timing is slightly late.', criticalText: 'Not split-stepping, slow reactions at net.', drill: 'Feed drill: partner feeds left and right, split step before each volley, 30 reps.' },
      ],
    },
    warmup(level) {
      return ['Light jog and arm swings for 5 min', 'Mini-tennis rally from service line', 'Groundstroke warm-up: 20 forehands, 20 backhands', 'Volley warm-up at the net'];
    },
    sessions: {
      serve(level, weakAreas) {
        const exercises = ['Serve practice: 20 flat, 20 slice, 20 kick', 'Serve placement: target each corner', 'Second serve consistency drill', 'Serve and first ball attack pattern'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Serve Session', exercises };
      },
      groundstrokes(level, weakAreas) {
        const exercises = ['Cross-court forehand rally', 'Down-the-line backhand drill', 'Inside-out forehand practice', 'Defensive rally from behind baseline'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Groundstrokes Session', exercises };
      },
      netplay(level, weakAreas) {
        const exercises = ['Volley pairs at the net', 'Overhead smash from lob feeds', 'Approach and volley drill', 'Passing shot vs net player practice'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Net Play Session', exercises };
      },
    },
    fitness(level) {
      return { title: 'Tennis Fitness', exercises: ['Side-to-side sprints: 8x baseline width', 'Medicine ball rotational throws: 3x12', 'Skipping rope for footwork: 3 min', 'Core stability: planks and dead bugs'] };
    },
  },

  // ======================== BASKETBALL ========================
  basketball: {
    name: 'Basketball',
    icon: '\u{1F3C0}',
    color: '#E65100',
    roles: [
      { id: 'pointguard', name: 'Point Guard' },
      { id: 'shootingguard', name: 'Shooting Guard' },
      { id: 'smallforward', name: 'Small Forward' },
      { id: 'powerforward', name: 'Power Forward' },
      { id: 'center', name: 'Center' },
    ],
    analysisTypes: [
      { id: 'shooting', name: 'Shooting', icon: '\u{1F3C0}' },
      { id: 'ballhandling', name: 'Ball Handling', icon: '\u{1F3C3}' },
      { id: 'defense', name: 'Defense', icon: '\u{1F6E1}' },
    ],
    aspects: {
      shooting: [
        { name: 'Shooting Form', goodText: 'Textbook shooting form with smooth release.', improveText: 'Shooting form breaks down when fatigued.', criticalText: 'Inconsistent shooting mechanics.', drill: 'Form shooting: 50 shots from 5 feet focusing on BEEF (Balance, Eyes, Elbow, Follow-through).' },
        { name: 'Free Throws', goodText: 'Reliable free throw shooter.', improveText: 'Free throw percentage needs improvement.', criticalText: 'Missing too many free throws.', drill: 'Free throw routine: 10 sets of 10 shots with game-like pressure.' },
        { name: 'Three-Point Range', goodText: 'Consistent from beyond the arc.', improveText: 'Three-point range is inconsistent.', criticalText: 'Struggles from three-point range.', drill: 'Spot-up shooting: 10 shots from each of 5 spots behind the arc.' },
        { name: 'Mid-Range', goodText: 'Automatic from mid-range.', improveText: 'Mid-range game is average.', criticalText: 'Mid-range shots rarely fall.', drill: 'Elbow and baseline mid-range: 10 shots from each spot, both sides.' },
        { name: 'Off-Dribble Shooting', goodText: 'Can create and hit own shot off the dribble.', improveText: 'Pull-up jumper needs more work.', criticalText: 'Cannot shoot effectively off the dribble.', drill: 'Pull-up drill: dribble to spot, pull up, 10 reps from 5 locations.' },
      ],
      ballhandling: [
        { name: 'Crossover', goodText: 'Quick, deceptive crossover.', improveText: 'Crossover could be tighter.', criticalText: 'Crossover is slow and predictable.', drill: 'Stationary crossover drill: 30 seconds fast, 3 sets.' },
        { name: 'Weak Hand', goodText: 'Equally comfortable with both hands.', improveText: 'Weak hand is noticeably less skilled.', criticalText: 'Cannot dribble with weak hand under pressure.', drill: 'Weak hand only dribbling: full court x 10 with moves.' },
        { name: 'Ball Protection', goodText: 'Keeps the ball secure against pressure.', improveText: 'Sometimes turns it over under pressure.', criticalText: 'Frequently loses the ball to defenders.', drill: 'Pressure dribbling: 1v1 full court with trap situations, 10 reps.' },
        { name: 'Court Vision', goodText: 'Head up, seeing the floor and finding open teammates.', improveText: 'Sometimes dribbles with head down.', criticalText: 'Stares at the ball while dribbling.', drill: 'Tennis ball drill: dribble while partner randomly shows numbers to call out.' },
      ],
      defense: [
        { name: 'Defensive Stance', goodText: 'Low, active defensive stance.', improveText: 'Stands too upright defensively.', criticalText: 'Poor defensive positioning.', drill: 'Defensive slides: 4 sets of full court defensive slide drill.' },
        { name: 'On-Ball Defense', goodText: 'Locks down ball handler effectively.', improveText: 'Gets beaten off the dribble sometimes.', criticalText: 'Cannot stay in front of the ball handler.', drill: '1v1 closeout drill: closeout and contain, 20 reps.' },
        { name: 'Help Defense', goodText: 'Excellent help-side rotations.', improveText: 'Late on help-side rotations.', criticalText: 'Does not provide help defense.', drill: 'Shell drill: 4v4 help-side rotation practice, 10 min.' },
        { name: 'Rebounding', goodText: 'Boxes out and secures rebounds.', improveText: 'Sometimes forgets to box out.', criticalText: 'Gets outrebounded regularly.', drill: 'Box-out drill: 1v1 rebounding from free throw miss, 20 reps.' },
      ],
    },
    warmup(level) {
      return ['Light jog and dynamic stretches for 5 min', 'Ball handling warm-up: stationary dribble moves', 'Lay-up lines: right and left hand', 'Free throw shooting to get in rhythm'];
    },
    sessions: {
      shooting(level, weakAreas) {
        const exercises = ['Spot-up shooting from 5 spots', 'Catch-and-shoot drill off screens', 'Free throw sets: 5 sets of 10', 'Game-speed pull-up jumpers'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Shooting Session', exercises };
      },
      ballhandling(level, weakAreas) {
        const exercises = ['Stationary combo moves: 3 min each', 'Full court speed dribble with moves', '2-ball dribbling drill', 'Pick-and-roll ball handling reads'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Ball Handling Session', exercises };
      },
      defense(level, weakAreas) {
        const exercises = ['Defensive slide series', '1v1 on-ball defense', 'Close-out and contest drill', 'Help-side rotation: shell drill'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Defense Session', exercises };
      },
    },
    fitness(level) {
      return { title: 'Basketball Fitness', exercises: ['Suicide sprints: 5 sets', 'Vertical jump training: box jumps 3x10', 'Lateral quickness: defensive slides with band', 'Core circuit: Russian twists, bicycle crunches'] };
    },
  },

  // ======================== HOCKEY ========================
  hockey: {
    name: 'Hockey',
    icon: '\u{1F3D1}',
    color: '#283593',
    roles: [
      { id: 'goalkeeper', name: 'Goalkeeper' },
      { id: 'defender', name: 'Defender' },
      { id: 'midfielder', name: 'Midfielder' },
      { id: 'forward', name: 'Forward' },
    ],
    analysisTypes: [
      { id: 'stickwork', name: 'Stick Work', icon: '\u{1F3D1}' },
      { id: 'shooting', name: 'Shooting', icon: '\u{1F3AF}' },
      { id: 'positioning', name: 'Positioning', icon: '\u{1F9ED}' },
    ],
    aspects: {
      stickwork: [
        { name: 'Dribbling', goodText: 'Excellent close control with the stick.', improveText: 'Ball sometimes gets away during turns.', criticalText: 'Poor control under pressure.', drill: 'Indian dribble through cones: 3 sets of 10 cones, increasing speed.' },
        { name: 'Trapping', goodText: 'Clean first touch, ball under control instantly.', improveText: 'Trapping sometimes bounces off stick.', criticalText: 'Cannot control the ball on first touch.', drill: 'Wall passing and trapping: 50 passes, cushion each one.' },
        { name: 'Reverse Stick', goodText: 'Confident use of the reverse stick.', improveText: 'Reverse stick play needs more practice.', criticalText: 'Avoids using the reverse stick.', drill: 'Reverse stick dribble course: 20 repetitions through cones.' },
        { name: '3D Skills', goodText: 'Uses aerial balls and lifts effectively.', improveText: '3D skills are developing.', criticalText: 'Cannot lift or control aerial balls.', drill: 'Jink and lift drill: practice lifting ball over stick, 30 reps.' },
      ],
      shooting: [
        { name: 'Hit', goodText: 'Powerful, accurate hits from distance.', improveText: 'Hitting accuracy is inconsistent.', criticalText: 'Hits lack power and accuracy.', drill: 'Hitting practice at goal: 20 hits from top of circle each side.' },
        { name: 'Flick', goodText: 'Excellent drag-flick technique.', improveText: 'Flick could be more powerful.', criticalText: 'Cannot execute a proper flick.', drill: 'Drag-flick practice: 30 flicks at goal from penalty spot.' },
        { name: 'Deflection', goodText: 'Sharp deflections redirecting the ball.', improveText: 'Deflection timing needs work.', criticalText: 'Cannot deflect balls effectively.', drill: 'Deflection drill: partner crosses, deflect at goal, 20 reps.' },
        { name: 'Shot Selection', goodText: 'Chooses the right shot for each situation.', improveText: 'Sometimes uses wrong type of shot.', criticalText: 'Poor decision-making on shot type.', drill: 'Situation shooting: coach calls shot type, execute, 20 reps.' },
      ],
      positioning: [
        { name: 'Attacking Position', goodText: 'Creates space and finds gaps in defence.', improveText: 'Could make better off-ball runs.', criticalText: 'Static in attack, not finding space.', drill: 'Movement pattern drill: practice leads and decoy runs, 15 min.' },
        { name: 'Defensive Position', goodText: 'Solid defensive positioning, cuts passing lanes.', improveText: 'Sometimes leaves gaps in defence.', criticalText: 'Out of position defensively.', drill: 'Defensive shape drill: 4v4 half-field, maintain structure, 10 min.' },
        { name: 'Transition', goodText: 'Quick to transition between attack and defence.', improveText: 'Transition speed could improve.', criticalText: 'Slow to react on turnovers.', drill: 'Transition game: 3v3 with quick turnover scenarios, 10 min.' },
        { name: 'Set Pieces', goodText: 'Knows role in all set-piece routines.', improveText: 'Set-piece positioning needs refinement.', criticalText: 'Lost during set pieces.', drill: 'Corner routine practice: 15 short corners with assigned roles.' },
      ],
    },
    warmup(level) {
      return ['Light jog with stick and ball for 5 min', 'Dynamic stretches focusing on hips and wrists', 'Passing pairs: push pass and trap', 'Indian dribble warm-up through cones'];
    },
    sessions: {
      stickwork(level, weakAreas) {
        const exercises = ['Dribble course: close control at speed', 'Reverse stick practice drills', '1v1 elimination with stick skills', '3D skills: jinks, aerials, lifts'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Stick Work Session', exercises };
      },
      shooting(level, weakAreas) {
        const exercises = ['Hitting from top of circle', 'Drag-flick penalty corner practice', 'Deflection finishing drill', 'Shooting under pressure: defender closing'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Shooting Session', exercises };
      },
      positioning(level, weakAreas) {
        const exercises = ['Positional play: small-sided game', 'Defensive structure drill', 'Attacking movement patterns', 'Set-piece rehearsal: corners and free hits'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Positioning Session', exercises };
      },
    },
    fitness(level) {
      return { title: 'Hockey Fitness', exercises: ['Sprint intervals: 8x 40m sprints', 'Agility ladder: 3 patterns x 3 sets', 'Core strength: plank variations for 5 min', 'Squat and lunge circuit for leg power'] };
    },
  },

  // ======================== VOLLEYBALL ========================
  volleyball: {
    name: 'Volleyball',
    icon: '\u{1F3D0}',
    color: '#7B1FA2',
    roles: [
      { id: 'setter', name: 'Setter' },
      { id: 'outsidehitter', name: 'Outside Hitter' },
      { id: 'middleblocker', name: 'Middle Blocker' },
      { id: 'oppositehitter', name: 'Opposite Hitter' },
      { id: 'libero', name: 'Libero' },
    ],
    analysisTypes: [
      { id: 'serving', name: 'Serving', icon: '\u{1F3D0}' },
      { id: 'spiking', name: 'Spiking', icon: '\u{1F4A5}' },
      { id: 'passing', name: 'Passing & Receiving', icon: '\u{1F91D}' },
      { id: 'blocking', name: 'Blocking', icon: '\u{1F6E1}' },
    ],
    aspects: {
      serving: [
        { name: 'Ball Toss', goodText: 'Consistent, well-placed toss for the serve.', improveText: 'Toss placement is inconsistent, affecting serve accuracy.', criticalText: 'Toss is erratic, causing service errors.', drill: 'Toss-only practice: 50 tosses to the same height and spot.' },
        { name: 'Contact Point', goodText: 'Clean contact at the highest point with a firm wrist.', improveText: 'Contact sometimes too low or off-centre.', criticalText: 'Poor contact causing shanked serves.', drill: 'Wall serve drill: serve into wall from 3m focusing on hand contact, 30 reps.' },
        { name: 'Serve Placement', goodText: 'Consistently targeting zones and weak passers.', improveText: 'Serves land in general areas but lack precision.', criticalText: 'Cannot place serves intentionally.', drill: 'Zone serving: place targets in each zone, 10 serves per zone.' },
        { name: 'Serve Variety', goodText: 'Uses float, topspin, and jump serves effectively.', improveText: 'Relies on one serve type too much.', criticalText: 'Only has one predictable serve.', drill: 'Alternate serve types: 10 float, 10 topspin, 10 jump serves.' },
      ],
      spiking: [
        { name: 'Approach Footwork', goodText: 'Explosive 3-step approach with great timing.', improveText: 'Approach timing is sometimes off.', criticalText: 'Approach footwork is incorrect.', drill: 'Approach-only drill without ball: 3-step approach to jump, 20 reps.' },
        { name: 'Arm Swing', goodText: 'Full arm swing generating power and control.', improveText: 'Arm swing sometimes cuts short.', criticalText: 'Arm swing lacks power and extension.', drill: 'Standing spike drill: hit from platform focusing on full swing, 30 reps.' },
        { name: 'Shot Selection', goodText: 'Reads the block and hits around it effectively.', improveText: 'Sometimes hits into the block.', criticalText: 'No awareness of the block.', drill: 'Line and cross-court hitting: 15 each direction with a blocker.' },
        { name: 'Timing with Setter', goodText: 'Perfect sync with setter on all tempos.', improveText: 'Timing off on quick sets.', criticalText: 'Frequently mistimes the jump.', drill: 'Setter-hitter connection drill: 30 sets at each tempo (high, medium, quick).' },
      ],
      passing: [
        { name: 'Platform Angle', goodText: 'Consistent platform angle directing balls to target.', improveText: 'Platform angle sometimes off, passes go astray.', criticalText: 'Cannot control platform angle.', drill: 'Partner passing: 100 passes focusing on angling platform to target.' },
        { name: 'Serve Receive', goodText: 'Reliable passer in serve receive formation.', improveText: 'Struggles with tough float serves.', criticalText: 'Serve receive is unreliable.', drill: 'Serve receive drill: receive 30 serves from various positions.' },
        { name: 'Movement to Ball', goodText: 'Moves feet quickly to get behind the ball.', improveText: 'Sometimes reaches instead of moving feet.', criticalText: 'Feet are planted, reaching for everything.', drill: 'Shuffle and pass: coach tosses to different spots, move and pass, 20 reps.' },
        { name: 'Setting (Overhead)', goodText: 'Clean overhead sets with good location.', improveText: 'Sets sometimes too tight or too far off the net.', criticalText: 'Overhead setting is inconsistent.', drill: 'Setting against wall: 50 sets focusing on hand position and follow-through.' },
      ],
      blocking: [
        { name: 'Footwork', goodText: 'Quick lateral movement along the net.', improveText: 'Slide step could be faster.', criticalText: 'Too slow moving along the net.', drill: 'Blocking footwork: slide-step drill along net, 3 sets of 10 reps each direction.' },
        { name: 'Timing', goodText: 'Jumps at the perfect time to seal the net.', improveText: 'Sometimes jumps too early or too late.', criticalText: 'Blocking timing is way off.', drill: 'Reaction blocking: partner spikes, focus on timing the jump, 30 reps.' },
        { name: 'Hand Penetration', goodText: 'Hands press over the net, closing the block.', improveText: 'Hands sometimes pull back instead of pressing over.', criticalText: 'Hands do not penetrate over the net.', drill: 'Net press drill: jump and press hands over net without ball, 20 reps.' },
        { name: 'Reading the Hitter', goodText: 'Reads the hitter\'s approach and arm to position block.', improveText: 'Sometimes guesses instead of reading.', criticalText: 'Cannot read hitter\'s intentions.', drill: 'Video study + live blocking: watch hitter approach cues, then block 20 reps.' },
      ],
    },
    warmup(level) {
      return ['Light jog and dynamic stretches for 5 min', 'Pepper drill: pass-set-hit with partner', 'Serving warm-up: 10 easy serves', 'Blocking footwork along the net'];
    },
    sessions: {
      serving(level, weakAreas) {
        const exercises = ['Float serve practice: 20 serves to zones', 'Jump serve technique: 15 reps', 'Serve-and-cover drill', 'Pressure serving: must hit target 3 in a row'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Serving Session', exercises };
      },
      spiking(level, weakAreas) {
        const exercises = ['Approach and hit: 20 reps from left side', 'Back row attack practice', 'Tip and roll shot drill', 'Hitting against a block: line and cross'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Spiking Session', exercises };
      },
      passing(level, weakAreas) {
        const exercises = ['Serve receive rotations', 'Passing accuracy: target passing', 'Dig drill: defensive digs from attacks', 'Overhead setting accuracy drill'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Passing & Receiving Session', exercises };
      },
      blocking(level, weakAreas) {
        const exercises = ['Solo blocking footwork drill', 'Double block coordination', 'Read and react blocking', 'Transition: block to attack drill'];
        if (weakAreas.length > 0) exercises.push(`Focus: ${weakAreas[0].aspect} drills`);
        return { title: 'Blocking Session', exercises };
      },
    },
    fitness(level) {
      return { title: 'Volleyball Fitness', exercises: ['Vertical jump training: box jumps 3x10', 'Lateral agility: side shuffles with band', 'Core circuit: planks, V-ups, Russian twists', 'Shoulder strengthening: band pull-aparts 3x15'] };
    },
  },
};
