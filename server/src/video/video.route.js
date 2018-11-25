const express = require('express');
const validate = require('express-validation');
const videoCtrl = require('./video.controller');
const paramValidation = require('../../config/param-validation');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const upload = require('../../config/multer');

const router = express.Router();


router.route('/')
    /** POST /api/video */
    .post(validate(paramValidation.createVideo), videoCtrl.create);
    
router.route('/list')
    /** GET /api/video/list */
    .get(videoCtrl.list);

router.route('/search')
    /** GET /api/video/search?text=  - Search video*/
    .get(videoCtrl.search);

router.route('/upload-image')
    /** POST /api/video/upload-image - Upload image */
    .post(expressJwt({ secret: config.jwtSecret }), upload.single('image'), videoCtrl.upload);

router.route('/reserve')
    /** POST /api/video/reserve -- Reserve video */
    .post(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.reserveVideo), videoCtrl.reserve);

router.route('/:id')
    /** GET /api/video/:id */
    .get(videoCtrl.load)
    /** PUT /api/video/:id - Update video */
    .put(expressJwt({ secret: config.jwtSecret }),validate(paramValidation.updateVideo), videoCtrl.update)
    /** DELETE /api/video/:id - Delete video */
    .delete(expressJwt({ secret: config.jwtSecret }), videoCtrl.remove);




module.exports = router;