const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { urlRegex } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто'
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь'
  },

  avatar: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'Формат ссылки некорректен!'
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },

  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Формат почты некорректен!'
    },
    required: true
  },

  password: {
    type: String,
    select: false,
    required: true
  }
});

module.exports = mongoose.model('user', userSchema);
