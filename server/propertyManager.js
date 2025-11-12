const Property = require('./models/Property')

exports.getAll = async () => {
    const allProperties = await Property.find()
    return allProperties
}