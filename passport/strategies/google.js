require("dotenv").config();
const passport = require("passport");
<<<<<<< HEAD
const GoogleStrategy = require("passport-google").Strategy;
=======
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
>>>>>>> 1ddb1dbbb3fd7c0c1d72b850bb9b5314d7dcdc36

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  )
);
