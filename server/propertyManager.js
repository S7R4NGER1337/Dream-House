const Property = require('./models/Property')

exports.getAll = async () => {
    const allProperties = await Property.find()
    return allProperties
}

exports.getById = async (id) => {
    const property = await Property.findById(id)
    return property
}

exports.createProperty = async (data) => {
    const newProperty = await Property.create(data)
    return newProperty
}
