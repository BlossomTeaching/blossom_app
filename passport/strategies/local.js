const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");
const { checkedHashed } = require("../../lib/hashing");
const asyncController = require("../../lib/asyncController");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    asyncController(async (username, password, done) => {
      console.log(username);
      const foundUser = await User.findOne({ email: username });
      console.log(foundUser);

      if (foundUser) {
        checkedHashed(password, foundUser.password) ? done(null, foundUser) : done(null, false);
      } else {
        done(null, false);
      }
    })
  )
);
console.log("Installed Passport Local Strategy");
