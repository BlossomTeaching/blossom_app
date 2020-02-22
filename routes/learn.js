const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const exerciseGenerator = require("../lib/exerciseGenerator");
const shuffle = require("../lib/shuffler");

router.get("/", (req, res) => {
  exerciseGenerator("A1").then(obj => {
    const { spanish, english } = obj;
    const regex = /[^a-zA-Z']/g;
    const correctBlock = english.split(" ").map(word => word.replace(regex, "").toLowerCase());
    const shuffleBlock = correctBlock.map(word => word);
    while (correctBlock === shuffleBlock) shuffle(shuffleBlock);
    console.log("shuffle", shuffleBlock, "correct", correctBlock);
    res.render("learn", { spanish, shuffleBlock, english });
  });
});

module.exports = router;
