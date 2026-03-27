const router = require('express').Router()
const Contact = require('./models/Contact')
const Inquiry = require('./models/Inquiry')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// POST /api/contact
router.post('/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body

  if (!name?.trim())                    return res.status(400).json({ error: 'Name is required' })
  if (!email?.trim() || !EMAIL_RE.test(email)) return res.status(400).json({ error: 'Valid email is required' })
  if (!subject?.trim())                 return res.status(400).json({ error: 'Subject is required' })
  if (!message?.trim())                 return res.status(400).json({ error: 'Message is required' })

  try {
    await Contact.create({ name: name.trim(), email: email.trim(), phone: phone?.trim(), subject: subject.trim(), message: message.trim() })
    res.status(201).json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to save message' })
  }
})

// POST /api/inquiry
router.post('/inquiry', async (req, res) => {
  const { propertyId, agentId, name, email, phone, message } = req.body

  if (!name?.trim())                    return res.status(400).json({ error: 'Name is required' })
  if (!email?.trim() || !EMAIL_RE.test(email)) return res.status(400).json({ error: 'Valid email is required' })
  if (!message?.trim())                 return res.status(400).json({ error: 'Message is required' })

  try {
    await Inquiry.create({ propertyId, agentId, name: name.trim(), email: email.trim(), phone: phone?.trim(), message: message.trim() })
    res.status(201).json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to save inquiry' })
  }
})

module.exports = router
