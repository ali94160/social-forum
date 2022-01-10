const mongoose = require('mongoose');;

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true
    },
    icon: {
      type: String
    }
  }
);

module.exports = mongoose.model('Category', categorySchema);