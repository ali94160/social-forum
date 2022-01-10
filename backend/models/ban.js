const mongoose = global.mongoose;

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