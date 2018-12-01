const User = require('./user.model');
const bcrypt = require('bcrypt');

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.firstname - The firstname of user.
 * @property {string} req.body.lastname - The lastname of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
 function create(req, res, next) {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    city: req.body.city,
    status: req.body.status,
    mobileNumber: req.body.mobileNumber
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const id = req.params.userId;
  console.log(id);
  User.get(id)
      .then(user => {
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.address = req.body.address;
        user.city = req.body.city;
        user.status = req.body.status;
        user.mobileNumber = req.body.mobileNumber;
        user.save()
          .then(savedUser => res.json(savedUser))
          .catch(e => next(e));
          })
      .catch(e => next(e));

}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function listAvailable(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.listAvailable({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const id = req.params.userId;
  User.deleteOne({_id: id})
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

/***
 *
 * @param req
 * @param res
 * @param next
 */

function get(req, res, next) {
  const indx = req.params.userId;

    return User.get(indx)
        .then(user => {
            req.user = user;
                return res.json(user);
            })
    .catch(e => next(e));
}




module.exports = { get, create, update, list, remove, listAvailable };
