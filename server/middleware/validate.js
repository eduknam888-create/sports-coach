const VALID_SPORTS = ['cricket', 'football', 'tennis', 'basketball', 'hockey', 'volleyball'];

function validateSport(req, res, next) {
  const sport = req.params.sport;
  if (!VALID_SPORTS.includes(sport)) {
    return res.status(400).json({ error: `Invalid sport: ${sport}` });
  }
  next();
}

module.exports = { validateSport, VALID_SPORTS };
