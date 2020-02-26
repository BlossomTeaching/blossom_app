const Translation = require("../models/Translation");

const lessonsMaker = async (level, numberOfLessons) => {
  const documents = await Translation.countDocuments({ level: level });

  const lessons = [];
  const exercisesPerClass = Math.round(documents / numberOfLessons);

  for (let i = 1, count = 1; i < documents; i += exercisesPerClass, count++) {
    let exercise = [i, i + exercisesPerClass];
    lessons.push(exercise);
    console.log(count);
  }
  console.log(lessons);
  await User.findByIdAndUpdate(req.user._id, { lessons: lessons }, { upsert: true });
  return lessons;
};

module.exports = lessonsMaker;
