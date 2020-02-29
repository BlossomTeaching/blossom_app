const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const { isLoggedOut, isLoggedIn } = require("../lib/isLogged");
const { hashPassword } = require("../lib/hashing");

router.get("/signup", isLoggedOut(), (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", isLoggedOut(), async (req, res) => {
  const { firstname, lastname, roll, email, password, teacheremail } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      roll,
      teacheremail,
      password: hashPassword(password)
    });
    return res.redirect("/");
  } else {
    req.flash("error", "Username already exits");
    return res.render("auth/signup", { messages: req.flash("error") });
  }
});

router.get("/login", isLoggedOut(), (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  isLoggedOut(),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  })
);

router.get("/logout", isLoggedIn(), (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
