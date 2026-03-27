const mongoose = require('mongoose')

const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  position: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, trim: true, maxlength: 50 },
  email: { type: String, trim: true, maxlength: 200, lowercase: true },
  photo: String,
})

const Agent = mongoose.model('Agent', AgentSchema)
module.exports = Agent
