const Translation = require("../models/Translation");
const User = require("../models/User");

<<<<<<< HEAD
const exerciseGenerator = async (level, lesson) => {
  const obj = await Translation.aggregate([{ $match: { level: level } }, { $skip: lesson[0] }, { $limit: lesson[1] - lesson[0] }]);
=======
const exerciseGenerator = async (level, limit, section) => {
  // const count = await Translation.countDocuments({ level: level }).then(count => Math.floor(Math.random() * count));
  const obj = await Translation.aggregate([
    { $match: { level: level } },
    { $skip: section * limit },
    { $limit: limit },
    { $sample: { size: 1 } }
  ]);
>>>>>>> ca882b730b13dd9d473f7d06abe05948ccc0c839
  console.log(obj);
  return obj;
};

module.exports = exerciseGenerator;
