const mongoose = global.mongoose;

import roles from './role';

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
    default: roles.USER
  }]
});

export default mongoose.model('User', userSchema);