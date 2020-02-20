const Translation = require("../models/Translation");
const asyncController = require("../lib/asyncController");

const exerciseGenerator = async () => {
  const obj = await Translation.findOne();
  console.log(obj);
  return obj;
};

const obj = exerciseGenerator();
const { spanish, english } = obj;
console.log(obj);

module.exports = exerciseGenerator;
