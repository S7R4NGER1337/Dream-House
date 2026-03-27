const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  // Prefer httpOnly cookie; fall back to Authorization header for backward compat
  const token =
    req.cookies?.adminToken ||
    (req.headers['authorization']?.startsWith('Bearer ')
      ? req.headers['authorization'].slice(7)
      : null)

  if (!token) return res.status(401).json({ error: 'No token provided' })

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' })
    }
    res.status(401).json({ error: 'Invalid token' })
  }
}
