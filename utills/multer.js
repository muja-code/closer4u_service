const multer = require('multer');
const path = require('path');
const dayjs = require('dayjs');

const imagePath = path.join(__dirname, '../', 'public', 'images');

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    req.body.image =
      req.body.nickname +
      '-' +
      dayjs().format('YYYY-MM-DD-HH-mm') +
      '-' +
      file.originalname;
    cb(
      null,
      req.body.nickname +
        '-' +
        dayjs().format('YYYY-MM-DD-HH-mm') +
        '-' +
        file.originalname
    );
  },
});
const upload = multer({ storage: imageStorage });

module.exports = upload;
