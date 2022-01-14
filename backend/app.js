global.mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const { startSession } = require('mongoose');
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
  }).then(() => {
    if (global.mongoose.connection.readyState === 1 && process.env.NODE_ENV !== 'test') {
    console.log('Db is connected!')
  }
  })

app.use(floodControl);

// so test doesnt use this port
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log("app started: ", process.env.PORT);
  });
}

module.exports = app;
