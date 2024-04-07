const isAdmin = (req,res,next) => {
    if(!req.session.loggedUser || (req.session.loggedUser.admin != 1)){
   
        return res.redirect(`/`);
     }
     next();
}

module.exports = isAdmin
