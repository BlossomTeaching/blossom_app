const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("flash");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const path = require("path");
const _ = require("lodash");
const dbConfig = require("./config/db.config.js");
//const favicon = require("serve-favicon");
const sassMiddleware = require("node-sass-middleware");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "say my name",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(flash());
require("./passport")(app);

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    outputStyle: "compressed"
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, "public")));
// app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.use(async (req, res, next) => {
  res.locals = {
    teacher: false,
    student: false
  };
  if (req.user)
    if (req.user.roll === "Teacher") {
      res.locals.teacher = true;
      res.locals.user = req.user;
    } else if (req.user.roll === "Student") {
      res.locals.student = true;
      req.user;
      res.locals.user = req.user;
    }
  // const messageTypes = [
  //   { flashName: "error", className: "danger" },
  //   { flashName: "info", className: "info" }
  // ];
  // res.locals.messages = _.flatten(messageTypes.map(({ flashName, className }) => req.flash(flashName).map(message => ({ type: className, message }))));
  next();
});

const index = require("./routes/route.index");
app.use("/", index);

module.exports = app;
