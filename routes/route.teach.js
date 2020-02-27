const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res, next) => {
  try {
    const students = await User.find({ roll: "Student" });
    res.render("teacherpanel", { students });
  } catch (e) {
    next();
  }
  console.log(students);
});

/* router.get("/",  async (req, res) => {
  const students = await User.getUsers({ filter: { roll: "Student" } });
 
  res.render("teach");
  console.log(students);
  return students;
});
 */
module.exports = router;
