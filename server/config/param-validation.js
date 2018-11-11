const Joi = require('joi');
const Regex = require('./regex');

module.exports = {
  // POST /api/auth/register
  createAuth: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      mobileNumber: Joi.string().regex(Regex.mobile).required()
    }
  },

   // POST /api/auth/login
   login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/user

  createUser: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(Regex.mobile).required()
    }
  },

  // PUT /api/user/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(Regex.mobile).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },
  // POST /api/user/profile
  getUserByUsername: {
    body: {
      username: Joi.string().required()
    }
  },

  // POST /api/video
  createVideo: {
    body: {
      title: Joi.string().required(),
      image: Joi.string().required(),
      description: Joi.string(),
      genre: Joi.string().required(),
      director: Joi.string().required(),
      status: Joi.string().required(),
      star: Joi.string().regex(Regex.rating).required(),
      length: Joi.number().required()
    }
  },

  // PUT /api/video/:id
  updateVideo: {
    body: {
      title: Joi.string().required(),
      image: Joi.string().required(),
      description: Joi.string(),
      genre: Joi.string().required(),
      director: Joi.string().required(),
      status: Joi.string().required(),
      star: Joi.string().regex(Regex.rating).required(),
      length: Joi.number().required()
    }
  },

  // DELETE /api/video/:id
  deleteVideo: {
    body: {
      id: Joi.string().required()
    }
  },

};
