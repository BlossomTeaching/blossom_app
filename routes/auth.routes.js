const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const { isLoggedOut, isLoggedIn } = require("../lib/isLogged");
const { hashPassword } = require("../lib/hashing");

router.get("/signup", isLoggedOut(), (req, res) => {
  res.render("auth/signup"), { signup: true };
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

router.post("/login", isLoggedOut(), (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/auth/login");
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

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
