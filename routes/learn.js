const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const exerciseGenerator = require("../lib/exerciseGenerator");
const shuffle = require("../lib/shuffler");

router.get("/", (req, res) => {
  exerciseGenerator("C1").then(obj => {
    const { spanish, english } = obj;
    const regex = /[^a-zA-Z1-9']/g;
    const correctBlock = english.split(" ").map(word => word.replace(regex, "").toLowerCase());
    const shuffleBlock = [...correctBlock];
    while (correctBlock.join("") === shuffleBlock.join("")) shuffle(shuffleBlock);
    console.log("shuffle", shuffleBlock, "correct", correctBlock);
    res.render("learn", { spanish, shuffleBlock, english: english.split(" "), length: correctBlock.length });
  });
});

module.exports = router;
