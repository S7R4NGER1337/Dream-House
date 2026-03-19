const mongoose = require('mongoose')

const AgentSchema = new mongoose.Schema({
  name: String,
  position: String,
  phone: String,
  email: String,
  photo: String,
})

const Agent = mongoose.model('Agent', AgentSchema)
module.exports = Agent
