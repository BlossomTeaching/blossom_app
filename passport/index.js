const passport = require("passport");
const User = require("../models/User");
// Requireall strategies

require("./strategies/local");
// require("./strategies/facebook");
// require("./strategies/google");
// require("./strategies/linkedin");

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(e => cb(err));
});

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
};
