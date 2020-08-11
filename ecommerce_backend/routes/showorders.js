const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Orders = require("../models/order");
const checkAuth = require("../middleware/checkauth");

//Returns all the products in JSON Format
router.get("/", checkAuth, async (req, res) => {
  try {
    const orders = await Orders.find()
      .populate("customer")
      .exec();
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
