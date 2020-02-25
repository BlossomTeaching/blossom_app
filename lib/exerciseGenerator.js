const Translation = require("../models/Translation");
const User = require("../models/User");

const exerciseGenerator = async (level, lesson) => {
  // const count = await Translation.countDocuments({ level: level }).then(count => Math.floor(Math.random() * count));
  const obj = await Translation.aggregate([{ $match: { level: level } }, { $skip: lesson[0] }, { $limit: lesson[1] - lesson[0] }]);
  console.log(obj);
  return obj;
};

module.exports = exerciseGenerator;
