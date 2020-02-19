const passport = require("passport");
const GoogleStrategy = require("passport-google").Strategy;

passport.use(
  new GoogleStrategy(
    {
      returnURL: "http://localhost:3000/auth/google/return",
      realm: "http://localhost:3000/"
    },
    function(identifier, profile, done) {
      process.nextTick(function() {
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);
