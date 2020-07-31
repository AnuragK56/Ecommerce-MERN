const mongoose = require("mongoose");

//Schema for storing Customer Details
const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  phonenumber: { type: Number, required: true },
  email: { type: String, required: true },
});
module.exports = mongoose.model("Customer", customerSchema);
