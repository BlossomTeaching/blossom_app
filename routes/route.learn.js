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
  res.render("learn/create");
});

router.get("/practice", async (req, res) => {
  // Get sentences from DB object
  if (exercise) {
    const { spanish, english } = exercise[counter];

    // Create an array of the sentence, removing special characters
    const regex = /[^a-zA-Z1-9'/]/g;
    const wordBlocks = english.split(" ").map(word => word.replace(regex, ""));

    // Copy sentence array and shuffle
    const buttonWords = [...wordBlocks];
    while (wordBlocks.join("") === buttonWords.join("")) shuffle(buttonWords);

    // Render page
    res.render("learn/practice", { spanish, buttonWords, english: english.split(" ") });
  } else {
    res.redirect("/learn/create");
  }
});

router.post("/practice", async (req, res) => {
  const { mistakes, score } = req.body;
  counter++;
  Mistake.findOneAndUpdate(
    {
      $and: [{ translation: exercise[counter]._id }, { user: req.user._id }]
    },
    { $push: { mistakes }, $push: { score } },
    { new: true, upsert: true }
  )
    .populate("user")
    .populate("translation")
    .then(mistake => console.log("MISTAKES", mistake))
    .catch(err => console.log(err));
});

router.get("/end", async (req, res) => {
  let mistakes = [];
  for (let i = 0; i < exercise.length; i++) {
    const [mistake] = await Mistake.find({ $and: [{ translation: exercise[i]._id }, { user: req.user._id }] });
    mistakes.push(mistake);
  }

  const repeatExercise = exercise.filter(sentence => {
    const result = mistakes.find(mistake => sentence._id.toString() === mistake.translation.toString());
    console.log("RESULTS", ...result.score);

    let avg = result.score.reduce((acc, e) => acc + e) / result.score.length;

    return avg < 50;
  });
  res.render("learn/end", { repeatExercise });
});

module.exports = router;
