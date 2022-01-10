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
    default: roles.USER // or shall it be anonymous?
  }]
});

export default mongoose.model('User', userSchema);