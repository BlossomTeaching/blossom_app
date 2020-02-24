const Translation = require("../models/Translation");

const exerciseGenerator = async level => {
  const count = await Translation.countDocuments({ level: level }).then(count =>
    Math.floor(Math.random() * count)
  );
  console.log(count);
  const obj = await Translation.findOne({ level: level }).skip(count);
  console.log(obj);
  return obj;
};

module.exports = exerciseGenerator;
