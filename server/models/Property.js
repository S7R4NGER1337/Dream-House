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

const Property = new mongoose.model("Property", PropertySchema);
module.exports = Property;
