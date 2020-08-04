const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Orders = require("../models/order");

//Returns all the products in JSON Format
router.get("/", async (req, res) => {
  try {
    const orders = await Orders.find()
      .populate("customer")
      .populate("cart.product")
      .exec();
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;