const express = require("express");
const app = express();
const router = express.Router();
const crypto = require("crypto");

router.post("/verifypayment", (req, res) => {
  // do a validation
  const secret = "secretkey";
  console.log(req.body);
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    console.log(req.body);
    try {
      const updateOrder = Order.updateOne(
        { razorpay_orderid: req.body.razorpay_orderid },
        {
          $set: {
            orderstatus: "paid",
            paymentcaptured: Date.now(),
            transactionid: req.body.payment_id,
          },
        }
      );
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});
module.exports = router;
