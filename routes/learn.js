const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const exerciseGenerator = require("../lib/exerciseGenerator");
const shuffle = require("../lib/shuffler");

router.get("/", (req, res) => {
  exerciseGenerator("C1", 5, 0).then(obj => {
    // Get sentences from DB object
    const { spanish, english, _id } = obj;

    // Create an array of the sentence, removing special characters
    const regex = /[^a-zA-Z1-9']/g;
    const wordBlocks = english.split(" ").map(word => word.replace(regex, ""));

    // Copy sentence array and shuffle
    const buttonWords = [...wordBlocks];
    while (wordBlocks.join("") === buttonWords.join("")) shuffle(buttonWords);

    // Render page
    res.render("learn", { spanish, buttonWords, english: english.split(" "), length: wordBlocks.length, _id });
  });
});

router.post("/", (req, res) => {
  const { id } = req.params;
  const { mistakes } = req.body;
  console.log("get id", id, mistakes);
  res.send("/learn");
});

module.exports = router;
