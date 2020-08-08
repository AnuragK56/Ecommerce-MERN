const express = require("express");
const app = express();
var myParser = require("body-parser");
const router = express.Router();
const Order = require("../models/order");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const { response } = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Customer = require("../models/Customer");

//Connect to the razorpay Account
var razorpay = new Razorpay({
  key_id: process.env.Razorpay_key_id,
  key_secret: process.env.Razorpay_key_secret,
});

//Variable to store data
var razorpay_order_id = "";
const currency = "INR";
app.use(bodyParser.json());
var jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
  //Function to create and get customer_id which is required to  generate Order
  let customer_id;
  async function createCustomer() {
    try {
      //Creating a new Customer in database
      const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.customer.firstname,
        lastname: req.body.customer.lastname,
        address: req.body.customer.address,
        state: req.body.customer.state,
        city: req.body.customer.city,
        pincode: req.body.customer.pincode,
        phonenumber: req.body.customer.phonenumber,
        email: req.body.customer.email,
      });

      //Saving the customer in database
      await customer.save().then((result) => {
        customer_id = result._id;
      });
    } catch (err) {
      console.log("err" + err);
      res.status(500).send(err);
    }
  }

  //There are two payment option "COD " && Razorpay
  //For COD,
  if (req.body.paymentmethod === "COD") {
    //Calling function to create customer
    await createCustomer();
    //Creating order Id to add in database
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      cart: req.body.cart,
      total: req.body.total,
      customer: customer_id,
      paymentmethod: req.body.paymentmethod,
      orderstatus: "Order Created",
    });
    // Then saving the order to the database
    order
      .save()
      .then((result) => {
        console.log(result);
        //Sending the details
        res.status(201).json({
          message: "Created order successfully",
          createdorder: {
            id: result.id,
            orderid: result.orderid,
            cart: result.cart,
            customer: result.customer,
            total: result.total,
            paymentmethod: result.paymentmethod,
            orderstatus: result.orderstatus,
            ordercreation: result.ordercreation,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else {
    //For Razorpay Payment
    await createCustomer();
    let orderId;
    let receipt;
    //Creating Razorpay order
    const amount = req.body.total;
    const payment_capture = 1;
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      cart: req.body.cart,
      total: req.body.total,
      customer: customer_id,
      paymentmethod: req.body.paymentmethod,
      orderstatus: "Order Created",
    });
    const data = await order
      .save()
      .then((result) => {
        // console.log("Result" + result);
        orderId = result._id;
        receipt = result.orderid;
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
    // console.log("Data orderid   :" + receipt + " " + orderId);
    var total = Number(req.body.total);
    total = total * 100;
    const options = {
      amount: total,
      currency,
      receipt,
      payment_capture,
    };
    +    //Requesting Razorpay to create an Order
    try {
      const response = await razorpay.orders.create(options);
      // console.log("Razorpay: " + response);
      razorpay_order_id = response.id;
    } catch (error) {
      console.log(error);
    }
    //IF order is successful update database
    if (razorpay_order_id !== "") {
      try {
        const response = await Order.findOneAndUpdate(
          { _id: orderId },
          {
            $set: {
              razorpay: {
                razorpay_orderid: razorpay_order_id,
                razorpay_reciept: receipt,
              },
            },
          }
        );
        // console.log(response);
        // console.log(razorpay_order_id + " " + receipt + "  " + total);
        res.status(201).json({
          message: "Created order successfully",
          createdorder: {
            id: customer_id,
            razorpay_order_id: razorpay_order_id,
            order_id: receipt,
            currency: currency,
            amount: total,
          },
        });
      } catch (err) {
        res.status(500).json({
          error: err,
        });
      }
    }
  }
});

module.exports = router;
