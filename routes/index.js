const express = require("express");
const router = express.Router();
const auth = require("./auth.routes");
const learn = require("./teach");

router.use("/auth", auth);
router.use("/learn", learn);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
