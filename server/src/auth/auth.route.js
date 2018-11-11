const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const paramValidation = require('../../config/param-validation');
const authCtrl = require('./auth.controller');
const config = require('../../config/config');

const router = express.Router();

  /** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

  /** POST /api/auth/register */
router.route('/register')
  .post(validate(paramValidation.createUser), authCtrl.create);

module.exports = router;
