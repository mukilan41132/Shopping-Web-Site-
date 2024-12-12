const multer = require('multer');
const UUid = require('uuid').v4;

const uplode = multer({
    storage: multer.diskStorage({
        destination: 'product-data/images',
        filename: function (req, file, cb) {
            cb(null, UUid() + '-' + file.originalname);
        }
    })
})
const configMulterMiddleware = uplode.single('image');

module.exports = configMulterMiddleware;