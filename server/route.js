const express = require('express');
const userRoutes = require('./src/user/user.route');
const authRoutes = require('./src/auth/auth.route');
const videoRoutes = require('./src/video/video.route');

const router = express.Router(); 

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.json({status: 'OK'})
);

// mount user routes at /users
router.use('/user', userRoutes);


router.use('/video', videoRoutes);
// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
