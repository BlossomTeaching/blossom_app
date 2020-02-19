const passport = require("passport");
GoogleStrategy = require("passport-google").Strategy;
const User = require("../../models/User");

passport.use(
  new GoogleStrategy(
    {
      returnURL: "http://localhost:3000/auth/google/return",
      realm: "http://localhost:3000/"
    },
    function(identifier, done) {
      User.findByOpenID({ openId: identifier }, function(err, user) {
        return done(err, user);
      });
    }
  )
);
