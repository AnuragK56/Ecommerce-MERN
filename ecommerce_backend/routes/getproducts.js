const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

//Returns all the products in JSON Format
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    const Salonsubcategory = await Product.find({
      category: "Salon",
    }).distinct("subcategory");
    const Disposablesubcategory = await Product.find({
      category: "Disposable",
    }).distinct("subcategory");
    const data = {
      products: products,
      Salonsubcategory: Salonsubcategory,
      Disposablesubcategory: Disposablesubcategory,
    };
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
