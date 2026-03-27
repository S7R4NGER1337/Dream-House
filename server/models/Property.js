const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  name: { type: String, required: true, trim: true, maxlength: 200 },
  price: { type: Number, required: true, min: 0 },
  location: { type: String, required: true, trim: true, maxlength: 300 },
  images: [String],
  coverImage: String,
  description: { type: String, trim: true, maxlength: 5000 },
  amenities: [String],
  beds: { type: Number, min: 0 },
  baths: { type: Number, min: 0 },
  sqft: { type: Number, min: 0 },
  build: { type: Number, min: 1800, max: 2100 },
  status: { type: Boolean, default: true },
});

PropertySchema.index({ agent: 1 })
PropertySchema.index({ price: 1 })
PropertySchema.index({ location: 1 })
PropertySchema.index({ beds: 1 })
PropertySchema.index({ status: 1 })

const Property = new mongoose.model("Property", PropertySchema);
module.exports = Property;
