const mongoose = global.mongoose;

const banSchema = new mongoose.Schema(
  {
    email: {
      type: String
    },
    ip: {
      type: String,
    },
    reason: {
      type: String,
      required: true
    },
    banDate: {
      type: Date,
      required: true
    }
  }
);

module.exports = mongoose.model('Ban', banSchema);
