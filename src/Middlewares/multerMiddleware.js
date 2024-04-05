const multer = require('multer');

const storage = (folder) => multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/images/${folder}`); // Set the destination folder for your images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set a unique filename
    },
});
  
const uploadProduct = multer({ storage: storage('show') });
const uploadAvatars = multer({ storage: storage('avatars') });

module.exports = { uploadProduct, uploadAvatars };
