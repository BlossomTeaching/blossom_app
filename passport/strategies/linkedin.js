const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin").Strategy;

var LINKEDIN_API_KEY = "--insert-linkedin-api-key-here--";
var LINKEDIN_SECRET_KEY = "--insert-linkedin-secret-key-here--";

passport.use(
  new LinkedInStrategy(
    {
      consumerKey: LINKEDIN_API_KEY,
      consumerSecret: LINKEDIN_SECRET_KEY,
      callbackURL: "http://3000/auth/linkedin/callback"
    },
    function(token, tokenSecret, profile, done) {
      process.nextTick(function() {
        return done(null, profile);
      });
    }
  )
);
