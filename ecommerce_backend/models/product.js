const mongoose = require("mongoose");

//Schema for storing Product Details
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  count: { type: Number, default: 1 },
});
module.exports = mongoose.model("Product", productSchema);
