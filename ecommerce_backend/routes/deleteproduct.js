const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.delete("/:productId", async (req, res) => {
  try {
    console.log(req.params.productId);
    const deleteproduct = await Product.findByIdAndDelete(req.params.productId);
    res.json(deleteproduct);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
