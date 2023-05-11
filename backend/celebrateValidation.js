const { Joi } = require('celebrate');
const { urlRegex } = require('./utils/constants');

const getUserByIdValidation = {
  params: Joi.object({
    userId: Joi.string().hex().length(24).message('Введен некорректный id.')
  })
};

const updateProfileValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "Имя" должно содержать не менee 2 символов.',
      'string.max': 'Поле "Имя" должно содержать не болee 30 символов.',
      'any.required': 'Поле "Имя" должно быть заполнено.'
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "Род деятельности" должно содержать не менее 2 символов.',
      'string.max': 'Поле "Род деятельности" должно содержать не более 30 символов.',
      'any.required': 'Поле "Род деятельности" должно быть заполнено.'
    })
  })
};

const updateAvatarValidation = {
  body: Joi.object({
    avatar: Joi.string().regex(urlRegex).message('Введена некорректная ссылка.')
  })
};

const createCardValidation = {
  body: Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Название карточки должно содержать не менее 2 символов.',
        'string.max': 'Название карточки должно содержать не более 30 символов.',
        'any.required': 'Название карточки должно быть заполнено.'
      })
      .required(),
    link: Joi.string()
      .regex(urlRegex)
      .messages({
        'string.dataUri': 'Введена некорректная ссылка.',
        'any.required': 'Название карточки должно быть заполнено.'
      })
      .required(),
  })
};

const deleteCardValidation = {
  params: Joi.object({
    cardId: Joi.string().hex().length(24).messages({
      'string.hex': 'Введен некорректный id.'
    }),
  })
};

const likeCardValidation = {
  params: Joi.object({
    cardId: Joi.string().hex().length(24).messages({
      'string.hex': 'Введен некорректный id.'
    }),
  })
};

const signinValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введен некорректный email.',
      'any.required': 'Поле "Email" должно быть заполнено.'
    }),
    password: Joi.string().required().min(8).messages({
      'string.password': 'Пароль должен содержать не менее 8 символов.',
      'any.required': 'Поле "Пароль" должно быть заполнено.'
    })
  })
};

const signupValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введен некорректный email.',
      'any.required': 'Поле "Email" должно быть заполнено.'
    }),
    password: Joi.string().required().min(8).messages({
      'string.password': 'Пароль должен содержать не менее 8 символов.',
      'any.required': 'Поле "Пароль" должно быть заполнено.'
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "Имя" должно содержать не менee 2 символов.',
      'string.max': 'Поле "Имя" должно содержать не болee 30 символов.',
      'any.required': 'Поле "Имя" должно быть заполнено.'
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "Род деятельности" должно содержать не менее 2 символов.',
      'string.max': 'Поле "Род деятельности" должно содержать не более 30 символов.',
      'any.required': 'Поле "Род деятельности" должно быть заполнено.'
    }),
    avatar: Joi.string().regex(urlRegex).message('Введена некорректная ссылка.')
  })
};

module.exports = {
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  signinValidation,
  signupValidation
};
