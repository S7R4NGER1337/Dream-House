const router = require('express').Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const auth = require('./middleware/auth')
const Property = require('./models/Property')
const Agent = require('./models/Agent')

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 4 * 60 * 60 * 1000, // 4 hours
}

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a))
  const bufB = Buffer.from(String(b))
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

// ── Validation helpers ─────────────────────────────────────────────────────────

function isValidUrl(str) {
  try {
    const url = new URL(str)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function validateProperty(body) {
  const errors = []
  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) errors.push('Name is required')
  if (!body.price || isNaN(Number(body.price)) || Number(body.price) <= 0) errors.push('Valid price is required')
  if (!body.location || typeof body.location !== 'string' || !body.location.trim()) errors.push('Location is required')
  if (body.beds !== undefined && body.beds !== '' && (isNaN(Number(body.beds)) || Number(body.beds) < 0)) errors.push('Beds must be a non-negative number')
  if (body.baths !== undefined && body.baths !== '' && (isNaN(Number(body.baths)) || Number(body.baths) < 0)) errors.push('Baths must be a non-negative number')
  if (body.coverImage && !isValidUrl(body.coverImage)) errors.push('Cover image must be a valid http/https URL')
  if (Array.isArray(body.images)) {
    const bad = body.images.filter(u => !isValidUrl(u))
    if (bad.length) errors.push('One or more image URLs are invalid')
  }
  return errors
}

function validateAgent(body) {
  const errors = []
  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) errors.push('Name is required')
  if (!body.position || typeof body.position !== 'string' || !body.position.trim()) errors.push('Position is required')
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Invalid email format')
  if (body.photo && !isValidUrl(body.photo)) errors.push('Photo must be a valid http/https URL')
  return errors
}

// ── Login ──────────────────────────────────────────────────────────────────────

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' })
  if (!safeEqual(username, process.env.ADMIN_USER) || !safeEqual(password, process.env.ADMIN_PASS)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '4h' })
  res.cookie('adminToken', token, COOKIE_OPTS)
  res.json({ ok: true })
})

router.get('/verify', auth, (_req, res) => {
  res.json({ ok: true })
})

router.post('/logout', (_req, res) => {
  res.clearCookie('adminToken', COOKIE_OPTS)
  res.json({ ok: true })
})

// ── Stats ──────────────────────────────────────────────────────────────────────

router.get('/stats', auth, async (_req, res) => {
  try {
    const [properties, active, agents, recent] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ status: true }),
      Agent.countDocuments(),
      Property.find().sort({ _id: -1 }).limit(5).populate('agent', 'name').lean(),
    ])
    res.json({ properties, active, agents, recent })
  } catch {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

// ── Properties ─────────────────────────────────────────────────────────────────

router.get('/properties', auth, async (_req, res) => {
  try {
    const properties = await Property.find().populate('agent', 'name photo').sort({ _id: -1 }).lean()
    res.json(properties)
  } catch {
    res.status(500).json({ error: 'Failed to fetch properties' })
  }
})

router.get('/properties/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('agent', 'name photo').lean()
    if (!property) return res.status(404).json({ error: 'Property not found' })
    res.json(property)
  } catch {
    res.status(500).json({ error: 'Failed to fetch property' })
  }
})

router.post('/properties', auth, async (req, res) => {
  const errors = validateProperty(req.body)
  if (errors.length) return res.status(400).json({ error: errors.join('; ') })
  try {
    const property = await Property.create(req.body)
    res.status(201).json(property)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to create property' })
  }
})

router.put('/properties/:id', auth, async (req, res) => {
  const errors = validateProperty(req.body)
  if (errors.length) return res.status(400).json({ error: errors.join('; ') })
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!property) return res.status(404).json({ error: 'Property not found' })
    res.json(property)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to update property' })
  }
})

router.delete('/properties/:id', auth, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete property' })
  }
})

// ── Agents ─────────────────────────────────────────────────────────────────────

router.get('/agents/:id', auth, async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id).lean()
    if (!agent) return res.status(404).json({ error: 'Agent not found' })
    res.json(agent)
  } catch {
    res.status(500).json({ error: 'Failed to fetch agent' })
  }
})

router.get('/agents', auth, async (_req, res) => {
  try {
    const agents = await Agent.find().sort({ _id: -1 }).lean()
    res.json(agents)
  } catch {
    res.status(500).json({ error: 'Failed to fetch agents' })
  }
})

router.post('/agents', auth, async (req, res) => {
  const errors = validateAgent(req.body)
  if (errors.length) return res.status(400).json({ error: errors.join('; ') })
  try {
    const agent = await Agent.create(req.body)
    res.status(201).json(agent)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to create agent' })
  }
})

router.put('/agents/:id', auth, async (req, res) => {
  const errors = validateAgent(req.body)
  if (errors.length) return res.status(400).json({ error: errors.join('; ') })
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!agent) return res.status(404).json({ error: 'Agent not found' })
    res.json(agent)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to update agent' })
  }
})

router.delete('/agents/:id', auth, async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete agent' })
  }
})

module.exports = router
