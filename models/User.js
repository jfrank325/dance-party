/* We'll write the schema and register our model for the users here */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    _posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    _savedposts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    _upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    _comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
