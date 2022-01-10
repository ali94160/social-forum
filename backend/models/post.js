const mongoose = global.mongoose;
const User = require('./user');
const Category = require('./category');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  ownerId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  createdDate: {
    type: Date,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category
  },
  moderatorsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User
    }
  ]
})

module.exports = mongoose.model('Post', postSchema);