const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const Regex = require('../../config/regex');

/**
 * Auth Schema
 */
const AuthSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true,
    default: "admin"
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [Regex.mobile, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },	
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


AuthSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Auth, APIError>}
   */
  get(username) {
    return this.findOne({username}).exec().then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('Auth', AuthSchema);
