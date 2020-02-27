const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const Mistake = require("../models/Mistakes");
const User = require("../models/User");
const exerciseGenerator = require("../lib/exerciseGenerator");
const prepareString = require("../lib/prepareString");
let exercise;
let counter = 0;

router.get("/create", async (req, res) => {
  const userLevel = req.user.level;
  const lessons = req.user.lessons;
  const lessonNumber = req.user.lessonNumber;
  const currentLesson = lessons[lessonNumber - 1];
  const totalLessons = lessons.length;

  exerciseGenerator(userLevel, currentLesson).then(obj => {
    exercise = obj;
  });
  console.log(exercise.length);

  res.render("learn/create", { lessonNumber, totalLessons, exercise, layout: "play.hbs" });
});

router.get("/practice", async (req, res) => {
  if (exercise) {
    const { spanish, english } = exercise[counter];
    const { buttons, answer } = prepareString(english);

    res.render("learn/practice", { spanish, buttons, answer });
  } else {
    res.redirect("/learn/create");
  }
});

router.post("/practice", async (req, res, next) => {
  const { mistakes, score } = req.body;
  if (exercise.length === counter) {
    next();
  } else if (!exercise) {
    next();
  }
  Mistake.findOneAndUpdate(
    {
      $and: [{ translation: exercise[counter]._id }, { user: req.user._id }]
    },
    { $push: { mistakes }, $push: { score } },
    { new: true, upsert: true }
  )
    .populate("user")
    .populate("translation")
    .then(mistake => mistake)
    .catch(err => console.log(err));
});

router.get("/end", async (req, res) => {
  let mistakes = [];
  for (let i = 0; i < exercise.length; i++) {
    const [mistake] = await Mistake.find({
      $and: [{ translation: exercise[i]._id }, { user: req.user._id }]
    });
    mistakes.push(mistake);
  }

  const repeatExercise = exercise.filter(sentence => {
    const result = mistakes.find(mistake => sentence._id.toString() === mistake.translation.toString());

    let avg = result.score.reduce((acc, e) => acc + e) / result.score.length;

    return avg < 50;
  });
  res.render("learn/end", { repeatExercise });
});

router.get("/phrase/:id", async (req, res) => {
  const { id } = req.params;
  const obj = await Translation.findOne({ _id: id });
  const { english, spanish } = obj;
  const { buttons, answer } = prepareString(english);
  console.log("ANSWER", answer);

  res.render("learn/practice", { spanish, buttons, answer });
});

module.exports = router;
