global.mongoose = require("mongoose");
const crypt = require("crypto");
const express = require("express");
require("dotenv").config();
const app = express();

const url = process.env.URL;

global.mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoose");
  });

app.listen(process.env.PORT, () => {
  console.log("app started: ", process.env.PORT);
});
