
function isAuthenticated(req, res, next) {
  console.log(req.user);
  if (!req.user) {
    return res.status(401).send({
      message: 'login required'
    });
  }
  next();
}

module.exports.isAuthenticated = isAuthenticated;