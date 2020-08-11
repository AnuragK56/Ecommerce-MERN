const mongoose = require("mongoose");
const ImageSchema = mongoose.Schema({
  image: { type: String, type: Number },
});
//Schema for storing Product Details
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  minidescription: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: [ImageSchema],
  image: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  count: { type: Number, default: 1 },
});
module.exports = mongoose.model("Product", productSchema);
