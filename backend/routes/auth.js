const sign = require('express').Router();
const { celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../celebrateValidation');

sign.post('/signin', celebrate(signinValidation), login);
sign.post('/signup', celebrate(signupValidation), createUser);

module.exports = sign;
