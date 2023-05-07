const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation
} = require('../celebrateValidation');

const {
  getUsers,
  getUsersMe,
  getUserById,
  updateProfile,
  updateAvatar
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUsersMe);
usersRouter.get('/:userId', celebrate(getUserByIdValidation), getUserById);
usersRouter.patch('/me', celebrate(updateProfileValidation), updateProfile);
usersRouter.patch('/me/avatar', celebrate(updateAvatarValidation), updateAvatar);

module.exports = usersRouter;
