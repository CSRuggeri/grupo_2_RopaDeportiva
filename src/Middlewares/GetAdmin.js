const db = require('../database/models');
const isAdmin = (req, res, next) => {
  const admin = req.session.loggedUser?.admin;
  if (admin === 1) {
      res.locals.isAdmin = true;
      next();
  } else {
      res.locals.isAdmin = false;
     next()
  }
};

module.exports = isAdmin;
    