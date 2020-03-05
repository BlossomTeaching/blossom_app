const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const { isLoggedOut, isLoggedIn } = require("../lib/isLogged");
const { hashPassword } = require("../lib/hashing");
const lessonsMaker = require("../lib/lessonsMaker");

router.get("/signup", isLoggedOut(), (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", isLoggedOut(), async (req, res) => {
  const {
    firstname,
    lastname,
    roll,
    level,
    email,
    password,
    teacheremail
  } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const lessons = await lessonsMaker(level);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      roll,
      level,
      lessons: lessons,
      lessonNumber: 1,
      teacheremail,
      password: hashPassword(password)
    });
    console.log("NEW USER LESSONS", newUser.lessons);

    req.login(newUser, () => {
      if (newUser.roll === "Student") {
        return res.redirect("/profile");
      } else {
        return res.redirect("/classes");
      }
    });
  } else {
    req.flash("errors", "Username already exits");
    return res.render("auth/signup");
  }
});

router.get("/login", isLoggedOut(), (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", "Invalid username or password");
      return res.redirect("/auth/login");
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect("/profile");
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn(), (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
