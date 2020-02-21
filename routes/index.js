const express = require("express");
const router = express.Router();
const auth = require("./auth.routes");
const teach = require("./teach");

router.use("/auth", auth);
router.use("/teach", teach);

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.user);
  res.render("index");
});

module.exports = router;
