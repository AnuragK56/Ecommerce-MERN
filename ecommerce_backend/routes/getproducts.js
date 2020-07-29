const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
