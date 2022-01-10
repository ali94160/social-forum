const mongoose = global.mongoose;
const roles = require('./role');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: String,
    enum: Object.values(roles),
  }]
});

module.exports = mongoose.model('User', userSchema);