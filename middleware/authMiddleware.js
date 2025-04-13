// middleware/authMiddleware.js
function auth(req, res, next) {
  if (req.session && req.session.user) {
    // User is authenticated
    next();
  } else {
    // User is not authenticated
    res.redirect('/admin/login');
  }
}

module.exports = auth;
