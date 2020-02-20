const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const { spanish, english } = require("../lib/exerciseGenerator");

router.get("/", (req, res) => {
  console.log(spanish, english);
  res.render("learn", { spanish: spanish, english: english });
});

module.exports = router;
