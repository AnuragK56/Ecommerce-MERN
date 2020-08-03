const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const adminuser = {
  id:"Salonshop",
  username: "Salonshop777",
};
router.post("/", async (req, res) => {
  console.log(req.body);
  if (
    req.body.username === adminuser.username &&
    req.body.password === "777shopSalon"
  ) {
    jwt.sign(
      { adminuser },
      process.env.JWT_SECRET,
      { expiresIn: "3h" },
      (err, token) => {
        res.json(token);
      }
    );
  } else {
    res.status(400).json("Invalid Credantials");
  }
});
module.exports = router;
