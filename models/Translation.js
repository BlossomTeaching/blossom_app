const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const translationSchema = new Schema(
  {
    spanish: String,
    english: String,
    level: String,
    booklet: Number,
    length: Number
    // userStats: [{ userId: { type: Schema.Types.ObjectId, ref: User }, score: Number, mistakes: [String] }]
  },
  {
    timestamps: true
  }
);

const model = mongoose.model("translation", translationSchema);
module.exports = model;
