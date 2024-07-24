const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    req.flash('errorMessage', 'Please log in to view this page.');
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;

  