const {body} = require('express-validator');
const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

const registerValidations = [
    body('name').notEmpty().withMessage('Debe ingresar su nombre'),
    body('email')
        .notEmpty().withMessage('Debe ingresar su email').bail()
        .isEmail().withMessage('Debe ingresar un formato de email válido'),
    body('password')
        .notEmpty().withMessage('Debe ingresar una contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('birth_date').notEmpty().withMessage('Debe ingresar su fecha de nacimiento'),
    body('avatar').custom((value, { req }) => {
        if(req.file){
            let file = req.file.filename;
            if(!allowedExtensions.exec(file)) {
                throw new Error('El archivo de imagen debe tener una extensión válida (JPG, JPEG, PNG, GIF)')
            } else {
                return true
            }
        }else{
            return true
        }})
]

const loginValidations = [
    body('email').notEmpty().withMessage('Debe ingresar su email'),
    body('password').notEmpty().withMessage('Debe ingresar una contraseña')
]

module.exports = {loginValidations, registerValidations}