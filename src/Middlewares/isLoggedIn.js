const isLoggedIn = (req, res, next)=>{
const user = req.session.loggedUser
if(!user){
    return res.redirect('/users/login');
}
next() 
}

module.exports= isLoggedIn