const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const path = require('path')
require('dotenv').config()

const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET', 'ADMIN_USER', 'ADMIN_PASS']
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) throw new Error(`Missing required env var: ${key}`)
}
const propertyController = require('./propertyController')
const adminController = require('./adminController')

const app = express()

// Trust reverse proxy (Vercel, nginx, etc.)
app.set('trust proxy', 1)

app.use(helmet())

// CORS — allow configured frontend origin
app.use(cors({
  origin: process.env.FRONTEND || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
}))

app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: false, limit: '2mb' }))

// Rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/admin/login', loginLimiter)

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', apiLimiter)
app.use('/property/', apiLimiter)

// API routes
app.use('/property', propertyController)
app.use('/api/admin', adminController)

// Serve React build locally (not used on Vercel — client is deployed separately)
if (!process.env.VERCEL) {
  const buildPath = path.join(__dirname, '../client/build')
  app.use(express.static(buildPath))
  app.use((_req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
  })
}

// Database — cached connection for serverless
let dbConnected = false
async function connectDB() {
  if (dbConnected) return
  await mongoose.connect(process.env.MONGO_URI)
  dbConnected = true
  console.log('DB connected')
}
connectDB().catch(err => console.error('DB connection error:', err))

// Export for Vercel serverless
module.exports = app

// Listen only when running locally
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3030
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}
