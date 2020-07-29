const express = require("express");
const app=express();
const router=express.Router();
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
      require("fs").writeFileSync(
        "payment1.json",
        JSON.stringify(req.body, null, 4)
      );
    } else {
      // pass it
    }
    res.json({ status: "ok" });
  });
  module.exports=router;