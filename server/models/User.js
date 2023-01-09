const mongoose = require('mongoose');

const { Schema } = mongoose;

const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: 'You must provide a first name!'
  },
  lastName: {
    type: String,
    required: 'You must provide a last name!'
  },
  email: {
    type: String,
    required: 'You must provide an email!',
    unique: true,
    match: [/.+@.+\..+/, 'Please provide a valid email address!']
  },
  password: {
    type: String,
    required: 'You must provide a password!',
    minlength: 7
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
