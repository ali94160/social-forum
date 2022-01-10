import mongoose from 'mongoose';
import User from './user';
import Post from './post';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  writeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  createdDate: {
    type: Date,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post
  }
})

module.exports = mongoose.model('Comment', commentSchema)