const Translation = require("../models/Translation");

const lessonsMaker = async level => {
  const documents = await Translation.countDocuments({ level: level });

  const lessons = [];
  const exercisesPerClass = 10;

  for (let i = 1, count = 1; i < documents; i += exercisesPerClass, count++) {
    let exercise = [i, i + exercisesPerClass];
    lessons.push(exercise);
    console.log(count);
  }
  console.log(lessons);
  return lessons;
};

module.exports = lessonsMaker;
