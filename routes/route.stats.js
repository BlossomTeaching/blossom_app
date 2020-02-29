const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const Mistake = require("../models/Mistakes");
const User = require("../models/User");
const lessonsMaker = require("../lib/lessonsMaker");
const exerciseGenerator = require("../lib/exerciseGenerator");
const { avgCurrentScore } = require("../lib/scoreCalculator");

router.get("/", async (req, res) => {
  const lessons = await lessonsMaker(req.user.level);
  const userLevel = req.user.level;
  const lessonNumber = req.user.lessonNumber;
  const totalLessons = lessons.length;
  const allLessonAvg = [];
  for (let i = 0; i < req.user.lessonNumber; i++) {
    const exercise = await exerciseGenerator(userLevel, lessons[i]);
    const lessonAvg = await avgCurrentScore(exercise, req.user);
    allLessonAvg.push(lessonAvg);
  }
  console.log(lessonNumber, userLevel, totalLessons, allLessonAvg);

  res.render("statistics", { lessonNumber, userLevel, totalLessons, allLessonAvg });
});

module.exports = router;
