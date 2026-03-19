const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  name: String,
  price: Number,
  location: String,
  images: [String],
  coverImage: String,
  description: String,
  amenities: [String],
  beds: Number,
  baths: Number,
  sqft: Number,
  build: Number,
  status: Boolean,
});

PropertySchema.index({ agent: 1 })
PropertySchema.index({ price: 1 })
PropertySchema.index({ location: 1 })
PropertySchema.index({ beds: 1 })
PropertySchema.index({ status: 1 })

const Property = new mongoose.model("Property", PropertySchema);
module.exports = Property;
