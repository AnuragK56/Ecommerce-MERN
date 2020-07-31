const mongoose = require("mongoose");

//Schema for storing Cart Schema Details
const cartSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
});

//Schema for Creating a order Schema
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cart: [cartSchema],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  razorpay_orderid: { type: String, required: true },
  razorpay_reciept: { type: String, required: true },
  orderstatus: { type: String, required: true, default: "Unpaid" },
  total: { type: Number, required: true },
  ordercreation: { type: Date, default: Date.now },
  paymentcaptured: { type: Date },
  transactionid: { type: String },
});
module.exports = mongoose.model("Order", orderSchema);
