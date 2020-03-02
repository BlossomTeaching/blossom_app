const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mistakeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    translation: { type: Schema.Types.ObjectId, ref: "translation" },
    mistakes: [Number],
    score: [Number]
  },
  {
    timestamps: true
  }
);

const Mistake = mongoose.model("Mistake", mistakeSchema);
module.exports = Mistake;
