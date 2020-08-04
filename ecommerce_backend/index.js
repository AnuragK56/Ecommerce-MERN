//Importing the packages which are required
const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv/config");
app.use(cors());
app.use(bodyParser.json());

//making Photos available
app.use("/uploads", express.static("uploads"));
// app.use(express.static(__dirname + "/public"));

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

//Route to Webhook to automatically verify payment
const verifypayment = require("./routes/verifypayment");
app.use("/verifypayment", verifypayment);

//Route to login where user is verified
const adminpanel = require("./routes/adminpanel");
app.use("/adminpanel", adminpanel);

//Route to return orders to admin
const showorders = require("./routes/showorders");
app.use("/showorders", showorders);


//Route to create Order id
const createorder = require("./routes/createorder");
app.use("/createorder", createorder);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
var port = process.env.PORT || 5000;
app.set("view engine", "ejs");

app.listen(port, function () {
  console.log("Our app is running on http://localhost:" + port);
});
app.use(bodyParser.json());

//Connecting to the Database

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to db");
  }
);
