const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const exerciseGenerator = require("../lib/exerciseGenerator");

router.get("/", (req, res) => {
  exerciseGenerator("A1", [1, 5]).then(obj => {
    const { spanish, english } = obj[0];
    res.render("teach", {
      spanish,
      english: english.split(" ")
    });
  });
});

module.exports = router;
