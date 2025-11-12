const Property = require('./models/Property')

exports.getAll = async () => {
    const allProperties = await Property.find()
    return allProperties
}

exports.createProperty = async (data) => {
    const newProperty = await Property.create(data)
    return allProperties
}