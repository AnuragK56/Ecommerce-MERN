const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
const crypto = require("crypto");
// Using web hooks of razorpay for the confirmation of Payment

router.post("/", async (req, res) => {
  // do a validation
  const secret = "secretkey";
  let transactionid = req.body.payload.payment.entity.id;
  let orderid = req.body.payload.payment.entity.order_id;
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  // console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    // console.log("request is legit");
    try {
      let cart;
      const response = await Order.findOneAndUpdate(
        { "razorpay.razorpay_orderid": orderid },
        {
          $set: {
            "razorpay.paymentcaptured": Date.now(),
            "razorpay.transactionid": transactionid,
            "razorpay.paymentstatus": "Paid",
          },
        }
      );
      cart = response.cart;
      for (var i in cart) {
        Product.findByIdAndUpdate(
          { _id: cart[i].productid },
          { $inc: { stock: -cart[i].quantity } }
        )
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // console.log(response);
      // console.log(razorpay_order_id + " " + receipt + "  " + total);
      res.json({ status: "ok" });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  } else {
    res.json({ status: "ok" });
  }
});

module.exports = router;
