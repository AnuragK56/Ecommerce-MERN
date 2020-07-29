//Importing the packages which are required
const express = require("express");
const app = express();
const shortid = require("shortid");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
require("dotenv/config");

//Adding routes
const verifypaymentRoute = require("./routes/payment");
app.use("/verifypayment", verifypaymentRoute);

//Route to add product
const addproduct = require("./routes/addproduct");
app.use("/addproduct", addproduct);

//Route to show all products
const getproducts = require("./routes/getproducts");
app.use("/getproducts", getproducts);

//Route to show all products
const deleteproduct = require("./routes/deleteproduct");
app.use("/deleteproduct", deleteproduct);

var port = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.listen(port, function () {
  console.log("Our app is running on http://localhost:" + port);
});
app.use(bodyParser.json());

//Connect to the razorpay Account
var razorpay = new Razorpay({
  key_id: process.env.Razorpay_key_id,
  key_secret: process.env.Razorpay_key_secret,
});

//Connecting to the Database

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db");
  }
);

//Creating orderID for transaction razorpay

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

//Using web hooks of razorpay for the confirmation of Payment

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
