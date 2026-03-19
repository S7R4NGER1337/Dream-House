const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const header = req.headers['authorization']
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }
  const token = header.slice(7)
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
