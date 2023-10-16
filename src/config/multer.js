const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const fileName = uniqueSuffix + fileExtension;
    cb(null, fileName);
  },
});


const imageFilter = (req, file, cb) => {
  const fileSize = parseInt(req.headers["content-length"])

  if ((file.mimetype === "image/png" || file.mimetype === "image/jpeg") && fileSize <= 2 * 1024 * 1024) {
      cb(null, true)
  } else {
      console.log('image size should not be more than 2mb');
      cb('Invalid file. Only png and jpeg images (up to 2MB) are allowed.');
 
  }
}

const upload = multer({ storage: storage, fileFilter: imageFilter });

module.exports = upload;

