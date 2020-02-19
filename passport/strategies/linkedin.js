require("dotenv").config();
const passport = require("passport");
const Linkedin = require("node-linkedin")(
  process.env.CLIENT_ID,
  process.env.SECRET_KEY,
  process.env.callBack
);

const scope = ["r_emailaddress", "r_liteprofile", "w_member_social"];

/* linkedinRoute.get("/oauth/linkedin", (req, res) => {
  const authUrl = Linkedin.auth.authorize(scope);
  res.status(200).json(authUrl);
}); */

/* linkedinRoute.get("/oauth/linkedin/callback", (req, res) => {
  Linkedin.auth.getAccessToken(
    res,
    req.query.code,
    req.query.state,
    (err, results) => {
      if (err) console.log(err);
      else {
        const linkedin = Linkedin.init(results.access_token);
        linkedin.people.me((error, $in) => {
          if (error) console.log(err);
          return res.status(200).json({
            $in,
            token: results.access_token
          });
        });
      }
    }
  );
}); */
