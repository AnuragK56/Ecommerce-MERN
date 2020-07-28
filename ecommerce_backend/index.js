const express = require("express");
const app = express();
const shortid = require("shortid");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");

var port = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.listen(port, function () {
  console.log("Our app is running on http://localhost:" + port);
});
app.use(bodyParser.json());

var razorpay = new Razorpay({
  key_id: "rzp_test_xfqXHG772xVSUH",
  key_secret: "kvQwkiGcUgtlGQs4pDuYkMF5",
});

app.post("/razorpay", async (req, res) => {
  const amount = 100;
  const currency = "INR";
  const payment_capture = 1;
  const receipt = shortid.generate();
  const options = { amount: amount * 100, currency, receipt, payment_capture };
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/verification", (req, res) => {
  // do a validation
  const secret = "secretkey";

  console.log(req.body);

  const crypto = require("crypto");

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
