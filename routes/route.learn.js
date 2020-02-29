const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const Mistake = require("../models/Mistakes");
const User = require("../models/User");
const exerciseGenerator = require("../lib/exerciseGenerator");
const prepareString = require("../lib/prepareString");
const { findCompleted, avgScore, avgTotalScore, avgCurrentScore, bestScore } = require("../lib/scoreCalculator");
let exercise;
let counter = 0;
let end = false;

router.get("/create", async (req, res) => {
  const userLevel = req.user.level;
  const lessons = req.user.lessons;
  const lessonNumber = req.user.lessonNumber;
  const currentLesson = lessons[lessonNumber - 1];
  const totalLessons = lessons.length;
  counter = 0;
  exerciseGenerator("B2", [1, 3]).then(obj => {
    exercise = obj;
    res.render("learn/create", {
      lessonNumber,
      totalLessons,
      exercise,
      layout: "play.hbs"
    });
  });
});

router.get("/practice", async (req, res) => {
  if (exercise.length === counter) return res.redirect("/learn/end");
  if (exercise) {
    const { spanish, english } = exercise[counter];
    console.log("EXERCISE @", counter, exercise[counter], exercise.length);

    const { buttons, answer } = prepareString(english);

    res.render("learn/practice", {
      spanish,
      buttons,
      answer,
      layout: "play.hbs"
    });
  } else {
    res.redirect("/learn/create");
  }
});

router.post("/practice", async (req, res, next) => {
  const { mistakes, score } = req.body;
  console.log("MISTAKES POST", mistakes);

  await Mistake.findOneAndUpdate(
    {
      $and: [{ translation: exercise[counter]._id }, { user: req.user._id }]
    },
    { $push: { mistakes }, $push: { score } },
    { new: true, upsert: true }
  );

  counter++;
});

router.get("/end", async (req, res) => {
  if (exercise) {
    console.log("END ROUTE", exercise);
    const avg = await avgCurrentScore(exercise, req.user);
    const completed = await findCompleted(exercise, req.user);
    const avgTotals = completed.map(mistake => avgScore(mistake.score));
    const allCurrent = completed.map(mistake => mistake.score[mistake.score.length - 1]);
    const bestScores = await bestScore(exercise, req.user);
    console.log("COMPLETED @ END", completed, "BEST SCORE", bestScores);

    res.render("learn/end", {
      bestScores,
      completed,
      avg,
      avgTotals,
      allCurrent,
      layout: "play.hbs"
    });
  } else {
    res.redirect("/learn/create");
  }
  console.log("AVG END", avg);
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
