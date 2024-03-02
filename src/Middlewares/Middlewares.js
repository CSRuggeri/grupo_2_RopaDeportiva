const fs = require ('fs')

// Multer middleware

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


// Remember me Middleware

let rememberMe = (req,res,next)=>{
    if (req.cookies.remember != undefined && req.session.loggedUser==undefined){
      const usersFilePath = path.join(__dirname, './data/users.json');
      const usersData =fs.readFileSync(usersFilePath, 'utf-8');
      const users = JSON.parse(usersData).users;
      const user = users.find((u) => u.username == req.cookies.remember );
      req.session.loggedUser = user
      console.log('se ha reestablecido la conexión')
    }
    next();
}

module.exports = {uploadProduct, uploadAvatars, rememberMe}