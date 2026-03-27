const mongoose = require('mongoose')

const InquirySchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  agentId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  name:       { type: String, required: true, trim: true, maxlength: 100 },
  email:      { type: String, required: true, trim: true, maxlength: 200 },
  phone:      { type: String, trim: true, maxlength: 50 },
  message:    { type: String, required: true, trim: true, maxlength: 2000 },
}, { timestamps: true })

module.exports = mongoose.model('Inquiry', InquirySchema)
