global.mongoose = require("mongoose");
const express = require("express");
const user = require("./api/userService");
const banlist = require("./api/banService");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "S0m3#p30p13_l1k35-c1l4n7r0,_50m3.d0N7", // choose your own...
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const url = process.env.URL;
user(app);
banlist(app);

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
