const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const exerciseGenerator = require("../lib/exerciseGenerator");

router.get("/", (req, res) => {
  exerciseGenerator("A1").then(obj => {
    const { spanish, english } = obj;
    res.render("teach", {
      spanish,
      english: english.split(" ")
    });
  });
});

module.exports = router;