const Property = require('./models/Property')
require('./models/Agent') // register Agent schema for populate

exports.getAll = async () => {
    const allProperties = await Property.find().populate('agent')
    return allProperties
}

exports.getById = async (id) => {
    const property = await Property.findById(id).populate('agent')
    return property
}

exports.createProperty = async (data) => {
    const newProperty = await Property.create(data)
    return newProperty
}
