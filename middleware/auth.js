const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    req.flash('errorMessage', 'Please log in to see your Dashboard.');
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;

  