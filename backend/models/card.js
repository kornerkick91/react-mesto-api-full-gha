const mongoose = require('mongoose');
const { urlRegex } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },

  link: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'Введена некорректная ссылка.',
    },
    required: true
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: []
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);
