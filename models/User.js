const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    roll: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    level: String,
    lessons: [[Number, Number]]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
