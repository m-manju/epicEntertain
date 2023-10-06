const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images/');
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const images = 'book_' + Date.now() + fileExtension; 
    cb(null, images);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
