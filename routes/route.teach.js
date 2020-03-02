const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isLoggedIn } = require("../lib/isLogged");

router.get("/", isLoggedIn(), async (req, res, next) => {
  try {
    const students = await User.find({ roll: "Student" });
    res.render("teach/teacherpanel", { students });
  } catch (e) {
    next();
  }
  console.log(students);
});

router.get("/:id", isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const students = await User.findById(id);
    res.render("learn/statistics", { students });
  } catch (e) {
    next();
  }
});

module.exports = router;
