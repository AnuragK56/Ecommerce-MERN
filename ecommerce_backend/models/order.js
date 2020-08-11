const mongoose = require("mongoose");
var shortId = require("shortid");
//Schema for storing Cart Schema Details
const cartSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const razorpaySchema = mongoose.Schema({
  razorpay_orderid: { type: String },
  razorpay_reciept: { type: String },
  paymentcaptured: { type: Date },
  transactionid: { type: String },
  paymentstatus: { type: String, default: "Unpaid" },
});

//Schema for Creating a order Schema
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orderid: { type: String, unique: true, default: shortId.generate },
  cart: [cartSchema],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  paymentmethod: { type: String, required: true },
  razorpay: razorpaySchema,
  couriername:{type:String},
  trackingid:{type:String},
  orderstatus: { type: String, default: "OrderCreated" },
  total: { type: Number, required: true },
  ordercreation: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Order", orderSchema);
