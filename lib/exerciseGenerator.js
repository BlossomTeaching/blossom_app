const Translation = require("../models/Translation");
const asyncController = require("../lib/asyncController");

const exerciseGenerator = async () => {
  const obj = await Translation.findOne();
  console.log(obj);
  return obj;
};

console.log(exerciseGenerator());

module.exports = exerciseGenerator;
