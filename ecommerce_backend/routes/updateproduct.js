const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const bodyParser = require("body-parser");

const checkAuth = require("../middleware/checkauth");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//Find the product using productID from the url(params) and delete the product from the database
router.patch("/:productId", urlencodedParser, checkAuth, async (req, res) => {
  try {
    console.log(req.params.productId);
    console.log(req.body);
    const updateproduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: {
          stock: req.body.stock,
          price: req.body.price,
          description: req.body.description,
          minidescription: req.body.minidescription,
          title: req.body.title,
          subcategory: req.body.subcategory,
        },
      }
    );
    res.json(updateproduct);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
