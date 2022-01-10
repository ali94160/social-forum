const mongoose = require('mongoose');

const banSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    }
  }
);

module.exports = mongoose.model('Ban', banSchema);