const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const exerciseGenerator = require("../lib/exerciseGenerator");
const shuffle = require("../lib/shuffler");

router.get("/", (req, res) => {
  exerciseGenerator("C1").then(obj => {
    // Get sentences from DB object
    const { spanish, english } = obj;

    // Create an array of the sentence, removing special characters
    const regex = /[^a-zA-Z1-9']/g;
    const correctBlock = english.split(" ").map(word => word.replace(regex, "").toLowerCase());

    // Copy sentence array and shuffle
    const shuffleBlock = [...correctBlock];
    while (correctBlock.join("") === shuffleBlock.join("")) shuffle(shuffleBlock);

    // Render page
    res.render("learn", { spanish, shuffleBlock, english: english.split(" "), length: correctBlock.length });
  });
});

module.exports = router;
