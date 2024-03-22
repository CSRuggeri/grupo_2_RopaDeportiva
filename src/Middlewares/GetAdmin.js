const db = require('../database/models');
 const isAdmin =  (req, res, next) => {
   const admin= req.session.loggedUser.admin
      if (admin=== 1) {
       
       next()
        }else{
            res.status(403).send("Acceso denegado, no te da el target rey")
        }
      
      next();
    } 
    
  module.exports= isAdmin