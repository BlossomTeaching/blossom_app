const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const Mistake = require("../models/Mistakes");
const User = require("../models/User");
const lessonsMaker = require("../lib/lessonsMaker");
const exerciseGenerator = require("../lib/exerciseGenerator");
const { avgCurrentScore } = require("../lib/scoreCalculator");

router.get("/", async (req, res) => {
  const lessons = req.user.lessons;
  const userLevel = req.user.level;
  const lessonNumber = req.user.lessonNumber;
  const totalLessons = lessons.length;
  const allLessonAvg = [];
  for (let i = 0; i < lessonNumber; i++) {
    const exercise = await exerciseGenerator(userLevel, lessons[i]);
    console.log("STATS EXERCISE LOOP", exercise);

    const lessonAvg = await avgCurrentScore(exercise, req.user);
    allLessonAvg.push(lessonAvg);
  }
  console.log(lessonNumber, userLevel, totalLessons, allLessonAvg);

  res.render("statistics", { lessonNumber, userLevel, totalLessons, allLessonAvg });
});

module.exports = router;
