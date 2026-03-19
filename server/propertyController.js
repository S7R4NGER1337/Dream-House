const router = require('express').Router()
const propertyManager = require('./propertyManager')

router.get('/getAll', async (_req, res) => {
    try {
        const allProperties = await propertyManager.getAll()
        res.json(allProperties)
    } catch (error) {
        console.error('Failed to fetch properties:', error)
        res.status(500).json({ error: 'Failed to fetch properties' })
    }
})

module.exports = router