const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');
const config = require('../../config/config');

const router = express.Router(); 

router.route('/')
  /** POST /api/user - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/list')
  /** GET /api/user/list - Get list of users */
  .get(userCtrl.list)

router.route('/list-available')
  /** GET /api/user/list-available - Get list of available users */
  .get(userCtrl.listAvailable)

router.route('/:userId')
  /** GET /api/user/:userId - Get user */
  .get(userCtrl.get)

  /** PUT /api/user/:userId - Update user */
  .put(expressJwt({ secret: config.jwtSecret }),validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/user/:userId - Delete user */
  .delete(userCtrl.remove);


module.exports = router;
