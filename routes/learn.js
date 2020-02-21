const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const exerciseGenerator = require("../lib/exerciseGenerator");

router.get("/", (req, res) => {
  const { spanish, english } = exerciseGenerator();
  console.log("spanish", spanish, "english", english);
  res.render("learn", { spanish: spanish, english: english });
});

module.exports = router;
