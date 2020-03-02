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

router.get("/create", async (req, res) => {
  const lessons = req.user.lessons;
  const userLevel = req.user.level;
  const lessonNumber = req.user.lessonNumber;
  const totalLessons = lessons.length;
  counter = 0;
  console.log("LESSON NUMBER CREATE", lessonNumber);

  exerciseGenerator(userLevel, lessons[lessonNumber - 1]).then(obj => {
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
    const lessonNumber = req.user.lessonNumber;
    let next = false;
    if (avg > 75) {
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $inc: { lessonNumber: 1 }
        }
      );
      next = true;
    }
    console.log("COMPLETED @ END", completed, "BEST SCORE", bestScores);

    res.render("learn/end", {
      bestScores,
      completed,
      avg,
      avgTotals,
      allCurrent,
      next,
      lessonNumber,
      layout: "play.hbs"
    });
  } else {
    res.redirect("/learn/create");
  }
  console.log("AVG END", avg);
});

router.get("/repeat/:lesson", async (req, res) => {
  const { lesson } = req.params;
  const lessons = req.user.lessons;
  const userLevel = req.user.level;
  const lessonNumber = lesson;
  const totalLessons = lessons.length;
  counter = 0;
  console.log("LESSON NUMBER CREATE", lessonNumber);

  exerciseGenerator(userLevel, lessons[lessonNumber - 1]).then(obj => {
    exercise = obj;
    res.render("learn/create", {
      lessonNumber,
      totalLessons,
      exercise,
      layout: "play.hbs"
    });
  });
});

module.exports = router;
