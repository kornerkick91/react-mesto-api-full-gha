const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const customError = require('../errors');
const User = require('../models/user');

const findUser = (user, res) => {
  if (!user) {
    throw new customError.NotFoundError('Запрашиваемый пользователь не найден.');
  }
  return res.send(user);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => findUser(user, res))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
      })
        .then((newUser) => {
          res.status(201).send({
            email: newUser.email,
            name: newUser.name,
            about: newUser.about,
            avatar: newUser.avatar,
          });
        })
        .catch((error) => {
          if (error.name === 'ValidationError') {
            next(new customError.IncorrectDataError('Переданы некорректные данные при создании пользователя.'));
          } else if (error.code === 11000) {
            next(new customError.EmailUseError('Пользователь с таким email уже существует.'));
          } else {
            next(error);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new customError.AuthFailedError('Введена неверная почта или пароль.');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(new customError.AuthFailedError('Введена неверная почта или пароль.'));
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '10d' });
        return res.send({ token });
      });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true })
    .then((user) => findUser(user, res))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new customError.IncorrectDataError('Переданы некорректные данные при обновлении профиля пользователя.'));
      } else {
        next(error);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const avatar = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, avatar, { new: true, runValidators: true })
    .then((user) => findUser(user, res))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new customError.IncorrectDataError('Переданы некорректные данные при обновлении аватара пользователя.'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getUsers,
  getUsersMe,
  getUserById,
  createUser,
  login,
  updateProfile,
  updateAvatar
};
