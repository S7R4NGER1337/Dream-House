const router = require('express').Router()
const propertyManager = require('./propertyManager')

router.get('/getAll', async (req, res) => {
    const allProperties = await propertyManager.getAll()
    res.json(allProperties)
})

module.exports = router