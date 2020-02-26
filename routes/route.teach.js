const express = require("express");
const router = express.Router();
const Translation = require("../models/Translation");
const exerciseGenerator = require("../lib/exerciseGenerator");
router.get("/", (req, res) => {
  res.render("teach", {});
});

module.exports = router;
