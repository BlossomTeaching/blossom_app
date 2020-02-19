const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const { isLoggedOut } = require("../lib/isLogged");
const { hashPassword } = require("../lib/hashing");

router.get("/signup", (req, res) => {
  res.render("auth/signup"), { signup: true };
});

router.post("/signup", async (req, res) => {
  const { firstname, lastname, roll, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      roll,
      password: hashPassword(password)
    });
    req.login(newUser, () => {
      return res.redirect("/");
    });
  } else {
    req.flash("error", "User already exists");
    return res.redirect("/auth/signup");
  }
});

router.get("/login", isLoggedOut(), (req, res) => {
  res.render("auth/login", { login: true });
});

router.post("/login/local", isLoggedOut(), (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  });
});

router.post("/login/linkedin", isLoggedOut(), (req, res) => {
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
});

module.exports = router;
