const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  name: String,
  price: Number,
  location: String,
  images: [String],
  coverImage: String,
  description: String,
  aminities: [String],
  beds: Number,
  baths: Number,
  sqft: Number,
  build: Number,
  status: Boolean,
});

const Property = new mongoose.model("Property", PropertySchema);
module.exports = Property;
