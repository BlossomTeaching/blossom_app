const express = require("express");
const router = express.Router();
const Trasnlation = require("../models/Translation");

router.get("/", (req, res) => {
  res.render("learn");
});

module.exports = router;
