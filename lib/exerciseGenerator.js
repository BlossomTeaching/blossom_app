const Translation = require("../models/Translation");

const exerciseGenerator = async (level, limit, section) => {
  // const count = await Translation.countDocuments({ level: level }).then(count => Math.floor(Math.random() * count));
  const obj = await Translation.aggregate([
    { $match: { level: level } },
    { $skip: section * limit },
    { $limit: limit },
    { $sample: { size: 1 } }
  ]);
  console.log(obj);
  return obj[0];
};

module.exports = exerciseGenerator;
