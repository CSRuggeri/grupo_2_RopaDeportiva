const isGuest = (req,res,next) => {
    if(req.session.loggedUser){
   
        return res.redirect(`/users/${req.session.loggedUser.id}/dashboard`);
     }
     next();
}

module.exports = isGuest

