let userCredentialsMiddleware = (req, res, next) => {
    if (req.session.loggedUser) {
        res.locals.logged = true;
        res.locals.loggedUser = req.session.loggedUser;
    }
    if(req.session.processOrder){
        res.locals.processOrder = true
    }
    if (req.session.loggedUser && req.session.loggedUser.admin == 1) {
        res.locals.admin = true;
    }
next();
}

module.exports = userCredentialsMiddleware;