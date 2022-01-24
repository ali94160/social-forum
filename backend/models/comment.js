const mongoose = global.mongoose;
const User = require('./user')
const Post = require('./post');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  writerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  createdDate: {
    type: Date,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post,
    required: true
  }
})

module.exports = mongoose.model('Comment', commentSchema)