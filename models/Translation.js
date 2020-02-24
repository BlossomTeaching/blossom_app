const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    spanish: String,
    english: String,
    level: String,
    booklet: Number,
    length: Number,
    userStats: [{ userId: Number, score: Number, mistakes: [String] }]
  },
  {
    timestamps: true
  }
);

const model = mongoose.model("translation", Schema);
module.exports = model;
