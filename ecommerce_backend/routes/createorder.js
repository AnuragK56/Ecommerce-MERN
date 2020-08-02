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
var razerpay_order_id = "";
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
        // res.status(201).json({
        //   message: "Created Customer successfully",
        //   createdorder: {
        //     _id: result._id,
        //     firstname: result.firstname,
        //     lastname: result.lastname,
        //     address: result.address,
        //     state: result.state,
        //     city: result.city,
        //     pincode: result.pincode,
        //     phonenumber: result.phonenumber,
        //     email: result.email,
        //   },
        // });
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
      orderstatus: "unpaid",
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
    await createCustomer();
    //Creating Razorpay order
    // const amount = total;
    // const payment_capture = 1;
    // const receipt = shortid.generate();
    // const options = { amount: amount * 100, currency, receipt, payment_capture };
    // try {
    //   const response = await razorpay.orders.create(options);
    //   // console.log("Razorpay: " + response);
    //   razerpay_order_id = response.id;
    // } catch (error) {
    //   console.log(error);
    // }
    // //Creating order Id to add in database
    // const order = new Order({
    //   _id: new mongoose.Types.ObjectId(),
    //   cart: req.body.cart,
    //   total: total,
    //   customer: customer_id,
    //   razorpay_orderid: razerpay_order_id,
    //   razorpay_reciept: receipt,
    //   orderstatus: "unpaid",
    //   receipt: receipt,
    // });
    // //Then saving the order to the database
    // order
    //   .save()
    //   .then((result) => {
    //     console.log(result);
    //     res.status(201).json({
    //       message: "Created order successfully",
    //       createdorder: {
    //         id: result.id,
    //         cart: result.cart,
    //         total: result.total,
    //         razorpay_orderid: result.razorpay_orderid,
    //         razorpay_reciept: result.razorpay_reciept,
    //         orderstatus: result.orderstatus,
    //         total: result.total,
    //         receipt: result.receipt,
    //         ordercreation: result.ordercreation,
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(500).json({
    //       error: err,
    //     });
    //   });
  }
});

module.exports = router;
