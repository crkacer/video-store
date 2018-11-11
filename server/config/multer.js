const multer = require('multer');
const {image} = require('./regex');
const httpStatus = require('http-status');
const APIError = require('../src/helpers/APIError');

const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(image)) {
        return cb(new APIError("Invalid image type!", httpStatus.BAD_REQUEST, true), false);
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/img')
    },
    filename: (req, file, cb) => {
        const file_name = Date.now() + '-' + file.originalname;
        req.image_upload_url = 'img/'+file_name;
        cb(null, file_name);
    }
});

const upload = multer({storage: storage, fileFilter: imageFilter});

module.exports = upload;