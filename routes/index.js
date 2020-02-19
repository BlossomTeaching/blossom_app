const express = require("express");
const router = express.Router();
const auth = require("./auth.routes");

router.use("/auth", auth);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
