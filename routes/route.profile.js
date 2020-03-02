const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const Mistake = require("../models/Mistakes");
const User = require("../models/User");
const lessonsMaker = require("../lib/lessonsMaker");
const exerciseGenerator = require("../lib/exerciseGenerator");
const { avgCurrentScore } = require("../lib/scoreCalculator");

router.get("/", async (req, res) => {
  const username = req.user.firstname;
  const lessons = req.user.lessons;
  const userLevel = req.user.level;
  const lessonNumber = req.user.lessonNumber;
  const totalLessons = lessons.length;
  const allLessonsAvg = [];
  console.log("STATS VARIABLES", lessons, userLevel, lessonNumber, totalLessons, allLessonsAvg);
  if (lessonNumber > 1) {
    for (let i = 0; i < lessonNumber - 1; i++) {
      const exercise = await exerciseGenerator(userLevel, lessons[i]);
      console.log("STATS EXERCISE LOOP", exercise);

      const lessonAvg = await avgCurrentScore(exercise, req.user);
      allLessonsAvg.push(lessonAvg);
    }
    console.log(lessonNumber, userLevel, totalLessons, allLessonsAvg);

    res.render("learn/profile", { lessonNumber, userLevel, totalLessons, allLessonsAvg });
  } else {
    res.render("learn/start", { username });
  }
});

module.exports = router;
