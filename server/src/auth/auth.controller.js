const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const Auth = require("./auth.model");
const bcrypt = require('bcrypt');

/**
 * @param {String} username
 * @param {String} password
 * @returns {token}
 */
function login(req, res, next) {
  Auth.findOne({username: req.body.username})
    .then(async (user) => {
      const compare = await bcrypt.compare(req.body.password, user.password);
      if (compare) {
        const token = jwt.sign({username: user.username}, config.jwtSecret);
        return res.json({
          token,
          username: user.username
        });
      } else {
        return next(new APIError("Password is incorrect", httpStatus.UNAUTHORIZED, true));
      }
      
    })
    .catch(e => {
      return next(new APIError("Authentication Error: " + e.toString(), httpStatus.UNAUTHORIZED, true));
    });
}

async function create(req, res, next) {
  const passwordHash = await bcrypt.hash(req.body.password, 9);
  const auth = new Auth({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobileNumber: req.body.mobileNumber,
    username: req.body.username,
    password: passwordHash,
    role: req.body.role
  });

  auth.save()
    .then(savedAuth => res.json(savedAuth))
    .catch(e => next(e));
}


module.exports = { login, create };
