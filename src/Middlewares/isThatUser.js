const isThatUser = (req,res,next) => {
    if (req.params.id != req.session.loggedUser.id) {
        return res.redirect(`/users/${req.session.loggedUser.id}/dashboard`)
    }
    next()
}
module.exports = isThatUser