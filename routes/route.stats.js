const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const Mistake = require("../models/Mistakes");
const User = require("../models/User");
const lessonsMaker = require("../lib/lessonsMaker");

router.get("/", (req, res) => {
  res.render("statistics");
});
