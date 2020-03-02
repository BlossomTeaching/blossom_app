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

/* router.post("/login/linkedin", isLoggedOut(), (req, res) => {
  passport.authenticate("linkedin", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  });
});

router.post("/login/facebook", isLoggedOut(), (req, res) => {
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  });
});

//Google Passport Strategy

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

router.post("/login/google", isLoggedOut(), (req, res) => {
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  });
}); */

module.exports = router;
