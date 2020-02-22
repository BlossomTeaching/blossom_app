const express = require("express");
const router = express.Router();
const auth = require("./auth.routes");
const teach = require("./teach");
const learn = require("./learn");

router.use("/auth", auth);
router.use("/teach", teach);
router.use("/learn", learn);

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.user);
  res.render("index");
});

module.exports = router;
