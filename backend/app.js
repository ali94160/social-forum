const mongoose = require("mongoose");
const crypt = require("crypto");
const express = require("express");
require("dotenv").config();
const app = express();

const url = process.env.URL;

mongoose
  .connect(url, {
    // let me speak the same dialect
    // as a modern MongoDB server:
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoose");
  });

app.listen(process.env.PORT, () => {
  console.log("app started: ", process.env.PORT);
});
