const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true, maxlength: 100 },
  email:   { type: String, required: true, trim: true, maxlength: 200 },
  phone:   { type: String, trim: true, maxlength: 50 },
  subject: { type: String, required: true, trim: true, maxlength: 100 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
}, { timestamps: true })

module.exports = mongoose.model('Contact', ContactSchema)
