global.mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const allApis = require('./api');
const floodControl = require("./middlewares/floodControl.js");

require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const url = process.env.URL;

app.use(
  session({
    secret: process.env.SECRETSESSION, // choose your own...
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

allApis(app);

global.mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoose");
  });

app.use(floodControl);

app.listen(process.env.PORT, () => {
  console.log("app started: ", process.env.PORT);
});
