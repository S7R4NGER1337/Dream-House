const router = require('express').Router()
const propertyManager = require('./propertyManager')
const Property = require('./models/Property')
const auth = require('./middleware/auth')

// Must be before /:id to avoid being matched as an id
router.get('/featured', async (_req, res) => {
  try {
    const properties = await Property.find().sort({ _id: -1 }).limit(4).populate('agent').lean()
    res.json(properties)
  } catch {
    res.status(500).json({ error: 'Failed to fetch featured properties' })
  }
})

router.get('/getAll', async (_req, res) => {
  try {
    const allProperties = await propertyManager.getAll()
    res.json(allProperties)
  } catch (error) {
    console.error('Failed to fetch properties:', error)
    res.status(500).json({ error: 'Failed to fetch properties' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const property = await propertyManager.getById(req.params.id)
    if (!property) return res.status(404).json({ error: 'Property not found' })
    res.json(property)
  } catch (error) {
    console.error('Failed to fetch property:', error)
    res.status(500).json({ error: 'Failed to fetch property' })
  }
})

// Protected — admin only
router.post('/create', auth, async (req, res) => {
  try {
    const newProperty = await propertyManager.createProperty(req.body)
    res.status(201).json(newProperty)
  } catch (error) {
    console.error('Failed to create property:', error)
    res.status(500).json({ error: 'Failed to create property' })
  }
})

module.exports = router
