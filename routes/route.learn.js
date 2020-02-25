const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const Mistake = require("../models/Mistakes");
const User = require("../models/User");
const exerciseGenerator = require("../lib/exerciseGenerator");
const shuffle = require("../lib/shuffler");
let exercise;
let counter = 0;

router.get("/create", async (req, res) => {
  const userLevel = req.user.level;
  const lesson = req.user.lessons[0];

  exerciseGenerator(userLevel, lesson).then(obj => {
    exercise = obj;
  });
  res.render("create");
});

router.get("/practice", async (req, res) => {
  // Get sentences from DB object
  console.log(exercise);

  const { spanish, english, _id } = exercise[counter];

  // Create an array of the sentence, removing special characters
  const regex = /[^a-zA-Z1-9'/]/g;
  const wordBlocks = english.split(" ").map(word => word.replace(regex, ""));

  // Copy sentence array and shuffle
  const buttonWords = [...wordBlocks];
  while (wordBlocks.join("") === buttonWords.join("")) shuffle(buttonWords);

  // Render page
  res.render("practice", { spanish, buttonWords, english: english.split(" "), length: wordBlocks.length, _id });
});

router.post("/practice", async (req, res) => {
  counter < exercise.length ? counter++ : (counter = 0);
  const { id, mistakes, score } = req.body;
  console.log("get id", id, mistakes, req.user._id);

  Mistake.findOneAndUpdate(
    {
      $and: [{ translation: id.substring(0, 24) }, { user: req.user._id }]
    },
    { $push: { mistakes }, $push: { score } },
    { new: true, upsert: true }
  )
    .populate("user")
    .populate("translation")
    .then(mistake => console.log(mistake))
    .catch(err => console.log(err));
});

module.exports = router;
