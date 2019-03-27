const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profiles'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    default: 'todo'
  },
  img: {
    data: Buffer
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Pin = mongoose.model('pin', PinSchema)
