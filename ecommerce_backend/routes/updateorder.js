const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order");
const bodyParser = require("body-parser");
const checkAuth = require("../middleware/checkauth");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//Find the Order using OrderID from the url(params) and delete the Order from the database
router.patch("/:OrderId", urlencodedParser, checkAuth, async (req, res) => {
  try {
    // console.log(req.params.OrderId);
    // console.log("Body"+req.body);
    const updateOrder = await Order.findByIdAndUpdate(req.params.OrderId, {
      orderstatus: "Shipped",
      couriername: req.body.couriername,
      trackingid: req.body.trackingid,
    });
    res.json(updateOrder);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
