global.mongoose = require("mongoose");
const express = require("express");
const user = require("./api/userService");
const auth = require("./api/authService");
const banlist = require("./api/banService");
const post = require("./api/postService");
const session = require("express-session");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRETSESSION, // choose your own...
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const url = process.env.URL;
user(app);
auth(app);
banlist(app);
post(app);

global.mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoose");
  });

const floodControl = require("./middlewares/floodControl.js");
app.use(floodControl);

app.listen(process.env.PORT, () => {
  console.log("app started: ", process.env.PORT);
});
