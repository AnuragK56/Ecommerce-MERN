const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const Product = require("../models/product");
const checkAuth = require("../middleware/checkauth");
//Store the image in upload folder and appropiate name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

//Filtering the file on the type of extension
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//Adding upload parameters to multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//Mutler acts as middleware to ccept the file
//Creating a new post request to accept a new product
router.post("/", checkAuth, upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log(req.body);

  let imagelink = req.file.path;
  // imagelink = imagelink.replace(/\\/g, "/");
  // console.log(imagelink);
  //Creating new Product using Product schema
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    image: imagelink,
    stock: req.body.stock,
    category: req.body.category,
    subcategory: req.body.subcategory,
  });

  //Then saving the product to the database
  product
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          title: result.title,
          price: result.price,
          _id: result._id,
          image: result.image,
          description: result.description,
          category: result.category,
          subcategory: result.subcategory,
          count: result.count,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
