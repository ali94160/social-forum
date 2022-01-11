global.mongoose = require("mongoose");
const express = require("express");
const user = require("./api/userService");
const banlist = require("./api/banService");
require("dotenv").config();
const app = express();

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

const floodControl = require('./middlewares/floodControl.js')
app.use(floodControl)

app.listen(process.env.PORT, () => {
  console.log("app started: ", process.env.PORT);
});
